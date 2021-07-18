import { UnauthorizedUserException } from '@libs/exceptions';
import { lambdaHandler } from '@libs/lambda.helper';
import { response } from '@libs/responseFormatter.helper';
import { OrganisationRepo, UserRepo } from '../../repository';

export class OrganisationController{
    static createOrganisation = lambdaHandler(async req => {
        const data = req.body
        const ownerId = req['user'].id
        if(!ownerId) throw new UnauthorizedUserException()

        const orgDoc = await OrganisationRepo.create(ownerId, data)
        // await UserRepo.addOrganisation(ownerId, orgDoc._id.toHexString())

        return response(orgDoc)
    })

    static addMember = lambdaHandler(async req => {
        const orgId = req.params.id
        const email = req.body.email

        const user = await UserRepo.findByEmail(email)
        const updtaedOrg = await OrganisationRepo.addMember(orgId, user._id.toHexString())
        return response(updtaedOrg)
    })

    static deleteOrganisation = lambdaHandler(async req => {
        const orgId = req.params.id

        const deletedDoc = await OrganisationRepo.delete(orgId)
        return response({ _id: deletedDoc._id })
    })

    static getAllOrganisations = lambdaHandler(async req => {
        const userId = req['user']._id

        const orgs = await OrganisationRepo.getAllByUserId(userId)
        return response(orgs)
    })
}