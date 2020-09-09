const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
var sanitize = require("sanitize-filename");
const multerS3 = require('multer-s3');
const { s3 } = require('../services/aws');
const { AWS_BUCKET } = require('./Constants');


function getUniqueFilename(originalName){
    // return sanitize(originalName)
    return Date.now() + path.extname(originalName)
}

module.exports = {
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET,
    acl: 'public-read',
    cacheControl: 'max-age=31536000',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
        cb(null, getUniqueFilename(file.originalname)); //use Date.now() for unique file keys
    }
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
