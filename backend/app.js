const express = require('express');
require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT || 3000;
const router = require("./routes"); // Import the router correctly

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Use the router (Ensure it's a middleware function)
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
