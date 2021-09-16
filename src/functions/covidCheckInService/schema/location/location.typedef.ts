import {Document, Types} from 'mongoose'


export interface LocationModel extends Document{
    _id: Types.ObjectId
    name: string
    address: string
    post_code: number
}