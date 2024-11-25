import mongoose from "mongoose";

const Bug = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      required: true,
      enum: ["in progress", "resolved", "closed"],
      default: "in progress",
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attachments: {
      type: [String],
      required: false,
    },
    assignees: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: false,
    },
    dueDate: {
      type: Date,
      default: Date.now() + 3 * 24 * 60 * 60 * 1000,
    },
    labels: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bug", Bug);
