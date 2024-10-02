import { comparePassword, hashPassword } from "@/_lib/bcrypt";
import ErrorResponse from "@/_lib/error/errorResponse";
import { generateAccessToken } from "@/_lib/jwt";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const loginController = (dependencies: IDependencies) => {
  const {
    useCases: { loginUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (
        !password ||
        typeof password !== "string" ||
        !email ||
        typeof email !== "string"
      ) {
        return next(
          ErrorResponse.badRequest("Email, and password are required.")
        );
      }
      //checking esxistence
      const existingUser = await loginUseCase(dependencies).execute(email);
      if (!existingUser) {
        return next(
          ErrorResponse.notFound("No account found with this email,Try again!")
        );
      }
      //comparing pass
      const match = await comparePassword(password, existingUser.password);
      if (!match) {
        return next(
          ErrorResponse.unauthorized("Incorect password,Please Try again!")
        );
      }

      const accessToken = generateAccessToken({
        _id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
      });
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 6000 * 60 * 24 * 7,
        //only enable in production
        secure: process.env.NODE_ENV === "production",
        sameSite: 'none' // Allow cookies to be sent cross-origin
      });
      
      res.status(200).json({
        success: true,
        data: {name:existingUser.name,email:existingUser.email,_id:existingUser._id},
        message: "Logined",
      });
    } catch (error: any) {
      next(error);
    }
  };
};
