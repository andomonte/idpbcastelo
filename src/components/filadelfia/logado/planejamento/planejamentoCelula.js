import { Box, Grid, Paper, Button } from '@material-ui/core';
import React from 'react';
import useSWR, { mutate } from 'swr';
// import { useRouter } from 'next/router';
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
import api from 'src/components/services/api';
import axios from 'axios';
import { Oval } from 'react-loading-icons';
import Espera from 'src/utils/espera';
import Erros from 'src/utils/erros';
import { IoReturnDownBack } from 'react-icons/io5';
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
  boxImg: {
    flexGrow: 1,
    padding: 0.3,
    marginTop: 3,
    marginBottom: -4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
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

    width: '100%',
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

function RelatorioCelebracao({ rolMembros, perfilUser }) {
  //  const classes = useStyles();
  // const router = useRouter();
  const classes = useStyles();

  const nomesCel = rolMembros.filter(
    (val) => val.Celula === Number(perfilUser.Celula),
  );
  const nomesCelulaParcial = nomesCel.map((rol) =>
    createListaMembros(rol.id, rol.Nome),
  );

  const dadosUser = rolMembros.filter(
    (val) => val.RolMembro === Number(perfilUser.RolMembro),
  );
  const [Encontro, setEncontro] = React.useState(dadosUser[0].Encontro);
  const [Exaltacao, setExaltacao] = React.useState(dadosUser[0].Exaltacao);
  const [Evangelismo, setEvangelismo] = React.useState(
    dadosUser[0].Evangelismo,
  );
  const [Lanche, setLanche] = React.useState(dadosUser[0].Lanche);
  const [Edificacao, setEdificacao] = React.useState(dadosUser[0].Edificacao);

  //--------------------------------------------------------------------------
  const valorInicial = { label: 'Escolha um Responsável', value: 0 };
  const [values, setValues] = React.useState(valorInicial);
  const [values2, setValues2] = React.useState(valorInicial);
  const [values3, setValues3] = React.useState(valorInicial);
  const [values4, setValues4] = React.useState(valorInicial);
  const [values5, setValues5] = React.useState(valorInicial);

  const [openErro, setOpenErro] = React.useState(false);
  const timeElapsed2 = Date.now();
  const dataAtual2 = new Date(timeElapsed2);
  const [checkRelatorio, setCheckRelatorio] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);
  const [open, setIsPickerOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [tela, setTela] = React.useState(1);
  const [carregando, setCarregando] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  //= ==============================================================
  const handleDateChange = (date, value) => {
    setInputValue(value);
    setSelectedDate(date);
    setIsPickerOpen(false);
  };
  //= ==================================================================

  const getData = () => {
    //  enviarData = inputValue;
    //  enviarDia = Number(inputValue.slice(0, 2));
  };

  const handleDateClick = () => {
    //   setSelectedDate();
    setIsPickerOpen(true);
  };

  //= ==========pegar semana apartir da data==============
  const semanaExata = (dataEnviada) => {
    const Ano = dataEnviada.getFullYear();
    const Mes = dataEnviada.getMonth();
    const Dia = dataEnviada.getDate();
    const firstSun = new Date(2021, 0, 1);
    const lastSun = new Date(Ano, Mes, Dia);
    while (firstSun.getDay() !== 2) {
      firstSun.setDate(firstSun.getDate() + 1);
    }
    while (lastSun.getDay() !== 2) {
      lastSun.setDate(lastSun.getDate() + 1);
    }

    let result = 0;
    for (let i = result + 1; lastSun - firstSun > 0; i += 1) {
      lastSun.setDate(lastSun.getDate() - 7);
      if (i > 52) i = 1;
      result = i;
    }

    return result;
  };
  //= =================================================================

  const [semana, setSemana] = React.useState(0);
  const [existeRelatorio, setExisteRelatorio] = React.useState('inicio');
  const [podeEditar, setPodeEditar] = React.useState(true);
  const [etapas, setEtapas] = React.useState('incompleto');

  React.useEffect(() => {
    const timeElapsed = Date.now();
    const dataAtual = new Date(timeElapsed);

    if (dataAtual) {
      setSemana(semanaExata(dataAtual));
    }
  }, []);

  const url = `/api/consultaPlanejamentoCelula/${semana}`;
  const { data: members, error: errorMembers } = useSWR(url, fetcher);

  const carregaResponsaveis = (relatorio) => {
    const newValues = nomesCelulaParcial.filter(
      (val) => val.label === relatorio[0].Encontro,
    );
    setEncontro(relatorio[0].Encontro);
    setValues(newValues[0]);

    const newValues2 = nomesCelulaParcial.filter(
      (val) => val.label === relatorio[0].Exaltacao,
    );

    setExaltacao(relatorio[0].Exaltacao);
    setValues2(newValues2[0]);

    const newValues3 = nomesCelulaParcial.filter(
      (val) => val.label === relatorio[0].Edificacao,
    );
    setEdificacao(relatorio[0].Edificacao);
    setValues3(newValues3[0]);

    const newValues4 = nomesCelulaParcial.filter(
      (val) => val.label === relatorio[0].Evangelismo,
    );
    setEvangelismo(relatorio[0].Evangelismo);
    setValues4(newValues4[0]);

    const newValues5 = nomesCelulaParcial.filter(
      (val) => val.label === relatorio[0].Lanche,
    );
    setLanche(relatorio[0].Lanche);
    setValues5(newValues5[0]);
  };

  const ajusteRelatorio = () => {
    setTela(1);
    setCarregando(false);
    let relExiste = 'inicio';
    if (members) relExiste = 'sem'; // setExisteRelatorio('sem');

    setExisteRelatorio(relExiste);
    if (members && members.length > 0) {
      const relatorio = members.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito),
      );

      if (relatorio && relatorio.length) {
        relExiste = 'sim';
        const dataAgora = new Date();
        const semanaAgora = semanaExata(dataAgora);
        if (semanaAgora - semana < 2) setPodeEditar(true);
        else setPodeEditar(false);

        setExisteRelatorio(true); // avisa que tem relatório
        setTela(1);
        setCheckRelatorio(true);

        carregaResponsaveis(relatorio);
      } else {
        setExisteRelatorio('sem'); // avisa que tem relatório
        setCheckRelatorio(false);
      }
    }

    if (errorMembers) return <div>An error occured.</div>;
    if (!members) return <div>Loading ...</div>;
    return 0;
  };

  React.useEffect(() => {
    if (semana !== 0) {
      ajusteRelatorio();
    }
    return 0;
  }, [semana]);
  React.useEffect(() => {
    ajusteRelatorio();

    return 0;
  }, [members]);
  React.useEffect(() => {
    ajusteRelatorio();

    return 0;
  }, [checkRelatorio]);

  //= ========================calcular adulto e crianca========================

  React.useEffect(() => {
    //  contEffect += 1;
    setCheckRelatorio(false);

    setLoading(true);
    if (existeRelatorio === 'sem') setLoading(false);
    setExisteRelatorio('inicio');
    if (selectedDate) {
      const checkAno = selectedDate.getFullYear();

      // selectedDate.setTime(selectedDate.getTime() + 1000 * 60);
      if (checkAno > 2020) {
        setSemana(semanaExata(selectedDate));
      }
    }
  }, [selectedDate]);

  React.useEffect(() => {
    setLoading(true);
    if (existeRelatorio !== 'inicio') setLoading(false);
    return 0;
  }, [existeRelatorio]);

  React.useEffect(() => {
    if (Encontro && Exaltacao && Evangelismo && Edificacao && Lanche) {
      setEtapas('completo');
    }
  }, [Exaltacao, Encontro, Evangelismo, Edificacao, Lanche]);
  //  const handleVoltar = () => {};
  /*   const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const formId = event.target.id;

      if (formId === 'Nome') celularRef.current.focus();
      if (formId === 'TelefoneCelular') foneRef.current.focus();
      if (formId === 'TelefoneResidencial') cpfRef.current.focus();
      if (formId === 'CPF') rgRef.current.focus();
      if (formId === 'RG') sexoRef.current.focus();
      if (formId === 'Sexo') nascimentoRef.current.focus();
      if (formId === 'DataNascimento') naturalidadeRef.current.focus();
      if (formId === 'Naturalidade') EncontroRef.current.focus();
    }
  };
 */ const handleSalvar = () => {
    setCarregando(true);

    // const nomesMembros = JSON.parse(RelDiscipuladoFinal.NomesMembros);

    api
      .post('/api/criarPlanejamentoCelula', {
        Encontro: String(Encontro),
        Exaltacao,
        Edificacao,
        Evangelismo,
        Lanche,
        Semana: semana,
        Data: inputValue,
        Celula: Number(perfilUser.Celula),
        Supervisao: Number(perfilUser.supervisao),
        Coordenacao: Number(perfilUser.Coordenacao),
        Distrito: Number(perfilUser.Distrito),
      })
      .then((response) => {
        if (response) {
          // enviarPontuacao();
          console.log('resposta');
          setLoading(false);
          setCarregando(false);
          mutate(url);
        }
      })
      .catch(() => {
        setOpenErro(true);

        setCarregando(false);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={corIgreja.principal}
      height="90vh"
      width="100vw"
      minWidth={370}
      minHeight={500}
    >
      <Box height="100%">
        {checkRelatorio ? (
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
              minWidth={370}
              height="100%"
              width="100vw"
              maxWidth="1410px"
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
                  style={{}}
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
                  height="73.9%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight={343}
                  width="100%"
                  bgcolor={corIgreja.principal}
                  borderTop="2px solid #fff"
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
                      width="95%"
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
                    <Box width="80%" ml={0}>
                      <Box mb={1}>
                        <Grid container spacing={2}>
                          {tela === 1 && existeRelatorio === true && (
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={12}>
                                <Paper
                                  style={{
                                    textAlign: 'center',
                                    background: podeEditar ? '#ffffaa' : 'gray',
                                    height: 40,
                                  }}
                                >
                                  {existeRelatorio === true ? (
                                    <Box display="flex" justifyContent="center">
                                      {podeEditar ? (
                                        <Box>
                                          {carregando && (
                                            <Box>
                                              <Espera descricao="Gerando o Relatório" />
                                            </Box>
                                          )}
                                          {!carregando ? (
                                            <Button
                                              onClick={handleSalvar}
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
                                            <Button>
                                              <Box
                                                display="flex"
                                                mt={0.5}
                                                sx={{
                                                  fontFamily: 'arial black',
                                                }}
                                              >
                                                <Oval
                                                  stroke="red"
                                                  width={20}
                                                  height={20}
                                                />
                                                <Box mt={-0.1} ml={0.8} mr={0}>
                                                  Atualizando...
                                                </Box>
                                              </Box>
                                            </Button>
                                          )}
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
                                        <Box>
                                          {etapas === 'completo' ? (
                                            <Button
                                              onClick={handleSalvar}
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
                                            <Button
                                              style={{
                                                background: 'gray',
                                                width: '100%',
                                              }}
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
                                          )}
                                        </Box>
                                      ) : (
                                        <Button>
                                          <Box
                                            display="flex"
                                            mt={0.5}
                                            sx={{
                                              fontFamily: 'arial black',
                                            }}
                                          >
                                            <Oval
                                              stroke="red"
                                              width={20}
                                              height={20}
                                            />
                                            <Box mt={-0.1} ml={0.8} mr={0}>
                                              Salvando
                                            </Box>
                                          </Box>
                                        </Button>
                                      )}
                                    </Box>
                                  )}
                                </Paper>
                              </Grid>
                            </Grid>
                          )}
                          {tela === 1 && existeRelatorio !== true && (
                            <Grid container spacing={2}>
                              <Grid item xs={6} md={6} lg={6} xl={9}>
                                <Paper
                                  style={{
                                    textAlign: 'center',
                                    background: '#feeffa',
                                    height: 40,
                                  }}
                                >
                                  <Button
                                    startIcon={
                                      <IoReturnDownBack color="blue" />
                                    }
                                    onClick={() => {
                                      setCheckRelatorio(false);
                                    }}
                                  >
                                    <Box
                                      mt={0.3}
                                      sx={{ fontFamily: 'arial black' }}
                                    >
                                      Voltar
                                    </Box>
                                  </Button>
                                </Paper>
                              </Grid>
                              <Grid item xs={6} md={6}>
                                <Paper
                                  style={{
                                    textAlign: 'center',
                                    background: podeEditar ? '#ffffaa' : 'gray',
                                    height: 40,
                                  }}
                                >
                                  {existeRelatorio === true ? (
                                    <Box display="flex" justifyContent="center">
                                      {podeEditar ? (
                                        <Box>
                                          {carregando && (
                                            <Box>
                                              <Espera descricao="Gerando o Relatório" />
                                            </Box>
                                          )}
                                          {!carregando ? (
                                            <Button
                                              onClick={handleSalvar}
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
                                            <Button>
                                              <Box
                                                display="flex"
                                                mt={0.5}
                                                sx={{
                                                  fontFamily: 'arial black',
                                                }}
                                              >
                                                <Oval
                                                  stroke="red"
                                                  width={20}
                                                  height={20}
                                                />
                                                <Box mt={-0.1} ml={0.8} mr={0}>
                                                  Atualizando...
                                                </Box>
                                              </Box>
                                            </Button>
                                          )}
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
                                        <Box>
                                          {etapas === 'completo' ? (
                                            <Button
                                              onClick={handleSalvar}
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
                                            <Button
                                              style={{
                                                background: 'gray',
                                                width: '100%',
                                              }}
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
                                          )}
                                        </Box>
                                      ) : (
                                        <Button>
                                          <Box
                                            display="flex"
                                            mt={0.5}
                                            sx={{
                                              fontFamily: 'arial black',
                                            }}
                                          >
                                            <Oval
                                              stroke="red"
                                              width={20}
                                              height={20}
                                            />
                                            <Espera descricao="Gerando o Relatório" />
                                            <Box mt={-0.1} ml={0.8} mr={0}>
                                              Salvando
                                            </Box>
                                          </Box>
                                        </Button>
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
        ) : (
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
              minWidth={370}
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
                  <Box
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={325}
                    width="100%"
                    color={corIgreja.iconeOn}
                    fontFamily="arial black"
                    fontSize="20px"
                    bgcolor={corIgreja.principal}
                    borderTop="2px solid #fff"
                  >
                    <Box>PLANEJAMENTO DA CÉLULA</Box>
                    <Box
                      color={corIgreja.texto1}
                      fontFamily="arial black"
                      fontSize="20px"
                      mt={1}
                    >
                      SEMANA - {semana}
                    </Box>

                    {!loading ? (
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        color="#fff"
                        fontFamily="arial"
                        fontSize="16px"
                        bgcolor={corIgreja.principal}
                      >
                        <Box mt={2}>Ainda não foi registrado</Box>
                        <Box>nenhum planejamento nessa semana</Box>
                      </Box>
                    ) : (
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        color="#fff"
                        fontFamily="arial"
                        fontSize="16px"
                        bgcolor={corIgreja.principal}
                      >
                        <Box mt={2}>Buscando Planejamento</Box>
                        <Box>aguarde...</Box>
                      </Box>
                    )}
                    <Box
                      mt={5}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      width="100%"
                      color="#fff"
                      fontFamily="arial"
                      fontSize="14px"
                      bgcolor={corIgreja.principal}
                    >
                      <Box
                        color={corIgreja.iconeOn}
                        fontFamily="arial black"
                        fontSize="14px"
                      >
                        PARA CRIAR UM NOVO:
                      </Box>
                      <Box>Selecione a data desejada e click</Box>
                      <Box> no botão FAZER PLANEJAMENTO</Box>
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
                    >
                      <Box width="100%" ml={1}>
                        <Box mb={1}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                              <Paper
                                style={{
                                  textAlign: 'center',
                                  background: '#faffaf',
                                  height: 40,
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    setCheckRelatorio(true);
                                    setTela(1);
                                  }}
                                >
                                  <Box
                                    mr={2}
                                    ml={2}
                                    mt={0.3}
                                    color="blue"
                                    sx={{ fontFamily: 'arial black' }}
                                  >
                                    FAZER PLANEJAMENTO
                                  </Box>
                                </Button>
                              </Paper>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
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
    </Box>
  );
}

export default RelatorioCelebracao;
