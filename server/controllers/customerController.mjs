import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "api_key_placeholder"
);

const createCustomer = async function (req, res, next) {
  try {
    const { name, email, phone, address } = req.body;
    const customer = await stripe.customers.create({
      name,
      email,
      phone,
      address,
    });

    console.log(customer);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

export default { createCustomer };
