import { ITasks } from "@/domain/entities";
import { Tasks } from "../models/Tasks";
import { Types } from "mongoose";

export const getTaskById = async (taskId: string): Promise<ITasks | null> => {
  try {
    const task = await Tasks.findById(new Types.ObjectId(taskId));
    if (!task) {
      return null;
    }

    return task as ITasks;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
