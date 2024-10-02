import { Router } from "express";
import { controllers } from "@/presentation/controller";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { jwtMiddleware } from "@/_lib/middleware/jwtMiddleware";

export const routes = (dependencies: IDependencies) => {
  const {register,login,getUserData,createTask,getTasks,getTaskById,updateTask,deleteTask,logout } =
    controllers(dependencies);

  const router = Router();
  const route=(path:string)=> router.route(path)
  route('/register').post(register)
  route('/login').post(login)
  route('/user').get(jwtMiddleware,getUserData)
  route('/logout').delete(logout)

  //tasks
  route('/task/create').post(jwtMiddleware,createTask)
  route('/tasks').get(jwtMiddleware,getTasks)
  route('/task/:taskId').get(jwtMiddleware,getTaskById)
  route('/task/:taskId').patch(jwtMiddleware,updateTask)
  route('/task/:taskId').delete(jwtMiddleware,deleteTask)
  return router;
};
