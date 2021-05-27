import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { signOut } from 'next-auth/client';
import { Box, Button, Modal } from '@material-ui/core';
import Dropzone, { useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';

import { uniqueId } from 'lodash';
import filesize from 'filesize';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import { Container, FileInfo, Preview } from './styles';
import 'react-circular-progressbar/dist/styles.css';
// import FileList from '../../fileList/index';

const dragActive = css`
  border-color: #76ff03;
`;
const dragReject = css`
  border-color: #ff5722;
`;

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
  flex-direction: column;
  color: #000;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
const useStyles = makeStyles(() => ({
  boxUp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  boxInterno: {
    width: '100%',
    maxWidth: '400px',
    margin: '3px',
    background: '#fff',
    borderRadius: '4px',
    padding: '20px',
  },
  qtyLetras: {
    maxWidth: '150px', // Limite maximo do texto
    whitespace: 'nowrap', // Removendo quebra de linha
    overflow: 'hidden', // Removendo a barra de rolagem
    textoverflow: 'ellipsis', // Adicionando "..." ao final do texto
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
export default function TelaEventos() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  let uploadedFiles = [];
  const [fileObjects, setFileObjects] = React.useState([]);
  const FileList = ({ files }) => (
    <div>
      {console.log('filesList:', files)}
      <Container>
        {files.map((uploadedFile) => (
          <li key={uniqueId()}>
            <FileInfo>
              <Preview src={uploadedFile.preview} />
              <Box className={classes.qtyLetras}>
                <strong>{uploadedFile.name}</strong>
                <span>
                  {uploadedFile.readableSize}

                  <button
                    type="button"
                    onClick={() => {
                      console.log(uploadedFile.id);
                    }}
                  >
                    Excluir
                  </button>
                </span>
              </Box>
            </FileInfo>
            <div>
              {!uploadedFile.uploaded && !uploadedFile.error && (
                <CircularProgressbar
                  styles={{
                    root: { width: 30 },
                    path: { stroke: '#7159c1' },
                  }}
                  strokeWidth={10}
                  // percentage={20} // {uploadedFile.progress}

                  value={uploadedFile.progress}
                />
              )}
              {uploadedFile.url && (
                <a
                  href="https://sistemaidpb.s3.amazonaws.com/CAMPO%20GRANDE.png"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdLink styles={{ marginRight: 8 }} size={24} color="#222" />
                </a>
              )}
              {uploadedFile.uploaded && (
                <MdCheckCircle size={24} color="#78e5d5" />
              )}
              {uploadedFile.error && <MdError size={24} color="#e57878" />}
            </div>
          </li>
        ))}
      </Container>
    </div>
  );
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  function MyDropzone() {
    const onDrop = useCallback((acceptedFiles) => {
      console.log('acceptedFiles', acceptedFiles);
      setFileObjects([].concat(fileObjects, acceptedFiles));
    });

    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragReject,
    } = useDropzone({
      onDrop,

      accept: 'image/*',
    });

    const fileSend = () => {
      uploadedFiles = fileObjects.map((file) => ({
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
    };

    const DragMessage = (a, b) => {
      if (!a) {
        return (
          <UploadMessage>
            <Button>
              <ImageSearchIcon fontSize="large" style={{ color: 'black' }} />
            </Button>
            Pressione Aqui para Inseir Imagens
          </UploadMessage>
        );
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
      <>
        <Dropzone>
          {() => (
            <DropContainer
              {...getRootProps()}
              isDragActive={isDragActive}
              isDragReject={isDragReject}
            >
              <input {...getInputProps()} />
              {DragMessage(isDragActive, isDragReject)}
            </DropContainer>
          )}
        </Dropzone>
        {fileSend()}
        {console.log('->', uploadedFiles)}
        {uploadedFiles.length > 0 && <FileList files={uploadedFiles} />}
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={handleClose}
          >
            Voltar
          </Button>
        </Box>
      </>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={classes.boxUp}>
        <Box className={classes.boxInterno}>
          <div>
            <div>
              <MyDropzone />
            </div>
          </div>
        </Box>
      </Box>
    </Modal>
  );
}
