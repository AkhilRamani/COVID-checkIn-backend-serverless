import {Model, Schema, model, models} from 'mongoose'
import { OrganisationModel } from './organisation.typedef'

const organisationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    logo: String,
    owner: {
        type: String,
        required: true
    },
    users: [{
        type: String,
    }]
})

export const Organisaton: Model<OrganisationModel> = models.organisation || model<OrganisationModel>('organisation', organisationSchema)