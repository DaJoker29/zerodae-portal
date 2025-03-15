import mongoose from "mongoose";

const initDB = async () => {
  console.group("\nInitializing database...");
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection;

    console.log(`Connected to database <${db.name}> on ${db.host}.`);

    db.on("error", (err) => {
      console.error(`Database error: ${err}`);
    });

    process.on("SIGINT", () => {
      db.close(() => {
        console.log(
          "Mongoose connection is disconnected due to app termination."
        );
        process.exit(0);
      });
    });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to connect to MongoDB.");
  }
  console.groupEnd();
};

export { initDB };
