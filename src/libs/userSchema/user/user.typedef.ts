import {Document, Types} from 'mongoose'

export interface TokenModel {
    access: string
    token: string
}

export interface UserModel extends Document{
    _id: Types.ObjectId
    name: string
    email: string
    password: string
    type: string
    tokens: TokenModel[]

    generateAuthToken(): string
    removeToke: ()=>{}
}