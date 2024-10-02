import { ICreateTaskUseCase, IDeleteTaskUseCase, IFindUserByEmailUseCase, IGetTaskByIdUseCase, IGetTasksUseCase, ILoginUseCase, IRegisterUseCase, IUpdateTaskUseCase } from "@/domain/useCases";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
  registerUseCase: (dependencies: IDependencies) => IRegisterUseCase;
  loginUseCase: (dependencies: IDependencies) => ILoginUseCase;
  findUserByEmailUseCase: (dependencies: IDependencies) => IFindUserByEmailUseCase;

  //task
  createTaskUseCase: (dependencies: IDependencies) => ICreateTaskUseCase;
  getTasksUseCase: (dependencies: IDependencies) => IGetTasksUseCase;
  getTaskByIdUseCase: (dependencies: IDependencies) => IGetTaskByIdUseCase;
  updateTaskUseCase: (dependencies: IDependencies) => IUpdateTaskUseCase;
  deleteTaskUseCase: (dependencies: IDependencies) => IDeleteTaskUseCase;
}
