import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import routes from "./server/routes/index.mjs";
import logger from "./server/middleware/logger.mjs";
import { notFound, errorHandler } from "./server/middleware/error.mjs";
import { initAdmin } from "./server/services/admin.mjs";
import { initDB } from "./server/services/db.mjs";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const app = express();

const mongoOptions = {
  mongoUrl: process.env.MONGO_URI,
};

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create(mongoOptions),
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
  },
};

// Middleware
app.use(cors());
app.use(session(sessionOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// App Routes
app.get("/api/test", (req, res) => {
  res.send({ message: "API is functional." });
});

app.use("/api/auth", routes.auth);
app.use("/api/customers", routes.customers);
app.use("/api/subscriptions", routes.subscriptions);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await initDB();
    await initAdmin();

    app.listen(PORT, startupLog);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();

function startupLog() {
  console.group("\nStarting ZeroDae Client Connect...");
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`Hostname (Default: localhost): ${HOST}`);
  console.log(`Port (Default: 3000): ${PORT}`);
  console.log(`Database: ${process.env.MONGO_URI}`);
  console.log("\nLISTENING...\n");
  console.groupEnd();
}
