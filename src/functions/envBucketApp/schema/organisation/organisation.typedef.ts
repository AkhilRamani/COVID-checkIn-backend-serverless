import {Document, Types} from 'mongoose'

export interface OrganisationModel extends Document{
    _id: Types.ObjectId
    name: string
    email: string
    logo: string
    owner: string
    users: string[]
}