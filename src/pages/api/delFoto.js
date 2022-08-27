const AWS = require('aws-sdk');

const del = async (key) => {
  AWS.config.update({
    secretAccessKey: process.env.AWSSECRET_KEY,
    accessKeyId: process.env.AWSACCESS_KEY,
    region: process.env.AWSREGION,
  });
  const s3 = new AWS.S3();

  const params = {
    Bucket: process.env.AWSBUCKET,
    Key: key, // if any sub folder-> path/of/the/folder.ext
  };
  try {
    await s3.headObject(params).promise();
    console.log('File Found in S3', process.env.AWSREGION);
    try {
      await s3.deleteObject(params).promise();
      console.log('file deleted Successfully');
    } catch (err) {
      console.log(`ERROR in file Deleting : ${JSON.stringify(err)}`);
    }
  } catch (err) {
    console.log(`File not Found ERROR : ${err.code}`);
  }

  return 0;
};

export default function run(req, res) {
  const { dados } = req.body;
  console.log('aqui dados', dados);
  const send = del(dados);
  res.status(200).send(send);
}
