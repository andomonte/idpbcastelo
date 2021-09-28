import aws from 'aws-sdk';

const bucketName = 'sistemaidpb';

aws.config.update({
  secretAccessKey: process.env.AWSSECRET_KEY,
  accessKeyId: process.env.AWSACCESS_KEY,
  region: process.env.AWSREGION,
});

const s3 = new aws.S3();

export async function uploadVideosS3(fileName) {
  const params = {
    Bucket: bucketName,
    Key: fileName,
  };
  // Using async/await (untested)
  try {
    await s3.headObject(params).promise();
    const signedUrl = await s3.getSignedUrlPromise('getObject', params);
    // Do something with signedUrl
    return signedUrl;
  } catch (headErr) {
    if (headErr.code === 'NotFound') {
      // Handle no object on cloud here
    }
    throw new Error(`Could not retrieve file from S3: ${headErr.message}`);
  }
}

export default uploadVideosS3;
