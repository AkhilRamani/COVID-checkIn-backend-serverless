import type { AWS } from '@serverless/typescript';
import {covidCheckInService, userAuthService, birthCertificateService} from '@functions/index'

const serverlessConfiguration: AWS = {
  service: 'UniProjectSE',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-iam-roles-per-function'
  ],
  provider: {
    name: 'aws',
    region: 'us-east-1',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DB_URL: '${env:DB_URL}',
      JWT_SECRET: '${env:JWT_SECRET}',
      // AWS_S3_BUCKET: '${env:AWS_S3_BUCKET}'
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { 
    covidCheckInService,
    userAuthService,
    birthCertificateService
  },
};

module.exports = serverlessConfiguration;
