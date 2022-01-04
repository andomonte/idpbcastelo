import React from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@mui/material/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TamanhoJanela from 'src/utils/getSize';

// const validateDate = require('validate-date');

const janela = TamanhoJanela();
const useStyles = makeStyles(() => ({
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: '100%',
  },
  root: {
    height: '100vh',
    // overflow: 'hidden',
    width: '100vw',
    minHeight: 500,
    padding: 0,
    margin: 0,
  },

  letras1: {
    display: 'flex',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fffd',
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
    fontSize: '14px',
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

  const voltar = () => {
    router.push({
      pathname: '/',
      //   query: { dadosMesa2, numeroGame },
    });
  }; // setGame('1');
  const comprar = () => {
    router.push({
      pathname: '/global/comprar',
      //   query: { dadosMesa2, numeroGame },
    });
  };

  const myTicket = () => {
    router.push({
      pathname: '/global/meuTicket',
      //   query: { dadosMesa2, numeroGame },
    });
  }; // setGame('1');

  return (
    <Box style={{ backgroundColor: '#fafafa', height: '100vh' }}>
      <Box mt={0}>
        <Hidden smDown>
          <Box mt={0}>
            <Box display="flex" justifyContent="center">
              <Box mt={2} width={400} height="100%" bgcolor="#b91a30">
                <Box mt={0} ml={0}>
                  <Box
                    height={30}
                    p={1}
                    ml={0}
                    mr={0}
                    display="flex"
                    alignItems="center"
                  >
                    <ArrowBackIcon
                      sx={{
                        fontSize: 20,
                        color: '#fff',
                      }}
                      onClick={voltar}
                    />
                  </Box>
                </Box>
                <Box
                  height={30}
                  p={1}
                  m={0}
                  mr={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box mt={-3} className={classes.letras1}>
                    CONFERÊNCIA
                  </Box>
                </Box>

                <Box mt={2} className={classes.letras1}>
                  <Box mt={-2}> GLOBAL 2022</Box>
                </Box>
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
                <Box mt={0} className={classes.letras2}>
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
                      APÓS A COMPRA GERE SEU TICKET AQUI
                    </Box>
                    <Box
                      mt={1}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Button
                        className={classes.button2}
                        variant="contained"
                        onClick={myTicket}
                      >
                        MEU TICKET
                      </Button>
                    </Box>
                  </Paper>
                </Box>
                <Box mt={1}>
                  <CardMedia
                    component="img"
                    image="/images/global/sobre.png"
                    alt="green iguana"
                    style={{ height: 124 }}
                  />
                </Box>
                <Box mt={0}>
                  <CardMedia
                    component="img"
                    image="/images/global/pgLocal.png"
                    alt="green iguana"
                  />
                </Box>
                <Box>
                  <CardMedia
                    component="img"
                    image="/images/global/site.png"
                    alt="green iguana"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Hidden>
        <Hidden mdUp>
          <Box>
            <Box className={classes.root} bgcolor="#b91a30">
              <Box
                height={50}
                p={1}
                mt={0}
                ml={3}
                display="flex"
                alignItems="center"
              >
                {/*                 <ArrowBackIcon
                  sx={{
                    fontSize: 20,
                    color: '#fff',
                  }}
                  onClick={voltar}
                />
 */}{' '}
              </Box>

              <Box display="flex" justifyContent="center" mt={10}>
                <Box
                  mt={
                    janela.height > 570
                      ? -janela.height / 60
                      : -janela.height / 40
                  }
                >
                  <Box
                    bgcolor="#b91a30"
                    height={30}
                    p={1}
                    mt={0}
                    mr={0}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box mt={-3} className={classes.letras1}>
                      CONFERÊNCIA
                    </Box>
                  </Box>

                  <Box mt={0} className={classes.letras1} bgcolor="#b91a30">
                    <Box mt={-2} height={50}>
                      {' '}
                      GLOBAL 2022
                    </Box>
                  </Box>
                  <Box mt={0} className={classes.letras2} bgcolor="#b91a30">
                    2022 GLOBAL CONFERENCE
                  </Box>
                  <Box mt={-0.5} bgcolor="#b91a30">
                    <Box mt={0} ml={0}>
                      <img
                        src="/images/global/pgIni01.png"
                        alt=""
                        width="100%"
                        height="100%"
                      />
                    </Box>
                  </Box>
                  <Box mt={0} className={classes.letras2} bgcolor="#b91a30">
                    INGRESSO - 1º LOTE - R$: 50,00
                  </Box>
                  <Box
                    height={65}
                    className={classes.letras2}
                    bgcolor="#b91a30"
                  >
                    <Box mt={2}>
                      <Button
                        className={classes.button1}
                        variant="contained"
                        onClick={comprar}
                      >
                        COMPRAR
                      </Button>
                    </Box>
                  </Box>

                  <Box
                    mt={0}
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
                        APÓS A COMPRA GERE SEU TICKET AQUI
                      </Box>
                      <Box
                        mt={1}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <Button
                          className={classes.button2}
                          variant="contained"
                          onClick={myTicket}
                        >
                          MEU TICKET
                        </Button>
                      </Box>
                    </Paper>
                  </Box>
                  <Box
                    height={6}
                    className={classes.letras2}
                    bgcolor="#b91a30"
                  />
                  <Box mt={1} ml={0} height={122}>
                    <img
                      src="/images/global/sobre.png"
                      alt=""
                      width="100%"
                      height="100%"
                    />
                  </Box>

                  <Box mt={1} ml={0}>
                    <img
                      src="/images/global/pgLocal.png"
                      alt=""
                      width="100%"
                      height="100%"
                    />
                  </Box>

                  <Box className={classes.letras2} bgcolor="#b91a30" />
                  <Box mt={0} ml={0}>
                    <img
                      src="/images/global/site.png"
                      alt=""
                      width="100%"
                      height="100%"
                    />
                  </Box>
                  <Box
                    height={8}
                    mt={-2}
                    className={classes.letras2}
                    bgcolor="#b91a30"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Hidden>
      </Box>
    </Box>
  );
};
export default Home;
