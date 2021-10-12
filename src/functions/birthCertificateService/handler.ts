import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import awsServerless from 'aws-serverless-express';
import { app } from './app';

const server = awsServerless.createServer(app)

export const birthCertificateService: APIGatewayProxyHandler = (event, context) => {
  awsServerless.proxy(server, event, context)
}