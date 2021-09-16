import { MissingParameterException } from "@libs/exceptions";
import { lambdaHandler } from "@libs/lambda.helper";
import { response } from "@libs/responseFormatter.helper";
import { CheckInRepo } from "../../repository";
import { CheckInModel } from "../../schema";

export class CheckInController{
    static checkIn = lambdaHandler(async req => {
        const data: CheckInModel = req.body
        const doc = await CheckInRepo.save(data)
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
}