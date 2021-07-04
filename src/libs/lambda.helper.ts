import { Request, Response, NextFunction } from "express"
import { errorHandler } from "./errorHandler.helper."
import { connectToDB } from "./dbConnecter.helper"

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>

// export const asyncHandler = (execution: AsyncFunction) => (req: Request, res: Response, next:NextFunction) => execution(req, res, next).catch(e => errorHandler(e, res))


export const lambdaHandler = (execution: AsyncFunction) => async (req: Request, res: Response, next:NextFunction) => {
    try{
        await connectToDB()
        const resData: {code: number, payload: object | null} = await execution(req, res, next)
        res.status(resData.code).json(resData.payload)
    }
    catch(e){
        errorHandler(e, res)
    }
}