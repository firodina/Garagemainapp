const express = require('express');
//import dotenv module
require('dotenv').config();
//import core module
const cors = require('cors');

// Import the path module
const path = require('path');
// Import the sanitizer module
const sanitize = require('sanitize');
//set the cors options
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

const port = process.env.PORT || 3000;
//// Import the router correctly
const router = require("./routes"); 

//create the webserver
const app = express();

// Middleware Parse JSON requests
app.use(express.json()); 

// Add the express.static middleware to serve static files
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({ extended: true }));
// Add the sanitizer to the express middleware
app.use(sanitize.middleware);
// Enable CORS
// app.use(cors(corsOptions)); 

app.use(cors({corsOptions })); // Allow all origins for now (change to your frontend URL in production)


// Use the router (Ensure it's a middleware function)
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
