import { IGetTasks } from "@/domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const getTasksUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getTasks },
  } = dependencies;
  return {
    execute: async (data:IGetTasks) => {
      return await getTasks(data);
    },
  };
};
