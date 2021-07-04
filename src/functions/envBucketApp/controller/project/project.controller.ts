import { lambdaHandler } from '@libs/lambda.helper';
import { response } from '@libs/responseFormatter.helper';
import { ProjectRepo } from "../../repository/project/project.repository";
import { ProjectModel } from "../../schema/project/project.typedef";
import {getSignedUploadUrl} from '@libs/s3'
import {pick} from '@libs/utils'

export class ProjectController{
    static createProject = lambdaHandler(async req => {
        const data: ProjectModel = req.body

        const doc = await ProjectRepo.create(data)
        return response(doc)
    })

    static addFile = lambdaHandler(async req => {
        const data = req.body
        const name: string = data.name

        const signedUrl = await getSignedUploadUrl(name)
        console.log(signedUrl)

        return response({uploadUrl: signedUrl})
    })

    static deleteProject = lambdaHandler(async req => {
        const id: string = req.params.id
        const doc = await ProjectRepo.delete(id)
        return response(doc)
    })

    static updateProject = lambdaHandler(async req => {
        const id: string = req.params.id
        const data = req.body
        const doc = await ProjectRepo.update(id, data)
        return response(doc)
    })
}