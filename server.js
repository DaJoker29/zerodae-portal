import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import routes from "./server/routes/index.mjs";
import logger from "./server/middleware/logger.mjs";
import { notFound, errorHandler } from "./server/middleware/error.mjs";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const app = express();

const mongoOptions = {
  mongoUrl: process.env.DB_URL,
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
    await mongoose.connect(process.env.DB_URL);
    const db = mongoose.connection;

    db.once("open", () =>
      console.log(`Database connected: ${process.env.DB_URL}`)
    );

    db.on("error", (err) => {
      console.error(`Database error: ${err}`);
    });

    app.listen(PORT, startupLog);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();

function startupLog() {
  console.log(
    `\n\nStarting ZeroDae Client Connect...\n====================\n\n\tNODE_ENV: ${process.env.NODE_ENV}\n\tHostname (Default: localhost): ${HOST}\n\tPort (Default: 3000): ${PORT}\n\tDatabase: ${process.env.DB_URL}\n\n\tLISTENING...\n\n====================`
  );
}
