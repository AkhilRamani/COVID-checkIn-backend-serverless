import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.userAuthService`,
  // iamRoleStatements: [{
  //   Effect: 'Allow',
  //   Action: [
  //     's3:PutObject'
  //   ],
  //   Resource: 'arn:aws:s3:::envbucket-files-bucket'
  // }],
  events: [
    {
      http: {
        method: 'any',
        path: '/userAuthService/{proxy+}',
        cors: true
      }
    }
  ]
}
