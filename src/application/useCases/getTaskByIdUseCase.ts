import { IDependencies } from "../interfaces/IDependencies";

export const getTaskByIdUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getTaskById },
  } = dependencies;
  return {
    execute: async (taskId:string) => {
      return await getTaskById(taskId);
    },
  };
};
