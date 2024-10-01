import { ICreateTask, ILogin, ILoginUser, IRegisterUser, ITasks, IUser } from "@/domain/entities";


export interface IRepositories {
  register: (data:IRegisterUser) => Promise<IUser | null>;
  login: (email:string) => Promise<ILoginUser | null>;
  findUserByEmail:(email:string)=>Promise<IUser | null>;

  //task management
  createTask:(data:ICreateTask) => Promise<ITasks | null>;

}
