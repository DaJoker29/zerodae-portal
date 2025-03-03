const createCustomer = function (req, res) {
  const { name, email } = req.body;
  console.log("Name:", name);
  console.log("Email:", email);
  res.sendStatus(200);
};

export default { createCustomer };
