import { MissingParameterException } from '@libs/exceptions';
import { lambdaHandler } from '@libs/lambda.helper';
import { response } from '@libs/responseFormatter.helper';
import * as _ from 'lodash'
import { BirthCertificateRepo } from "../repository";
import { BirthCertificateModel } from '../schema';

export class BirthCertificateController{
    static createCertificate = lambdaHandler(async (req) => {
        const data: BirthCertificateModel = req.body
        
        const doc = await BirthCertificateRepo.save(data)
        return response(doc)
    })

    static getAllCertificates = lambdaHandler(async req => {
        const data = await BirthCertificateRepo.getAll()
        return response(data)
    })

    static approveCertificate = lambdaHandler(async req => {
        const id = req.params?.id
        if(!id) throw new MissingParameterException('Certificate id is required')

        const data = await BirthCertificateRepo.updateStatus(id, true)
        return response(data)
    })
}