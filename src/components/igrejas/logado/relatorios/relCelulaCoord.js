import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

import PegaSemanaAtual from 'src/utils/getSemanaAtual';
import PegaMes from 'src/utils/getMes';

import Meses from 'src/utils/mesesAbrev';

import TabCelula from './coordenador/aba/tabRelCoordCelulas';
import TabSetor from './coordenador/aba/tabRelCoordTotal';
import TabResumo from './supervisor/aba/tabResumo';

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

function RelCelula({ perfilUser, lideranca }) {
  const classes = useStyles();
  //= ================================================================
  const mes = Meses();
  const d = new Date();
  const mesAtual = Number(d.getMonth());
  const anoAtual = Number(d.getFullYear());
  const [contMes, setContMes] = React.useState(mesAtual);
  const [contAno, setContAno] = React.useState(anoAtual);

  const dataAtual = Date.now();
  const semanaAtual = PegaSemanaAtual(dataAtual);

  const [sendResumo, setSendResumo] = React.useState(false);
  const [dadosCelulaSend, setDadosCelulaSend] = React.useState([]);
  const [valorIndexSend, setValorIndexSend] = React.useState([]);
  const [indexTabela, setIndexTabela] = React.useState([]);
  const [contSemana, setContSemana] = React.useState(semanaAtual - 1);

  const lideresSetor = lideranca.sort((a, b) => {
    if (new Date(a.Celula) > new Date(b.Celula)) return 1;
    if (new Date(b.Celula) > new Date(a.Celula)) return -1;
    return 0;
  });

  const celulaSetor = lideresSetor.filter(
    (results) =>
      Number(results.Coordenacao) === Number(perfilUser.Coordenacao) &&
      Number(results.Distrito) === Number(perfilUser.Distrito) &&
      results.Funcao === 'Lider',
  );
  const numberCelulas = celulaSetor.map((itens) => itens.Celula);
  const uniqueArr = [...new Set(numberCelulas)];

  const [numeroCelula] = React.useState(uniqueArr);

  const tipo = ['Relatório das Celulas', 'Relatório Geral'];
  const [contTipo, setContTipo] = React.useState(0);
  const handleIncTipo = () => {
    let contTipoAtual = contTipo + 1;

    if (contTipoAtual > 1) {
      contTipoAtual = 0;
    }
    setContTipo(contTipoAtual);
  };
  const handleDecTipo = () => {
    let contTipoAtual = contTipo - 1;

    if (contTipoAtual < 0) {
      contTipoAtual = 1;
    }
    setContTipo(contTipoAtual);
  };

  const handleIncSemana = () => {
    let contSemanaAtual = contSemana + 1;
    if (contSemanaAtual > semanaAtual && contAno === anoAtual) {
      contSemanaAtual = semanaAtual;
    }
    if (contSemanaAtual > 52) {
      contSemanaAtual = 1;
      setContAno(contAno + 1);
    }
    setContMes(PegaMes(contSemanaAtual, anoAtual));

    setContSemana(contSemanaAtual);
  };
  const handleDecSemana = () => {
    let contSemanaAtual = contSemana - 1;
    if (contSemanaAtual < 1) {
      contSemanaAtual = 52;
      setContAno(contAno - 1);
    }
    setContMes(PegaMes(contSemanaAtual, anoAtual));
    setContSemana(contSemanaAtual);
  };
  React.useEffect(() => {}, [contMes]);
  return (
    <Box height="90vh" width="100vw" minHeight={500}>
      {!sendResumo ? (
        <Box
          height="100%"
          mt={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            bgcolor={corIgreja.principal}
            style={{
              borderRadius: '16px',
            }}
            height="100%"
            width="100vw"
            border="4px solid #fff"
          >
            <Box height="100%">
              <Box
                height="20%"
                minHeight={100}
                minWidth={300}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor={corIgreja.principal}
                style={{
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px',
                }}
              >
                <Box width="96%" ml={1} minWidth={300}>
                  <Grid container spacing={1} item xs={12}>
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
                              <BiCaretLeft size={30} />
                            </IconButton>
                          </Box>
                          <Box
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            fontSize="15px"
                            sx={{ fontFamily: 'arial black' }}
                          >
                            SEM - {contSemana}
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
                              <BiCaretRight size={30} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper width="100%" className={classes.paper}>
                        <Box height={25} width="100%" display="flex">
                          <Box
                            width="100%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ fontFamily: 'arial black' }}
                          >
                            {mes[contMes].descricao} / {contAno}
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        borderRadius={5}
                        bgcolor="white"
                        width="100%"
                        display="flex"
                      >
                        <Box
                          width="10%"
                          height={40}
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleDecTipo();
                            }}
                          >
                            <SvgIcon sx={{ color: corIgreja.iconeOn }} />{' '}
                            <BiCaretLeft />
                          </IconButton>
                        </Box>
                        <Box
                          width="100%"
                          className={classes.fontResponsive16}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ fontFamily: 'arial black' }}
                        >
                          {tipo[contTipo]}
                        </Box>
                        <Box
                          width="10%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleIncTipo();
                            }}
                          >
                            <SvgIcon sx={{ color: corIgreja.iconeOn }} />
                            <BiCaretRight />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box
                style={{
                  borderBottomLeftRadius: '16px',
                  borderBottomRightRadius: '16px',
                }}
                mt="-3vh"
                height="84%"
                minWidth={320}
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={200}
                width="100%"
                bgcolor={corIgreja.principal}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="95%"
                  height="100%"
                >
                  <Box
                    height="90%"
                    minHeight={225}
                    bgcolor="#fafafa"
                    width="100%"
                    borderRadius={16}
                  >
                    {!contTipo ? (
                      <TabCelula
                        perfilUser={perfilUser}
                        Mes={contMes}
                        Ano={contAno}
                        contSemana={contSemana}
                        numeroCelula={numeroCelula}
                        setSendResumo={setSendResumo}
                        setDadosCelulaSend={setDadosCelulaSend}
                        setValorIndexSend={setValorIndexSend}
                        setIndexTabela={setIndexTabela}
                      />
                    ) : (
                      <TabSetor
                        perfilUser={perfilUser}
                        Mes={contMes}
                        Ano={contAno}
                        contSemana={contSemana}
                        numeroCelula={numeroCelula}
                        setSendResumo={setSendResumo}
                        setDadosCelulaSend={setDadosCelulaSend}
                        setValorIndexSend={setValorIndexSend}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <TabResumo
          perfilUser={perfilUser}
          lideranca={lideranca}
          Mes={contMes}
          Ano={contAno}
          contSemana={contSemana}
          numeroCelula={numeroCelula}
          setSendResumo={setSendResumo}
          dadosCelulaSend={dadosCelulaSend}
          valorIndexSend={valorIndexSend}
          indexTabela={indexTabela}
        />
      )}
    </Box>
  );
}

export default RelCelula;
