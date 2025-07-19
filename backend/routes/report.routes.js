const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");

// Route to get payment report
router.get("/api/reports/payment", reportController.getPaymentReport);

router.get("/api/reports", reportController.getReport);

module.exports = router;
