import mongoose from "mongoose";
import { User } from "../models/index.mjs";

const initAdmin = async () => {
  console.group("\nInitializing admin account...");
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("Not connected to MongoDB", mongoose.connection.readyState);
    }

    const admin = await User.findOne({ email: process.env.ADMIN_EMAIL });

    if (admin) {
      console.log(`Previous admin user(s) found...Purging.`);
      await purgeAdmin();
    }

    await User.create({
      name: {
        first: process.env.ADMIN_FIRST,
        last: process.env.ADMIN_LAST,
      },
      email: process.env.ADMIN_EMAIL,
      isAdmin: true,
    });
    console.log(
      "Creating new admin user...Check environment variables for details."
    );
  } catch (err) {
    console.error(err);
  }
  console.groupEnd();
};

async function purgeAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({ isAdmin: true });
  } catch (err) {
    console.error(err);
  }
}

export { initAdmin };
