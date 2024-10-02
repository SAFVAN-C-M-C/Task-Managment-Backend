import ErrorResponse from "@/_lib/error/errorResponse";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const getTaskByIdController = (dependencies: IDependencies) => {
  const {
    useCases: { getTaskByIdUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //checking is there a authorized user
      const user=req.user
      if (!user || !user._id) {
        throw new Error("Authentication required: No user provided.");
      }
      const {taskId}=req.params;
      if(!taskId){
        return next(ErrorResponse.notFound("Task not found"))
      }


      const task = await getTaskByIdUseCase(dependencies).execute(
        String(taskId)
      );
      if(!task){
        return next(ErrorResponse.notFound("Task not found"))
      }
      
      
      if(String(task.user) !== String(user._id)){
        return next(ErrorResponse.unauthorized("Not authorized!"))
      }

      res.status(200).json({
        success: true,
        data: task,
        message: "Task Fetched",
      });
    } catch (error: any) {
      next(error);
    }
  };
};
