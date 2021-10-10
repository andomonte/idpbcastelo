import api from 'src/components/services/api';

const FileSaver = require('file-saver');

export default async function downloadImg(urlFile) {
  const enviarURL = async (urlAws) => {
    FileSaver.saveAs(urlAws.data, 'image.jpg');

    /* axios
      .get(urlAws.data, urlFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => result)
      .catch((error) => {
        console.log('ERROR ', error);
        return error;
      }); */
  };
  // get secure url from our server
  api
    .post('/api/imagens', {
      fileName: urlFile,
    })
    .then((response) => {
      if (response) {
        enviarURL(response, urlFile);
      }
      //  updateFile(uploadedFile.id, { uploaded: true });
    })
    .catch(() => {
      //  updateFile(uploadedFile.id, { error: true });
    });
}
