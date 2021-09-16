import {Application, Router} from 'express'
import { CheckInController, UserController } from './controller'
import { authMiddleware } from '@libs/middleware/auth.middleware'
import { LocationController } from './controller/location/location.controller'

export class Routes{
    
    private testRouter = Router()
    private userRouter = Router()
    private locationRouter = Router()
    private checkInRouter = Router()

    constructor(app: Application){
        this.bindRoutes(app)
        this.testRoute(this.testRouter)
        this.userRoutes(this.userRouter)
        this.locationRoutes(this.locationRouter)
        this.checkInRoutes(this.checkInRouter)
    }
    
    private bindRoutes(app: Application){
        app.use('/test', this.testRouter)
        app.use('/user', this.userRouter)
        app.use('/location', this.locationRouter)
        app.use('/checkin', this.checkInRouter)
    }
    
    private testRoute(testRouter: Router){
        testRouter.get('/', (req, res) => res.send(req['apiGateway'].event))
    }

    private locationRoutes(locationRouter: Router){
        locationRouter.post('/save', LocationController.createLocation)
        locationRouter.get('/', LocationController.getLocations)
    }

    private checkInRoutes(checkInRouter: Router){
        checkInRouter.post('/in', CheckInController.checkIn)
        checkInRouter.patch('/out/:id', CheckInController.checkOut)
    }

    private userRoutes(userRouter: Router){
        userRouter.post('/save', UserController.createUser)
        userRouter.delete('/delete/:id', UserController.deleteUser)
        userRouter.post('/login', UserController.loginUser)

        // userRouter.put('/invite', authMiddleware, UserController.inviteUser)
    }
}