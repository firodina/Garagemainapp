const db = require("../config/db.config"); 

const getPaymentReport = async () => {
  const query = `
  SELECT 
    p.payment_id,
    p.amount,
    p.tx_ref,
    p.chapa_status,
    p.approval_status,
    p.payment_date,
    c.first_name,
    c.last_name,
    ci.email,
    o.order_id,
    o.total_price,
    pm.method_name
  FROM payments p
  JOIN orders o ON p.order_id = o.order_id
  JOIN customer_identifier ci ON o.customer_id = ci.customer_id
  JOIN customer_info c ON ci.customer_id = c.customer_id
  LEFT JOIN payment_method pm ON p.payment_id = pm.payment_id
  ORDER BY p.payment_date DESC
`;


  const rows = await db.query(query);
  return rows;
};

const getOrdersReport = async (type) => {
  let dateCondition = "";

  if (type === "daily") {
    dateCondition = "DATE(order_date) = CURDATE()";
  } else if (type === "weekly") {
    dateCondition = "YEARWEEK(order_date, 1) = YEARWEEK(CURDATE(), 1)";
  } else if (type === "monthly") {
    dateCondition =
      "MONTH(order_date) = MONTH(CURDATE()) AND YEAR(order_date) = YEAR(CURDATE())";
  }

  const query = `
    SELECT 
      o.order_id,
      o.customer_id,
      o.vehicle_id,
      o.employee_id,
      o.order_date,
      o.total_price,
      s.status,
      s.updated_at AS status_updated_at
    FROM orders o
    LEFT JOIN order_status s ON o.order_id = s.order_id
    WHERE ${dateCondition}
    ORDER BY o.order_date DESC
  `;

  const rows = await db.query(query);
  return rows;
};

module.exports = {
  getPaymentReport,
  getOrdersReport,
};
