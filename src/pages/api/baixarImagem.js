import aws from 'aws-sdk';
import download from 'image-downloader';
import path, { extname } from 'path';
import fs from 'fs';
import { type } from 'os';

function downloadS3(img) {
  const ACCESS_KEY_ID = process.env.AWSACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.AWSSECRET_KEY;
  const BUCKET_NAME = 'sistemaidpb';

  console.log('img', img.dados);
  const s3 = new aws.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const params = {
    Key: img.dados,
    Bucket: BUCKET_NAME,
  };

  const arquivo = s3.getObject(params, (error, data) => {
    if (error != null) {
      console.log('deu erro: ', error);

      //    alert(`Failed to retrieve an object: ${error}`);
    } else {
      //  console.log('vai dados', data);
      //  baixarPC(data);
      //      alert(`Loaded ${data.ContentLength} bytes`);
      // do something with data.Body
    }
  });
  return arquivo;
}
export default function handle(req, res) {
  const valor = { ...req.body };
  let nomeArq = '';
  let extArq = '';
  const dirPath = path.join(__dirname, '../../../../public/images/temp');
  const dirRota = path.join(__dirname, '../../../../src/pages/temp');
  const options = {
    url: valor.dados,
    dest: dirPath, // will be saved to /path/to/dest/image.jpg
  };
  // const result = downloadS3(valor);
  download
    .image(options)
    .then(({ filename }) => {
      nomeArq = filename;
      extArq = filename.split('.').slice(1).join('.');
      console.log('Saved to', nomeArq, extArq); // saved to /path/to/dest/image.jpg
    })
    .catch((err) => console.error(err));
  // if (result) baixarPC(result);
  // console.log(result);
  //  fs.rename(`${dirPath}/${nomeArq}`, `${dirPath}/imgTemp`, (err) => {
  //    if (err) console.log(`ERROR: ${err}`);
  //  });
  //  fs.rename(`${dirPath}/${nomeArq}`, `${dirRota}/imgTemp`, (err) => {

  /*   fs.copyFile(`${dirPath}/${nomeArq}`, `${dirRota}/`, (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
  }); */
  res.json('OK');
}
