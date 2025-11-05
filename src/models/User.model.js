import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 80,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 120,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      maxlength: 255
    },
    verified_email: {
      type: Boolean,
      required: true,
      default: false
    },
    active: {
      type: Boolean,
      required: true,
      default: true
    },
    avatarUrl: {
      type: String,
      maxlength: 255
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false
  }
);

const User = mongoose.model("User", userSchema);

export default User;
