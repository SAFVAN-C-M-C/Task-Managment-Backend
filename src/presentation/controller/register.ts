import { hashPassword } from "@/_lib/bcrypt";
import ErrorResponse from "@/_lib/error/errorResponse";
import { generateAccessToken } from "@/_lib/jwt";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const registerController = (dependencies: IDependencies) => {
  const {
    useCases: { registerUseCase, findUserByEmailUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      if (
        !name ||
        typeof name !== "string" ||
        !password ||
        typeof password !== "string" ||
        !email ||
        typeof email !== "string"
      ) {
        return next(
          ErrorResponse.badRequest("Name, email, and password are required.")
        );
      }
      //checking esxistence
      const existingUser = await findUserByEmailUseCase(dependencies).execute(
        email
      );
      if (existingUser) {
        return next(
          ErrorResponse.conflict(
            "Email is already resgitered, try another email"
          )
        );
      }
      //hashing
      const hashedPass = await hashPassword(password);
      const user = await registerUseCase(dependencies).execute({
        name,
        email,
        password: hashedPass,
      });

      if (!user) {
        throw new Error("User registration failed");
      }
      const accessToken = generateAccessToken({
        name,
        email,
        _id: user._id,
      });
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 6000 * 60 * 24 * 7,
        // secure: process.env.NODE_ENV === "production",
        // sameSite: 'none' // Allow cookies to be sent cross-origin
      });
      res.status(201).json({
        success: true,
        data: user,
        message: "User Registration Completed",
      });
    } catch (error: any) {
      next(error);
    }
  };
};
