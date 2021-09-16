import { lambdaHandler } from '@libs/lambda.helper';
import { response } from '@libs/responseFormatter.helper';
import { UserModel } from "../../schema";
import * as _ from 'lodash'
import { UserRepo } from "../../repository";

export class UserController{
    static createUser = lambdaHandler(async (req) => {
        const data: UserModel = req.body
        
        const doc = await UserRepo.save(data)
        return response(doc)
    })

    static getUser = lambdaHandler(async (req) => UserRepo.getOne(req.params.id))

    static loginUser = lambdaHandler(async req => {
        const {email, password} = _.pick(req.body, ['email', 'password'])
        const token = await UserRepo.findByCredentials(email, password)
        // console.log(user)
        return response({token})
    })

    static deleteUser = lambdaHandler(async (req) => {
        const id: string = req.params.id
        const deletedDoc = await UserRepo.delete(id)
        return response(deletedDoc)
    })

    static inviteUser = lambdaHandler(async req => {
        const userId = req['user'].id
        const invitedUserEmail = req.body.email

        const invitedDoc = await UserRepo.addOrganisation(invitedUserEmail, userId)
        const userDoc = await UserRepo.addUser(userId, invitedDoc._id.toHexString())
        return response(userDoc)
    })
}