const express = require("express");
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/password.controller");

const router = express.Router();

router.post("/api/forgot-password", forgotPassword);
router.post("/api/reset-password/:token", resetPassword);

module.exports = router;
