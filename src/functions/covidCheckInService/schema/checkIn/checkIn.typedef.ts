import {Document, Types} from 'mongoose'


export interface CheckInModel extends Document{
    _id: Types.ObjectId
    userId: string
    locationId: string
    from: Date
    to: Date
}