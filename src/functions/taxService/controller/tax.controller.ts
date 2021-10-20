import { lambdaHandler } from '@libs/lambda.helper';
import { response } from '@libs/responseFormatter.helper';
import { TaxRepo } from "../repository";
import { TaxModel } from '../schema';

export class TaxController{
    static create = lambdaHandler(async (req) => {
        const data: TaxModel = req.body
        data.auther = req['user'].name
        
        const taxDoc = await TaxRepo.save(data)
        return response(taxDoc)
    })

    static getAll = lambdaHandler(async () => {
        const docs = await TaxRepo.getAll()
        return response(docs)
    })
    static update = lambdaHandler(async (req) => {
        const id = req.params?.id
        const data = req.body
        const updatedDoc = await TaxRepo.update(id, data)
        return response(updatedDoc)
    })
}