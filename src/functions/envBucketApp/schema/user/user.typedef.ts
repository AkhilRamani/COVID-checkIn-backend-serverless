import {Document, Types} from 'mongoose'

export interface TokenModel {
    access: string
    token: string
}

export interface UserModel extends Document{
    _id: Types.ObjectId
    f_name: string
    l_name: string
    email: string
    phone: string
    password: string
    type: string
    organisations: string[]
    users: string[]
    tokens: TokenModel[]

    generateAuthToken(): string
    removeToke: ()=>{}
}