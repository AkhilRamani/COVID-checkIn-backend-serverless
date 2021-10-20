import { lambdaHandler } from '@libs/lambda.helper';
import { response } from '@libs/responseFormatter.helper';
import { UserModel } from "@libs/userSchema";
import * as _ from 'lodash'
import { UserRepo, UserRepoHelper } from "../../repository";

export class UserController{
    static createUser = lambdaHandler(async (req) => {
        const data: UserModel = req.body
        data.type = 'user'
        
        const userDoc = await UserRepo.save(data)
        const token = await UserRepoHelper.generateAuthToken(userDoc)
        return response({user: userDoc, token})
    })

    static createAdminUser = lambdaHandler(async (req) => {
        const data: UserModel = req.body
        data.type = 'admin'
        
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
}