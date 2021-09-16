import { lambdaHandler } from '@libs/lambda.helper';
import { response } from '@libs/responseFormatter.helper';
import { LocationModel } from '../../schema'
import { LocationRepo } from '../../repository'

export class LocationController{
    static createLocation = lambdaHandler(async req => {
        const data: LocationModel = req.body

        const doc = await LocationRepo.save(data)
        return response(doc)
    })

    static getLocations = lambdaHandler(async req => {
        return response(req.body)
    })
}