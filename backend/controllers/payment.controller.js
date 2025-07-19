const paymentService = require("../services/payment.service");
require("dotenv").config();
const crypto = require("crypto");
const initializePayment = async (req, res) => {
  try {
    const { order_id, amount, email, first_name, last_name } = req.body;
    const result = await paymentService.initialize(
      order_id,
      amount,
      email,
      first_name,
      last_name
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const verifyPayment = async (req, res) => {
  try {
    const { tx_ref} = req.query;

    
console.log(req.query);
    console.log(reference);
    const result = await paymentService.verify(tx_ref);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// New function to get all payments for admin dashboard


// Controller
const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentService.getAllPayments(); // Now with receipt details
    console.log("Payments fetched:", payments); // Log the fetched payments
    res.status(200).json(payments); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleWebhook = async (req, res) => {
  try {
    // Get signature sent by Chapa in the request header
    const signature = req.headers["chapa-signature"];
    console.log("Received Signature:", signature);

    const secret = process.env.CHAPA_WEBHOOK_SECRET;
    console.log("Expected Secret:", secret);

    if (!signature) {
      return res.status(400).json({ message: "No signature provided" });
    }

    // Use req.rawBody instead of JSON.stringify(req.body)
    const rawBody = req.rawBody || JSON.stringify(req.body); // fallback
    console.log("Raw Body:", rawBody);

    // Extract tx_ref and status from body
    const { tx_ref, status, reference } = req.body;
    console.log("Transaction Ref:", tx_ref, "Status:", status);

    if (!tx_ref || !status) {
      return res.status(400).json({ message: "Missing tx_ref or status" });
    }

    // Update payment status in DB
    await paymentService.updatePaymentStatus(tx_ref, status);
    // ✅ If payment is successful, store receipt
    if (status === "success" && reference) {
      const receiptContent = `https://checkout.chapa.co/checkout/test-payment-receipt/${reference}`;
      const receiptDetails = `Payment successful. Receipt link: ${receiptContent}`;

      // Save to both receipts and payment_receipts tables
      await paymentService.saveReceipt(tx_ref, receiptContent, receiptDetails); // You implement this service
    }

    return res.status(200).json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateApprovalStatus = async (req, res) => {
  const paymentId = req.params.id;
  const { approval_status } = req.body;

  try {
    const updated = await paymentService.updateApprovalStatus(
      paymentId,
      approval_status
    );

    if (!updated) {
      return res
        .status(400)
        .json({
          message: "Payment not found or chapa_status is not 'success'",
        });
    }

    res.status(200).json({ message: "Approval status updated successfully" });
  } catch (error) {
    console.error("Error updating approval status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const addReceipt = async (req, res) => {
  const { orderId, paymentId, receiptContent, receiptDetails } = req.body;

  try {
    // Call the service to add the receipt
    const receipt = await paymentService.addReceipt(
      orderId,
      paymentId,
      receiptContent,
      receiptDetails
    );

    // Respond with the result of the receipt creation
    res.status(200).json({
      message: "Receipt added successfully",
      receipt: receipt,
    });
  } catch (error) {
    console.error("Error adding receipt:", error);
    res.status(500).json({ error: "Failed to add receipt" });
  }
};
const getPaidPaymentsByCustomer = async (req, res) => {
  const { customer_id, token } = req.query; // or req.body depending on your implementation
  if (!customer_id) {
    return res.status(400).json({ message: "Missing customer_id" });
  }
  
  try {
    const paidPayments = await paymentService.getPaidPaymentsByCustomerId(
      customer_id,
      token
    );
    res.json(paidPayments);
  } catch (error) {
    console.error("Error fetching paid payments:", error); // Log the detailed error
    res
      .status(500)
      .json({ message: "Failed to fetch paid payments", error: error.message });
  }
};
const getReceiptByPaymentId = async (req, res) => {
  const { paymentId } = req.params; // Extract paymentId from the request params
  try {
    // Call the service function to fetch the receipt by paymentId
    const receipt = await paymentService.getReceiptByPaymentId(paymentId);
console.log(receipt);
    if (!receipt) {
      return res
        .status(404)
        .json({ message: "Receipt not found for this payment." });
    }

    res.json(receipt);
  } catch (error) {
    console.error("Error in getReceiptByPaymentId:", error.message);
    res.status(500).json({ message: "Server error while fetching receipt." });
  }
};

module.exports = {
  initializePayment,
  verifyPayment,
  getAllPayments,
  handleWebhook,
  updateApprovalStatus,
  addReceipt,
  getPaidPaymentsByCustomer,
  getReceiptByPaymentId,
};
