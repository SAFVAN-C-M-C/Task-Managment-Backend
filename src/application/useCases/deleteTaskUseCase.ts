import { IDependencies } from "../interfaces/IDependencies";

export const deleteTaskUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { deleteTask },
  } = dependencies;
  return {
    execute: async (taskId:string) => {
      return await deleteTask(taskId);
    },
  };
};
