import { IUser } from "../entities";

export interface IFindUserByEmailUseCase {
  execute(email:string): Promise<IUser | null>;
}
