import aws from 'aws-sdk';
import nc from 'next-connect';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc().get(async (req, res) => {
  const ACCESS_KEY_ID = process.env.AWSACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.AWSSECRET_KEY;
  const BUCKET_NAME = 'sistemaidpb';
  //  const ini = img.indexOf('img');
  // const nomeImg = 'img.slice(ini)';

  const s3 = new aws.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const params = {
    Key: 'FogoGloria.jpeg',
    Bucket: BUCKET_NAME,
  };

  const arquivo = await s3.getObject(params, (error, data) => {
    if (error != null) {
      // console.log('deu erro: ', error);
      //    alert(`Failed to retrieve an object: ${error}`);
    } else {
      // console.log('vai dados', data);
      //      alert(`Loaded ${data.ContentLength} bytes`);
      // do something with data.Body
    }
  });
  res.json({ Arquivo: arquivo });
});
export default handler;
