import { IGetTasks, IGetTasksResponse, ITasks } from "../entities";

export interface IGetTasksUseCase {
  execute(data:IGetTasks): Promise<IGetTasksResponse | null>;
}
