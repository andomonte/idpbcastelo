import aws from 'aws-sdk';

export default function download(img) {
  aws.config.update({
    secretAccessKey: process.env.AWSSECRET_KEY,
    accessKeyId: process.env.AWSACCESS_KEY,
    region: process.env.AWSREGION,
  });

  const s3 = new aws.S3();
  s3.getObject({ Bucket: process.env.AWSBUCKET, Key: img }, (error, data) => {
    if (error != null) {
      //    alert(`Failed to retrieve an object: ${error}`);
    } else {
      console.log('data S3:', data);
      //      alert(`Loaded ${data.ContentLength} bytes`);
      // do something with data.Body
    }
  });
}
