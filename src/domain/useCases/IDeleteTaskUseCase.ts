export interface IDeleteTaskUseCase {
  execute(taskId:string): Promise<any | null>;
}
