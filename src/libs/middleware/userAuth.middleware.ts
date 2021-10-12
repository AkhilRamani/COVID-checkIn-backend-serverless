import { connectToDB } from "@libs/dbConnecter.helper";
import { errorHandler } from "@libs/errorHandler.helper.";
import { NextFunction, Request, Response } from "express";
import { UserRepoHelper } from "@functions/userAuthService/repository";
import { UnauthorizedUserException } from "@libs/exceptions";

export const userAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await connectToDB()
        const token = req.header('Authorization')
        if(!token) throw new UnauthorizedUserException('Authorisation token required')

        const user = await UserRepoHelper.findByToken(token)
        req['user'] = user
        next()
    }
    catch (e) {
        e.code = 401
        errorHandler(e, res)
    }
}