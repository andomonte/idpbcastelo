import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
// import { makeStyles } from '@material-ui/core/styles';
import styled, { css } from 'styled-components';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import api from 'src/components/services/api';
import { Button } from '@material-ui/core';
import FileList from '../../fileList/index';

const dragActive = css`
  border-color: #76ff03;
`;
const dragReject = css`
  border-color: #ff5722;
`;
const messageColors = {
  default: '#fff',
  error: '#ff5722',
  success: '#76ff03',
};

const DropContainer = styled.div.attrs({
  className: 'dropzone',
})`
  border: 3px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: height 0.2s ease;

  ${(props) => props.isDragActive && dragActive}
  ${(props) => props.isDragReject && dragReject}
`;
const UploadMessage = styled.p`
  display: flex;
  color: ${(props) => messageColors[props.type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
/* const useStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  boxInterno: {
    width: '100%',
    maxWidth: '400px',
    margin: '30px',
    background: '#bcaaa4',
    borderRadius: '4px',
    padding: '20px',
  },
  dragMessage: {
    width: '100%',
    maxWidth: '400px',
    margin: '30px',
    background: '#bcaaa4',
    borderRadius: '4px',
    padding: '20px',
  },
}));
const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
}; */

function DropzoneComponent() {
  const [files, setFiles] = useState([]);
  const [state, setState] = useState([]);
  const [lista, setLista] = useState(0);
  const [send, setSend] = useState(false);

  let newValue = [];
  const newList = [];
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: uniqueId(),
        }),
      ),
    );
    // setState(files);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });

  const handleUpload = () => {
    const uploadedFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    if (uploadedFiles) {
      setState((old) => [...old, ...uploadedFiles]);
      //     setState();
      // console.log('state:', state);
    }
  };
  const thumbs = files.map((file) => (
    <div key={file.id}>
      <img src={file.preview} alt={file.name} height={1} width={1} />
    </div>
  ));
  const novoValor = (novoArquivo) => {
    newValue = [
      ...new Map(novoArquivo.map((item) => [item.name, item])).values(),
    ];
    // console.log('deu certo:', newValue);
  };

  //= =========================================================================
  const updateFile = (id, data) => {
    setState(
      state.map((uploadedFile) =>
        id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile,
      ),
    );

    // console.log('newlist', newList);
  };

  const processUpload = (uploadedFile) => {
    const data = new FormData();
    data.append('file', uploadedFile.file, uploadedFile.name);

    api
      .post('api/fotos', data, {
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded * 100) / e.total);
          updateFile(uploadedFile.id, { progress });
        },
      })
      .then((response) => {
        if (response) console.log(response);
        updateFile(uploadedFile.id, { uploaded: true });
      })
      .catch(() => {
        updateFile(uploadedFile.id, { error: true });
      });
  };

  const iniciarEnvio = () => {
    setSend(true);
    newValue.forEach(processUpload);
    console.log('começou o envio dos dados');
  };
  const terminarEnvio = () => {
    setSend(false);
  };

  useEffect(() => {
    if (!send) handleUpload();
    setLista(lista + 1);
    if (lista >= 5) setLista(0);
    // setLista(newList);
    // iniciarEnvio();
  }, [files]);

  //= =========================================================================

  // clean up
  const DragMessage = (a, b) => {
    if (!a) {
      return <UploadMessage>Arraste arquivos aqui..</UploadMessage>;
    }
    if (b) {
      return (
        <UploadMessage type="error">Arquivo não suportado..</UploadMessage>
      );
    }
    return (
      <UploadMessage type="success">Solte os arquivos aqui..</UploadMessage>
    );
  };
  return (
    <section>
      <DropContainer
        {...getRootProps()}
        isDragActive={isDragActive}
        isDragReject={isDragReject}
      >
        <input {...getInputProps()} />
        {DragMessage(isDragActive, isDragReject)}
        {novoValor(state)}
      </DropContainer>
      <aside>
        {newList.length > 0 && console.log('newList:', newList)}
        {newValue.length > 0 && <FileList files={newValue} />}
        {thumbs}
        <Button onClick={iniciarEnvio}>Enviar</Button>
        <Button onClick={terminarEnvio}>Deletar</Button>
      </aside>
    </section>
  );
}

export default DropzoneComponent;
