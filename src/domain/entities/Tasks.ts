import { Document, ObjectId } from "mongoose";

export interface ITasks {
  _id: ObjectId;
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  completed: boolean;
  priority: string;
  user: ObjectId;
}
export interface ICreateTask {
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  status: string;
  user: string;
}
