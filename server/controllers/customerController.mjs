import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET || "api_key_placeholder");

const createCustomer = async function (req, res, next) {
  try {
    const { name, email, phone, address } = req.body;
    const customer = await stripe.customers.create({
      name,
      email,
      phone,
      address,
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

const listAllCustomers = async function (req, res, next) {
  try {
    const { data } = await stripe.customers.list();
    data.forEach((customer) => {
      customer.stripe_url = process.env.STRIPE_CUSTOMER_REDIRECT + customer.id;
    });

    res.json(data);
  } catch (err) {
    next(err);
  }
};

export default { createCustomer, listAllCustomers };
