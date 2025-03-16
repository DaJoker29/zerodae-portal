import mongoose from "mongoose";
import crypto from "crypto";

const schemaOptions = {
  toJSON: { getters: true, virtuals: true },
  toObject: { getters: true, virtuals: true },
  timestamps: true,
};

const userSchema = new mongoose.Schema(
  {
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    referralCode: {
      type: String,
      unique: true,
      default: () => crypto.randomBytes(8).toString("hex"),
    },
    stripe_id: {
      type: String,
    },
    isAdmin: { type: Boolean },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  schemaOptions
);

userSchema.virtual("name.full").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

const User = mongoose.model("User", userSchema);

export default User;
