import { ITasks } from "@/domain/entities";
import { Tasks } from "../models/Tasks";
import { Types } from "mongoose";

export const deleteTask = async (taskId: string): Promise<any | null> => {
  try {
    const task = await Tasks.findByIdAndDelete(new Types.ObjectId(taskId));

    return task;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
