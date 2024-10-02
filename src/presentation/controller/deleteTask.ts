import ErrorResponse from "@/_lib/error/errorResponse";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { getSocketId, io } from "@/infrastructure/socket";
import { Request, Response, NextFunction } from "express";

export const deleteTaskController = (dependencies: IDependencies) => {
  const {
    useCases: { getTaskByIdUseCase, deleteTaskUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //checking is there a authorized user
      const user = req.user?._id;
      if (!user) {
        throw new Error("Authentication required: No user provided.");
      }
      const { taskId } = req.params;
      if (!taskId) {
        return next(ErrorResponse.notFound("Task not found"));
      }

      const task = await getTaskByIdUseCase(dependencies).execute(
        String(taskId)
      );
      if (!task) {
        return next(ErrorResponse.notFound("Task not found"));
      }
      if (String(task.user) !== String(user)) {
        return next(ErrorResponse.unauthorized("Not authorized!"));
      }
      const deletetedTask = await deleteTaskUseCase(dependencies).execute(
        taskId
      );
      const socketId=getSocketId(String(user))
      if(socketId){
        io.to(socketId).emit("TaskDeleted",task)
      }
      res.status(200).json({
        success: true,
        message: "Task Deleted",
      });
    } catch (error: any) {
      next(error);
    }
  };
};
