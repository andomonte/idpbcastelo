import { Box, Grid, Paper, Button } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import { MdCreateNewFolder } from 'react-icons/md';

import Meses from 'src/utils/meses';

import TamanhoJanela from 'src/utils/getSize';
import NovoEventoGeral from './abas/novoEventoGeral';
import MostrarEvento from './abas/mostrarEventoGeral';
import TabEventoGeral from './abas/tabEventoGeral';

const janela = TamanhoJanela();

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
  fontResponsive: {
    fontSize: '3vw',

    [theme.breakpoints.up('sm')]: {
      fontSize: '1.8vw',
    },
    [theme.breakpoints.up('lg')]: { fontSize: '1.3vw' },
  },
  fontResponsive16: {
    fontSize: '4vw',
    [theme.breakpoints.down('sm')]: {
      fontSize: '4vw',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '2.5vw',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.8vw',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.4vw',
    },
  },
}));

function PlanMembro({ perfilUser, lideranca }) {
  const classes = useStyles();
  //= ================================================================
  const mes = Meses();
  const d = new Date();
  const mesAtual = Number(d.getMonth());
  const anoAtual = Number(d.getFullYear());
  const [contMes, setContMes] = React.useState(mesAtual);
  const [contAno, setContAno] = React.useState(anoAtual);
  const [openNovoEventoGeral, setOpenNovoEventoGeral] = React.useState(false);
  const [sendResumo, setSendResumo] = React.useState(false);
  const [dadosEvento, setDadosEvento] = React.useState(false);

  const handleIncAno = () => {
    let contAnoAtual = contAno + 1;

    if (contAnoAtual > anoAtual) contAnoAtual = anoAtual;
    setContAno(contAnoAtual);
  };
  const handleDecAno = () => {
    let contAnoAtual = contAno - 1;

    if (contAnoAtual < 2022) contAnoAtual = 2022;
    setContAno(contAnoAtual);
  };
  const handleIncMes = () => {
    let contMesAtual = contMes + 1;

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      className={classes.fontResponsive}
    >
      {!openNovoEventoGeral ? (
        <Box
          width="100vw"
          minWidth={300}
          minHeight={450}
          display="flex"
          alignContent="center"
          justifyContent="center"
          height={janela.height > 570 ? '90vh' : '88vh'}
          mt={0}
        >
          {!sendResumo ? (
            <Box height="100%" width="100%" border="4px solid #fff">
              <Box height="100%">
                <Box
                  height="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  bgcolor={corIgreja.principal}
                  style={{
                    borderRadius: '16px',
                  }}
                >
                  <Box mt={2} width="96%" ml={1}>
                    <Box ml={2} color="white">
                      Selecione o Mês
                    </Box>
                    <Grid container item xs={12} spacing={1}>
                      <Grid item xs={8}>
                        <Paper width="100%" className={classes.paper}>
                          <Box width="100%" display="flex">
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
                              className={classes.fontResponsive16}
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              sx={{ fontFamily: 'arial black' }}
                            >
                              {mes[contMes].descricao} / {contAno}
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
                      <Grid item xs={4}>
                        <Button
                          style={{
                            background: '#f0f0f0',
                            width: '100%',
                            height: '100%',
                            fontSize: '14px',
                            fontFamily: 'arial black',
                          }}
                          onClick={() => setOpenNovoEventoGeral(true)}
                          variant="contained"
                          severity="success"
                          endIcon={<MdCreateNewFolder size={30} color="blue" />}
                        >
                          Novo
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box width="95%" height="100%">
                    <Box
                      height="10%"
                      minHeight={50}
                      className={classes.fontResponsive16}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        bgcolor: corIgreja.principal,
                        color: 'white',
                        fontFamily: 'arial black',
                        fontWeight: 'bold',
                      }}
                    >
                      {perfilUser.Funcao === 'Supervisor' && (
                        <Box>EVENTO DO SETOR {perfilUser.supervisao}</Box>
                      )}
                      {perfilUser.Funcao === 'Coordenador' && (
                        <Box>
                          EVENTO DA COORDENAÇÃO {perfilUser.Coordenacao}
                        </Box>
                      )}
                      {perfilUser.Funcao === 'PastorDistrito' && (
                        <Box>EVENTO DO DISTRITO {perfilUser.Distrito}</Box>
                      )}
                      {(perfilUser.Funcao === 'Presidente' ||
                        perfilUser.Funcao === 'Secretaria') && (
                        <Box>EVENTO DA IGREJA</Box>
                      )}
                    </Box>

                    <Box
                      height={janela.height > 570 ? '64vh' : '58vh'}
                      minHeight={280}
                      bgcolor="#fafafa"
                      width="100%"
                      borderRadius={16}
                    >
                      <TabEventoGeral
                        perfilUser={perfilUser}
                        Mes={contMes}
                        Ano={contAno}
                        lideranca={lideranca}
                        setSendResumo={setSendResumo}
                        setDadosEvento={setDadosEvento}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box>
              <MostrarEvento
                dadosEvento={dadosEvento}
                perfilUser={perfilUser}
                Mes={contMes}
                Ano={contAno}
                setSendResumo={setSendResumo}
              />
            </Box>
          )}
        </Box>
      ) : (
        <NovoEventoGeral
          perfilUser={perfilUser}
          setOpenNovoEventoGeral={setOpenNovoEventoGeral}
          lideranca={lideranca}
          Mes={contMes}
          Ano={contAno}
        />
      )}
    </Box>
  );
}

export default PlanMembro;
