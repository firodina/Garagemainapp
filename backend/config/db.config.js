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
// create the connection pool
const pool = mysql.createPool(dbconfig);
// function to get a connection from the pool
async function query(sql, params) {
	const [rows, fields] = await pool.execute(sql, params);
	return rows;
}

module.exports = {
	query,
};

