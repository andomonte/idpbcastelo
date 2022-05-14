import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import PegaSemana from 'src/utils/getSemana';
/* import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'; 
import moment from 'moment'; */
import Meses from 'src/utils/meses';

import TabCelula from './abas/tabRelSuper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Label({ lab1, lab2 }) {
  return (
    <>
      <Grid item xs={6}>
        <Box color="#fff" textAlign="center">
          {lab1}
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box color="#fff" textAlign="center">
          {lab2}
        </Box>
      </Grid>
    </>
  );
}
function RelCelula({ perfilUser, lideranca }) {
  const classes = useStyles();
  //= ================================================================
  const mes = Meses();
  const d = new Date();
  const mesAtual = Number(d.getMonth());
  const anoAtual = Number(d.getFullYear());
  const [contMes, setContMes] = React.useState(mesAtual);
  const [contAno, setContAno] = React.useState(anoAtual);

  const celulaSetor = lideranca.filter(
    (results) =>
      Number(results.supervisao) === Number(perfilUser.supervisao) &&
      Number(results.Distrito) === Number(perfilUser.Distrito) &&
      results.Funcao === 'Lider',
  );
  const numberCelulas = celulaSetor.map((itens) => itens.Celula);
  const uniqueArr = [...new Set(numberCelulas)];

  const [numeroCelula] = React.useState(uniqueArr);

  //  const [contCelula, setContCelula] = React.useState(0);

  const handleIncMes = () => {
    let contMesAtual = contMes + 1;
    if (contMesAtual > 11) {
      contMesAtual = 0;
      let contAnoAtual = contAno + 1;
      if (contAnoAtual > anoAtual) contAnoAtual = anoAtual;
      setContAno(contAnoAtual);
    }
    setContMes(contMesAtual);
  };
  const handleDecMes = () => {
    let contMesAtual = contMes - 1;

    if (contMesAtual < 0) {
      contMesAtual = 11;
      let contAnoAtual = contAno - 1;

      if (contAnoAtual < 2021) contAnoAtual = 2021;
      setContAno(contAnoAtual);
    }
    setContMes(contMesAtual);
  };

  /* const handleIncCelula = () => {
    let contCelulaAtual = contCelula + 1;

    if (contCelulaAtual >= numeroCelula.length) contCelulaAtual = 0;
    setContCelula(contCelulaAtual);
  };
  const handleDecCelula = () => {
    let contCelulaAtual = contCelula - 1;
    if (contCelulaAtual < 0) contCelulaAtual = numeroCelula.length - 1;
    setContCelula(contCelulaAtual);
  }; */
  let semana = PegaSemana(contMes, contAno);

  const [contSemana, setContSemana] = React.useState(semana);

  const handleIncSemana = () => {
    let contSemanaAtual = contSemana + 1;
    console.log('CONT', contSemanaAtual);
    if (contSemanaAtual > semana + 4) contSemanaAtual = semana;
    setContSemana(contSemanaAtual);
  };
  const handleDecSemana = () => {
    let contSemanaAtual = contSemana - 1;
    console.log('CONT', contSemanaAtual);
    if (contSemanaAtual < semana) contSemanaAtual = semana + 4;

    setContSemana(contSemanaAtual);
  };

  React.useEffect(() => {
    semana = PegaSemana(contMes, contAno);
    setContSemana(semana);
  }, [contMes]);
  return (
    <Box height="90vh" minHeight={500}>
      <Box
        height="100%"
        minWidth={370}
        width="100vw"
        mt={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          height="100%"
          width="100vw"
          maxWidth={600}
          minWidth={370}
          border="4px solid #fff"
        >
          <Box height="100%">
            <Box
              height="20%"
              minHeight={80}
              minWidth={370}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor={corIgreja.principal}
              style={{
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
              }}
            >
              <Box width="100%" ml={1} minWidth={370}>
                <Grid container spacing={0}>
                  <Grid container item xs={12} spacing={1}>
                    <Label lab1="Selecione o Mês" lab2="Escolha a Célula" />
                    <Grid item xs={6}>
                      <Paper width="100%" className={classes.paper}>
                        <Box height={25} width="100%" display="flex">
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
                            sx={{ fontFamily: 'arial black' }}
                          >
                            {mes[contMes].descricao}
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
                      <Paper width="100%" className={classes.paper}>
                        <Box height={25} width="100%" display="flex">
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
                                handleDecSemana();
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
                            sx={{ fontFamily: 'arial black' }}
                          >
                            Semana - {contSemana}
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
                                handleIncSemana();
                              }}
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }} />
                              <BiCaretRight />
                            </IconButton>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box
              style={{
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
              }}
              height="80%"
              minWidth={370}
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={350}
              width="100%"
              bgcolor={corIgreja.principal}
              borderTop="2px solid #fff"
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
                    color: 'yellow',
                    fontFamily: 'arial black',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  RELATÓRIOS DAS CÉLULAS - Ano de {contAno}
                </Box>
                <Box
                  height="85%"
                  minHeight={315}
                  bgcolor="#fafafa"
                  width="100%"
                  borderRadius={16}
                >
                  <TabCelula
                    perfilUser={perfilUser}
                    Mes={contMes}
                    Ano={contAno}
                    contSemana={contSemana}
                    numeroCelula={numeroCelula}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RelCelula;
