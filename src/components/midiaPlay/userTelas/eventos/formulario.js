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
import Loading from 'src/utils/loading';
import MesageErro from 'src/utils/mesageErro';

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
  let Img02 = '';
  let Img03 = '';
  let Img04 = '';
  let Img05 = '';
  let progresso = 0;

  const [contImage, setContImage] = React.useState(0);
  const [contador, setContador] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const arraytoSend = [];
  let arrayImage = [];

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
  const handleCloseImagem = () => {
    setOpenImage(false);
  };
  const fileSend = () => {
    /*  for (let i = 0; i < 5; i += 1) {
      uploadedFiles[i] = [fileObjects[i]];
    } */
    Img01 = String(fileObjects[0].preview);
    Img02 = String(fileObjects[1].preview);
    Img03 = String(fileObjects[2].preview);
    Img04 = String(fileObjects[3].preview);
    Img05 = String(fileObjects[4].preview);
    /*     Img02 = JSON.parse(JSON.stringify(fileObjects[1]));
    Img03 = JSON.parse(JSON.stringify(fileObjects[2]));
    Img04 = JSON.parse(JSON.stringify(fileObjects[3]));
    Img05 = JSON.parse(JSON.stringify(fileObjects[4]));
 */ setOpen(
      false,
    );

    setImg01(Img01);
    setImg02(Img02);
    setImg03(Img03);
    setImg04(Img04);
    setImg05(Img05);
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

  // const [editar, setEditar] = React.useState(true);

  const { data, error } = useSWR(url, fetcher);
  // useSWR('/api/user', (id = 4) => fetcher(id));
  // useSWR('/api/consultaDados', fetcher);
  if (error)
    return (
      <div>
        <MesageErro />
      </div>
    );
  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );
  //---------------------------------------------------------------------------
  const dadosRel = data.filter((val) => val.dataEvento === dataEvento);
  let Evento = '';
  let Adultos = '';
  let Adolecentes = '';
  let Crianças = '';
  let Visitantes = '';
  let Conversoes = '';
  let ids = '';

  if (dadosRel.length !== 0) {
    Evento = dadosRel[0].evento;
    Adultos = dadosRel[0].adultos;
    Adolecentes = dadosRel[0].adolecentes;
    Crianças = dadosRel[0].criancas;
    Visitantes = dadosRel[0].visitantes;
    Conversoes = dadosRel[0].conversoes;
    ids = dadosRel[0].id;
    Img01 = dadosRel[0].img01;
    Img02 = dadosRel[0].img02;
    Img03 = dadosRel[0].img03;
    Img04 = dadosRel[0].img04;
    Img05 = dadosRel[0].img05;
  }

  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  const valid = () => {
    if (
      !adultos ||
      !adolecentes ||
      !criancas ||
      !visitantes ||
      !conversoes ||
      !evento
    ) {
      return false;
    }
    return true;
  };
  //--------------------------------------------------------------------------
  const handleModal = () => {
    setOpen(true);
    setSend(false);
    setEvento(Evento);
    setAdultos(Adultos);
    setAdolecentes(Adolecentes);
    setCriancas(Crianças);
    setVisitantes(Visitantes);
    setConversoes(Conversoes);

    if (!editar) {
      setEditar(true);
      setContador('0');
    } else {
      setEditar(false);
    }
  };
  const handleClick = () => {
    setEvento(Evento);
    setAdultos(Adultos);
    setAdolecentes(Adolecentes);
    setCriancas(Crianças);
    setVisitantes(Visitantes);
    setConversoes(Conversoes);
    setImg01(Img01);
    setImg02(Img02);
    setImg03(Img03);
    setImg04(Img04);
    setImg05(Img05);
    if (!editar) {
      setEditar(true);
      setContador('0');
    } else {
      setEditar(false);
    }
  };
  const handleClickVoltar = (e) => {
    setFileObjects(fileObjects.slice(fileObjects.indexOf(e.target.name, 1)));
    setFileObjects(fileObjects.filter((x) => x % 2));
    setOpen(false);

    setEvento(Evento);
    setAdultos(Adultos);
    setAdolecentes(Adolecentes);
    setCriancas(Crianças);
    setVisitantes(Visitantes);
    setConversoes(Conversoes);
    setImg01(Img01);
    setImg02(Img02);
    setImg03(Img03);
    setImg04(Img04);
    setImg05(Img05);
    if (!editar) {
      setEditar(true);
      setContador('0');
    } else {
      setEditar(false);
    }
  };
  const handleOpenImage = () => {
    setOpenImage(true);
  };
  /*   const handleBaixarImage = async () => {
    //    const valor = downloadS3(arrayImage[contImage]);
    // const ini = arrayImage[contImage].indexOf('img');
    // const nomeImg = arrayImage[contImage].slice(ini); // const nameFile = nomeImg;
    /*    // const tipo = arrayImage[contImage].substring(
      arrayImage[contImage].lastIndexOf('.'),
    );
 
    api
      .post('api/baixarImagem', {
        dados: arrayImage[contImage],
        name: arrayImage[contImage].substring(
          arrayImage[contImage].lastIndexOf('img'),
        ),
        tipo: arrayImage[contImage].substring(
          arrayImage[contImage].lastIndexOf('.'),
        ),
      })

      .then(() => {})

      .catch(() => {
        //  updateFile(uploadedFile.id, { error: true });
      });
    setOpenImage(false);
  }; */

  const handleContImage = () => {
    setContImage(contImage + 1);
    if (contImage > 3) setContImage(0);
  };
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------

  const submitData = async (e) => {
    e.preventDefault();
    const valida = valid();
    setLoading(true);

    if (valida) {
      try {
        const body = {
          evento,
          igreja,
          codigoIgreja,
          dataEvento,
          adultos,
          adolecentes,
          criancas,
          visitantes,
          conversoes,
          img01,
          img02,
          img03,
          img04,
          img05,
        };

        let urlCreate = '';
        if (dadosRel.length === 0) {
          urlCreate = `${window.location.origin}/api/criarEvento`;
        } else {
          urlCreate = `${window.location.origin}/api/updateEvento/${ids}`;
        }

        await fetch(urlCreate, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        setLoading(false);
        setEditar(false);
        mutate(url);
      } catch (errors) {
        console.errors();
      }
    }
  };
  function ShowImage() {
    arrayImage = [Img01, Img02, Img03, Img04, Img05];

    return (
      <Modal
        open={openImage}
        onClose={handleCloseImagem}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={classes.boxUp}>
          <ClickAwayListener onClickAway={handleCloseImagem}>
            <Box className={classes.boxImage}>
              <Image onClick={handleContImage} src={arrayImage[contImage]} />
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
                mt={2}
              >
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleCloseImagem}
                  className={classes.buttonCancel}
                >
                  Fechar
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  className={classes.buttonGreen}
                  onClick={handleContImage}
                >
                  Próxima
                </Button>
              </Box>
            </Box>
          </ClickAwayListener>
        </Box>
      </Modal>
    );
  }
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

  const iniciarEnvio = async (e) => {
    const uploadedFiles = fileObjects.map((file) => ({
      file,
      id: uniqueId(),
      name: `img${file.id}_${dataEvento}_${
        item[0].codigoIgreja
      }${file.name.substring(file.name.lastIndexOf('.'))}`,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));
    uploadedFiles.forEach(processUpload);
    const img1 = `https://sistemaidpb.s3.amazonaws.com/${uploadedFiles[0].name}`;
    const img2 = `https://sistemaidpb.s3.amazonaws.com/${uploadedFiles[1].name}`;
    const img3 = `https://sistemaidpb.s3.amazonaws.com/${uploadedFiles[2].name}`;
    const img4 = `https://sistemaidpb.s3.amazonaws.com/${uploadedFiles[3].name}`;
    const img5 = `https://sistemaidpb.s3.amazonaws.com/${uploadedFiles[4].name}`;

    e.preventDefault();
    const valida = valid();
    setLoading(true);

    if (valida) {
      try {
        const body = {
          evento,
          igreja,
          codigoIgreja,
          dataEvento,
          adultos,
          adolecentes,
          criancas,
          visitantes,
          conversoes,
          img01: img1,
          img02: img2,
          img03: img3,
          img04: img4,
          img05: img5,
        };

        let urlCreate = '';
        if (dadosRel.length === 0) {
          urlCreate = `${window.location.origin}/api/criarEvento`;
        } else {
          urlCreate = `${window.location.origin}/api/updateEvento/${ids}`;
        }

        await fetch(urlCreate, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        setLoading(false);
        setEditar(false);
        mutate(url);
      } catch (errors) {
        console.errors();
      }
    }
    setFileObjects(arrayFinal);
  };
  //= ======================================================================
  /* useEffect(() => {
    if (open) TelaEventos();
  }, [open]);
 */
  return (
    <>
      {session ? (
        <Box
          mt={1}
          className={classes.box}
          width="100%"
          //            maxWidth={1200}
          height="auto"
          borderRadius={16}
        >
          <form
            noValidate
            autoComplete="off"
            width="100%"
            className={classes.root}
          >
            <Box display="flex" flexDirection="row">
              <Grid item xs={12} md={9}>
                <Box className={classes.novoBox}>
                  <TextField
                    id="igreja"
                    label="Igreja"
                    variant="outlined"
                    value={item[0].igreja}
                    disabled
                    size="small"
                    className={classes.tf_m}
                  />
                </Box>
              </Grid>
              <Hidden smDown>
                <Grid item xs={3}>
                  <Box className={classes.novoBox}>
                    <TextField
                      id="codigoIgreja"
                      label="Código"
                      variant="outlined"
                      value={item[0].codigoIgreja}
                      disabled
                      className={classes.tf_m}
                      size="small"
                    />
                  </Box>
                </Grid>
              </Hidden>
            </Box>
            <br />
            <Box display="flex" flexDirection="row">
              <Grid item xs={12}>
                <Box className={classes.novoBox}>
                  {editar ? (
                    <TextField
                      className={classes.tf_m}
                      id="Evento"
                      label="Evento"
                      type="string"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={evento}
                      variant="outlined"
                      placeholder="Qual foi o Evento"
                      size="small"
                      onBlur={
                        evento === ''
                          ? () => setValidarEvento('nao')
                          : (() => setValidarEvento('sim'),
                            () => setContador('1'))
                      }
                      onChange={(e) => setEvento(e.target.value)}
                      error={validarEvento === 'nao'}
                      onFocus={(e) => setEvento(e.target.value)}
                      helperText={error ? 'Não pode ser Vazio!' : ''}
                      inputRef={(input) => {
                        if (input != null && contador === '0') {
                          input.focus();
                        }
                      }}
                    />
                  ) : (
                    <TextField
                      className={classes.tf_m}
                      id="Evento"
                      label="Evento"
                      type="string"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={Evento}
                      variant="outlined"
                      placeholder="Qual foi o Evento"
                      size="small"
                      disabled
                    />
                  )}
                </Box>
              </Grid>
            </Box>
            <Box display="flex" flexDirection="row">
              <Grid item xs={4}>
                <Box className={classes.novoBox}>
                  {editar ? (
                    <TextField
                      className={classes.tf_m}
                      id="Adultos"
                      label="+ 18 anos"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={adultos}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        adultos === ''
                          ? () => setValidarAdultos('nao')
                          : () => setValidarAdultos('sim')
                      }
                      onChange={(e) => setAdultos(e.target.value)}
                      error={validarAdultos === 'nao'}
                      onFocus={(e) => setAdultos(e.target.value)}
                      helperText={error ? 'Não pode ser Vazio!' : ''}
                    />
                  ) : (
                    <TextField
                      className={classes.tf_m}
                      id="Adultos"
                      label="+ 18 anos"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={Adultos}
                      variant="outlined"
                      placeholder="0"
                      size="small"
                      disabled
                    />
                  )}
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box className={classes.novoBox}>
                  {editar ? (
                    <TextField
                      className={classes.tf_m}
                      id="Adolecentes"
                      label="+ 12 anos"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={adolecentes}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        adolecentes === ''
                          ? () => setValidarAdolecentes('nao')
                          : () => setValidarAdolecentes('sim')
                      }
                      onChange={(e) => setAdolecentes(e.target.value)}
                      error={validarAdolecentes === 'nao'}
                      onFocus={(e) => setAdolecentes(e.target.value)}
                      helperText={error ? 'Não pode ser Vazio!' : ''}
                    />
                  ) : (
                    <TextField
                      className={classes.tf_m}
                      id="Adolecentes"
                      label="+ 12 anos"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={Adolecentes}
                      variant="outlined"
                      placeholder="0"
                      size="small"
                      disabled
                    />
                  )}
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box className={classes.novoBox}>
                  {editar ? (
                    <TextField
                      className={classes.tf_m}
                      id="Crianças"
                      label="Crianças"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={criancas}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        criancas === ''
                          ? () => setValidarCriancas('nao')
                          : () => setValidarCriancas('sim')
                      }
                      onChange={(e) => setCriancas(e.target.value)}
                      error={validarCriancas === 'nao'}
                      onFocus={(e) => setCriancas(e.target.value)}
                      helperText={error ? 'Não pode ser Vazio!' : ''}
                    />
                  ) : (
                    <TextField
                      className={classes.tf_m}
                      id="Crianças"
                      label="Crianças"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={Crianças}
                      variant="outlined"
                      placeholder="0"
                      size="small"
                      disabled
                    />
                  )}
                </Box>
              </Grid>
            </Box>

            <Box display="flex" flexDirection="row">
              <Grid item xs={6}>
                <Box className={classes.novoBox}>
                  {editar ? (
                    <TextField
                      className={classes.tf_m}
                      id="Visitantes"
                      label="Visitantes"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={visitantes}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        visitantes === ''
                          ? () => setValidarVisitantes('nao')
                          : () => setValidarVisitantes('sim')
                      }
                      onChange={(e) => setVisitantes(e.target.value)}
                      error={validarVisitantes === 'nao'}
                      onFocus={(e) => setVisitantes(e.target.value)}
                      helperText={error ? 'Não pode ser Vazio!' : ''}
                    />
                  ) : (
                    <TextField
                      className={classes.tf_m}
                      id="Visitantes"
                      label="Visitantes"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={Visitantes}
                      variant="outlined"
                      placeholder="0"
                      size="small"
                      disabled
                    />
                  )}
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box className={classes.novoBox}>
                  {editar ? (
                    <TextField
                      id="conversoes"
                      label="Conversões"
                      value={conversoes}
                      variant="outlined"
                      className={classes.tf_m}
                      size="small"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder=""
                      onBlur={
                        conversoes === ''
                          ? () => setValidarConversoes('nao')
                          : () => setValidarConversoes('sim')
                      }
                      onChange={(e) => setConversoes(e.target.value)}
                      error={validarConversoes === 'nao'}
                      onFocus={(e) => setConversoes(e.target.value)}
                      helperText={error ? 'Não pode ser Vazio!' : ''}
                    />
                  ) : (
                    <TextField
                      id="conversoes"
                      label="Conversões:"
                      variant="outlined"
                      value={Conversoes}
                      disabled
                      className={classes.tf_m}
                      size="small"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="0"
                    />
                  )}
                </Box>
              </Grid>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <Grid item xs={2}>
                <Box className={classes.novoBox}>
                  {editar ? (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Avatar
                        variant="square"
                        alt="Remy Sharp"
                        src={img01}
                        type="button"
                      />
                      img-01
                    </Box>
                  ) : (
                    Img01 && (
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Avatar
                          variant="square"
                          alt="Remy Sharp"
                          src={Img01}
                          onClick={handleOpenImage}
                        />
                        img-01
                      </Box>
                    )
                  )}
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box className={classes.novoBox}>
                  {editar ? (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Avatar variant="square" alt="Remy Sharp" src={img02} />
                      img-02
                    </Box>
                  ) : (
                    Img02 && (
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Avatar variant="square" alt="Remy Sharp" src={Img02} />
                        img-02
                      </Box>
                    )
                  )}
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box className={classes.novoBox}>
                  {editar ? (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Avatar variant="square" alt="Remy Sharp" src={img03} />
                      img-03
                    </Box>
                  ) : (
                    Img03 && (
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Avatar variant="square" alt="Remy Sharp" src={Img03} />
                        img-03
                      </Box>
                    )
                  )}
                </Box>
              </Grid>

              <Grid item xs={2}>
                <Box className={classes.novoBox}>
                  {editar ? (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Avatar variant="square" alt="Remy Sharp" src={img04} />
                      img-04
                    </Box>
                  ) : (
                    Img04 && (
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Avatar variant="square" alt="Remy Sharp" src={Img04} />
                        img-04
                      </Box>
                    )
                  )}
                </Box>
              </Grid>

              <Grid item xs={2}>
                <Box className={classes.novoBox}>
                  {editar ? (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Avatar variant="square" alt="Remy Sharp" src={img05} />
                      img-05
                    </Box>
                  ) : (
                    Img05 && (
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        <Avatar variant="square" alt="Remy Sharp" src={Img05} />
                        img-05
                      </Box>
                    )
                  )}
                </Box>
              </Grid>
            </Box>
            {dadosRel.length === 0 ? (
              <Box className={classes.box}>
                {!editar ? (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<AddIcon />}
                    onClick={handleModal}
                    mt={2}
                    //  startIcon={<SaveIcon />}
                  >
                    Novo
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    className={classes.buttonCancel}
                    startIcon={<ReplyRoundedIcon />}
                    onClick={handleClickVoltar}
                    mt={3}
                    //  startIcon={<SaveIcon />}
                  >
                    Voltar
                  </Button>
                )}
                {!editar || !valid() ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    //  onClick={submitData}
                    mt={3}
                    disabled
                    //  startIcon={<SaveIcon />}
                  >
                    Salvar
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={iniciarEnvio}
                    mt={3}

                    //  startIcon={<SaveIcon />}
                  >
                    Salvar
                  </Button>
                )}
                {loading && (
                  <CircularProgress
                    size={40}
                    className={classes.buttonProgress}
                    value={progresso}
                  />
                )}
              </Box>
            ) : (
              <Box className={classes.box}>
                {!editar ? (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<EditIcon />}
                    onClick={handleClick}
                    mt={3}
                    //  startIcon={<SaveIcon />}
                  >
                    Editar
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    className={classes.buttonCancel}
                    startIcon={<ReplyRoundedIcon />}
                    onClick={handleClick}
                    mt={3}
                    //  startIcon={<SaveIcon />}
                  >
                    Voltar
                  </Button>
                )}
                {!editar || !valid() ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={submitData}
                    mt={3}
                    disabled
                    //  startIcon={<SaveIcon />}
                  >
                    Salvar
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={submitData}
                    mt={3}

                    //  startIcon={<SaveIcon />}
                  >
                    Salvar
                  </Button>
                )}
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </Box>
            )}
          </form>
        </Box>
      ) : (
        signOut({
          callbackUrl: `${window.location.origin}`,
        })
      )}
      {open && <TelaEventos />}
      {openImage && <ShowImage />}
    </>
  );
}

export default formulario;
