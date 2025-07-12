const axios = require("axios");
const conn = require("../config/db.config");
const schedule = require("node-schedule");
const { sendEmail, sendSMS } = require("./notification.service"); // Adjust the path

const formatToE164 = (phone) => {
  // Example: Convert to +2519xxxxxxxx (for Ethiopia)
  return phone.startsWith("+") ? phone : "+251" + phone.replace(/^0/, "");
};

const CHAPA_SECRET = process.env.CHAPA_SECRET_KEY;
const CALLBACK_URL =
  process.env.CHAPA_CALLBACK_URL || "http://localhost:3000/api/payments/verify";

// Helper function to verify webhook signature
const verifySignature = (payload, signature) => {
  const computedSignature = crypto
    .createHmac("sha256", CHAPA_SECRET)
    .update(payload)
    .digest("hex");

  return computedSignature === signature;
};

// Initialize Payment
const initialize = async (order_id, amount, email, first_name, last_name) => {
  const tx_ref = `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const data = {
    amount,
    currency: "ETB",
    email,
    first_name,
    last_name,
    tx_ref,
    callback_url: CALLBACK_URL,
  };

  const headers = {
    Authorization: `Bearer ${CHAPA_SECRET}`,
    "Content-Type": "application/json",
  };

  const response = await axios.post(
    "https://api.chapa.co/v1/transaction/initialize",
    data,
    { headers }
  );

  // Insert payment in DB with "Pending" status
  await conn.query(
    `INSERT INTO payments (order_id, amount, tx_ref, chapa_status) VALUES (?, ?, ?, ?)`,
    [order_id, amount, tx_ref, "Pending"]
  );

  // Retrieve the payment_id of the newly inserted payment
  const [rows] = await conn.query(
    `SELECT payment_id FROM payments WHERE tx_ref = ?`,
    [tx_ref]
  );
  const payment_id = rows[0]?.payment_id;

  if (payment_id) {
    // Link the payment to the order in the order_payments table
    await conn.query(
      `INSERT INTO order_payments (order_id, payment_id, amount) VALUES (?, ?, ?)`,
      [order_id, payment_id, amount]
    );
  }

  return {
    checkout_url: response.data.data.checkout_url,
    tx_ref,
  };
};

// Verify Payment Status
const verify = async (tx_ref) => {
  try {
    const headers = { Authorization: `Bearer ${CHAPA_SECRET}` };

    // 1. Verify payment with Chapa
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      { headers }
    );

    const data = response.data.data;
    if (!data) {
      throw new Error("No payment data received from Chapa.");
    }

    const status = data.status;

    // 2. Get payment and customer details - USING THE WORKING QUERY PATTERN
    const customerRows = await conn.query(
      `
      SELECT 
        p.payment_id,
        ci.email, 
        ci.phone,
        IFNULL(inf.first_name, 'Customer') AS first_name,
        IFNULL(inf.last_name, '') AS last_name
      FROM payments p
      JOIN orders o ON p.order_id = o.order_id
      JOIN customer_identifier ci ON o.customer_id = ci.customer_id
      LEFT JOIN customer_info inf ON ci.customer_id = inf.customer_id
      WHERE p.tx_ref = ?`,
      [tx_ref]
    );

    if (!customerRows || customerRows.length === 0) {
      throw new Error(`Payment record not found for tx_ref: ${tx_ref}`);
    }

    const customer = customerRows[0];
    console.log("📩 Customer info:", {
      email: customer.email,
      first_name: customer.first_name,
      phone: customer.phone,
    });

    // 3. Handle notifications - USING THE WORKING NOTIFICATION PATTERN
    if (status === "success") {
      if (customer.email) {
        await sendEmail(
          customer.email,
          `Hi ${customer.first_name}, your payment was successful!`,
          "Payment Successful"
        );
        console.log("✅ Email notification sent to customer");
      } else {
        console.warn("⚠️ No email found for customer.");
      }

      if (customer.phone) {
        await sendSMS(
          customer.phone,
          `Hi ${customer.first_name}, your payment has been received!`,
          ""
        );
        console.log("✅ SMS notification sent to customer");
      } else {
        console.warn("⚠️ No phone number found for customer.");
      }

      // Admin notification
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        await sendEmail(
          adminEmail,
          `New payment from ${customer.first_name} ${customer.last_name} wantes your approval.`,
          "Payment Received"
        );
      }
    }

    return {
      status,
      message: status === "success" ? "Payment successful" : "Payment failed",
      payment_id: customer.payment_id,
      receipt_url: `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
    };
  } catch (error) {
    console.error("Payment verification error:", error.message);
    throw error;
  }
};

// Get All Payments for Admin
// Modify your getAllPayments function in your payment service
const getAllPayments = async () => {
  try {
    const query = `
     SELECT 
    p.*, 
    MAX(pr.receipt_details) as receipt_details, 
    MAX(r.receipt_content) as receipt_content,
    ci.first_name,
    ci.last_name
FROM 
    payments p
LEFT JOIN 
    payment_receipts pr ON p.payment_id = pr.payment_id
LEFT JOIN 
    receipts r ON p.order_id = r.order_id
JOIN 
    orders o ON p.order_id = o.order_id
JOIN 
    customer_identifier c ON o.customer_id = c.customer_id
JOIN 
    customer_info ci ON c.customer_id = ci.customer_id
GROUP BY 
    p.payment_id, ci.first_name, ci.last_name;
    `;
    const rows = await conn.query(query);
    console.log("Fetched payments:", rows); // Log the fetched payments
    return rows;
  } catch (err) {
    throw new Error("Failed to fetch payments: " + err.message);
  }
};

// Assuming a service layer for database logic
const updatePaymentStatus = async (tx_ref, status) => {
  try {
    const paymentRows = await conn.query(
      "SELECT payment_id FROM payments WHERE tx_ref = ?",
      [tx_ref]
    );

    if (!paymentRows || paymentRows.length === 0) {
      console.error(`❌ No payment found with tx_ref = "${tx_ref}"`);
      throw new Error(`Payment with tx_ref "${tx_ref}" not found.`);
    }

    const paymentId = paymentRows[0].payment_id;

    await conn.query(
      "UPDATE payments SET chapa_status = ? WHERE payment_id = ?",
      [status, paymentId]
    );

    let finalStatus = status === "success" ? "Successful" : "Failed";

    await conn.query(
      "INSERT INTO payment_status (payment_id, status) VALUES (?, ?)",
      [paymentId, finalStatus]
    );

    console.log(
      `✅ Payment ${tx_ref} updated successfully with status: ${status}`
    );
  } catch (error) {
    console.error("❌ Error updating payment status:", error.message);
    throw error;
  }
};

const updateApprovalStatus = async (paymentId, approvalStatus) => {
  const result = await conn.query(
    `UPDATE payments 
     SET approval_status = ? 
     WHERE payment_id = ? AND chapa_status = 'success'`,
    [approvalStatus, paymentId]
  );

  if (result.affectedRows > 0) {
    // Fetch customer email and phone for notifications
    const customerRows = await conn.query(
      `
      SELECT ci.email, inf.first_name, ci.phone 
FROM payments p 
JOIN orders o ON p.order_id = o.order_id 
LEFT JOIN customer_identifier ci ON o.customer_id = ci.customer_id 
LEFT JOIN customer_info inf ON ci.customer_id = inf.customer_id 
WHERE p.payment_id = ?
`,
      [paymentId]
    );

    if (customerRows.length > 0) {
      const { email, first_name, phone } = customerRows[0];

      console.log("📩 Customer info:", { email, first_name, phone });

      if (email) {
        await sendEmail(
          email,
          `Hi ${first_name}, your payment has been approved!`,
          "Payment Approved"
        );
      } else {
        console.warn("⚠️ No email found for customer.");
      }

      if (phone) {
        await sendSMS(
          phone,
          `Hi ${first_name}, your payment has been approved!`,
          ""
        );
      } else {
        console.warn("⚠️ No phone number found for customer.");
      }
    } else {
      console.warn("⚠️ No customer found for payment ID:", paymentId);
    }
  } else {
    console.warn(
      "⚠️ No rows affected. Payment ID might be invalid or chapa_status != 'success'"
    );
  }

  return result.affectedRows > 0;
};

const saveReceipt = async (tx_ref, receiptContent, receiptDetails) => {
  // 1. Get payment_id and order_id using tx_ref
  const payment = await conn.query(
    "SELECT payment_id, order_id FROM payments WHERE tx_ref = ?",
    [tx_ref]
  );

  if (!payment || payment.length === 0) {
    throw new Error("Payment not found for tx_ref");
  }

  const { payment_id, order_id } = payment[0];

  // 2. Insert into receipts
  await conn.query(
    "INSERT INTO receipts (order_id, receipt_content) VALUES (?, ?)",
    [order_id, receiptContent]
  );

  // 3. Insert into payment_receipts
  await conn.query(
    "INSERT INTO payment_receipts (payment_id, receipt_details) VALUES (?, ?)",
    [payment_id, receiptDetails]
  );
};

const getPaidPaymentsByCustomerId = async (customerId) => {
  const query = `
    SELECT p.payment_id, p.amount, p.payment_date, p.approval_status, o.order_id
    FROM payments p
    JOIN orders o ON p.order_id = o.order_id
    WHERE o.customer_id = ? AND p.chapa_status = 'success'
  `;

  const rows = await conn.query(query, [customerId]);
  return rows;
};
const getReceiptByPaymentId = async (paymentId) => {
  try {
    // Query the database to get the payment receipt details
    const [rows] = await conn.query(
      `SELECT pr.receipt_id, pr.payment_id, pr.receipt_details, pr.created_at, r.receipt_content
       FROM payment_receipts pr
       JOIN receipts r ON pr.receipt_id = r.receipt_id
       WHERE pr.payment_id = ?`,
      [paymentId]
    );

    if (rows.length === 0) {
      return null;
    }

    console.log(rows);
    return rows;
  } catch (error) {
    console.error("Error fetching receipt in service:", error.message);
    throw error;
  }
};

const checkPendingPayments = async () => {
  try {
    const orders = await conn.query(`
      SELECT o.order_id, o.slot_time, c.phone, ci.first_name, c.email
      FROM orders o
      JOIN customer_identifier c ON o.customer_id = c.customer_id
      LEFT JOIN customer_info ci ON c.customer_id = ci.customer_id
      WHERE o.order_id NOT IN (
        SELECT order_id FROM payments WHERE chapa_status = 'success'
      )
    `);

    const now = new Date();
    console.log("🔄 Running checkPendingPayments job at", now.toISOString());

    for (const order of orders) {
      const rawSlotTime = order.slot_time; // e.g. "11:12"
      console.log("Raw slot_time from DB:", rawSlotTime);

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");

      const fullDateTimeString = `${year}-${month}-${day}T${rawSlotTime}`;
      const slotTime = new Date(fullDateTimeString);

      if (isNaN(slotTime.getTime())) {
        console.error("❌ Invalid slotTime:", fullDateTimeString);
        continue;
      }

      const timeUntilSlot = (slotTime - now) / (1000 * 60); // in minutes
      const phone = formatToE164(order.phone);
      const email = order.email;
      const customerName = order.first_name || "Customer";
      const orderId = order.order_id;

     if (Math.abs(timeUntilSlot - 30) < 2.5) {
  // Between 27.5 and 32.5 mins left – treat it as "exactly 30 mins"
  console.log(`⏰ Sending 30-min reminder for order ${orderId}`);
  const msg = `Hi ${customerName}, please complete your payment for order #${orderId} within 30 minutes to avoid cancellation.`;
  await sendSMS(phone, msg);
  if (email) await sendEmail(email, msg, "Payment Reminder");

} else if (Math.abs(timeUntilSlot) < 2.5) {
  // Between -2.5 and +2.5 minutes – treat it as "exactly now"
  console.log(`⛔ Cancelling order ${orderId} – slot time reached`);
  const cancelMsg = `Hi ${customerName}, your order #${orderId} has been canceled due to non-payment.`;

  // await conn.query(`DELETE FROM order_services WHERE order_id = ?`, [orderId]);
  await conn.query(`UPDATE order_status SET status = 'Canceled', updated_at = NOW() WHERE order_id = ?`, [orderId]);
  // await conn.query(`DELETE FROM orders WHERE order_id = ?`, [orderId]);

  await sendSMS(phone, cancelMsg);
  if (email) await sendEmail(email, cancelMsg, "Order Cancelled Due to Non-payment");
}

    }
  } catch (error) {
    console.error(
      "❌ Error checking pending payments:",
      error.message || error
    );
  }
};

// Schedule the job to run every 5 minutes
schedule.scheduleJob("*/5 * * * *", checkPendingPayments);

module.exports = {
  initialize,
  verify,
  getAllPayments,
  updatePaymentStatus,
  updateApprovalStatus,
  saveReceipt,
  getPaidPaymentsByCustomerId,
  getReceiptByPaymentId,
};
