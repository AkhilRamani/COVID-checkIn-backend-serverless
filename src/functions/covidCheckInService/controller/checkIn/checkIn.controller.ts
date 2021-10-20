import { MissingParameterException } from "@libs/exceptions";
import { lambdaHandler } from "@libs/lambda.helper";
import { response } from "@libs/responseFormatter.helper";
import { CheckInRepo, LocationRepo } from "../../repository";
import { CheckInModel } from "../../schema";

export class CheckInController{
    static checkIn = lambdaHandler(async req => {
        const locationId: string = req.params?.locationId
        const location = await LocationRepo.getById(locationId)

        const checkIn: any = {
            locationId,
            userId: req['user']._id,
            loactionName: location.name,
            locationAddress: location.address,
            from: new Date()
        }

        const doc = await CheckInRepo.save(checkIn)
        return response(doc)
    })

    static checkOut = lambdaHandler(async req => {
        const checkInID: string = req.params.id
        const endTime: Date = req.body?.endTime
        if(!checkInID) throw new MissingParameterException('checkIn ID is requied as "/checkout/[checkInID]"')
        if(!endTime) throw new MissingParameterException('endTime is requied as request body"')

        const updatedDoc = await CheckInRepo.updateCheckOut(checkInID, endTime)
        return response(updatedDoc)
    })

    static getMyCheckins = lambdaHandler(async req => {
        const checkIns = await CheckInRepo.getAllById(req['user']._id)
        return response(checkIns || [])
    })
}