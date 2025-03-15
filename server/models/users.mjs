import mongoose from "mongoose";
import crypto from "crypto";

const schemaOptions = {
  toJSON: { getters: true, virtuals: true },
  toObject: { getters: true, virtuals: true },
  timestamps: true,
};

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    referral_code: {
      type: String,
      unique: true,
      default: () => crypto.randomBytes(8).toString("hex"),
    },
    stripe_id: {
      type: String,
    },
    is_admin: { type: Boolean },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  schemaOptions
);

userSchema.virtual("full_name").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

const User = mongoose.model("User", userSchema);

export default User;
