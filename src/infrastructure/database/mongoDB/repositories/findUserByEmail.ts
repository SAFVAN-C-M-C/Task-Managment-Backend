import { IUser } from "@/domain/entities";
import { User } from "../models";

export const findUserByEmail = async (key: string): Promise<IUser | null> => {
  try {
    const existingUser = await User.findOne({
      email: key,
    });
    if (!existingUser) {
      return null;
    }
    const { name, email, _id } = existingUser;

    return { name, email, _id } as IUser;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
