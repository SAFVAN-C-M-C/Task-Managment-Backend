
import { IUpdateTask, ITasks, IUpdateTaskRes } from "@/domain/entities";
import { Tasks } from "../models/Tasks";
import { Types } from "mongoose";

export const updateTask = async (
  data: IUpdateTask
): Promise<IUpdateTaskRes |string| null> => {
  try {
    const {taskId,user,completed,description,dueDate,priority,status,title}=data
    const task= await Tasks.findById(new Types.ObjectId(taskId));
    if(!task){
        return "Task Not found"
    }
    const prevStatus=task.status
    if(String(task.user) !== user){
        return "Not authorized"
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.completed = completed || task.completed;
    await task.save()
    return {task,prevStatus}
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Task Creation failed: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred during Task creation");
    }
  }
};
