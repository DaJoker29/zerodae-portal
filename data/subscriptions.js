const subscriptions = [
  {
    id: "ABCDE12345",
    owner: "FGHIJ67890",
    status: "active",
    plan: {
      name: "Essential Hosting",
      monthlyPrice: 25,
    },
    domain: "example.org",
    altDomains: [
      {
        domain: "example.com",
        monthlyPrice: 0,
      },
      {
        domain: "example.net",
        monthlyPrice: 2,
      },
    ],
    addOns: [
      { name: "Google Workspaces", monthlyPrice: 8 },
      { name: "SSL Protection", monthlyPrice: 0 },
    ],
    createdAt: "2021-01-01T00:00:00Z",
    updatedAt: "2021-01-01T00:00:00Z",
    renewalDate: "2022-01-01T00:00:00Z",
    autoRenew: true,
    monthlyPrice: 300,
    billingCycle: "annual",
  },
  {
    id: "XYZ78901234",
    owner: "LMNOP12345",
    status: "active",
    plan: {
      name: "Premium Web Management",
      monthlyPrice: 150,
    },
    domain: "mywebsite.org",
    altDomains: [
      {
        domain: "mywebsite.com",
        monthlyPrice: 0,
      },
      {
        domain: "mywebsite.net",
        monthlyPrice: 3,
      },
    ],
    addOns: [
      { name: "Microsoft 365", monthlyPrice: 12 },
      { name: "Advanced SSL Protection", monthlyPrice: 5 },
    ],
    createdAt: "2022-06-15T12:30:00Z",
    updatedAt: "2023-01-10T09:45:00Z",
    renewalDate: "2024-06-15T00:00:00Z",
    autoRenew: true,
    monthlyPrice: 720,
    billingCycle: "annual",
  },
  {
    id: "ABC123DEFG",
    owner: "UVWXYZ9876",
    status: "inactive",
    plan: {
      name: "Premium Web Management",
      monthlyPrice: 150,
    },
    domain: "testsite.com",
    altDomains: [
      {
        domain: "testsite.org",
        monthlyPrice: 1,
      },
      {
        domain: "testsite.net",
        monthlyPrice: 2,
      },
    ],
    addOns: [
      { name: "Cloud Storage", monthlyPrice: 10 },
      { name: "Basic SSL Protection", monthlyPrice: 2 },
    ],
    createdAt: "2021-05-20T08:15:00Z",
    updatedAt: "2022-03-22T13:55:00Z",
    renewalDate: "2023-05-20T00:00:00Z",
    autoRenew: false,
    monthlyPrice: 510,
    billingCycle: "annual",
  },
  {
    id: "DEF456GHIJ",
    owner: "QRSTU54321",
    status: "active",
    plan: {
      name: "Essential Hosting",
      monthlyPrice: 25,
    },
    domain: "demoexample.net",
    altDomains: [
      {
        domain: "demoexample.com",
        monthlyPrice: 0,
      },
      {
        domain: "demoexample.org",
        monthlyPrice: 1,
      },
    ],
    addOns: [
      { name: "Email Hosting", monthlyPrice: 5 },
      { name: "Malware Protection", monthlyPrice: 3 },
    ],
    createdAt: "2023-02-10T11:00:00Z",
    updatedAt: "2024-02-10T11:00:00Z",
    renewalDate: "2025-02-10T00:00:00Z",
    autoRenew: true,
    monthlyPrice: 240,
    billingCycle: "annual",
  },
];

export default subscriptions;
