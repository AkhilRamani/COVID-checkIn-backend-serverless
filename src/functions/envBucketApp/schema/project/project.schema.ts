import { Model, Schema, model, models } from 'mongoose'
import { AccessTypes, FileTypes, ProjectModel } from './project.typedef'

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cover_image: {
        type: String,
        required: true
    },
    files: [{
        name: String,
        ext: String,
        url: String,
        type: {
            type: Number,
            enum: FileTypes
        }
    }],
    access_group: [{
        user_id: String,
        access_type: {
            type: Number,
            enum: AccessTypes
        }
    }]
})

export const Project: Model<ProjectModel> = models.project || model<ProjectModel>('project', projectSchema)