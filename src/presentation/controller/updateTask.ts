import { comparePassword, hashPassword } from "@/_lib/bcrypt";
import ErrorResponse from "@/_lib/error/errorResponse";
import { generateAccessToken } from "@/_lib/jwt";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { IUpdateTask } from "@/domain/entities";
import { getSocketId, io } from "@/infrastructure/socket";
import { Request, Response, NextFunction } from "express";

export const updateTaskController = (dependencies: IDependencies) => {
  const {
    useCases: { updateTaskUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //checking is there a authorized user
      const userId = req.user?._id;
      if (!userId) {
        throw new Error("Authentication required: No user provided.");
      }
      const { taskId } = req.params;
      const { title, description, dueDate, priority, status, completed } =
        req.body;

      if (!taskId) {
        return next(ErrorResponse.notFound("Task not found"));
      }
      const data: IUpdateTask = {
        user: String(userId),
        taskId,
        completed,
        description,
        dueDate,
        priority,
        status,
        title,
      };
      const task = await updateTaskUseCase(dependencies).execute(data);
      if(task==="Task Not found" || !task){
        return next(ErrorResponse.notFound("Task not found"))
      }
      if(task==="Not authorized"){
        return next(ErrorResponse.unauthorized("Not authorized!"))
      }
      if(typeof task ==="string"){
        return next(ErrorResponse.notFound("Task not found"))
      }
      const socketId=getSocketId(String(userId))
      if(socketId){
        io.to(socketId).emit("TaskUpdated",task)
      }
      res.status(200).json({
        success: true,
        data: task.task,
        message: "Task updated",
      });
    } catch (error: any) {
      next(error);
    }
  };
};
