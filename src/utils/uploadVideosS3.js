import aws from 'aws-sdk';
// import crypto from 'crypto';
// import { promisify } from 'util';

// const randomBytes = promisify(crypto.randomBytes);

const region = process.env.AWSREGION;
const bucketName = 'videosministeriomissoes';
const accessKeyId = process.env.AWSACCESS_KEY;
const secretAccessKey = process.env.AWSSECRET_KEY;
aws.config.update({
  secretAccessKey: process.env.AWSSECRET_KEY,
  accessKeyId: process.env.AWSACCESS_KEY,
  region: process.env.AWSREGION,
});

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

export async function uploadVideosS3(fileName) {
  // const rawBytes = await randomBytes(16);
  // const imageName = rawBytes.toString('hex');

  const params = {
    Bucket: bucketName,
    Key: fileName,
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);

  return uploadURL;
}

export default uploadVideosS3;
