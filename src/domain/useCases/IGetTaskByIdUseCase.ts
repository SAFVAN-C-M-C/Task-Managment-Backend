import { ITasks } from "../entities";

export interface IGetTaskByIdUseCase {
  execute(taskId:string): Promise<ITasks | null>;
}
