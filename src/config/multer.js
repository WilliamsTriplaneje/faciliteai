const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
var sanitize = require("sanitize-filename");

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"), //FALLBACK
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        
        file.key = `${hash.toString("hex")}-${sanitize(file.originalname)}`;
        cb(null, file.key);
      });
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
};
