import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useSWR from 'swr';
import axios from 'axios';
import api from 'src/components/services/api';
import Typography from '@material-ui/core/Typography';
import { Box, Avatar, Divider } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import downloadjs from 'downloadjs';
import Carousel from 'react-material-ui-carousel';
import DownloadIcon from '@mui/icons-material/Download';
import CardMedia from '@mui/material/CardMedia';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import Loading from 'src/utils/loading';
import MesageErro from 'src/utils/mesageErro';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import IconButton from '@mui/material/IconButton';
import ReplayIcon from '@mui/icons-material/Replay';
import ProgressBar from './progressBar';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useStyles = makeStyles((theme) => ({
  caption: {
    fontWeight: 500,
    fontSize: '24px',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    color: '#000',
    marginRight: 20,
    width: 200,
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    with: '100',
  },
  img: {
    width: 'auto',
    height: 'auto',
  },
  avatar: {
    margin: -10,
    width: 80,
    height: 80,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
  },
}));

export default function EventoMobile({ item, mes }) {
  const classes = useStyles();
  const showIgrejas = [];
  const [open, setOpen] = React.useState(false);
  const [cont, setCont] = React.useState(0);
  const [contSlide, setContSlide] = React.useState(0);
  const [fotos, setFotos] = React.useState(['']);
  const url = `${window.location.origin}/api/consultaEventoIgreja/${item[0].RegiaoIDPB}`;
  const [stopFotos, setStopFotos] = React.useState(true);

  const { data, error } = useSWR(url, fetcher);
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

  let newMes;
  if (mes < 10) {
    newMes = `0${mes}`;
  } else {
    newMes = mes;
  }
  const dadosUser = data.filter((val) => val.dataEvento.slice(2, 4) === newMes);

  const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1,
  };
  const carregaImagem = async (items) => {
    const retorno = '';

    const img = items.substr(items.indexOf('img'));
    await api
      .post('api/imagens', { img })
      .then((response) => {
        if (response) {
          // setTransfer(response.status);
          // setEditar(false);
          //  const urls2 = window.URL.createObjectURL(Blob(response.data.Body));
          // setUrls(response.data.Body);
          //          downloadjs(response.data);

          if (fotos.length === 0) setFotos(response.data);
          else setFotos((fotos2) => [...fotos2, response.data]);
          // setFotos(() => [ [...fotos2, items.img02]...response.data]);
          // downloadjs(response.data);
          // setImagemBaixada(response.data);
        }
        //  updateFile(uploadedFile.id, { uploaded: true });
      })
      .catch(() => {
        console.log('deu ruim');
        //  updateFile(uploadedFile.id, { error: true });
      });
    return retorno;
  };
  const handleFotos = (items) => {
    setCont(0);

    const imgTemp = [
      items.img01,
      items.img02,
      items.img03,
      items.img04,
      items.img05,
    ];
    setFotos([]);
    if (items.img01) {
      for (let i = 0; i < 5; i += 1) carregaImagem(imgTemp[i]);

      //   setFotos(() => [imgTemp]);
    }
    //    if (items.img02) setFotos((fotos2) => [...fotos2, items.img02]);
    //    if (items.img03) setFotos((fotos3) => [...fotos3, items.img03]);
    //    if (items.img04) setFotos((fotos4) => [...fotos4, items.img04]);
    //    if (items.img05) setFotos((fotos5) => [...fotos5, items.img05]);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------

  if (dadosUser) {
    showIgrejas.push(
      <Box key={dadosUser}>
        {dadosUser?.map((items) => (
          <Box key={items.id} type="button" justifyContent="flex-start">
            <Box display="flex">
              <Box mr={-2} ml={5} mt={2.2}>
                <Avatar
                  onClick={() => {
                    handleFotos(items);
                  }}
                  alt="User"
                  className={classes.avatar}
                  src={items.img01 ?? items.img01}
                />
                <Box
                  onClick={() => {
                    handleFotos(items);
                  }}
                  color="blue"
                  mt={2}
                >
                  ver fotos
                </Box>
              </Box>

              <Box m={1} ml={8} width="100%" mt={2}>
                <Typography
                  variant="body1"
                  display="block"
                  gutterBottom
                  align="left"
                  className={classes.caption}
                >
                  {items.igreja ?? items.igreja}
                </Typography>

                <Box display="flex" flexDirection="row" mt={-1}>
                  <Typography
                    display="block"
                    variant="body2"
                    color="primary"
                    align="left"
                    style={{ fontSize: 20 }}
                  >
                    <small style={{ color: 'black' }}>Evento: </small>
                    {items.evento ?? items.evento}
                  </Typography>
                  <Typography
                    display="block"
                    variant="body2"
                    color="primary"
                    align="left"
                    style={{ fontSize: 20, marginLeft: 50 }}
                  >
                    <small style={{ color: 'black' }}> Data: </small>
                    <small style={{ color: 'green' }}>
                      {items.dataEvento &&
                        `${items.dataEvento.substr(
                          0,
                          2,
                        )}/${items.dataEvento.substr(
                          2,
                          2,
                        )}/${items.dataEvento.substr(4, 4)} `}
                    </small>
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="row">
                  <Typography
                    display="block"
                    variant="body2"
                    align="left"
                    style={{ fontSize: 16, color: '#ff9800' }}
                  >
                    <small style={{ color: 'black' }}>Adultos: </small>
                    {items.adultos ?? items.adultos}
                  </Typography>
                  <Typography
                    display="block"
                    variant="body2"
                    color="primary"
                    align="left"
                    style={{ fontSize: 16, marginLeft: 50, color: '#ff9800' }}
                  >
                    <small style={{ color: 'black' }}>Adolecentes: </small>
                    {items.adolecentes ?? items.adolecentes}
                  </Typography>
                  <Typography
                    display="block"
                    variant="body2"
                    color="primary"
                    align="left"
                    style={{ fontSize: 16, marginLeft: 50, color: '#ff9800' }}
                  >
                    <small style={{ color: 'black' }}>Crianças: </small>
                    {items.Crianças ?? items.criancas}
                  </Typography>
                  <Typography
                    display="block"
                    variant="body2"
                    color="primary"
                    align="left"
                    style={{ fontSize: 16, marginLeft: 50, color: '#ff9800' }}
                  >
                    <small style={{ color: 'black' }}>Converções: </small>
                    {items.conversoes ?? items.conversoes}
                  </Typography>
                  <Typography
                    display="block"
                    variant="body2"
                    color="primary"
                    align="left"
                    style={{ fontSize: 16, marginLeft: 50, color: '#ff9800' }}
                  >
                    <small style={{ color: 'black' }}>Visitantes: </small>
                    {items.visitantes ?? items.visitantes}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider />
          </Box>
        ))}
      </Box>,
    );
  }
  const downloadImg = async (imagem) => {
    const ini = Number(imagem.indexOf('img'));
    const fim = Number(imagem.indexOf('?')) - Number(imagem.indexOf('img'));
    const img = imagem.substr(ini, fim);
    api
      .post('api/imagens', { img })
      .then((response) => {
        if (response) {
          // setTransfer(response.status);
          // setEditar(false);
          //  const urls2 = window.URL.createObjectURL(Blob(response.data.Body));
          // setUrls(response.data.Body);
          //          downloadjs(response.data);

          downloadjs(response.data);
          // setImagemBaixada(response.data);
        }
        //  updateFile(uploadedFile.id, { uploaded: true });
      })
      .catch(() => {
        // console.log('deu ruim');
        //  updateFile(uploadedFile.id, { error: true });
      });
  };

  const altura = window.innerHeight;

  const body = (
    <Box className={classes.paper}>
      <Box height={altura - 70}>
        <Box sx={{ width: '100%' }} p={1}>
          <Box>
            {!stopFotos ? (
              <ProgressBar valor={cont + 10} qytFotos={fotos.length} />
            ) : (
              <ProgressBar valor={cont} qytFotos={fotos.length} />
            )}
          </Box>
        </Box>

        <Carousel
          className={classes.img}
          interval={5400}
          autoPlay={stopFotos}
          NextIcon={<SkipNextIcon />}
          PrevIcon={<SkipPreviousIcon />}
          index={contSlide === 1 ? cont : null}
          stopAutoPlayOnHover={false}
          onChange={() => {
            setContSlide(0);
          }}
          next={() => {
            if (fotos[cont + 1]) {
              setCont(cont + 1);
            } else {
              setCont(0);
            }
          }}
          prev={() => {
            if (fotos[cont - 1]) {
              setCont(cont - 1);
            } else {
              setCont(4);
            }
          }}
        >
          <CardMedia
            component="img"
            height={altura - 100}
            image={
              fotos.length
                ? fotos[cont]
                : 'https://sistemaidpb.s3.amazonaws.com/loadingImg.png'
            }
            alt="Paella dish"
          />
        </Carousel>

        {/* <img src={fotos[cont]} alt="img01" className={classes.img} /> */}
      </Box>
      <Box display="flex" justifyContent="center">
        <Box ml={10}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => {
              setContSlide(1);
              if (fotos[cont - 1]) {
                setCont(cont - 1);
              } else {
                setCont(4);
              }
            }}
          >
            <SkipPreviousIcon />
          </IconButton>
        </Box>
        <Box ml={1}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => {
              setStopFotos(!stopFotos);
              if (!stopFotos) {
                setContSlide(1);
                if (fotos[cont + 1]) {
                  setCont(cont + 1);
                } else {
                  setCont(0);
                }
              }
            }}
          >
            {stopFotos ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </Box>
        <Box ml={1}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => {
              setContSlide(1);
              if (fotos[cont + 1]) {
                setCont(cont + 1);
              } else {
                setCont(0);
              }
            }}
          >
            <SkipNextIcon />
          </IconButton>
        </Box>
        <Box ml={5}>
          <IconButton
            style={{ color: '#f44336' }}
            aria-label="upload picture"
            component="span"
            onClick={handleClose}
          >
            <ReplayIcon />
          </IconButton>
        </Box>

        <Box ml={5}>
          <IconButton
            color="success"
            aria-label="upload picture"
            component="span"
            onClick={() => {
              downloadImg(fotos[cont]);
            }}
          >
            <DownloadIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box borderRadius={16} {...defaultProps} ml={-3} mr={-3}>
      {dadosUser.length ? (
        showIgrejas
      ) : (
        <Box mt={10}>
          <ImageNotSupportedIcon style={{ color: 'red', fontSize: 50 }} />
          <h1>Sem Eventos</h1>
        </Box>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Box>
  );
}
