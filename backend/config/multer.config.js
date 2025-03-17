const multer = require("multer");
const path = require("path");

// Define storage strategy
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save files
  },
  filename: (req, file, cb) => {
    // Save file with timestamp and original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filter for image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only image files."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
