import { IUser } from "@/domain/entities";
import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: IUser): string => {
  const secret = process.env.JWT_SECRET;

  // Validate that the secret is present
  if (!secret) {
    throw new Error("Access token secret is not defined in the environment!");
  }

  try {
    return jwt.sign(payload, secret, { expiresIn: "7d" });
  } catch (error: any) {
    // Include original error message for better debugging
    throw new Error(`Failed to generate access token: ${error.message}`);
  }
};
