import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.birthCertificateService`,
  events: [
    {
      http: {
        method: 'any',
        path: '/birthCertificate/{proxy+}',
        cors: true
      }
    }
  ]
}
