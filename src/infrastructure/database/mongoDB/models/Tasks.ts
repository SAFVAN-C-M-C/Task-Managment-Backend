import { Document, Schema, model } from "mongoose";
interface ITasks extends Document {
    _id: Schema.Types.ObjectId;
    title: string;
    description: string;
    dueDate: Date;
    status: string;
    completed: boolean;
    priority: string;
    user: Schema.Types.ObjectId;
  }
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      unique: true,
    },

    description: {
      type: String,
      default: "No description",
    },

    dueDate: {
      type: Date,
      default: Date.now(),
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    completed: {
      type: Boolean,
      default: false,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);


export const Tasks = model<ITasks>("task", taskSchema);


