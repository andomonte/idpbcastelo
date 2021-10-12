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
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import Loading from 'src/utils/loading';
import MesageErro from 'src/utils/mesageErro';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import IconButton from '@mui/material/IconButton';
import ReplayIcon from '@mui/icons-material/Replay';
import Image from 'next/image';
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
      .post('/api/imagens', { img })
      .then((response) => {
        if (response) {
          // setTransfer(response.status);
          // setEditar(false);
          //  const urls2 = window.URL.createObjectURL(Blob(response.data.Body));
          // setUrls(response.data.Body);
          //          downloadjs(response.data);

          if (fotos.length === 0) setFotos(items);
          else setFotos((fotos2) => [...fotos2, items]);
          // setFotos(() => [ [...fotos2, items.img02]...response.data]);
          // downloadjs(response.data);
          // setImagemBaixada(response.data);
        }
        //  updateFile(uploadedFile.id, { uploaded: true });
      })
      .catch(() => {
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
  const bannerBlurHash =
    'data:image/webp;base64,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';
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
                  //                  src={items.img01 ?? items.img01}
                >
                  <Image
                    src={items.img01 ?? items.img01}
                    alt="alt"
                    layout="fill"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={bannerBlurHash}
                    objectFit="cover"
                  />
                </Avatar>
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
                    <strong style={{ color: '#64dd17' }}>
                      {items.evento ?? items.evento}
                    </strong>
                  </Typography>
                  <Typography
                    display="block"
                    variant="body2"
                    color="primary"
                    align="left"
                    style={{ fontSize: 20, marginLeft: 50 }}
                  >
                    <small style={{ color: 'black' }}> Data: </small>
                    <small style={{ color: '#c51162' }}>
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
    //  const fim = Number(imagem.indexOf('?')) - Number(imagem.indexOf('img'));
    const img = imagem.substr(ini);
    api
      .post('/api/imagens', { img })
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
  const largura = window.innerWidth;

  const body = (
    <Box className={classes.paper}>
      <Box height={altura - 70} width="auto">
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
          <Box height={altura - 100} width={largura - 10}>
            <Image
              src={
                fotos.length
                  ? fotos[cont]
                  : 'https://sistemaidpb.s3.amazonaws.com/loadingImg.png'
              }
              layout="fill"
              objectFit="contain"
              loading="eager"
              placeholder="blur"
              blurDataURL={bannerBlurHash}
            />
          </Box>
          {/* <CardMedia
            component="img"
            height={altura - 100}
            with="100%"
            image={
              fotos.length
                ? fotos[cont]
                : 'https://sistemaidpb.s3.amazonaws.com/loadingImg.png'
            }
            alt="Paella dish"
          /> */}
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
                setCont(fotos.length - 1);
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
