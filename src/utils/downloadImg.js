import axios from 'axios';
import api from 'src/components/services/api';
import { saveAs } from 'file-saver';

const FileSaver = require('file-saver');

export default async function downloadImg(urlFile) {
  const enviarURL = async (urlAws, file) => {
    console.log(urlAws);
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
    .post('api/imagens', {
      fileName: urlFile,
    })
    .then((response) => {
      if (response) {
        enviarURL(response, urlFile);
      }
      //  updateFile(uploadedFile.id, { uploaded: true });
    })
    .catch(() => {
      console.log('deu erro aqui');
      //  updateFile(uploadedFile.id, { error: true });
    });
}
