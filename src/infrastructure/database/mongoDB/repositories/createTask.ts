import { User } from "../models";
import { ICreateTask, IRegisterUser, ITasks, IUser } from "@/domain/entities";
import { Tasks } from "../models/Tasks";

export const createTask = async (
  data: ICreateTask
): Promise<ITasks | null> => {
  try {
    const task = new Tasks(data);
    await task.save()
    return task;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Task Creation failed: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred during Task creation");
    }
  }
};
