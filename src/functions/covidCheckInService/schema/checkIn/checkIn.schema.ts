import {Model, Schema, model, models} from 'mongoose'
import * as _ from 'lodash'
import { CheckInModel } from './checkIn.typedef'

const checkInSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    locationId: {
        type: String,
        required: true
    },
    from: {
        type: Date,
        required: true,
        default: new Date()
    },
    to: {
        type: Date
    }
})

export const CheckIn: Model<CheckInModel> = models.checkIn || model<CheckInModel>('checkIn', checkInSchema)