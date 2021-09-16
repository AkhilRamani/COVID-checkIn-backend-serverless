import {Model, Schema, model, models} from 'mongoose'
import * as _ from 'lodash'
import { LocationModel } from './location.typedef'

const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    post_code: {
        type: String,
        required: true,
    }
})

export const Location: Model<LocationModel> = models.location || model<LocationModel>('location', locationSchema)