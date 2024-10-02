import { ITasks, IUpdateTask, IUpdateTaskRes } from "../entities";


export interface IUpdateTaskUseCase {
  execute(data:IUpdateTask): Promise<IUpdateTaskRes |string| null>;
}
