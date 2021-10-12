import {Application, Router} from 'express'
import { BirthCertificateController } from './controller'
import { userAuthMiddleware, adminAuthMiddleware } from '@libs/middleware'

export class Routes{
    
    private birthCertRouter = Router()

    constructor(app: Application){
        this.bindRoutes(app)
        this.birthCertRoutes(this.birthCertRouter)
    }
    
    private bindRoutes(app: Application){
        app.use('/birthCertificate', this.birthCertRouter)
    }

    private birthCertRoutes(router: Router){
        router.post('/save', userAuthMiddleware, BirthCertificateController.createCertificate)
        router.get('/', adminAuthMiddleware, BirthCertificateController.getAllCertificates)

        router.patch('/:id', adminAuthMiddleware, BirthCertificateController.approveCertificate)
    }
}