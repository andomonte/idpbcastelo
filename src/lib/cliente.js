// Create service client module using ES6 syntax.
import { S3Client } from '@aws-sdk/client-s3';
// Set the AWS Region.
const REGION = 'us-east-1';
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: REGION,
  secretAccessKey: process.env.AWSSECRET_KEY,
  accessKeyId: process.env.AWSACCESS_KEY,
});
export default { s3Client };
