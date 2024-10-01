import { IRegisterUser } from "@/domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const registerUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { register },
  } = dependencies;
  return {
    execute: async (data:IRegisterUser) => {
      return await register(data);
    },
  };
};
