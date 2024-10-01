import { Document, Schema, model } from "mongoose";

interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  name: String;
  email: String;
  password: String;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("users", userSchema);
