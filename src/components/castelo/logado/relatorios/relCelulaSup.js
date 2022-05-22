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

import TabCelula from './supervisor/aba/tabRelSuperCelulas';
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

  const [contSemana, setContSemana] = React.useState(semanaAtual);
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
          <Box height="100%" width="96vw" border="4px solid #fff">
            <Box height="100%">
              <Box
                height="20%"
                minHeight={80}
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
                    <Grid item xs={8}>
                      <Box ml={1} color="white">
                        Escolha a Semana
                      </Box>
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
                            SEMANA - {contSemana}
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
                    <Grid item xs={4}>
                      <Box ml={1} color="white">
                        Mes / Ano
                      </Box>
                      <Paper width="100%" className={classes.paper}>
                        <Box height={30} width="100%" display="flex">
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
                  </Grid>
                </Box>
              </Box>
              <Box
                style={{
                  borderBottomLeftRadius: '16px',
                  borderBottomRightRadius: '16px',
                }}
                height="80%"
                minWidth={300}
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={430}
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
                    RELATÓRIOS DAS CÉLULAS
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
                      setSendResumo={setSendResumo}
                      setDadosCelulaSend={setDadosCelulaSend}
                      setValorIndexSend={setValorIndexSend}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <TabResumo
          perfilUser={perfilUser}
          Mes={contMes}
          Ano={contAno}
          contSemana={contSemana}
          numeroCelula={numeroCelula}
          setSendResumo={setSendResumo}
          dadosCelulaSend={dadosCelulaSend}
          valorIndexSend={valorIndexSend}
        />
      )}
    </Box>
  );
}

export default RelCelula;
