const conn = require("../config/db.config"); // Assume you're using a db connection with promises

const { sendEmail, sendSMS } = require("./notification.service"); // adjust path if needed

// Optional: Phone formatting helper (Ethiopia default)
const formatToE164 = (phone, countryCode = "251") => {
  let cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = cleaned.substring(1);
  }
  return `+${countryCode}${cleaned}`;
};

async function createOrder(orderData) {
  const {
    customer_id,
    vehicle_id,
    employee_id,
    total_price,
    order_date = new Date().toISOString().slice(0, 19).replace("T", " "),
    order_status = "Pending",
    services = [],
    slot_time,
  } = orderData;

  if (!customer_id || !vehicle_id || !total_price || services.length === 0) {
    throw new Error(
      "Missing required fields: customer_id, vehicle_id, total_price, or services"
    );
  }

  // Step 1: Insert into orders table (✅ added slot_time)
  const orderResult = await conn.query(
    `INSERT INTO orders 
     (customer_id, vehicle_id, employee_id, order_date, total_price, slot_time) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [customer_id, vehicle_id, employee_id, order_date, total_price, slot_time]
  );

  const order_id = orderResult.insertId;

  // Step 2: Insert into order_status table
  await conn.query(
    `INSERT INTO order_status (order_id, status) VALUES (?, ?)`,
    [order_id, order_status]
  );

  // Step 3: Insert each service into order_services
  for (const { service_type_id } of services) {
    await conn.query(
      `INSERT INTO order_services 
       (order_id, service_type_id, service_status) 
       VALUES (?, ?, ?)`,
      [order_id, service_type_id, "Pending"]
    );
  }

  // Step 4: Fetch customer email and phone
  const [customerData] = await conn.query(
    "SELECT email, phone FROM customer_identifier WHERE customer_id = ?",
    [customer_id]
  );

  const customerEmail = customerData?.email;
  const customerPhone = customerData?.phone;

  if (!customerEmail) {
    throw new Error("Customer email not found");
  }

  if (!customerPhone) {
    throw new Error("Customer phone number not found");
  }

  // Step 5: Prepare notification
  const message =
    `📦 Your order has been placed!\nOrder ID: ${order_id}\nTotal: ${total_price}\nStatus: ${order_status}` +
    (slot_time ? `\nSlot Time: ${slot_time}` : "");
  const subject = "Order Confirmation";

  // Step 6: Send email
  await sendEmail([customerEmail], message, subject);

  // Step 7: Send SMS
  const formattedPhone = formatToE164(customerPhone);
  await sendSMS(formattedPhone, message);

  return { order_id, status: order_status };
}

const getAllOrders = async () => {
  const orders = await conn.query(`
    SELECT o.*, c.first_name, c.last_name, os.status, os.updated_at
    FROM orders o
    JOIN customer_info c ON o.customer_id = c.customer_id
    LEFT JOIN order_status os ON o.order_id = os.order_id
    ORDER BY o.order_id DESC
  `);

  return orders;
};

const getOrderById = async (id) => {
  try {
    // Get basic order info
    const [order] = await conn.query(
      `SELECT o.*, os.status, os.updated_at
       FROM orders o
       LEFT JOIN order_status os ON o.order_id = os.order_id
       WHERE o.order_id = ?`,
      [id]
    );

    if (!order) return null;

    // Get detailed service info
    const [services] = await conn.query(
      `SELECT 
         ost.service_type_id, 
         ost.service_status,
         st.service_name
       FROM order_services ost
       LEFT JOIN service_types st ON ost.service_type_id = st.service_type_id
       WHERE ost.order_id = ?`,
      [id]
    );

    order.services = services || [];
    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

const updateOrderStatus = async (orderId, newStatus) => {
  await conn.query(
    `UPDATE order_status SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE order_id = ?`,
    [newStatus, orderId]
  );
  return { message: "Status updated", order_id: orderId };
};

const getOrdersByCustomerId = async (customerId) => {
  const rows = await conn.query(
    `SELECT 
      o.order_id,
      o.customer_id,
      o.employee_id,
      o.order_date,
      o.total_price,
      os.status,
      os.updated_at
     FROM orders o
     LEFT JOIN order_status os ON o.order_id = os.order_id
     WHERE o.customer_id = ?
     ORDER BY o.order_date DESC`,
    [customerId]
  );
  return rows;
};

const getServicesByOrderId = async (orderId) => {
  const query = `
    SELECT 
      os.order_service_id,
      os.order_id,
      st.service_type_id,
      st.service_name,
      st.description,
      sp.price,
      vt.vehicle_type_name
    FROM 
      order_services os
    JOIN 
      service_types st ON os.service_type_id = st.service_type_id
    LEFT JOIN 
      service_pricing sp ON st.service_type_id = sp.service_type_id
    LEFT JOIN 
      vehicle_types vt ON sp.vehicle_type_id = vt.vehicle_type_id
    WHERE 
      os.order_id = ?
  `;

  const rows = await conn.query(query, [orderId]);
  return rows;
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByCustomerId,
  getServicesByOrderId,
};
