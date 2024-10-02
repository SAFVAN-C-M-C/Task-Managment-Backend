import { ICreateTask } from "@/domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const createTaskUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createTask },
  } = dependencies;
  return {
    execute: async (data:ICreateTask) => {
      return await createTask(data);
    },
  };
};
