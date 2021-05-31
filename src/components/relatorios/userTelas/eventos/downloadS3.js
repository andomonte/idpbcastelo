import aws from 'aws-sdk';

export default function dowloadS3(img) {
  const ACCESS_KEY_ID = process.env.AWSACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.AWSSECRET_KEY;
  const BUCKET_NAME = 'sistemaidpb';
  const ini = img.indexOf('img');
  const nomeImg = img.slice(ini);

  console.log('deu erro dados', nomeImg, BUCKET_NAME);
  const s3 = new aws.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const params = {
    Key: 'FogoGloria.jpeg',
    Bucket: BUCKET_NAME,
  };

  const arquivo = s3.getObject(params, (error, data) => {
    if (error != null) {
      console.log('deu erro: ', error);

      //    alert(`Failed to retrieve an object: ${error}`);
    } else {
      console.log('vai dados', data);

      //      alert(`Loaded ${data.ContentLength} bytes`);
      // do something with data.Body
    }
  });
  return arquivo;
}
