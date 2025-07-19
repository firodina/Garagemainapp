const reportService = require("../services/report.service");

const getPaymentReport = async (req, res) => {
  try {
    const report = await reportService.getPaymentReport();
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    console.error("Error generating payment report:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getReport = async (req, res) => {
  try {
    const { type } = req.query;

    if (!["daily", "weekly", "monthly"].includes(type)) {
      return res.status(400).json({ error: "Invalid report type" });
    }

    const reportData = await reportService.getOrdersReport(type);
    res.status(200).json(reportData);
  } catch (err) {
    console.error("Error fetching report:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getPaymentReport,
  getReport,
};
