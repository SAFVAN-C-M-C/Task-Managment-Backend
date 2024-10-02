import { IUpdateTask } from "@/domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const updateTaskUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { updateTask },
  } = dependencies;
  return {
    execute: async (data:IUpdateTask) => {
      return await updateTask(data);
    },
  };
};
