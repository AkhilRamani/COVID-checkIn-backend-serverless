import express from 'express'
import { eventContext } from 'aws-serverless-express/middleware';
import cors from 'cors'
import {Routes} from './routes'

class App{

    public app: express.Application

    constructor(){
        this.app = express()
        this.config()
        new Routes(this.app)
    }

    private config(): void{
        this.app.use(express.json())
        this.app.use(eventContext())
        this.app.use(cors())
    }
}

export const app = new App().app