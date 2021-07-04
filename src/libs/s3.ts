import { S3 } from 'aws-sdk'


const s3 = new S3();

export const getSignedUploadUrl = (key: string) => {
    return s3.getSignedUrlPromise('putObject', {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
    })
}