require("dotenv/config");

const router = require("express").Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SEC);

//! stripe charge
router.post("/charge", async (req, res) => {
  const { token, currency, price } = req.body;
  const charge = await stripe.charges.create({
    amount: price,
    currency,
    source: token,
  });

  if (!charge) throw new Error("charge unsuccessful");
});

module.exports = router;