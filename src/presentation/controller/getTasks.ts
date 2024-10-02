import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const getTasksController = (dependencies: IDependencies) => {
  const {
    useCases: { getTasksUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //checking is there a authorized user
      if (!req.user || !req.user._id) {
        throw new Error("Authentication required: No user provided.");
      }
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 6;
      let {filter}=req.query
      if(typeof filter!=="string"){
        filter="all"
      }
      const tasks = await getTasksUseCase(dependencies).execute(
        {userId:String(req.user._id),limit,page,filter}
      );

      res.status(200).json({
        success: true,
        data: tasks?.tasks?tasks.tasks:[],
        message: "Tasks Fetched",
        totalPage:Math.ceil(tasks?.total! / limit),
        completed:tasks?.completed,
        inProgress:tasks?.inProgress,
        pending:tasks?.pending
      });
    } catch (error: any) {
      next(error);
    }
  };
};
