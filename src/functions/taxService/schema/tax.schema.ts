import {Model, Schema, model, models} from 'mongoose'
import { TaxModel } from './tax.typedef'

const taxSchema = new Schema({
    title: String,
    description: String,
    auther: String
})

export const Tax: Model<TaxModel> = models.tax || model<TaxModel>('tax', taxSchema)