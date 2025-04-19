const conn = require("../config/db.config"); // Assume you're using a db connection with promises

const createOrder = async (orderData) => {
  const { customer_id, employee_id, total_price } = orderData;

  const [orderResult] = await conn.execute(
    "INSERT INTO orders (customer_id, employee_id, total_price) VALUES (?, ?, ?)",
    [customer_id, employee_id || null, total_price]
  );

  const order_id = orderResult.insertId;

  // Add default order status
  await conn.execute(
    "INSERT INTO order_status (order_id, status) VALUES (?, ?)",
    [order_id, "Pending"]
  );

  return { order_id, message: "Order created successfully" };
};

const getAllOrders = async () => {
  const [orders] = await conn.execute(`
    SELECT o.*, c.first_name, c.last_name, os.status, os.updated_at
    FROM orders o
    JOIN customer_info c ON o.customer_id = c.customer_id
    LEFT JOIN order_status os ON o.order_id = os.order_id
    ORDER BY o.order_id DESC
  `);
  return orders;
};

const getOrderById = async (id) => {
  const [order] = await conn.execute(
    `SELECT o.*, os.status, os.updated_at
     FROM orders o
     LEFT JOIN order_status os ON o.order_id = os.order_id
     WHERE o.order_id = ?`,
    [id]
  );
  return order[0];
};

const updateOrderStatus = async (orderId, newStatus) => {
  await conn.execute(
    `UPDATE order_status SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE order_id = ?`,
    [newStatus, orderId]
  );
  return { message: "Status updated", order_id: orderId };
};

const getOrdersByCustomerId = async (customerId) => {
  const [rows] = await conn.query(
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


module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getOrdersByCustomerId,
};
