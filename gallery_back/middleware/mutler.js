const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDirectory = "./public/uploads/";
    fs.mkdirSync(uploadsDirectory, { recursive: true });
    cb(null, uploadsDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
