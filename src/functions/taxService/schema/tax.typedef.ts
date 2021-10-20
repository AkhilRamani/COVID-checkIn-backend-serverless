import {Document, Types} from 'mongoose'


export interface TaxModel extends Document{
    _id: Types.ObjectId
    title: string
    description: string
    auther: string 
}