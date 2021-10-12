import {Application, Router} from 'express'
import { CheckInController } from './controller'
import { userAuthMiddleware } from '@libs/middleware/userAuth.middleware'
import { LocationController } from './controller/location/location.controller'
import { verify } from 'crypto'
import { adminAuthMiddleware } from '@libs/middleware'

export class Routes{
    
    private testRouter = Router()
    private locationRouter = Router()
    private checkInRouter = Router()

    constructor(app: Application){
        this.bindRoutes(app)
        this.testRoute(this.testRouter)
        this.locationRoutes(this.locationRouter)
        this.checkInRoutes(this.checkInRouter)
    }
    
    private bindRoutes(app: Application){
        app.use('/covidCheckInService/test', this.testRouter)
        app.use('/covidCheckInService/location', this.locationRouter)
        app.use('/covidCheckInService/checkin', this.checkInRouter)
    }
    
    private testRoute(testRouter: Router){
        testRouter.get('/', (req, res) => res.send(req['apiGateway'].event))
    }

    private locationRoutes(locationRouter: Router){
        locationRouter.post('/', adminAuthMiddleware, LocationController.createLocation)
        locationRouter.get('/', adminAuthMiddleware, LocationController.getLocations)
    }

    private checkInRoutes(checkInRouter: Router){
        checkInRouter.post('/in', CheckInController.checkIn)
        checkInRouter.patch('/out/:id', CheckInController.checkOut)
    }
}