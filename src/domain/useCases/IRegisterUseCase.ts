import { IRegisterUser, IUser } from "../entities";

export interface IRegisterUseCase {
  execute(data:IRegisterUser): Promise<IUser | null>;
}
