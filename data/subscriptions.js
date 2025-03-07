const subscriptions = [
  {
    id: "ABCDE12345",
    owner: "FGHIJ67890",
    status: "active",
    plan: "Essential Hosting",
    domain: "example.org",
    altDomains: [
      {
        domain: "example.com",
        price: 0,
      },
      {
        domain: "example.net",
        price: 12,
      },
    ],
    addOns: [
      { name: "Google Workspaces", price: 60 },
      { name: "SSL Protection", price: 0 },
    ],
    createdAt: "2021-01-01T00:00:00Z",
    updatedAt: "2021-01-01T00:00:00Z",
    renewalDate: "2022-01-01T00:00:00Z",
    autoRenew: true,
    price: 300,
    billingCycle: "annual",
  },
  {
    id: "KLMNO12345",
    owner: "PQRST56789",
    status: "active",
    plan: "Complete Web Management",
    domain: "example.com",
    altDomains: ["example.org", "example.net"],
    addOns: ["email", "ssl"],
    createdAt: "2021-01-01T00:00:00Z",
    updatedAt: "2021-01-01T00:00:00Z",
    renewalDate: "2022-01-01T00:00:00Z",
    autoRenew: false,
    price: 150,
    billingCycle: "month",
  },
];

export default subscriptions;
