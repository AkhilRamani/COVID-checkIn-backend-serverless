import {Model, Schema, model, models} from 'mongoose'
import { BirthCertificateModel } from './birthCertificate.typedef'

const birthCertificateSchema = new Schema({
    givenName: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    birthPlace: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    fatherGivenName: {
        type: String,
        required: true
    },
    fatherSurname: {
        type: String,
        required: true
    },
    fatherBirthDate: {
        type: Date,
        required: true
    },
    motherGivenName: {
        type: String,
        required: true
    },
    motherSurname: {
        type: String,
        required: true
    },
    motherBirthDate: {
        type: Date,
        required: true
    },
    informatName: {
        type: String,
        required: true
    },
    informantDesc: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    issuedDate: Date,
    issuedBy: String
})

export const BirthCertificate: Model<BirthCertificateModel> = models.birthCertificate || model<BirthCertificateModel>('birthCertificate', birthCertificateSchema)