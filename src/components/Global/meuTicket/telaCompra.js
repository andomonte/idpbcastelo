import React from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@mui/material/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';

const useStyles = makeStyles(() => ({
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: '100%',
  },
  img1: {
    width: '20px',
    height: '20px',
    marginLeft: 40,
    marginRight: 8,
  },
  letras1: {
    display: 'flex',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },
  letras2: {
    display: 'flex',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
  },
  letras3: {
    display: 'flex',
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
    padding: 2,
  },
  legenda1: {
    display: 'flex',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fffd',
  },

  fundoBranco: {
    display: 'flex',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
  },
  button1: {
    display: 'flex',
    background: '#fff',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#b91a30',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: '#b91a30',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },

  imgMobile: {
    maxWidth: '1110px',
    maxHeight: '500px',
    width: '100%',
    height: 'auto',
  },
}));

const Home = () => {
  const classes = useStyles();
  const router = useRouter();

  const comprar = () => {
    router.push({
      pathname: '/global/comprar',
      //   query: { dadosMesa2, numeroGame },
    });
  }; // setGame('1');

  return (
    <Box style={{ backgroundColor: '#b91a30', height: '90vh' }}>
      <Box>
        <Hidden smDown>
          <CardMedia
            component="img"
            height="125"
            image="/images/global/pgIni01.png"
            alt="green iguana"
            style={{ borderRadius: 16 }}
          />
        </Hidden>
        <Hidden mdUp>
          <Box mt={-1} className={classes.letras1}>
            CONFERÊNCIA
          </Box>
          <Box className={classes.letras1}>GLOBAL 2022</Box>
          <Box mt={1} className={classes.letras2}>
            2022 GLOBAL CONFERENCE
          </Box>
          <Box mt={-0.5}>
            <CardMedia
              component="img"
              height="100%"
              image="/images/global/pgIni01.png"
              alt="green iguana"
              style={{ justifyContent: 'center' }}
            />
          </Box>
          <Box mt={2} className={classes.letras2}>
            INGRESSO - 1º LOTE - R$: 50,00
          </Box>
          <Box mt={2} className={classes.letras2}>
            <Button
              className={classes.button1}
              variant="contained"
              onClick={comprar}
            >
              COMPRAR
            </Button>
          </Box>

          <Box
            mt={2}
            sx={{
              display: 'flex',
              '& > :not(style)': {
                m: 1,
                width: '100%',
                height: 80,
              },
            }}
          >
            <Paper variant="outlined">
              <Box
                mt={1}
                sx={{
                  display: 'flex',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: '#b91a30',
                  justifyContent: 'center',
                }}
              >
                CLIQUE AQUI SE VOCÊ JÁ ADQUIRIU SEU TICKET
              </Box>
              <Box
                mt={1}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button className={classes.button2} variant="contained">
                  MEU TICKET
                </Button>
              </Box>
            </Paper>
          </Box>
          <Box>
            <Box mt={2} className={classes.legenda1}>
              <img
                src="/images/global/sobre.png"
                alt="img01"
                className={classes.img1}
              />
              SOBRE O EVENTO
            </Box>{' '}
          </Box>
          <Box ml={9} mt={1} className={classes.letras3}>
            Conferência em comemoração ao centenário da PCG, igreja mãe da IDPB.
          </Box>
          <CardMedia
            component="img"
            image="/images/global/pgIni03.png"
            alt="green iguana"
          />
        </Hidden>
      </Box>
    </Box>
  );
};
export default Home;
