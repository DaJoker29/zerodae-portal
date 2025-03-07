import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "api_key_placeholder"
);

const createSubscription = async function (req, res, next) {
  try {
    const {
      customer,
      selectedPlan: price,
      primary_domain,
      alternate_domains,
      alternate_domain_id,
    } = req.body;

    const data = {
      customer,
      collection_method: "send_invoice",
      days_until_due: 14,
      items: [
        {
          price,
          metadata: {
            primary_domain,
          },
        },
      ],
    };

    if (alternate_domains.length > 0) {
      data.items.push({
        price: alternate_domain_id,
        quantity: alternate_domains.length,
        metadata: {
          alternateDomains: alternate_domains.join(", "),
        },
      });
    }

    const response = await stripe.subscriptions.create(data);
    console.log(response);
    // REMOVE ^^
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

const listSubscriptionTypes = async function (req, res, next) {
  try {
    const { data } = await stripe.products.list({
      expand: ["data.default_price"],
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export default { listSubscriptionTypes, createSubscription };
