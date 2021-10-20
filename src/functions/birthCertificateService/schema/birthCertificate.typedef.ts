import {Document, Types} from 'mongoose'


export interface BirthCertificateModel extends Document{
    _id: Types.ObjectId
    userId: Types.ObjectId
    givenName: string
    surname: string
    birthDate: Date
    birthPlace: string
    sex: string
    fatherGivenName: string
    fatherSurname: string
    fatherBirthDate: Date
    motherGivenName: string
    motherSurname: string
    motherBirthDate: Date
    informatName: string
    informantDesc: string
    status: boolean
    issuedDate: Date
    issuedBy: string
}