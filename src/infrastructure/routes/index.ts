import { Router } from "express";
import { controllers } from "@/presentation/controller";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { jwtMiddleware } from "@/_lib/middleware/jwtMiddleware";

export const routes = (dependencies: IDependencies) => {
  const {register,login,getUserData } =
    controllers(dependencies);

  const router = Router();
  const route=(path:string)=> router.route(path)
  route('/register').post(register)
  route('/login').post(login)
  route('/user').get(jwtMiddleware,getUserData)
  return router;
};
