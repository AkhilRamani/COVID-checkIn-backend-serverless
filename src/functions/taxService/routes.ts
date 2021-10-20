import {Application, Router} from 'express'
import { TaxController } from './controller'
import { userAuthMiddleware } from '@libs/middleware/userAuth.middleware'
import { adminAuthMiddleware } from '@libs/middleware'

export class Routes{
    private taxRouter = Router()

    constructor(app: Application){
        this.bindRoutes(app)
        this.taxRoutes(this.taxRouter)
    }
    
    private bindRoutes(app: Application){
        app.use('/taxService', this.taxRouter)
    }

    private taxRoutes(taxRouter: Router){
        taxRouter.post('/save', adminAuthMiddleware, TaxController.create)
        taxRouter.patch('/update/:id', adminAuthMiddleware, TaxController.update)
        taxRouter.get('/', userAuthMiddleware, TaxController.getAll)
        taxRouter.get('/admin', adminAuthMiddleware, TaxController.getAll)
    }
}