import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import envBucketApp from '@functions/envBucketApp'

const serverlessConfiguration: AWS = {
  service: 'envbucketbackend',
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
    region: 'ap-southeast-2',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DB_URL: '${env:DB_URL}',
      JWT_SECRET: '${env:JWT_SECRET}',
      AWS_S3_BUCKET: '${env:AWS_S3_BUCKET}'
    },
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      EnvBucketFiles:{
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: '${env:AWS_S3_BUCKET}',
          AccessControl: 'Private',
          CorsConfiguration: {
            CorsRules: [{
              AllowedHeaders: ['*'],
              AllowedMethods: ['PUT'],
              AllowedOrigins: ['*']
            }]
          }
        }
      }
    }
  },
  // import the function via paths
  functions: { hello, envBucketApp },
};

module.exports = serverlessConfiguration;
