//import the msql2 module promise wrapper
const mysql = require("mysql2/promise");
// create the connection to database
// create the connection pool
const dbconfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
};
const pool = mysql.createPool(dbconfig);
// Function to check the database connection
async function checkDatabaseConnection() {
	try {
	  const connection = await pool.getConnection(); // Get a connection from the pool
	  console.log("✅ Database connected successfully!");
	  connection.release(); // Release the connection back to the pool
	} catch (error) {
	  console.error("❌ Database connection failed:", error);
	  process.exit(1); // Exit the process if the connection fails
	}
  }
  
  // Prepare a function that will execute SQL queries asynchronously
  async function query(sql, params) {
	const [rows] = await pool.execute(sql, params);
	return rows;
  }
  
  // Run the connection test when this file is imported
  checkDatabaseConnection();
  
  // Export the query function and pool for use in the application
  module.exports = { query, pool };
  