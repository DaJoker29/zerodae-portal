import express from "express";
import cors from "cors";
import routes from "./server/routes/index.mjs";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", (req, res, next) => {
  console.log(`${req.method} request on ${req.path}`);
  next();
});

app.get("/api", (req, res) => {
  res.status(200).json({ message: "Hey!" });
});

app.use("/api/customers", routes.customers);
app.use("/api/subscriptions", routes.subscriptions);

// Error Handling Routes
app.use((req, res, next) => {
  res.status(404).send("Can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Misadventure has occurred!");
});

app.listen(PORT, () => {
  console.log("== Hostname:", HOST);
  console.log("== Port:", PORT);
  console.log("\nLISTENING...\n");
});
