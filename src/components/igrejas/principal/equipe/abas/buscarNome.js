import { Box, Grid, Paper, Button } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

import Meses from 'src/utils/mesesAbrev';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ResumoParticipacao from './tabBuscar';

const theme = createTheme();
theme.typography.h4 = {
  fontWeight: 'normal',
  fontSize: '10px',
  '@media (min-width:350px)': {
    fontSize: '11px',
  },
  '@media (min-width:450px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '13px',
  },
};
theme.typography.h3 = {
  fontSize: '11px',
  '@media (min-width:350px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
theme.typography.h2 = {
  fontSize: '13px',
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
const useStyles = makeStyles((themes) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  paper: {
    padding: themes.spacing(1),
    textAlign: 'center',
    color: themes.palette.text.secondary,
    borderRadius: '16px',
  },
  button1: {
    display: 'flex',
    background: 'red',
    '&:hover': {
      backgroundColor: 'red',
    },
    borderRadius: 30,
    fontSize: '14px',
    width: 'auto',
    minWidth: 100,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },
}));

function RelCelula({ nomeBuscado, setOpenBuscar, perfilUser }) {
  const classes = useStyles();
  //= ================================================================
  const mes = Meses();
  const d = new Date();
  const mesAtual = Number(d.getMonth());
  const anoAtual = Number(d.getFullYear());
  const [contMes, setContMes] = React.useState(mesAtual);
  const [contAno, setContAno] = React.useState(anoAtual);

  const handleIncAno = () => {
    let contAnoAtual = contAno + 1;

    if (contAnoAtual > anoAtual) contAnoAtual = anoAtual;
    setContAno(contAnoAtual);
  };
  const handleDecAno = () => {
    let contAnoAtual = contAno - 1;

    if (Number(contAnoAtual) <= 2021) {
      contAnoAtual = 2021;
    }
    setContAno(contAnoAtual);
  };

  const handleIncMes = () => {
    let contMesAtual = contMes + 1;
    if (
      Number(contMesAtual) >= Number(mesAtual) &&
      Number(contAno) >= Number(anoAtual)
    )
      contMesAtual = mesAtual;

    if (contMesAtual > 11) {
      contMesAtual = 0;
      handleIncAno();
    }
    setContMes(contMesAtual);
  };
  const handleDecMes = () => {
    let contMesAtual = contMes - 1;
    if (contMesAtual < 0) {
      contMesAtual = 11;
      handleDecAno();
    }
    setContMes(contMesAtual);
  };

  return (
    <Box height="100vh" minHeight={500}>
      <Box
        height="100%"
        minWidth={300}
        width="100vw"
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box height="100%" width="100vw" maxWidth={600} minWidth={300}>
          <Box height="100%">
            <Box
              height="80%"
              minWidth={300}
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={400}
              width="100%"
              bgcolor={corIgreja.principal}
            >
              <Box width="95%" height="100%">
                <Box
                  height="10%"
                  minHeight={50}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    bgcolor: corIgreja.principal,
                    color: '#ffff',
                    fontFamily: 'Geneva',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  {nomeBuscado.Nome}
                </Box>
                <Box
                  height="70%"
                  minHeight={255}
                  bgcolor="#fafafa"
                  width="100%"
                  sx={{
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                  }}
                >
                  <ResumoParticipacao
                    nomeBuscado={nomeBuscado}
                    perfilUser={perfilUser}
                    Mes={contMes}
                    Ano={contAno}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              height="20%"
              minHeight={110}
              minWidth={300}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor={corIgreja.principal}
            >
              <Box mt={5} width="100%" ml={1} minWidth={300}>
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={6}>
                    <Paper width="100%" className={classes.paper}>
                      <Box height={30} width="100%" display="flex">
                        <Box
                          width="20%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleDecMes();
                            }}
                          >
                            <SvgIcon sx={{ color: corIgreja.iconeOn }} />{' '}
                            <BiCaretLeft />
                          </IconButton>
                        </Box>
                        <Box
                          width="60%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          color="black"
                          sx={{ fontFamily: 'arial black' }}
                        >
                          {' '}
                          <ThemeProvider theme={theme}>
                            <Typography
                              style={{ display: 'flex' }}
                              variant="h4"
                            >
                              {mes[contMes].descricao} / {contAno}
                            </Typography>
                          </ThemeProvider>
                        </Box>
                        <Box
                          width="20%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleIncMes();
                            }}
                          >
                            <SvgIcon sx={{ color: corIgreja.iconeOn }} />
                            <BiCaretRight />
                          </IconButton>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      style={{
                        background: '#ffd740',
                        color: 'blue',
                        fontFamily: 'arial black',
                        width: '100%',
                        height: '100%',
                        borderRadius: '16px',
                      }}
                      variant="contained"
                      id="reload"
                      onClick={() => {
                        setOpenBuscar(false);
                      }}
                    >
                      Fechar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RelCelula;
