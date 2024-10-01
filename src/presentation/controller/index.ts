import { IDependencies } from "@/application/interfaces/IDependencies"
import { registerController } from "./register"
import { loginController } from "./login"
import { getUserDataController } from "./getUserData"

export const controllers = (dependencies: IDependencies) => {
    return{
        register:registerController(dependencies),
        login:loginController(dependencies),
        getUserData:getUserDataController(dependencies),
    }
}