import { IGetTasks, IGetTasksResponse, ITasks } from "@/domain/entities";
import { Tasks } from "../models/Tasks";
import { Types } from "mongoose";

export const getTasks = async (data: IGetTasks): Promise<IGetTasksResponse | null> => {
  try {
    const { limit, page, userId, filter } = data;
    const skip = (page - 1) * limit;
    const filterObj: any = {
      user: new Types.ObjectId(userId),
    };
    if (typeof filter === "string") {
      if(filter==="completed" || filter=="in-progress" || filter ==="pending"){
        filterObj.status=filter
      }
    }
    const tasks = await Tasks.find(filterObj)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);

    if (!tasks) {
      return null;
    }
    const total = await Tasks.countDocuments(filterObj);
    const completed=await Tasks.countDocuments({user: new Types.ObjectId(userId),status:"completed"});
    const inProgress=await Tasks.countDocuments({user: new Types.ObjectId(userId),status:"in-progress"});
    const pending=await Tasks.countDocuments({user: new Types.ObjectId(userId),status:"pending"});
    return {tasks,total,completed,inProgress,pending} ;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
