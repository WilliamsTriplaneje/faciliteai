const { STRIPE_SECRET } = require('../config/Constants')
const stripe = require("stripe")(STRIPE_SECRET);

module.exports = stripe