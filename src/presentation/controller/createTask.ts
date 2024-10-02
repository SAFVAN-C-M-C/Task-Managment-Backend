import { comparePassword, hashPassword } from "@/_lib/bcrypt";
import ErrorResponse from "@/_lib/error/errorResponse";
import { generateAccessToken } from "@/_lib/jwt";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { getSocketId, io } from "@/infrastructure/socket";
import { Request, Response, NextFunction } from "express";

export const createTaskController = (dependencies: IDependencies) => {
  const {
    useCases: { createTaskUseCase,findUserByEmailUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //checking is there a authorized user
      if (!req.user) {
        throw new Error("Authentication required: No user provided.");
      }
      const { title, description, dueDate, priority, status } = req.body;
      if (!title || title.trim() === "") {
        return next(ErrorResponse.badRequest("Title is required!"));
      }

      if (!description || description.trim() === "") {
        return next(ErrorResponse.badRequest("Description is required!"));
      }
      const userData=await findUserByEmailUseCase(dependencies).execute(req.user.email);
      if(!userData){
        next(ErrorResponse.unauthorized("User not authorized,Please try again!"));
      }
      const task=await createTaskUseCase(dependencies).execute({description,dueDate,priority,status,title,user:String(userData?._id)});
      const socketId=getSocketId(String(req.user._id))
      if(socketId){
        io.to(socketId).emit("NewTaskCreated",task)
      }
      res.status(201).json({
        success: true,
        data: task,
        message: "Task created",
      });
    } catch (error: any) {
      next(error);
    }
  };
};
