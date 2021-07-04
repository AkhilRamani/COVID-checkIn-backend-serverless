import {Document, Types} from 'mongoose'

export enum AccessTypes {
    admin,
    read,
    write
}

export enum FileTypes{
    dev,
    test,
    staging,
    prod,
    common
}

export interface AccessGroup {
    user_id: Types.ObjectId
    access_type: AccessTypes
}

export interface File{
    name: string
    ext: string
    url: string
    type: FileTypes
}

export interface ProjectModel extends Document{
    _id: Types.ObjectId
    user_id: Types.ObjectId
    name: string
    cover_image: string
    files: File[]
    access_group: AccessGroup[]
}