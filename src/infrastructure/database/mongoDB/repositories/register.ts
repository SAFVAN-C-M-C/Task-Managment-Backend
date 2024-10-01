import { User } from "../models";
import { IRegisterUser, IUser } from "@/domain/entities";

export const register = async (
  data: IRegisterUser
): Promise<IUser | null> => {
  try {
    const newUser = await User.create(data);
    const { name, email, _id } = newUser;

    return { name, email, _id } as IUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`User registration failed: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred during user registration");
    }
  }
};
