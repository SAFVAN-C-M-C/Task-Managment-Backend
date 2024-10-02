import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const getUserDataController = (dependencies: IDependencies) => {
  const {
    useCases: { findUserByEmailUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //checking is there a authorized user
      if (!req.user) {
        throw new Error("Authentication required: No user provided.");
      }

      const user = await findUserByEmailUseCase(dependencies).execute(
        req.user.email
      );
      if (!user) {
        throw new Error("User not found!");
      }

      res.status(200).json({
        success: true,
        data: user,
        message: "User Fetched",
      });
    } catch (error: any) {
      next(error);
    }
  };
};
