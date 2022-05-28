import { Box, Grid, Paper, Button } from '@material-ui/core';
import React from 'react';

import useSWR from 'swr';
// import { useRouter } from 'next/router';
import TabCelula from 'src/components/castelo/logado/planejamento/planejamentoCelulaMembro';
// import horarioMask from 'src/components/mascaras/horario';
import corIgreja from 'src/utils/coresIgreja';
import DateFnsUtils from '@date-io/date-fns';
import Select from 'react-select';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { IoIosSave } from 'react-icons/io';

import axios from 'axios';
import Espera from 'src/utils/espera';
import Erros from 'src/utils/erros';
import { IoArrowUndoSharp, IoArrowRedoSharp } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Typography from '@mui/material/Typography';
import 'react-image-crop/dist/ReactCrop.css';

const fetcher = (url) => axios.get(url).then((res) => res.data);
// const fetcher2 = (url2) => axios.get(url2).then((res) => res.dataVisitante);
const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
  },
  novoBox2: {
    flexGrow: 1,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
  },
  boxImg: {
    flexGrow: 1,
    padding: 0.3,
    marginTop: 3,
    marginBottom: -4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
  },
  textField: {
    textAlign: 'center',
    fontSize: '12px',
  },
  alignBox: {
    padding: theme.spacing(0),
    // display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'blue',
    // height: '330px',
    marginTop: 20,
  },
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: 'auto',
  },
  imgMobile: {
    maxWidth: '1110px',
    maxHeight: '500px',
    width: '100%',
    height: 'auto',
  },
  logo: {
    height: '100%',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      marginLeft: 2,
    },
  },
  page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'blue',
  },
  caption: {
    marginTop: -5,
    marginLeft: 5,
    textTransform: 'capitalize',
    fontWeight: 1000,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    fontSize: '40px',
    '@media (min-width:600px)': {
      fontSize: '20px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  typography: {
    color: 'black',
    fontWeight: 1000,
    marginTop: -10,
    marginLeft: 5,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    fontSize: '30px',
    '@media (min-width:600px)': {
      fontSize: '20px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  rotulo: {
    color: 'blue',
    textTransform: 'capitalize',
    fontWeight: 500,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    fontSize: '30px',
    '@media (min-width:600px)': {
      fontSize: '16px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  tf_12: {
    // marginLeft: theme.spacing(1),
    //  marginRight: theme.spacing(1),
    width: '500px',
    backgroundColor: '#ffff',

    margin: 10,
    [theme.breakpoints.down('md')]: {
      width: '20',
    },
  },
  tf_m: {
    backgroundColor: '#f5f5f5',

    width: '96%',
    fontSize: '5px',
  },

  tf_6: {
    //    marginRight: 8,
    backgroundColor: '#f0f4c3',

    margin: 10,
    width: '240px',
    textAlign: 'center',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      margin: 10,
      width: '205px',
    },
  },
  tf_4: {
    margin: 10,
    // marginRight: 8,
    backgroundColor: '#f0f4c3',
    width: '155px',
    textAlign: 'center', // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      width: '130px',
    },
  },
  tf_3: {
    margin: 10,
    textAlign: 'center',
    backgroundColor: '#f0f4c3',
    // marginRight: 8,
    width: '120px',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      width: '110px',
    },
  },
  tf_s2: {
    textAlign: 'center',
    display: 'flex',
    marginLeft: 28,
    width: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  root: {
    // position: 'absolute',
    width: '100%',
    // marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
  },
}));
function createListaMembros(value, label) {
  return {
    value,
    label,
  };
}

function RelatorioCelebracao({ planCelula }) {
  const classes = useStyles();

  const dadosUser = [];
  dadosUser[0] = planCelula;

  const [Encontro, setEncontro] = React.useState(dadosUser[0].Encontro);
  const [Exaltacao, setExaltacao] = React.useState(dadosUser[0].Exaltacao);
  const [Evangelismo, setEvangelismo] = React.useState(
    dadosUser[0].Evangelismo,
  );
  const [Lanche, setLanche] = React.useState(dadosUser[0].Lanche);
  const [Edificacao, setEdificacao] = React.useState(dadosUser[0].Edificacao);

  //--------------------------------------------------------------------------

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={corIgreja.principal}
      height="90vh"
      width="100vw"
      minWidth={300}
      minHeight={500}
    >
      <Box height="100%">
        <Box
          height="100%"
          minWidth={300}
          width="100vw"
          mt={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            minWidth={300}
            height="100%"
            width="100vw"
            maxWidth="1410px"
            border="4px solid #fff"
          >
            <Box height="100%">
              <Box
                height="73.9%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={343}
                width="100%"
                bgcolor={corIgreja.principal}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  height="100%"
                  width="100%"
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    width="100%"
                    height="100%"
                  >
                    <Box
                      height="63.7%"
                      minHeight={330}
                      bgcolor={corIgreja.principal}
                      width="100%"
                    >
                      {tela === 1 && (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexDirection="column"
                          width="100%"
                          height="100%"
                        >
                          <Box
                            height="10%"
                            width="100%"
                            minHeight={70}
                            mb={5}
                            mt={-2}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            borderBottom="2px solid #fff"
                            borderTop="2px solid #fff"
                            bgcolor={corIgreja.principal}
                            sx={{
                              color: '#fff',
                              fontFamily: 'Geneva',
                              fontWeight: 'bold',
                              fontSize: '20px',
                            }}
                          >
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              width="100%"
                              height="100%"
                            >
                              <Box
                                sx={{ fontSize: '16px' }}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                height="100%"
                                borderRight="2px solid #fff"
                                width="50%"
                              >
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  CÉLULA
                                </Box>
                                <Box
                                  fontFamily="arial black"
                                  color="yellow"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  {perfilUser.Celula}
                                </Box>
                              </Box>
                              <Box
                                sx={{ fontSize: '16px' }}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                height="100%"
                                width="50%"
                              >
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  SEMANA
                                </Box>
                                <Box
                                  fontFamily="arial black"
                                  color="yellow"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  {semana}
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            mt={0}
                            ml={0}
                            width="96%"
                            height="100%"
                            bgcolor={corIgreja.principal}
                          >
                            <TabCelula />
                          </Box>
                        </Box>
                      )}

                      {tela === 2 && (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexDirection="column"
                          width="100%"
                          height="100%"
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            mt={0}
                            ml={0}
                            width="96%"
                            height="100%"
                            bgcolor={corIgreja.principal}
                          >
                            <Box width="96%">
                              <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                  <Box
                                    mt={1}
                                    ml={2}
                                    color="white"
                                    sx={{ fontSize: 'bold' }}
                                  >
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      E1 (ENCONTRO)
                                    </Typography>
                                  </Box>

                                  <Box className={classes.novoBox} mt={-2}>
                                    <Select
                                      defaultValue={values}
                                      onChange={(e) => {
                                        setValues(e);
                                        setEncontro(e.label);
                                      }}
                                      options={nomesCelulaParcial}
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                  <Box
                                    mt={-1}
                                    ml={2}
                                    color="white"
                                    sx={{ fontSize: 'bold' }}
                                  >
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      E2 (EXALTAÇÃO)
                                    </Typography>
                                  </Box>
                                  <Box className={classes.novoBox} mt={-2}>
                                    <Select
                                      defaultValue={values2}
                                      onChange={(e) => {
                                        setValues2(e);
                                        setExaltacao(e.label);
                                      }}
                                      options={nomesCelulaParcial}
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                  <Box
                                    mt={-1}
                                    ml={2}
                                    color="white"
                                    sx={{ fontSize: 'bold' }}
                                  >
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      E3 (EDIFICAÇÃO)
                                    </Typography>
                                  </Box>
                                  <Box className={classes.novoBox} mt={-2}>
                                    <Select
                                      defaultValue={values3}
                                      onChange={(e) => {
                                        setValues3(e);
                                        setEdificacao(e.label);
                                      }}
                                      options={nomesCelulaParcial}
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                  <Box
                                    mt={-1}
                                    ml={2}
                                    color="white"
                                    sx={{ fontSize: 'bold' }}
                                  >
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      E4 (EVANGELISMO)
                                    </Typography>
                                  </Box>
                                  <Box className={classes.novoBox} mt={-2}>
                                    <Select
                                      defaultValue={values4}
                                      onChange={(e) => {
                                        setValues4(e);
                                        setEvangelismo(e.label);
                                      }}
                                      options={nomesCelulaParcial}
                                    />
                                  </Box>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                  <Box
                                    mt={-1}
                                    ml={2}
                                    color="white"
                                    sx={{ fontSize: 'bold' }}
                                  >
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      E5 (LANCHE)
                                    </Typography>
                                  </Box>
                                  <Box className={classes.novoBox} mt={-2}>
                                    <Select
                                      defaultValue={values5}
                                      onChange={(e) => {
                                        setValues5(e);
                                        setLanche(e.label);
                                      }}
                                      options={nomesCelulaParcial}
                                    />
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                height="10%"
                minHeight={75}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor={corIgreja.principal}
              >
                <Box
                  height="10%"
                  minHeight={75}
                  width="90%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  bgcolor={corIgreja.principal}
                  style={{
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                  }}
                >
                  <Box
                    height="10%"
                    minHeight={75}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor={corIgreja.principal}
                    width="100vw"
                  >
                    <Box
                      height="10%"
                      minHeight={75}
                      width="90%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      bgcolor={corIgreja.principal}
                      style={{
                        borderTopLeftRadius: '16px',
                        borderTopRightRadius: '16px',
                      }}
                    >
                      <Box width="100%" ml={1}>
                        <Box mb={1}>
                          <Grid container spacing={2}>
                            {tela === 1 && (
                              <Grid container spacing={2}>
                                <Grid item xs={6} md={6} lg={6} xl={6}>
                                  {existeRelatorio !== true ? (
                                    <Paper
                                      style={{
                                        borderRadius: 16,
                                        textAlign: 'center',
                                        background: '#ffffaa',
                                        height: 40,
                                      }}
                                    >
                                      <Button
                                        onClick={() => {
                                          setCheckRelatorio(false);
                                          ajusteRelatorio();
                                        }}
                                        startIcon={
                                          <IoArrowUndoSharp color="blue" />
                                        }
                                      >
                                        <Box
                                          mr={2}
                                          ml={2}
                                          mt={0.3}
                                          sx={{ fontFamily: 'arial black' }}
                                        >
                                          VOLTAR
                                        </Box>
                                      </Button>
                                    </Paper>
                                  ) : (
                                    <Paper
                                      style={{
                                        borderRadius: 16,
                                        textAlign: 'center',
                                        background: 'gray',
                                        height: 40,
                                      }}
                                    >
                                      <Button
                                        startIcon={
                                          <IoArrowUndoSharp color="blue" />
                                        }
                                      >
                                        <Box
                                          mr={2}
                                          ml={2}
                                          mt={0.3}
                                          sx={{ fontFamily: 'arial black' }}
                                        >
                                          VOLTAR
                                        </Box>
                                      </Button>
                                    </Paper>
                                  )}
                                </Grid>
                                <Grid item xs={6} md={6} lg={6} xl={6}>
                                  <Paper
                                    style={{
                                      borderRadius: 16,
                                      textAlign: 'center',
                                      background: '#feeffa',
                                      height: 40,
                                    }}
                                  >
                                    {multiplicacao.length > 9 &&
                                    horario.length >= 5 &&
                                    valueAnfitriao.length > 2 &&
                                    objetivo.label !==
                                      'Qual a fase atual da Célula?' ? (
                                      <Button
                                        onClick={() => {
                                          setTela(2);
                                        }}
                                        endIcon={
                                          <IoArrowRedoSharp color="blue" />
                                        }
                                      >
                                        <Box
                                          mr={2}
                                          ml={2}
                                          mt={0.3}
                                          sx={{ fontFamily: 'arial black' }}
                                        >
                                          Próxima
                                        </Box>
                                      </Button>
                                    ) : (
                                      <Button
                                        onClick={() => {
                                          toast.error(
                                            'ANTES DE IR PARA A PRÓXIMA TELA PREENCHA TODOS OS DADOS !',
                                            {
                                              position:
                                                toast.POSITION.TOP_CENTER,
                                            },
                                          );
                                        }}
                                        endIcon={
                                          <IoArrowRedoSharp color="gray" />
                                        }
                                      >
                                        <Box
                                          mr={2}
                                          ml={2}
                                          mt={0.3}
                                          sx={{ fontFamily: 'arial black' }}
                                        >
                                          PRÓXIMA
                                        </Box>
                                      </Button>
                                    )}
                                  </Paper>
                                </Grid>
                              </Grid>
                            )}
                            {tela === 2 && (
                              <Grid container spacing={2}>
                                <Grid item xs={6} md={6} lg={6} xl={6}>
                                  <Paper
                                    style={{
                                      borderRadius: 16,
                                      textAlign: 'center',
                                      background: '#ffeeee',
                                      height: 40,
                                    }}
                                  >
                                    <Button
                                      onClick={() => {
                                        setTela(1);
                                      }}
                                      startIcon={
                                        <IoArrowUndoSharp color="blue" />
                                      }
                                    >
                                      <Box
                                        mt={0.3}
                                        sx={{ fontFamily: 'arial black' }}
                                      >
                                        ANTERIOR
                                      </Box>
                                    </Button>
                                  </Paper>
                                </Grid>

                                <Grid item xs={6} md={6} lg={6} xl={6}>
                                  <Paper
                                    style={{
                                      borderRadius: 16,
                                      textAlign: 'center',
                                      background: podeEditar
                                        ? '#ffffaa'
                                        : 'gray',
                                      height: 40,
                                    }}
                                  >
                                    {existeRelatorio === true ? (
                                      <Box>
                                        {podeEditar ? (
                                          <Box>
                                            <Box>
                                              {!carregando ? (
                                                <Button
                                                  startIcon={
                                                    <IoIosSave color="blue" />
                                                  }
                                                >
                                                  <Box
                                                    mt={0.3}
                                                    sx={{
                                                      fontFamily: 'arial black',
                                                    }}
                                                  >
                                                    <Box>Atualizar</Box>
                                                  </Box>
                                                </Button>
                                              ) : (
                                                <Box>
                                                  <Espera descricao="Gerando o Relatório" />
                                                </Box>
                                              )}
                                            </Box>
                                          </Box>
                                        ) : (
                                          <Button>
                                            <Box
                                              color="#fff"
                                              mt={0.3}
                                              sx={{
                                                fontFamily: 'arial black',
                                              }}
                                            >
                                              Consolidado
                                            </Box>
                                          </Button>
                                        )}
                                      </Box>
                                    ) : (
                                      <Box>
                                        {!carregando ? (
                                          <Button
                                            startIcon={
                                              <IoIosSave color="blue" />
                                            }
                                          >
                                            <Box
                                              mt={0.3}
                                              sx={{
                                                fontFamily: 'arial black',
                                              }}
                                            >
                                              <Box>Salvar</Box>
                                            </Box>
                                          </Button>
                                        ) : (
                                          <Box>
                                            <Espera descricao="Criando o Planejamento" />
                                          </Box>
                                        )}
                                      </Box>
                                    )}
                                  </Paper>
                                </Grid>
                              </Grid>
                            )}
                          </Grid>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        ) : (
        <Box
          height="100%"
          minWidth={300}
          width="100vw"
          mt={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            minWidth={300}
            height="100%"
            width="100vw"
            maxWidth={1200}
            border="4px solid #fff"
          >
            <Box height="100%">
              <Box
                height="10%"
                minHeight={75}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor={corIgreja.principal}
                style={{
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px',
                }}
              >
                <Box width="90%" ml={1}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    mb={1}
                  >
                    <Grid item xs={7} md={7} lg={7} xl={7}>
                      <Paper style={{ background: '#fafafa', height: 40 }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justifyContent="center">
                            <KeyboardDatePicker
                              open={open}
                              disableToolbar
                              variant="inline"
                              format="dd/MM/yyyy"
                              id="date-picker-inline"
                              value={selectedDate}
                              inputValue={inputValue}
                              onClick={handleDateClick}
                              onChange={handleDateChange}
                              onClose={getData()}
                              style={{
                                marginLeft: 10,
                                marginRight: 10,
                                marginTop: 5,
                                height: 30,
                                background: '#fafafa',
                              }}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </Paper>
                    </Grid>
                  </Box>
                </Box>
              </Box>
              <Box
                height="10%"
                width="100%"
                minHeight={70}
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderTop="2px solid #fff"
                bgcolor={corIgreja.principal}
                sx={{
                  color: '#fff',
                  fontFamily: 'Geneva',
                  fontWeight: 'bold',
                  fontSize: '20px',
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  height="100%"
                >
                  <Box
                    sx={{ fontSize: '16px' }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                    borderRight="2px solid #fff"
                    width="50%"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      CÉLULA
                    </Box>
                    <Box
                      fontFamily="arial black"
                      color="yellow"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {perfilUser.Celula}
                    </Box>
                  </Box>
                  <Box
                    sx={{ fontSize: '16px' }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100%"
                    width="50%"
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      MEMBROS
                    </Box>
                    <Box
                      fontFamily="arial black"
                      color="yellow"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {nomesCel.length}
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box height="60%">
                <TabCelula />
              </Box>
            </Box>
          </Box>
        </Box>
        )}
      </Box>

      {openErro && (
        <Erros
          descricao="banco"
          setOpenErro={(openErros) => setOpenErro(openErros)}
        />
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
}

export default RelatorioCelebracao;
