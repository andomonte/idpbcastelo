import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useSWR from 'swr';
import axios from 'axios';
import api from 'src/components/services/api';
import Typography from '@material-ui/core/Typography';
import { Box, Avatar, Divider, Grid, Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Iframe from 'react-iframe';

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
    maxWidth: '1110px',
    maxHeight: '544px',
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

export default function EventoMobile({ item }) {
  const classes = useStyles();
  const showIgrejas = [];
  const [open, setOpen] = React.useState(false);
  const [cont, setCont] = React.useState(0);
  const [fotos, setFotos] = React.useState([]);
  const [imagemBaixada, setImagemBaixada] = React.useState('');

  const url = `${window.location.origin}/api/consultaEventoIgreja/${item[0].RegiaoIDPB}`;
  const { data, error } = useSWR(url, fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

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

  if (data) {
    showIgrejas.push(
      <Box key={data}>
        {data?.map((items) => (
          <Box key={items.igreja} type="button" justifyContent="flex-start">
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
  const downloadImg = (imagem) => {
    const img = 'SALVADOR.png';
    api
      .post('api/imagens', { img })
      .then((response) => {
        if (response) {
          const urlpre = URL.createObjectURL(
            new Blob([response.data], { type: 'image/*' }),
          );

          console.log('é isso mesmo:', response.data);
          setImagemBaixada(urlpre);
        }
      })
      .catch(() => {});
  };
  const altura = window.innerHeight;
  const body = (
    <Box className={classes.paper}>
      <Box height={altura - 70}>
        <img src={fotos[cont]} alt="img01" className={classes.img} />
      </Box>
      {imagemBaixada && (
        <Iframe
          url="https://sistemaidpb.s3.amazonaws.com/SALVADOR.png"
          width="150px"
          height="150px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      )}
      <Box display="flex" justifyContent="center" mt={2}>
        <Box mr={1}>
          <Button
            variant="contained"
            style={{ backgroundColor: '#448aff' }}
            onClick={() => {
              if (fotos[cont + 1]) {
                setCont(cont + 1);
              } else {
                setCont(0);
              }
            }}
          >
            Proxima
          </Button>
        </Box>

        <Box ml={1}>
          <Button
            variant="contained"
            style={{ backgroundColor: '#ec407a' }}
            onClick={handleClose}
          >
            Fechar
          </Button>
        </Box>
      </Box>
    </Box>
  );
  return (
    <Box borderRadius={16} {...defaultProps} ml={-3} mr={-3}>
      {showIgrejas}
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
