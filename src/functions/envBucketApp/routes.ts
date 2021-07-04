import {Application, Router} from 'express'
import { UserController } from './controller'
import { ProjectController } from './controller/project/project.controller'
import { authMiddleware } from './middldeware/auth.middleware'

export class Routes{
    
    private testRouter = Router()
    private userRouter = Router()
    private projectRouter = Router()

    constructor(app: Application){
        this.bindRoutes(app)
        this.testRoute(this.testRouter)
        this.userRoutes(this.userRouter)
        this.projectRoutes(this.projectRouter)
    }
    
    private bindRoutes(app: Application){
        app.use('/test', this.testRouter)
        app.use('/user', this.userRouter)
        app.use('/project', this.projectRouter)
    }
    
    private testRoute(testRouter: Router){
        testRouter.get('/', (req, res) => res.send(req.apiGateway.event))
    }

    private userRoutes(userRouter: Router){
        userRouter.post('/save', UserController.createUser)
        userRouter.delete('/delete/:id', UserController.deleteUser)
        userRouter.post('/login', UserController.loginUser)

        userRouter.put('/invite', authMiddleware, UserController.inviteUser)
    }

    private projectRoutes(projectRouter: Router){
        projectRouter.post('/save', ProjectController.createProject)
        projectRouter.put('/upload-url', ProjectController.addFile)
        projectRouter.delete('/delete/:id', ProjectController.deleteProject)
        projectRouter.patch('/update/:id', ProjectController.updateProject)
    }
}