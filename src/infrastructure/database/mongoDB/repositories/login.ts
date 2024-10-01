import { ILoginUser } from "@/domain/entities";
import { User } from "../models";

export const login = async (key: string): Promise<ILoginUser | null> => {
  try {
    const existingUser = await User.findOne({
      email: key,
    });
    if (!existingUser) {
      return null;
    }
    return existingUser as ILoginUser;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
