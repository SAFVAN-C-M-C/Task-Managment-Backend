import { comparePassword, hashPassword } from "@/_lib/bcrypt";
import ErrorResponse from "@/_lib/error/errorResponse";
import { generateAccessToken } from "@/_lib/jwt";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction, CookieOptions } from "express";

export const logoutController = (dependencies: IDependencies) => {
  const {
    useCases: { loginUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      };
      res.clearCookie("access_token", cookieOptions);
      res.status(204).json({
        success: true,
        message: "Logged out",
      });
    } catch (error: any) {
      next(error);
    }
  };
};
