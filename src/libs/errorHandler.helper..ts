import { Response } from "express";

export const errorHandler = (err: Error, res: Response) => {
    console.log(err)
    const errCode = err['code'] && err['code'] >= 100 && err['code'] < 600 && err['code'] || 500
    res.status(errCode).send({ message: err.message || 'bad request'})
}
