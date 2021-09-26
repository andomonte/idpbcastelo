import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useSWR from 'swr';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { Box, Avatar, Divider, Grid } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import downloadjs from 'downloadjs';
import Carousel from 'react-material-ui-carousel';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import Loading from 'src/utils/loading';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PauseIcon from '@mui/icons-material/Pause';
import IconButton from '@mui/material/IconButton';
import StopIcon from '@mui/icons-material/Stop';
import ProgressBar from './progressBar';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useStyles = makeStyles((theme) => ({
  caption: {
    fontWeight: 500,
    fontSize: '14px',
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
    width: '100%',
    height: '100%',
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
  const [fotos, setFotos] = React.useState([]);
  const [imagemBaixada, setImagemBaixada] = React.useState('');
  const [urls, setUrls] = React.useState('');
  const [stopFotos, setStopFotos] = React.useState(true);
  const [mesSelect, setMesSelect] = React.useState('01');
  const url = `${window.location.origin}/api/consultaEventoIgreja/${item[0].RegiaoIDPB}`;

  const { data, error } = useSWR(url, fetcher);
  if (error) return <div>Failed to load</div>;
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
  const handleFotos = (items) => {
    if (items.img01) setFotos(() => [items.img01]);
    if (items.img02) setFotos((fotos2) => [...fotos2, items.img02]);
    if (items.img03) setFotos((fotos3) => [...fotos3, items.img03]);
    if (items.img04) setFotos((fotos4) => [...fotos4, items.img04]);
    if (items.img05) setFotos((fotos5) => [...fotos5, items.img05]);

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
              <Box mr={-2} ml={2} mt={2.2}>
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

              <Box m={1} ml={5}>
                <Typography
                  variant="body1"
                  display="block"
                  gutterBottom
                  align="left"
                  className={classes.caption}
                >
                  {items.igreja ?? items.igreja}
                </Typography>
                <Typography
                  display="block"
                  variant="body2"
                  color="textSecondary"
                  align="left"
                  //                  style={{ marginRight: 60 }}
                >
                  <strong>Evento: </strong>
                  {items.evento ?? items.evento}
                </Typography>
                <Box display="flex" flexDirection="row">
                  <Grid item xs={6}>
                    <Typography
                      display="block"
                      variant="body2"
                      color="textSecondary"
                      align="left"
                      //                  style={{ marginRight: 60 }}
                    >
                      <strong> Data: </strong>
                      <small>
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
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      display="block"
                      variant="body2"
                      color="textSecondary"
                      align="left"
                      //                  style={{ marginRight: 60 }}
                    >
                      <strong>Adultos: </strong>
                      {items.adultos ?? items.adultos}
                    </Typography>
                  </Grid>
                </Box>
                <Box display="flex" flexDirection="row">
                  <Grid item xs={6}>
                    <Typography
                      display="block"
                      variant="body2"
                      color="textSecondary"
                      align="left"
                      //                  style={{ marginRight: 60 }}
                    >
                      <strong>Adolecentes: </strong>
                      {items.adolecentes ?? items.adolecentes}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      display="block"
                      variant="body2"
                      color="textSecondary"
                      align="left"
                      //                  style={{ marginRight: 60 }}
                    >
                      <strong>Crianças: </strong>
                      {items.Crianças ?? items.criancas}
                    </Typography>
                  </Grid>
                </Box>
                <Box display="flex" flexDirection="row">
                  <Grid item xs={6}>
                    <Typography
                      display="block"
                      variant="body2"
                      color="textSecondary"
                      align="left"
                      //                  style={{ marginRight: 60 }}
                    >
                      <strong>Converções: </strong>
                      {items.conversoes ?? items.conversoes}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      display="block"
                      variant="body2"
                      color="textSecondary"
                      align="left"
                      //                  style={{ marginRight: 60 }}
                    >
                      <strong>Visitantes: </strong>
                      {items.visitantes ?? items.visitantes}
                    </Typography>
                  </Grid>
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
    const img =
      'https://sistemaidpb.s3.amazonaws.com/img74_21092021_MM201026.jpg';

    //    setImagemBaixada(imagem);
    // atos 11  https://sistemaidpb.s3.amazonaws.com/img2_21092021_MM201026.jpg
    // atos 10  https://sistemaidpb.s3.amazonaws.com/img3_21092021_MM201026.jpg
    //  "https://sistemaidpb.s3.amazonaws.com/225.394.682-68.jpeg"
    //   https://sistemaidpb.s3.amazonaws.com/img1_01052021_AM-030.jpeg
    //
    // console.log(img);
    downloadjs(imagem);
    // const urlRecebida = await downloadImgS3(img);
    // console.log('vai', urlRecebida);

    /* api
      .post('api/imagens', { img })
      .then((response) => {
        if (response) {
          // setTransfer(response.status);
          // setEditar(false);
          //  const urls2 = window.URL.createObjectURL(Blob(response.data.Body));
          // setUrls(response.data.Body);
          //          downloadjs(response.data);

          console.log('é isso mesmo:', response);
          // setImagemBaixada(response.data);
        }
        //  updateFile(uploadedFile.id, { uploaded: true });
      })
      .catch(() => {
        console.log('deu ruim');
        //  updateFile(uploadedFile.id, { error: true });
      }); */
    //    console.log(urls);
  };

  const altura = window.innerHeight;
  const body = (
    <Box className={classes.paper}>
      <Box height={altura - 70}>
        <Card sx={{ maxWidth: '100%' }}>
          <Box sx={{ width: '100%' }} p={1}>
            <Box>
              {!stopFotos ? (
                <ProgressBar valor={cont + 10} />
              ) : (
                <ProgressBar valor={cont} />
              )}
            </Box>
          </Box>

          <Carousel
            className={classes.img}
            interval={5400}
            autoPlay={stopFotos}
            NextIcon=""
            PrevIcon=""
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
              image={fotos[cont]}
              alt="Paella dish"
            />
          </Carousel>
        </Card>

        {/* <img src={fotos[cont]} alt="img01" className={classes.img} /> */}
      </Box>

      <Box display="flex" justifyContent="center" mt={2}>
        {/* <Box ml={1}>
          <Button
            variant="contained"
            style={{ backgroundColor: '#448aff' }}
            onClick={() => {
              downloadImg(fotos[cont]);
            }}
          >
            Baixar
          </Button>
        </Box> */}
        <Box ml={1}>
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
            <FastRewindIcon />
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
            <FastForwardIcon />
          </IconButton>
        </Box>
        <Box ml={1}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={handleClose}
          >
            <StopIcon />
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
