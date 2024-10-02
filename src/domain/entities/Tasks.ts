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
export interface IUpdateTask{
  taskId:string;
  title?: string;
  description?: string;
  dueDate?: Date;
  priority?: string;
  status?: string;
  completed?:boolean
  user: string;
}
export interface IUpdateTaskRes{
task:ITasks,
prevStatus:string
}
export interface IGetTasks{
  userId:string;
  page:number;
  limit:number;
  filter?:string;
}
export interface IGetTasksResponse{
  completed:number;
  inProgress:number;
  pending:number;
  total:number;
  tasks:ITasks[]
}