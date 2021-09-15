import aws from 'aws-sdk';

const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const downloadImgS3 = () => {
  const region = process.env.AWSREGION;
  const bucketName = 'sistemaidpb';
  const accessKeyId = process.env.AWSACCESS_KEY;
  const secretAccessKey = process.env.AWSSECRET_KEY;
  const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4',
  });

  const handleDownload = async (fileName) => {
    console.log(fileName);
    // const dirPath = path.join(__dirname, '../../../../public/images/temp');
    const params = {
      Bucket: bucketName,
      Key: 'ARACAJU.png',
    };
    s3.getObject(params)
      .promise()
      .then((data) => {
        writeFile('./public/images/temp', data.Body);
        console.log('file downloaded successfully');
      })
      .catch((err) => {
        throw err;
      });
    /*     s3.getObject(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        return err;
      }
      console.log('csvBlob:', data.Body);
      //  const blob = new Blob([image], {type: 'image/png'})
      // const img = URL.createObjectURL(blob);
      return data.Body;
    });
 */
  };

  handleDownload();
};

export default downloadImgS3;
