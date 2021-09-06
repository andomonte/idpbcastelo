import { makeStyles } from '@material-ui/core/styles';
import { lightGreen, yellow, red, blue } from '@material-ui/core/colors';
import axios from 'axios';
import api from 'src/components/services/api';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useSession, signOut } from 'next-auth/client';
// import useSWR from 'swr';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useCallback, useEffect } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
// import { signOut } from 'next-auth/client';
import { Box, Button, Modal } from '@material-ui/core';
import Dropzone, { useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import VideoThumbnail from 'react-video-thumbnail'; // use npm published version
import CardActions from '@material-ui/core/CardActions';
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
// const fetcher = (url) => axios.get(url).then((res) => res.data);
// const fetcher = (url) => fetch(url).then((r) => r.json());

const useStyles = makeStyles((theme) => ({
  rootCard: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  boxUp: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  input: {
    display: 'none',
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
    maxWidth: '250px', // Limite maximo do texto
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
    marginRight: 5,
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
    marginLeft: 5,
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

function enviar({ secao, item, perfilUser }) {
  const DataAtual = new Date();
  let month = Number(DataAtual.getMonth() + 1);
  if (month < 10) month = `0${month}`;
  const Data = `${DataAtual.getDate()}/${month}/${DataAtual.getFullYear()}`;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [send, setSend] = React.useState(false);
  const [transfer, setTransfer] = React.useState('');
  const [miniatura, setMiniatura] = React.useState('');
  const [fileObjects, setFileObjects] = React.useState([]);
  const [contagem, setContagem] = React.useState([]);
  const dataEvento = String(Data.split('/').join('')); // retira a / da data
  const arrayFinal = [];
  const [session] = useSession();

  const [progresso, setProgresso] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const arraytoSend = [];
  let dadosUsuario = '';
  //----------------------------------------------------------------------
  const dadosUser = item.filter((val) => val.email === secao.user.email);
  dadosUsuario = dadosUser.filter((val) => val.NivelUser === perfilUser);

  useEffect(() => {
    if (fileObjects.length > 0) setSend(true);
    else setSend(false);
    if (fileObjects.length > 0) {
      for (let i = 0; i < 2; i += 1) {
        if (fileObjects[i]) arraytoSend[i] = fileObjects[i];
      }
      if (arraytoSend) setFileObjects(arraytoSend);
    }
  }, [contagem]);

  const defaultProps = {
    bgcolor: 'background.paper',
    marginTop: 1,
    border: 'dashed',
    color: '#cfd8dc',
  };
  const handleVoltar = (e) => {
    setFileObjects(fileObjects.slice(fileObjects.indexOf(e.target.name, 1)));
    setFileObjects(fileObjects.filter((x) => x % 2));

    setSend(false);
  };

  //= ======================================================================
  // Carregar AWS s3 com as fotos
  //= ======================================================================
  const updateFile = (tempo) => {
    setProgresso(tempo);
  };
  const enviarURL = async (urlAws, file) => {
    const dataFile = new FormData();
    dataFile.append('file', file[0].file, file[0].name);

    // await axios(uploadImageRequest, configAxios)
    axios
      .put(urlAws.data, file[0].file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },

        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded * 100) / e.total);

          updateFile(progress);
        },
      })
      .then((result) => {
        setTransfer(result.status);
      })
      .catch((error) => {
        console.log('ERROR ', error);
        setTransfer('Error');
      });
  };
  const pegarURL = async (uploadedFiles) => {
    const file = uploadedFiles;

    // get secure url from our server
    api
      .post('api/videos', {
        fileName: file[0].name,
        fileType: file[0].type,
      })
      .then((response) => {
        if (response) {
          // setTransfer(response.status);
          // setEditar(false);
          enviarURL(response, file);
        }
        //  updateFile(uploadedFile.id, { uploaded: true });
      })
      .catch(() => {
        //  updateFile(uploadedFile.id, { error: true });
      });
  };
  const iniciarEnvio = async () => {
    const uploadedFiles = fileObjects.map((file) => ({
      file,
      id: uniqueId(),
      name: `video${file.id}_${dataEvento}_${
        dadosUsuario[0].codigoIgreja
      }${file.name.substring(file.name.lastIndexOf('.'))}`,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));
    pegarURL(uploadedFiles);
    // e.preventDefault();

    setLoading(true);
    setFileObjects(arrayFinal);
  };
  //= ======================================================================
  const FileList = ({ files }) => (
    <Box>
      {files.map((uploadedFile) => (
        <Box key={uniqueId()}>
          <Box flexDirection="row" {...defaultProps} width="100%" height={265}>
            <VideoThumbnail
              videoUrl={uploadedFile.preview}
              thumbnailHandler={(thumbnail) => {
                setMiniatura(thumbnail);
              }}
              renderThumbnail={false}
            />

            <Card className={classes.rootCard}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  component="img"
                  src={miniatura}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <strong>{uploadedFile.name}</strong>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <span>{uploadedFile.readableSize}</span>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexdDirection: 'column',
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleVoltar}
                  className={classes.buttonCancel}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  className={classes.buttonGreen}
                  onClick={iniciarEnvio}
                  disabled={!send}
                >
                  Enviar
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Box>
      ))}
    </Box>
  );
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
    });

    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragReject,
    } = useDropzone({
      onDrop,

      accept: 'video/*',
    });

    const DragMessage = (a, b) => {
      if (send && !loading && transfer === '') {
        return (
          <>
            <UploadMessage>
              <CheckCircleIcon style={{ color: '#76ff03', fontSize: 50 }} />
            </UploadMessage>
            <Box mt={-2} mb={2}>
              Video Selecionado
            </Box>
          </>
        );
      }
      if (send && loading && transfer === '') {
        return (
          <UploadMessage>
            <CircularProgressWithLabel />
            <Box mt={1} mb={-2}>
              Enviando Vídeo
            </Box>
          </UploadMessage>
        );
      }
      if (send && loading && transfer === 200) {
        return (
          <UploadMessage>
            <Alert
              action={
                <Button
                  onClick={() => {
                    setLoading(false);
                    setTransfer('');
                    setSend(false);
                  }}
                  color="inherit"
                  size="small"
                  severity="success"
                >
                  <CancelIcon />
                </Button>
              }
            >
              Vídeo enviado com Sucesso!!!
            </Alert>
          </UploadMessage>
        );
      }
      if (send && loading && transfer === 'Error') {
        return (
          <UploadMessage>
            <Alert
              severity="error"
              action={
                <Button
                  onClick={() => {
                    setLoading(false);
                    setTransfer('');
                  }}
                  color="inherit"
                  size="small"
                >
                  <CancelIcon />
                </Button>
              }
            >
              ops, algo deu errado,favor reenviar o vídeo !!!
            </Alert>
          </UploadMessage>
        );
      }

      if (!a && !send) {
        return (
          <UploadMessage>
            <Button>
              <CameraAltIcon fontSize="large" style={{ color: 'blue' }} />
            </Button>
            Pressione Aqui para Inserir o Vídeo
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
  //--------------------------------------------------------------------------

  function CircularProgressWithLabel() {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" value={progresso} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="caption"
            component="div"
            color="textSecondary"
          >{`${progresso}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {session ? (
        <Box align="center" width="100%">
          <MyDropzone />
        </Box>
      ) : (
        signOut({
          callbackUrl: `${window.location.origin}`,
        })
      )}
      {fileObjects.length > 0 && !send && setSend(true)}
    </>
  );
}

export default enviar;
