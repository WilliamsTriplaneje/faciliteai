const axios = require('axios').default
const { IUGU_KEY } = require('../../../config/Constants')

// const username = 'Authorization: Basic' +IUGU_KEY + ':'
// let buff = new Buffer(username);
// let base64 = buff.toString('base64');

const API_VERSION = 'v1'
const api = axios.create({
    baseURL: `https://api.iugu.com/${API_VERSION}`,
    auth: {
        username: IUGU_KEY,
        password: ''
    }
});

module.exports = api
