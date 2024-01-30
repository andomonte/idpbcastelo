import nc from 'next-connect';

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const KEY_FILE_PATH = path.join('googleDrive.json');

const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE_PATH,
  scopes: SCOPES,
});
async function upload(req, res) {
  try {
    const file = req.dataFile;
    console.log('file', file);
    const { data } = await google.drive({ version: 'v3', auth }).files.create({
      media: {
        mimeType: file.mimeType,
        body: fs.createReadStream(file.path),
      },
      requestBody: {
        name: file.originalname,
        parents: [process.env.GOOGLE_API_FOLDER_ID], // folder id in which file should be uploaded
      },
      fields: 'id,name',
    });

    console.log(`File uploaded successfully -> ${JSON.stringify(data)}`);

    res.json({
      status: 1,
      message: 'success',
      file_id: data.id,
      file_name: data.name,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: -1, message: 'failure', err: error.message });
  }
}
const handler = nc()
  .use(upload.single('file'))
  .post((req, res) => {
    res.json({ Arquivo: 'Arquivado com sucesso' });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
