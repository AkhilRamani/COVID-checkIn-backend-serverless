import { NextFunction, Request, Response } from "express";
import { connectToDB } from "@libs/dbConnecter.helper";
import { errorHandler } from "@libs/errorHandler.helper.";
import { UserRepoHelper } from "@functions/envBucketApp/repository/user/user.helpers";
import { equal } from "@libs/utils";
import { MissingParameterException, UnauthorizedUserException } from "@libs/exceptions";
import { OrganisationRepo } from "@functions/envBucketApp/repository";

export const orgAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await connectToDB()
        const token = req.header('Authorization')
        const orgId = req.params.id
        if(!orgId) throw new MissingParameterException('organisation id not provided')

        const user = await UserRepoHelper.findByToken(token)
        const org = await OrganisationRepo.get(orgId)

        if(!equal(user._id.toHexString(), org.owner)) throw new UnauthorizedUserException()

        req['user'] = user
        req['org'] = org
        
        next()
    }
    catch (e) {
        e.code = 401
        errorHandler(e, res)
    }
}