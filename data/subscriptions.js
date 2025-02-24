const subscriptions = [
  {
    id: "ABCDE12345",
    owner: "FGHIJ67890",
    status: "active",
    plan: "hosting",
    domain: "example.org",
    alt_domains: ["example.com", "example.net"],
    addOns: ["email", "ssl"],
    created_at: "2021-01-01T00:00:00Z",
    updated_at: "2021-01-01T00:00:00Z",
    renewal_date: "2022-01-01T00:00:00Z",
    autoRenew: true,
    price: 125,
    billing_cycle: "yearly",
  },
  {
    id: "KLMNO12345",
    owner: "PQRST56789",
    status: "active",
    plan: "smb",
    domain: "example.com",
    alt_domains: ["example.org", "example.net"],
    addOns: ["email", "ssl"],
    created_at: "2021-01-01T00:00:00Z",
    updated_at: "2021-01-01T00:00:00Z",
    renewal_date: "2022-01-01T00:00:00Z",
    autoRenew: false,
    price: 125,
    billing_cycle: "yearly",
  },
];

export default subscriptions;
