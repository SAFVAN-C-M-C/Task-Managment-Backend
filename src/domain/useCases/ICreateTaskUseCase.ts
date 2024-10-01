import { ICreateTask, ITasks} from "../entities";

export interface ICreateTaskUseCase {
  execute(data:ICreateTask): Promise<ITasks | null>;
}
