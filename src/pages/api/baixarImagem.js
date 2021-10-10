// import aws from 'aws-sdk';
// import download from 'image-downloader';
import path from 'path';
import fs from 'fs';

// const result = downloadS3(valor); // import downloads from 'src/utils/download'; // import fileDownload from 'js-file-download';

/* async function downloadS3(s3, params) {
  (async () => {
    try {
      const file = await s3.getObject(params).promise();
      console.log('aqui não', file);
      fileDownload(file, 'filename.csv');
      return file;
    } catch (err) {
      console.log(err);
      return err;
    }
  })();
} */ /* async function baixarArquivo(valor) {
  let nomeArq = '';
  const dirPath = path.join(__dirname, '../../../../public/images/temp');
  const options = {
    url: valor,
    dest: dirPath, // will be saved to /path/to/dest/image.jpg
  };
 */ /*  await download
    .image(options)
    .then(({ filename }) => {
      nomeArq = filename;
      console.log('Saved to', nomeArq); // saved to /path/to/dest/image.jpg
      return nomeArq;
    })
    .catch((err) => console.error(err));
  return nomeArq;
} */ export default async function handle(
  req,
  res,
) {
  const valor = { ...req.body };
  const dirPath = path.join(__dirname, '../../../../public/images/temp');

  //  await baixarArquivo(valor.dados);
  // await downloads(valor.name);
  // const dirRota = path.join(__dirname, '../../../../src/pages/temp');
  // if (result) baixarPC(result);
  // console.log(result);
  fs.rename(
    `${dirPath}/${valor.name}`,
    `${dirPath}/imgTemp${valor.tipo}`,
    (err) => {
      if (err) console.log(`ERROR: ${err}`);
    },
  );
  res.json('ok');
}

/* const dirPath = path.join(__dirname, '../../../../public/images/temp');
await baixarArquivo(valor.dados);
// const dirRota = path.join(__dirname, '../../../../src/pages/temp');
// if (result) baixarPC(result);
// console.log(result);
fs.rename(
  `${dirPath}/${valor.name}`,
  `${dirPath}/imgTemp${valor.tipo}`,
  (err) => {
    if (err) console.log(`ERROR: ${err}`);
    else console.log('ok');
  },
);
 */

/* const ACCESS_KEY_ID = process.env.AWSACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.AWSSECRET_KEY;
  const BUCKET_NAME = 'sistemaidpb';

  console.log('img', valor.name, ACCESS_KEY_ID);
  const s3 = new aws.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const params = {
    Key: valor.name,
    Bucket: BUCKET_NAME,
  };

  // const response = await downloadS3(s3, params);

  (async () => {
    try {
      const file = await s3.getObject(params).promise();
      console.log('aqui não', file.Body);
      res.json(file);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  })(); */
