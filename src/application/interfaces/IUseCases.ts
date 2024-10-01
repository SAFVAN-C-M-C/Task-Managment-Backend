import { ICreateTaskUseCase, IFindUserByEmailUseCase, ILoginUseCase, IRegisterUseCase } from "@/domain/useCases";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
  registerUseCase: (dependencies: IDependencies) => IRegisterUseCase;
  loginUseCase: (dependencies: IDependencies) => ILoginUseCase;
  findUserByEmailUseCase: (dependencies: IDependencies) => IFindUserByEmailUseCase;

  //task
  createTaskUseCase: (dependencies: IDependencies) => ICreateTaskUseCase;
}
