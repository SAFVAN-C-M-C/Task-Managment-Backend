import { ICreateTask, IGetTasks, IGetTasksResponse, ILogin, ILoginUser, IRegisterUser, ITasks, IUpdateTask, IUpdateTaskRes, IUser } from "@/domain/entities";


export interface IRepositories {
  register: (data:IRegisterUser) => Promise<IUser | null>;
  login: (email:string) => Promise<ILoginUser | null>;
  findUserByEmail:(email:string)=>Promise<IUser | null>;

  //task management
  createTask:(data:ICreateTask) => Promise<ITasks | null>;
  getTasks:(data:IGetTasks) => Promise<IGetTasksResponse | null>;
  getTaskById:(taskId:string) => Promise<ITasks | null>;
  updateTask:(data:IUpdateTask)=>Promise<IUpdateTaskRes |string| null>;
  deleteTask:(taskId:string)=>Promise<any | null>;
}
