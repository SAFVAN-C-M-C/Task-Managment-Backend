import { IDependencies } from "../interfaces/IDependencies";

export const loginUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { login },
  } = dependencies;
  return {
    execute: async (email:string) => {
      return await login(email);
    },
  };
};
