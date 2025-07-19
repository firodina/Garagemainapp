const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const sanitize = require("sanitize");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const router = require("./routes");

// Create the webserver
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded requests
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to serve static files
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Add the sanitizer middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: "application/json" }));

// Set CORS options
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Use the frontend URL from environment variables
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Add the sanitizer to the express middleware
app.use(sanitize.middleware);

// Use the router
app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
