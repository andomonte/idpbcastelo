import aws from 'aws-sdk';
import fileDownload from 'js-file-download';
// var fileDownload = require('js-file-download');
export default async function download() {
  aws.config.update({
    secretAccessKey: process.env.AWSSECRET_KEY,
    accessKeyId: process.env.AWSACCESS_KEY,
    region: process.env.AWSREGION,
  });

  // const s3 = new aws.S3();

  console.log('testando...');
  const fileUrl = 'https://sistemaidpb.s3.amazonaws.com/ARGENTINA.png';
  fileDownload(fileUrl, 'filename.csv');
}
