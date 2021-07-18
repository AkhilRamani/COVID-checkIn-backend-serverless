import {Application, Router} from 'express'
import { OrganisationController, UserController } from './controller'
import { ProjectController } from './controller/project/project.controller'
import { authMiddleware } from '@libs/middleware/auth.middleware'
import { orgAuthMiddleware } from '@libs/middleware/orgAuth.middleware'

export class Routes{
    
    private testRouter = Router()
    private userRouter = Router()
    private projectRouter = Router()
    private organisationRouter = Router()

    constructor(app: Application){
        this.bindRoutes(app)
        this.testRoute(this.testRouter)
        this.userRoutes(this.userRouter)
        this.projectRoutes(this.projectRouter)
        this.organisationRoutes(this.organisationRouter)
    }
    
    private bindRoutes(app: Application){
        app.use('/test', this.testRouter)
        app.use('/user', this.userRouter)
        app.use('/project', this.projectRouter)
        app.use('/organisation', this.organisationRouter)
    }
    
    private testRoute(testRouter: Router){
        testRouter.get('/', (req, res) => res.send(req.apiGateway.event))
    }

    private userRoutes(userRouter: Router){
        userRouter.post('/save', UserController.createUser)
        userRouter.delete('/delete/:id', UserController.deleteUser)
        userRouter.post('/login', UserController.loginUser)

        // userRouter.put('/invite', authMiddleware, UserController.inviteUser)
    }

    private projectRoutes(projectRouter: Router){
        projectRouter.post('/save', ProjectController.createProject)
        projectRouter.put('/upload-url', ProjectController.addFile)
        projectRouter.delete('/delete/:id', ProjectController.deleteProject)
        projectRouter.patch('/update/:id', ProjectController.updateProject)
    }

    private organisationRoutes(organisationRouter: Router){
        organisationRouter.post('/create', authMiddleware, OrganisationController.createOrganisation)
        organisationRouter.get('/all', authMiddleware, OrganisationController.getAllOrganisations)
        organisationRouter.patch('/invite/:id', orgAuthMiddleware, OrganisationController.addMember)
        organisationRouter.delete('/delete/:id', orgAuthMiddleware, OrganisationController.deleteOrganisation)
    }
}