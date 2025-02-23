const plans = {
  hosting: {
    name: "Solo Hosting Plan",
    price: 125,
    billing_cycle: "yearly",
    features: [
      "5GB Storage",
      "10GB Bandwidth",
      "5 Email Accounts",
      "Free SSL Certificate",
    ],
  },
  smb: {
    name: "Small Business Plan",
    price: 250,
    billing_cycle: "monthly",
    features: [
      "10GB Storage",
      "20GB Bandwidth",
      "10 Email Accounts",
      "Free SSL Certificate",
    ],
  },
};

export default plans;
