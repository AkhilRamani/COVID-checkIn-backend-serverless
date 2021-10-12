import {Application, Router} from 'express'
import { UserController } from './controller'
import { userAuthMiddleware } from '@libs/middleware/userAuth.middleware'
import { verify } from 'crypto'

export class Routes{
    private userRouter = Router()

    constructor(app: Application){
        this.bindRoutes(app)
        this.userRoutes(this.userRouter)
    }
    
    private bindRoutes(app: Application){
        app.use('/userAuthService', this.userRouter)
    }

    private userRoutes(userRouter: Router){
        userRouter.post('/user/save', UserController.createUser)
        userRouter.delete('/delete/:id', UserController.deleteUser)
        userRouter.post('/login', UserController.loginUser)

        userRouter.post('/admin/save', UserController.createAdminUser)
    }
}