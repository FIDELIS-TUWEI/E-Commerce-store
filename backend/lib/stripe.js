const Stripe  = require("stripe");
const config = require("../utils/config");

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

module.exports = stripe;