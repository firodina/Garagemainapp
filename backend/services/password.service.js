const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sendEmail } = require("./notification.service");
const db = require("../config/db.config");
require("dotenv").config();



const handleForgotPassword = async (email) => {
 

  // Fetch employee details
  const [employees] = await db.query(
    `SELECT e.employee_id, ei.employee_first_name 
     FROM employee e 
     JOIN employee_info ei ON e.employee_id = ei.employee_id 
     WHERE e.employee_email = ? AND e.active_employee = TRUE`,
    [email]
  );

  if (employees.length === 0) {
    throw new Error(
      "No active employee account found with that email address."
    );
  }

  const employee = employees; // Fix: get first element, not the whole array

  // Generate JWT token
  const payload = {
    id: employee.employee_id,
    email,
    userType: "employee",
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "15m" });

  const resetLink = `${process.env.FRONTEND_URL}/employee/reset-password/${token}`;

  // Plain text message only, no HTML
  const message =
    `Hello ${employee.employee_first_name},\n\n` +
    `You requested a password reset. Please use the link below to reset your password:\n\n` +
    `${resetLink}\n\n` +
    `This link will expire in 15 minutes.\n\n` +
    `If you did not request this, please ignore this email or contact support.\n\n` +
    `Best regards,\nORBIS Trading and Services Center`;

  // Use the current sendEmail format
  await sendEmail(email, message, "Employee Password Reset Request");

  return {
    success: true,
    message: "Password reset link sent to your employee email.",
  };
};


const handleResetPassword = async (token, newPassword) => {
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Verify this is an employee token
    if (decoded.userType !== "employee") {
      throw new Error("Invalid token type for employee password reset.");
    }
  } catch (err) {
    console.error("Token verification failed:", err);
    throw new Error("Invalid or expired token.");
  }

  // Validate password strength
  if (newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update employee password
 
  const result = await db.query(
    "UPDATE employee_pass SET employee_password_hashed = ? WHERE employee_id = ?",
    [hashedPassword, decoded.id]
  );

 
  if (result.affectedRows === 0) {
    throw new Error("Employee password update failed. Account may not exist.");
  }

  return {
    success: true,
    message: "Employee password has been successfully reset.",
  };
};

module.exports = {
  handleForgotPassword,
  handleResetPassword,
};