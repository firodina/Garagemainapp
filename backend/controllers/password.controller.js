const passwordService = require("../services/password.service");
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: "Email is required",
    });
  }

  try {
    const result = await passwordService.handleForgotPassword(email);
    res.status(200).json({
      success: true,
      message: result.message || "Password reset link sent to email",
      data: result, // Include the full result object
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(400).json({
      success: false,
      error: err.message || "Failed to process password reset request",
      message: err.message, // Ensure message is included
    });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;


  if (!token || !newPassword) {
    return res.status(400).json({
      success: false,
      error: "Token and new password are required",
    });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      error: "Password must be at least 8 characters long",
    });
  }

  try {
    const result = await passwordService.handleResetPassword(
      token,
      newPassword
    );
  
    res.status(200).json({
      success: true,
      message: result.message || "Password has been reset successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message || "Failed to reset password",
    });
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
};
