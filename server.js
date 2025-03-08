import express from "express";
import cors from "cors";
import routes from "./server/routes/index.mjs";
import logger from "./server/middleware/logger.mjs";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", logger);

// App Routes
app.get("/api/test", (req, res) => {
  res.send({ message: "API is functional." });
});

app.use("/api/customers", routes.customers);
app.use("/api/subscriptions", routes.subscriptions);
app.use("/api/auth", routes.auth);

// Error Handling Routes
app.use((req, res, next) => {
  res.status(404).send("Can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Misadventure has occurred!");
});

// Start up Server
app.listen(PORT, () => {
  console.log("\n\nStarting ZeroDae Portal Server...");
  console.group("====================\n");
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("Hostname (Default: localhost):", HOST);
  console.log("Port (Default: 3000):", PORT);
  console.groupEnd();
  console.log("\n====================");
  console.group();
  console.log("\nLISTENING...\n");
  console.groupEnd();
});
