const AWS = require('aws-sdk');
const { AWS_SECRET, AWS_ID } = require('../config/Constants');

const s3 = new AWS.S3({
    accessKeyId: AWS_ID,
    secretAccessKey: AWS_SECRET,
});

module.exports = {
    s3
}