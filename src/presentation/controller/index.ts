import { IDependencies } from "@/application/interfaces/IDependencies"
import { registerController } from "./register"
import { loginController } from "./login"
import { getUserDataController } from "./getUserData"
import { createTaskController } from "./createTask"
import { getTasksController } from "./getTasks"
import { getTaskByIdController } from "./getTaskById"
import { updateTaskController } from "./updateTask"
import { deleteTaskController } from "./deleteTask"
import { logoutController } from "./logout"

export const controllers = (dependencies: IDependencies) => {
    return{
        register:registerController(dependencies),
        login:loginController(dependencies),
        getUserData:getUserDataController(dependencies),
        logout:logoutController(dependencies),
        createTask:createTaskController(dependencies),
        getTasks:getTasksController(dependencies),
        getTaskById:getTaskByIdController(dependencies),
        updateTask:updateTaskController(dependencies),
        deleteTask:deleteTaskController(dependencies),
    }
}