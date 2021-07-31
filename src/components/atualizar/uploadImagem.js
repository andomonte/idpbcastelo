import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { lightGreen, yellow, red, blue } from '@material-ui/core/colors';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import api from 'src/components/services/api';
import AddIcon from '@material-ui/icons/Add';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { useSession, signOut } from 'next-auth/client';
import useSWR, { mutate } from 'swr';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useCallback, useEffect } from 'react';
import Image from 'material-ui-image';
// import { signOut } from 'next-auth/client';
import { Box, Button, Modal, Avatar } from '@material-ui/core';
import Dropzone, { useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import JsFileDownloader from 'js-file-downloader';

import { Container, FileInfo, Preview } from './styles';
import 'react-circular-progressbar/dist/styles.css';
// const download = require('image-downloader');

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
//----------------------------------------------------------------
const fetcher = (url) => axios.get(url).then((res) => res.data);
// const fetcher = (url) => fetch(url).then((r) => r.json());

const useStyles = makeStyles((theme) => ({
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
  boxImage: {
    width: '100%',
    maxWidth: '600px',
    maxHeight: '400',
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

  root: {
    flexGrow: 1,
    alignContent: 'center',
  },
  buttonCancel: {
    alignContent: 'center',
    // color: theme.palette.background.primary,
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  buttonVoltar: {
    alignContent: 'center',
    // color: theme.palette.background.primary,
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
    '&:hover': {
      backgroundColor: yellow[700],
    },
  },
  buttonSalvar: {
    alignContent: 'center',
    // color: theme.palette.background.primary,
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
  buttonGreen: {
    alignContent: 'center',
    // color: theme.palette.background.primary,
    color: theme.palette.getContrastText(lightGreen.A400),
    backgroundColor: lightGreen.A400,
    '&:hover': {
      backgroundColor: lightGreen.A700,
    },
  },
  button: {
    alignContent: 'center',
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 0,
    '& > *': {
      margin: theme.spacing(2),
      // width: '50ch',
    },
  },
  novoBox: {
    flexGrow: 1,

    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  tf_12: {
    // marginLeft: theme.spacing(1),
    //  marginRight: theme.spacing(1),
    width: '500px',

    margin: 10,
    [theme.breakpoints.down('md')]: {
      width: '20',
    },
  },
  tf_m: {
    width: '100%',
    fontSize: '5px',
  },

  tf_6: {
    //    marginRight: 8,
    margin: 10,
    width: '240px',
    textAlign: 'center',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      margin: 10,
      width: '205px',
    },
  },
  tf_4: {
    margin: 10,
    // marginRight: 8,
    width: '155px',
    textAlign: 'center', // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      width: '130px',
    },
  },
  tf_3: {
    margin: 10,
    textAlign: 'center',
    // marginRight: 8,
    width: '120px',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      width: '110px',
    },
  },
  buttonProgress: {
    color: lightGreen[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

function formulario({ item, Data }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openImage, setOpenImage] = React.useState(false);
  const [send, setSend] = React.useState(false);
  const [fileObjects, setFileObjects] = React.useState([]);
  const [contagem, setContagem] = React.useState([]);
  const dataEvento = String(Data.split('/').join('')); // retira a / da data
  const arrayFinal = [];
  const [session] = useSession();

  const [editar, setEditar] = React.useState();
  const [igreja] = React.useState(item[0].igreja);
  const [codigoIgreja] = React.useState(item[0].codigoIgreja);
  const [evento, setEvento] = React.useState('');
  const [adultos, setAdultos] = React.useState('');
  const [adolecentes, setAdolecentes] = React.useState('');
  const [criancas, setCriancas] = React.useState('');
  const [visitantes, setVisitantes] = React.useState('');
  const [conversoes, setConversoes] = React.useState('');
  const [img01, setImg01] = React.useState('');
  const [img02, setImg02] = React.useState('');
  const [img03, setImg03] = React.useState('');
  const [img04, setImg04] = React.useState('');
  const [img05, setImg05] = React.useState('');
  const [validarEvento, setValidarEvento] = React.useState('sim');
  const [validarAdultos, setValidarAdultos] = React.useState('sim');
  const [validarAdolecentes, setValidarAdolecentes] = React.useState('sim');
  const [validarCriancas, setValidarCriancas] = React.useState('sim');
  const [validarVisitantes, setValidarVisitantes] = React.useState('sim');
  const [validarConversoes, setValidarConversoes] = React.useState('sim');
  let Img01 = '';
  const Img02 = '';
  const Img03 = '';
  const Img04 = '';
  const Img05 = '';
  let progresso = 0;

  const [contImage, setContImage] = React.useState(0);
  const [contador, setContador] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const arraytoSend = [];
  const arrayImage = [];

  //----------------------------------------------------------------------
  const url = `${window.location.origin}/api/consultaEventos/${item[0].codigoIgreja}/${dataEvento}`;

  useEffect(() => {
    if (fileObjects.length > 4) setSend(true);
    else setSend(false);
    if (fileObjects.length > 0) {
      for (let i = 0; i < 5; i += 1) {
        if (fileObjects[i]) arraytoSend[i] = fileObjects[i];
      }
      if (arraytoSend) setFileObjects(arraytoSend);
    }
  }, [contagem]);

  function atualizarLista(idAtual) {
    setFileObjects(fileObjects.filter((el) => el.id !== idAtual.id));
    setContagem(fileObjects.filter((el) => el.id !== idAtual.id));
    //  setFileObjects(arraytoSend);
  }

  const FileList = ({ files }) => (
    <div>
      <Container>
        {files.map((uploadedFile) => (
          <li key={uniqueId()}>
            <FileInfo>
              <Preview src={uploadedFile.preview} />
              <Box className={classes.qtyLetras}>
                <strong>{uploadedFile.name}</strong>
                <span>{uploadedFile.readableSize}</span>
              </Box>
            </FileInfo>
            <div>
              {uploadedFile.progress > 0 && !uploadedFile.error ? (
                <CircularProgressbar
                  styles={{
                    root: { width: 30 },
                    path: { stroke: '#7159c1' },
                  }}
                  strokeWidth={10}
                  // percentage={20on} // {uploadedFile.progress}

                  value={uploadedFile.progress}
                />
              ) : (
                <DeleteForeverIcon
                  type="button"
                  onClick={() => {
                    atualizarLista(uploadedFile);
                  }}
                  style={{ color: 'red', fontSize: 30 }}
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
  const handleVoltar = (e) => {
    setFileObjects(fileObjects.slice(fileObjects.indexOf(e.target.name, 1)));
    setFileObjects(fileObjects.filter((x) => x % 2));
    setOpen(false);
    if (!editar) {
      setEditar(true);
      setContador('0');
    } else {
      setEditar(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fileSend = () => {
    Img01 = String(fileObjects[0].preview);

    setOpen(false);

    setImg01(Img01);
  };

  function MyDropzone() {
    const onDrop = useCallback((acceptedFiles) => {
      setFileObjects(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: uniqueId(),
            readableSize: filesize(file.size),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
          }),
        ),
      );
      setFileObjects([].concat(fileObjects, acceptedFiles));
      setContagem([].concat(contagem, acceptedFiles));
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

    const DragMessage = (a, b) => {
      if (send) {
        return (
          <UploadMessage>
            <CheckCircleIcon style={{ color: '#76ff03', fontSize: 50 }} />
          </UploadMessage>
        );
      }
      if (!a && !send) {
        return (
          <UploadMessage>
            <Button>
              <ImageSearchIcon fontSize="large" style={{ color: 'black' }} />
            </Button>
            Pressione Aqui para Inseir Imagens
          </UploadMessage>
        );
      }
      if (b && !send) {
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
              {...getRootProps({
                onClick: (event) => {
                  if (send) {
                    event.stopPropagation();
                  }
                },
              })}
              isDragActive={isDragActive}
              isDragReject={isDragReject}
            >
              <input {...getInputProps()} />
              {DragMessage(isDragActive, isDragReject)}
            </DropContainer>
          )}
        </Dropzone>
        {/* type: file.name.str.substr('.'), */}
        {fileObjects.length > 0 && <FileList files={fileObjects} />}
      </>
    );
  }

  //--------------------------------------------------------------------------

  function TelaEventos() {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={classes.boxUp}>
          <Box className={classes.boxInterno}>
            <MyDropzone />

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
              mt={2}
            >
              <Button
                variant="contained"
                size="small"
                onClick={handleVoltar}
                className={classes.buttonCancel}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                size="small"
                className={classes.buttonGreen}
                onClick={fileSend}
                disabled={!send}
              >
                Adicionar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  }
  //= ======================================================================
  // Carregar AWS s3 com as fotos
  //= ======================================================================

  const updateFile = (tempo) => {
    progresso = (tempo + progresso) / 500;
  };
  const processUpload = (uploadedFile) => {
    const dataFile = new FormData();
    dataFile.append('file', uploadedFile.file, uploadedFile.name);

    api
      .post('api/fotos', dataFile, {
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded * 100) / e.total);

          updateFile(progress);
        },
      })
      .then((response) => {
        if (response) console.log(response);
        //  updateFile(uploadedFile.id, { uploaded: true });
      })
      .catch(() => {
        //  updateFile(uploadedFile.id, { error: true });
      });
  };

  const img1 = `https://sistemaidpb.s3.amazonaws.com/${uploadedFiles[0].name}`;

  return (
    <>
      {open && <TelaEventos />}
      {openImage && <ShowImage />}
    </>
  );
}

export default formulario;
