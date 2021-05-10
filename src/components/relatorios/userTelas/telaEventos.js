import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { signOut } from 'next-auth/client';
import { Box } from '@material-ui/core';
import Dropzone, { useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';
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
const useStyles = makeStyles((theme) => ({
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
function MyDropzone() {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({ accept: 'image/*' });

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
      <FileList />
    </Dropzone>
  );
}

export default function TelaEventos() {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Box className={classes.boxInterno}>
        <MyDropzone />
      </Box>
    </Box>
  );
}
