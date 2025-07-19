const { sendEmail, sendSMS } = require("./notification.service");

async function notifyAdminNewCustomer(customer) {
  const subject = "New Customer Awaiting Approval";
  const message = `
Hello Admin,

A new customer has registered and is awaiting your approval:

👤 Name: ${customer.first_name} ${customer.last_name}
📧 Email: ${customer.email}
📞 Phone: ${customer.phone}
🏠 Address: ${customer.address || "N/A"}

Please log in to the admin panel to review and approve the account.

Thank you,
ORBIS System
`.trim();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPhone = process.env.ADMIN_PHONE;

  if (adminEmail) {
    await sendEmail(adminEmail, message, subject);
  }

  if (adminPhone) {
    await sendSMS(adminPhone, message);
  }
}

module.exports = { notifyAdminNewCustomer };
