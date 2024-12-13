//import the msql2 module promise wrapper
const mysql = require("mysql2/promise");
// create the connection to database
const connection = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "password",
	database: "abe_garage",
});
module.exports = connection;