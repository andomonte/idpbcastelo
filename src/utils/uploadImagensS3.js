import aws from 'aws-sdk';
// import crypto from 'crypto';
// import { promisify } from 'util';

import { HttpRequest } from '@aws-sdk/protocol-http';
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner';
import { parseUrl } from '@aws-sdk/url-parser';
import { Sha256 } from '@aws-crypto/sha256-browser';
import { Hash } from '@aws-sdk/hash-node';
import { formatUrl } from '@aws-sdk/util-format-url';
import Iframe from 'react-iframe';

// const randomBytes = promisify(crypto.randomBytes);

const bucketName = 'sistemaidpb';

aws.config.update({
  secretAccessKey: process.env.AWSSECRET_KEY,
  accessKeyId: process.env.AWSACCESS_KEY,
  region: process.env.AWSREGION,
});

const s3 = new aws.S3();
export async function uploadVideosS3(fileName) {
  // const rawBytes = await randomBytes(16);
  // const imageName = rawBytes.toString('hex');
  // console.log('valor do FileName:', fileName);

  try {
    const params = {
      Bucket: bucketName,
      Key: fileName,
    };

    // const uploadURL = await s3.getObject(params).promise();
    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    const urls = uploadURL;
    console.log(urls);
    return urls;
    // return valorUrl;
  } catch (e) {
    throw new Error(`Could not retrieve file from S3: ${e.message}`);
  }
}

export default uploadVideosS3;
