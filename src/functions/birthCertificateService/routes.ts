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
        app.use('/birthCertificate/certificate', this.birthCertRouter)
    }

    private birthCertRoutes(router: Router){
        router.post('/save', userAuthMiddleware, BirthCertificateController.createCertificate)
        router.patch('/approve/:id', adminAuthMiddleware, BirthCertificateController.approveCertificate)
        router.get('/', adminAuthMiddleware, BirthCertificateController.getAllCertificates)

        router.get('/my', userAuthMiddleware, BirthCertificateController.getMyCertificate)
    }
}