import aws from 'aws-sdk';

import { HttpRequest } from '@aws-sdk/protocol-http';
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner';
import { parseUrl } from '@aws-sdk/url-parser';
import { Sha256 } from '@aws-crypto/sha256-browser';
// import { Hash } from '@aws-sdk/hash-node';

// const randomBytes = promisify(crypto.randomBytes);

const region = process.env.AWSREGION;
const bucketName = 'sistemaidpb';
const accessKeyId = process.env.AWSACCESS_KEY;
const secretAccessKey = process.env.AWSSECRET_KEY;

aws.config.update({
  secretAccessKey: process.env.AWSSECRET_KEY,
  accessKeyId: process.env.AWSACCESS_KEY,
  region: process.env.AWSREGION,
});

const credentials = {
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
};

export async function downloadImgS3(fileName) {
  // const rawBytes = await randomBytes(16);
  // const imageName = rawBytes.toString('hex');

  // pergar URL DO bucket
  // const uploadURL = await s3.getSignedUrlPromise('putObject', params);

  const s3ObjectUrl = parseUrl(
    `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`,
  );
  const presigner = new S3RequestPresigner({
    credentials,
    region,
    //  sha256: Hash.bind(null, 'sha256'), // In Node.js
    sha256: Sha256, // In browsers
  });
  // Create a GET request from S3 url.
  const uploadURL = await presigner.presign(new HttpRequest(s3ObjectUrl));

  // pegar a lista do bucket
  /*   const uploadURL = await s3
    .listObjectsV2({
      Bucket: bucketName,
    })
    .promise();
 */ return uploadURL;
}

export default downloadImgS3;
