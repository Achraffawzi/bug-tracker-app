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
    },
    status: {
      type: String,
      required: true,
      enum: ["in progress", "resolved", "closed"],
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attachments: {
      type: [String],
    },
    assignees: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    dueDate: {
      type: Date,
    },
    labels: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bug", Bug);
