import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "/avatar.png",
    },
    isOrganization: {
      type: Boolean,
      default: false,
    },
    organizations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Refers to another User document (not organization)
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Refers to user members (for organizations only)
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", User);
