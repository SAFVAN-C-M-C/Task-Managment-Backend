import { ILoginUser } from "../entities";

export interface ILoginUseCase {
  execute(email: string): Promise<ILoginUser | null>;
}
