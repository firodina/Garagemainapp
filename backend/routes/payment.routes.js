const express = require("express");
const bodyParser = require("body-parser"); // ✅ Required for raw body
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

// Middleware only for Chapa webhook to capture rawBody
const captureRawBody = bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString(); // ✅ Capture raw body for signature verification
  },
});

// Initialize payment
router.post("/api/payments/initialize", paymentController.initializePayment);

// Verify payment (callback handler)
router.get("/api/payments/verify/:tx_ref", paymentController.verifyPayment);

// Get all payments (admin)
router.get("/api/admin/payments", paymentController.getAllPayments);

// ✅ Apply raw body middleware ONLY to this route
router.post(
  "/api/payments/webhook",
  captureRawBody,
  paymentController.handleWebhook
);
// Update approval status (admin only)
router.put("/api/payments/:id/update-status", paymentController.updateApprovalStatus);

// Route to add receipt after payment success
router.post("/api/payments/add-receipt", paymentController.addReceipt);

router.get(
  "/api/payments/paid",
  paymentController.getPaidPaymentsByCustomer
);

// Route to get receipt by paymentId
router.get(
  "/api/payments/receipt/:paymentId",
  paymentController.getReceiptByPaymentId
);

module.exports = router;
