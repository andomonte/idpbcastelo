import { Box, Grid, Paper, Button, TextField } from '@material-ui/core';
import React from 'react';
import useSWR from 'swr';
import corIgreja from 'src/utils/coresIgreja';
import DateFnsUtils from '@date-io/date-fns';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import dataMask from 'src/components/mascaras/datas';
import celularMask from 'src/components/mascaras/celular';
import moment from 'moment';
import { TiUserAdd } from 'react-icons/ti';
import { IoIosSave, IoIosAddCircle, IoMdRemoveCircle } from 'react-icons/io';
import { FaLongArrowAltRight } from 'react-icons/fa';
import {
  IoArrowUndoSharp,
  IoReturnDownBack,
  IoArrowRedoSharp,
} from 'react-icons/io5';
import api from 'src/components/services/api';
import axios from 'axios';
import PegaIdade from 'src/utils/getIdade';
import { Oval } from 'react-loading-icons';
import TabCelula from './abas/tabCelula';
import TabVisitantes from './abas/tabVisitantes';

const fetcher = (url) => axios.get(url).then((res) => res.data);
// const fetcher2 = (url2) => axios.get(url2).then((res) => res.dataVisitante);

function createData(Nome, Presenca) {
  return { Nome, Presenca };
}
function createRelCelula(Rol, Nome, Presenca) {
  return {
    Rol,
    Nome,
    Presenca,
  };
}
function createRelVisitantes(Rol, Nome, Presenca) {
  return {
    Rol,
    Nome,
    Presenca,
  };
}

function createEstatistico(
  Celula,
  Distrito,
  Semana,
  Data,
  NomesMembros,
  NomesVisitantes,
  Adultos,
  Criancas,
  Visitantes,
  PresentesEventos,
  Visitas,
  NovosMembros,
  Observacoes,
  CriadoPor,
  CriadoEm,
) {
  return {
    Celula,
    Distrito,
    Semana,
    Data,
    NomesMembros,
    NomesVisitantes,
    Adultos,
    Criancas,
    Visitantes,
    PresentesEventos,
    Visitas,
    NovosMembros,
    Observacoes,
    CriadoPor,
    CriadoEm,
  };
}
function RelCelula({ rolMembros, perfilUser, visitantes }) {
  //  const classes = useStyles();

  const [contConversoes, setContConversoes] = React.useState(0);
  const [contEventos, setContEventos] = React.useState(0);
  const [contVisitas, setContVisitas] = React.useState(0);
  const [observacoes, setObservacoes] = React.useState(0);
  const [nomesVisitantes, setNomesVisitantes] = React.useState(visitantes);
  const nomesCelulas = rolMembros.filter(
    (val) => val.Celula === Number(perfilUser.Celula),
  );
  const dadosCelula = nomesCelulas.map((row) => createData(row.Nome, true));
  const [checkRelatorio, setCheckRelatorio] = React.useState(false);

  let enviarDia;
  let enviarData;
  const [nomeVistante, setNomeVisitante] = React.useState('');
  const [nascimentoVisitante, setNascimentoVisitante] = React.useState('');
  const [foneVisitante, setFoneVisitante] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [open, setIsPickerOpen] = React.useState(false);
  const [qtyVisitante, setQtyVisitante] = React.useState(0);
  const [presentes, setPresentes] = React.useState(0);
  const [relCelula, setRelCelula] = React.useState([]);
  const [relPresentes, setRelPresentes] = React.useState(dadosCelula);
  const [tela, setTela] = React.useState(1);
  const [carregando, setCarregando] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );

  const [adultos, setAdultos] = React.useState(0);
  const [criancas, setCriancas] = React.useState(0);
  const [openVisitantes, setOpenVisitantes] = React.useState(false);
  //= ==============================================================
  const handleDateChange = (date, value) => {
    setInputValue(value);
    setSelectedDate(date);
    setIsPickerOpen(false);
  };
  //= ==================================================================

  const getData = () => {
    enviarData = inputValue;
    enviarDia = Number(inputValue.slice(0, 2));
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
    while (firstSun.getDay() !== 6) {
      firstSun.setDate(firstSun.getDate() + 1);
    }
    while (lastSun.getDay() !== 6) {
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
  const dataAtual = new Date();

  const [semana, setSemana] = React.useState(0);
  const [existeRelatorio, setExisteRelatorio] = React.useState(false);
  const [podeEditar, setPodeEditar] = React.useState(true);

  React.useEffect(() => {
    if (dataAtual) {
      setSemana(semanaExata(dataAtual));
    }
    if (nomesVisitantes.length) {
      const nomesVisitantesParcial = nomesVisitantes.map((row) =>
        createRelVisitantes(row.id, row.Nome, false),
      );
      setNomesVisitantes(nomesVisitantesParcial);
    }
  }, []);

  React.useEffect(() => {
    if (selectedDate) {
      const checkAno = selectedDate.getFullYear();

      // selectedDate.setTime(selectedDate.getTime() + 1000 * 60);
      if (checkAno > 2021) {
        setSemana(semanaExata(selectedDate));
      }
    }
  }, [selectedDate]);

  const handleIncConversoes = () => {
    let contAtual = contConversoes;
    if (podeEditar) contAtual += 1;

    if (contAtual > 999) contAtual = 0;
    setContConversoes(contAtual);
  };
  const handleDecConversoes = () => {
    let contAtual = contConversoes;
    if (podeEditar) contAtual -= 1;

    if (contAtual < 0) contAtual = 0;
    setContConversoes(contAtual);
  };

  const handleIncEventos = () => {
    let contAtual = contEventos;
    if (podeEditar) contAtual += 1;

    if (contAtual > 9999) contAtual = 0;
    setContEventos(contAtual);
  };
  const handleDecEventos = () => {
    let contAtual = contEventos;
    if (podeEditar) contAtual -= 1;
    if (contAtual < 0) contAtual = 0;
    setContEventos(contAtual);
  };
  const handleIncVisitas = () => {
    let contAtual = contVisitas;
    if (podeEditar) contAtual += 1;

    if (contAtual > 9999) contAtual = 0;
    setContVisitas(contAtual);
  };
  const handleDecVisitas = () => {
    let contAtual = contVisitas;
    if (podeEditar) contAtual -= 1;

    if (contAtual < 0) contAtual = 0;
    setContVisitas(contAtual);
  };
  const url = `/api/consultaRelatorioCelulas/${semana}`;
  // const url2 = `/api/consultaVisitantes/${perfilUser.Distrito}/${perfilUser.Celula}`;
  const { data: members, error: errorMembers } = useSWR(url, fetcher);
  // const { data: visitants, error: errorVisitants } = useSWR(url2, fetcher);

  const ajusteRelatorio = () => {
    const qtyPres = dadosCelula.filter((val) => val.Presenca === true);
    // const qtyVis = visitantes.filter((val) => val.Presenca === true);
    setTela(1);
    setCarregando(false);
    setPresentes(qtyPres.length);
    setQtyVisitante(0);
    setContConversoes(0);
    setContVisitas(0);
    setContEventos(0);
    setRelPresentes(dadosCelula);
    setObservacoes('');
    setCheckRelatorio(false);
    setPodeEditar(true);
    setExisteRelatorio(false);
    if (members && members.length > 0) {
      const relatorio = members.filter(
        (val) =>
          val.Celula === Number(perfilUser.Celula) &&
          val.Distrito === Number(perfilUser.Distrito),
      );

      if (relatorio && relatorio.length) {
        const dataAgora = new Date();
        const semanaAgora = semanaExata(dataAgora);
        console.log('existe relatório sim');
        if (semanaAgora - semana < 1) setPodeEditar(true);
        else setPodeEditar(false);
        setExisteRelatorio(true); // avisa que tem relatório
        setCheckRelatorio(true); // avisa que tem relatório nessa data
        const nomesMembros = JSON.parse(relatorio[0].NomesMembros);
        const nVisitantes = JSON.parse(relatorio[0].NomesVisitantes);
        const qtyPresentes = nomesMembros.filter(
          (val) => val.Presenca === true,
        );
        const qtyVisitants = nVisitantes.filter((val) => val.Presenca === true);
        setPresentes(qtyPresentes.length);
        setQtyVisitante(qtyVisitants.length);
        setContConversoes(relatorio[0].NovosMembros);
        setContVisitas(relatorio[0].Visitas);
        setContEventos(relatorio[0].PresentesEventos);
        setRelPresentes(nomesMembros);
        setObservacoes(relatorio[0].Observacoes);
        setNomesVisitantes(nVisitantes);
        setRelCelula(relatorio);
        console.log('tem relatorio', relatorio);
      } else {
        const nomesVisitantesParcial = visitantes.map((row) =>
          createRelVisitantes(row.id, row.Nome, false),
        );
        setNomesVisitantes(nomesVisitantesParcial);
        const qtyVisitanteNovo = visitantes.filter(
          (val) => val.Presenca === true,
        );
        setQtyVisitante(qtyVisitanteNovo.length);
      }
    } else {
      const nomesVisitantesParcial = visitantes.map((row) =>
        createRelVisitantes(row.id, row.Nome, false),
      );
      setNomesVisitantes(nomesVisitantesParcial);
      const qtyVisitanteNovo = visitantes.filter(
        (val) => val.Presenca === true,
      );
      setQtyVisitante(qtyVisitanteNovo.length);
      console.log('aqui fora não tem relatório');
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

  const handleSalvar = () => {
    setCarregando(true);
    const criadoEm = new Date();
    const nomesCelulaParcial = nomesCelulas.map((row, index) =>
      createRelCelula(row.RolMembro, row.Nome, relPresentes[index].Presenca),
    );
    const nomesCelulaFinal = JSON.stringify(nomesCelulaParcial);
    const RelCelulaFinal = createEstatistico(
      Number(perfilUser.Celula),
      Number(perfilUser.Distrito),
      Number(semana),
      inputValue,
      nomesCelulaFinal,
      nomesCelulaFinal,
      Number(adultos),
      Number(criancas),
      Number(qtyVisitante),
      Number(contEventos),
      Number(contVisitas),
      Number(contConversoes),
      String(observacoes),
      perfilUser.Nome,
      criadoEm,
    );

    // const nomesMembros = JSON.parse(RelCelulaFinal.NomesMembros);

    api
      .post('/api/criarRelCelula', {
        relatorio: RelCelulaFinal,
      })
      .then((response) => {
        if (response) {
          console.log(response);
          setCarregando(false);
        }
      })
      .catch((erro) => {
        console.log(erro); //  updateFile(uploadedFile.id, { error: true });
      });
  };
  //= ========================calcular adulto e crianca========================

  const handleTela2 = () => {
    if (nomesCelulas && nomesCelulas.length > 0) {
      const listaPresentes = nomesCelulas.filter(
        (val, index) => val.Nome && relPresentes[index].Presenca === true,
      );
      const idade = [];
      let contAdultos = 0;
      let contCriancas = 0;
      for (let i = 0; i < listaPresentes.length; i += 1) {
        idade[i] = PegaIdade(listaPresentes[i].Nascimento);
        if (String(idade[i]) !== 'NaN')
          if (idade[i] > 11) {
            contAdultos += 1;
          } else {
            contCriancas += 1;
          }
      }
      setAdultos(contAdultos);
      setCriancas(contCriancas);
    }

    setTela(2);
  };
  //= =========vai ao bd dos visitantes
  /* React.useEffect(() => {
    if (errorVisitants) return <div>An error occured.</div>;
    if (!visitants) {
      console.log('carregando visitantes');
      return <div>Loading ...</div>;
    }
    if (visitants) {
      console.log('existe relatório????');
      if (existeRelatorio) {
        console.log('SIM existe');
        const novosVisitantes = visitants.filter(
          (row, index) => row.id !== nomesVisitantes[index].rol,
        );
        const nomesVisitantesParcial = novosVisitantes.map((row) =>
          createRelVisitantes(row.id, row.Nome, false),
        );

        setNomesVisitantes(...nomesVisitantesParcial);
      } else {
        console.log('nao existe');
        const nomesVisitantesParcial = visitants.map((row) =>
          createRelVisitantes(row.id, row.Nome, false),
        );

        setNomesVisitantes(nomesVisitantesParcial);
      }
    }

    return 0;
  }, [visitants]); */

  const handleVisitantes = () => {
    setOpenVisitantes(true);
    // setVisBackUp(nomesVisitantes);
    // setQtyVisitanteBackUp(qtyVisitante);
  };
  //= =========================================
  const handleSalvarVisitante = () => {
    //    const { dataVisitante, errorVisitante } = useSWR(url2, fetcher);
    // if(dataVisitante,)

    const CriadoEm = new Date();
    console.log(carregando);
    if (nomeVistante.length > 3) {
      setCarregando(true);
      console.log(carregando);
      api
        .post('/api/inserirVisitante', {
          Nome: nomeVistante,
          Celula: Number(perfilUser.Celula),
          Distrito: Number(perfilUser.Distrito),
          Contato: foneVisitante,
          Nascimento: nascimentoVisitante,
          CriadoPor: perfilUser.Nome,
          CriadoEm,
        })
        .then((response) => {
          if (response) {
            setCarregando(false);
            setNomeVisitante('');
            setNascimentoVisitante('');
            setFoneVisitante('');
            let dadosNovos = [];
            dadosNovos = response.data;
            console.log(dadosNovos);
            const nomesVisitantesParcial = createRelVisitantes(
              dadosNovos.id,
              dadosNovos.Nome,
              true,
            );

            const nomesNovos = [];
            nomesNovos.push(nomesVisitantesParcial);

            setNomesVisitantes((state) => [...state, nomesVisitantesParcial]);
          }
        })
        .catch((erro) => {
          console.log(erro); //  updateFile(uploadedFile.id, { error: true });
        });
    } else {
      handleVisitantes();
    }
  };
  //= ============================================================

  const handleCancelaVisitante = () => {
    // setNomesVisitantes(visBackUp);
    //  setQtyVisitante(qtyVisitanteBackUp);
    setOpenVisitantes(false);
  };

  return (
    <Box height="90vh" minWidth={370} minHeight={500}>
      {openVisitantes ? (
        <Box
          minWidth={370}
          height="100%"
          width="100vw"
          maxWidth={600}
          border="4px solid #fff"
        >
          <Paper
            style={{
              width: '100%',
              minHeight: 500,
              height: '90%',
              background: '#fafafa',
            }}
          >
            <Box height="100%">
              <Box
                height="10%"
                minHeight={30}
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
                  color="yellow"
                  fontSize="18px"
                  fontFamily="arial black"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="90%"
                  mt={1}
                >
                  LISTA DE VISITANTES
                </Box>
              </Box>

              <Box
                height="43.9%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={220}
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
                    width="95%"
                    height="100%"
                  >
                    <Box
                      height="43.7%"
                      minHeight={220}
                      bgcolor="#ffff"
                      width="100%"
                      borderRadius={16}
                    >
                      <Box mt={2}>
                        <TabVisitantes
                          nomesVisitantes={nomesVisitantes}
                          setQtyVisitante={setQtyVisitante}
                          setNomesVisitantes={setNomesVisitantes}
                          podeEditar={podeEditar}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                height="40%"
                width="100%"
                minHeight={120}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor={corIgreja.principal}
              >
                <Box ml={1}>
                  <Grid container spacing={0}>
                    <Grid container item xs={12} spacing={1}>
                      <Grid item xs={12} md={12} lg={12} xl={12}>
                        <Box width="100%" mt={2} textAlign="center">
                          <Box
                            color="yellow"
                            fontSize="14px"
                            textAlign="start"
                            ml={1}
                          >
                            Nome
                          </Box>
                          <TextField
                            inputProps={{
                              style: {
                                width: '90vw',
                                height: 30,
                                borderRadius: 6,
                                textAlign: 'center',
                                WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                              },
                            }}
                            id="Nome"
                            // label="Matricula"
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={nomeVistante}
                            variant="standard"
                            placeholder="Nome completo"
                            onChange={(e) => {
                              setNomeVisitante(e.target.value);
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container spacing={0}>
                    <Grid container item xs={12} spacing={1}>
                      <Grid item xs={6} md={6} lg={6} xl={6}>
                        <Box width="100%" mt={2} textAlign="center">
                          <Box
                            color="yellow"
                            fontSize="14px"
                            textAlign="start"
                            ml={1}
                          >
                            Celular
                          </Box>
                          <TextField
                            inputProps={{
                              style: {
                                width: '100%',
                                height: 30,
                                borderRadius: 6,
                                textAlign: 'center',
                                WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                              },
                            }}
                            id="Fone"
                            // label="Matricula"
                            type="phone"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={celularMask(foneVisitante)}
                            variant="standard"
                            placeholder="telefone"
                            onChange={(e) => {
                              setFoneVisitante(e.target.value);
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6} md={6} lg={6} xl={6}>
                        <Box width="100%" mt={2} textAlign="center">
                          <Box
                            color="yellow"
                            fontSize="14px"
                            textAlign="start"
                            ml={1}
                          >
                            Data de Nascimento
                          </Box>
                          <TextField
                            inputProps={{
                              style: {
                                width: '100%',
                                height: 30,
                                borderRadius: 6,
                                textAlign: 'center',
                                WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                              },
                            }}
                            id="Nascimento"
                            // label="Matricula"
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={dataMask(nascimentoVisitante)}
                            variant="standard"
                            placeholder="dd/mm/aaaa"
                            onChange={(e) => {
                              setNascimentoVisitante(e.target.value);
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box
                height="10%"
                minHeight={75}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor={corIgreja.principal}
                style={{
                  borderBottomLeftRadius: '16px',
                  borderBottomRightRadius: '16px',
                }}
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
                        <Grid item xs={6} md={6} lg={6} xl={9}>
                          <Paper
                            style={{
                              borderRadius: 16,
                              textAlign: 'center',
                              background: '#feeffa',
                              height: 40,
                            }}
                          >
                            <Button
                              startIcon={<IoReturnDownBack color="blue" />}
                              onClick={() => {
                                handleCancelaVisitante();
                              }}
                            >
                              <Box mt={0.3} sx={{ fontFamily: 'arial black' }}>
                                Voltar
                              </Box>
                            </Button>
                          </Paper>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} xl={9}>
                          <Paper
                            style={{
                              borderRadius: 16,
                              textAlign: 'center',
                              background: podeEditar ? '#ffffaa' : 'gray',

                              height: 40,
                            }}
                          >
                            {podeEditar ? (
                              <Box>
                                <Box>
                                  {!carregando ? (
                                    <Button
                                      onClick={handleSalvarVisitante}
                                      startIcon={<IoIosSave color="blue" />}
                                    >
                                      <Box
                                        mt={0.3}
                                        sx={{ fontFamily: 'arial black' }}
                                      >
                                        <Box>Salvar</Box>
                                      </Box>
                                    </Button>
                                  ) : (
                                    <Button>
                                      <Box
                                        display="flex"
                                        mt={0.5}
                                        sx={{ fontFamily: 'arial black' }}
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
                              </Box>
                            ) : (
                              <Button>
                                <Box
                                  mr={0}
                                  ml={0}
                                  mt={0.3}
                                  color="#fff"
                                  sx={{ fontFamily: 'arial black' }}
                                >
                                  CONSOLIDADO
                                </Box>
                              </Button>
                            )}
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      ) : (
        <Box>
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
                maxWidth={600}
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
                      <Box mb={1}>
                        <Grid container spacing={0}>
                          <Grid container item xs={12} spacing={1}>
                            <Grid item xs={6} md={6} lg={6} xl={6}>
                              <Paper
                                style={{ background: '#fafafa', height: 40 }}
                              >
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
                            <Grid item xs={6} md={6} lg={6} xl={6}>
                              <Paper
                                style={{
                                  textAlign: 'center',
                                  background: '#fafafa',
                                  height: 40,
                                }}
                              >
                                <Button
                                  onClick={handleVisitantes}
                                  startIcon={<TiUserAdd color="red" />}
                                >
                                  <Box
                                    display="flex"
                                    mt={0.8}
                                    sx={{
                                      fontSize: '12px',
                                      fontFamily: 'arial black',
                                    }}
                                  >
                                    <Box mt={-0.2}> VISITANTES: </Box>
                                    <Box
                                      color="blue"
                                      fontFamily="arial black"
                                      fontSize="16px"
                                      mt={-0.8}
                                      ml={1}
                                    >
                                      {qtyVisitante}
                                    </Box>
                                  </Box>
                                </Button>
                              </Paper>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    height="10%"
                    width="100%"
                    minHeight={50}
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
                        borderRight="2px solid #fff"
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
                          {relPresentes.length}
                        </Box>
                      </Box>

                      <Box
                        sx={{ fontSize: '16px' }}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                        borderLeft="2px solid #fff"
                        width="50%"
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          PRESENTES
                        </Box>
                        <Box
                          fontFamily="arial black"
                          color="yellow"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {presentes}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    height="63.9%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={344}
                    width="100%"
                    bgcolor={corIgreja.principal}
                    borderTop="2px solid #fff"
                    borderBottom="2px solid #fff"
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
                          bgcolor="#fafafa"
                          width="100%"
                          borderRadius={16}
                        >
                          {tela === 1 && (
                            <TabCelula
                              nomesCelulas={relPresentes}
                              setPresentes={setPresentes}
                              setRelCelula={setRelPresentes}
                              podeEditar={podeEditar}
                            />
                          )}
                          {tela === 2 && (
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              width="100%"
                              flexDirection="column"
                              height="100%"
                              mt={2}
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                width="100%"
                              >
                                <Box width="90%" ml={1}>
                                  <Grid container item xs={12} spacing={1}>
                                    <Grid item xs={6} md={6} lg={6} xl={6}>
                                      <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        height="100%"
                                        sx={{
                                          fontSize: '14px',
                                          fontFamily: 'arial black',
                                          borderRadius: 15,
                                          border: '1px solid #000',
                                        }}
                                      >
                                        <Box display="flex" mt={-0.2}>
                                          ADULTOS
                                          <Box
                                            mt={0.3}
                                            ml={1}
                                            mr={0}
                                            display="flex"
                                            color="#000"
                                            fontSize="16px"
                                            fontFamily="arial "
                                          >
                                            <FaLongArrowAltRight />
                                          </Box>
                                        </Box>
                                        <Box
                                          color="blue"
                                          fontFamily="arial black"
                                          fontSize="16px"
                                          mt={-0.2}
                                          ml={1}
                                        >
                                          {adultos}
                                        </Box>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={6} md={6} lg={6} xl={6}>
                                      <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        height={40}
                                        sx={{
                                          fontSize: '14px',
                                          fontFamily: 'arial black',
                                          borderRadius: 15,
                                          border: '1px solid #000',
                                        }}
                                      >
                                        <Box display="flex" mt={-0.2}>
                                          CRIANÇAS
                                          <Box
                                            mt={0.3}
                                            ml={1}
                                            mr={0}
                                            display="flex"
                                            color="#000"
                                            fontSize="16px"
                                            fontFamily="arial "
                                          >
                                            <FaLongArrowAltRight />
                                          </Box>
                                        </Box>
                                        <Box
                                          color="blue"
                                          fontFamily="arial black"
                                          fontSize="16px"
                                          mt={-0.2}
                                          ml={1}
                                        >
                                          {criancas}
                                        </Box>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Box>
                              </Box>
                              <Box
                                display="flex"
                                justifyContent="center"
                                width="100%"
                              >
                                <Paper
                                  style={{
                                    marginTop: 10,
                                    width: '90%',
                                    textAlign: 'center',
                                    background: '#fafafa',
                                    height: 40,
                                    borderRadius: 15,
                                    border: '1px solid #000',
                                  }}
                                >
                                  <Box
                                    width="100%"
                                    height="100%"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                    <Box
                                      width="15%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      onClick={() => {
                                        handleIncConversoes();
                                      }}
                                    >
                                      <IoIosAddCircle color="green" size={30} />
                                    </Box>
                                    <Box
                                      width="70%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      sx={{ fontFamily: 'arial black' }}
                                    >
                                      <Box
                                        width="100%"
                                        display="flex"
                                        textAlign="center"
                                      >
                                        <Box
                                          ml={1}
                                          width="60%"
                                          mt={0.5}
                                          display="flex"
                                          justifyContent="center"
                                          fontSize="14px"
                                        >
                                          CONVERSÕES
                                        </Box>
                                        <Box
                                          width="40%"
                                          mt={0}
                                          ml={-2}
                                          display="flex"
                                          color="blue"
                                          textAlign="center"
                                          fontSize="16px"
                                          fontFamily="arial black"
                                        >
                                          <Box
                                            mt={0.9}
                                            ml={2}
                                            mr={2}
                                            display="flex"
                                            color="#000"
                                            fontSize="16px"
                                            fontFamily="arial "
                                          >
                                            <FaLongArrowAltRight />
                                          </Box>
                                          <Box
                                            mt={0.5}
                                            display="flex"
                                            color="blue"
                                            fontSize="16px"
                                            fontFamily="arial black "
                                          >
                                            {contConversoes}
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                    <Box
                                      width="15%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      onClick={() => {
                                        handleDecConversoes();
                                      }}
                                    >
                                      <IoMdRemoveCircle color="red" size={30} />
                                    </Box>
                                  </Box>
                                </Paper>
                              </Box>
                              <Box
                                display="flex"
                                justifyContent="center"
                                width="100%"
                              >
                                <Paper
                                  style={{
                                    marginTop: 10,
                                    width: '90%',
                                    textAlign: 'center',
                                    background: '#fafafa',
                                    height: 40,
                                    borderRadius: 15,
                                    border: '1px solid #000',
                                  }}
                                >
                                  <Box
                                    width="100%"
                                    height="100%"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                    <Box
                                      width="15%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      onClick={() => {
                                        handleIncEventos();
                                      }}
                                    >
                                      <IoIosAddCircle color="green" size={30} />
                                    </Box>
                                    <Box
                                      width="70%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      sx={{ fontFamily: 'arial black' }}
                                    >
                                      <Box
                                        width="100%"
                                        display="flex"
                                        textAlign="center"
                                      >
                                        <Box
                                          ml={2}
                                          width="60%"
                                          mt={0.5}
                                          display="flex"
                                          justifyContent="center"
                                          fontSize="14px"
                                        >
                                          EVENTOS
                                        </Box>
                                        <Box
                                          width="40%"
                                          mt={0}
                                          ml={-3}
                                          display="flex"
                                          color="blue"
                                          fontSize="20px"
                                          fontFamily="arial black"
                                        >
                                          <Box
                                            mt={0.9}
                                            ml={2}
                                            mr={2}
                                            display="flex"
                                            color="#000"
                                            fontSize="16px"
                                            fontFamily="arial "
                                          >
                                            <FaLongArrowAltRight />
                                          </Box>
                                          <Box
                                            mt={0.5}
                                            display="flex"
                                            color="blue"
                                            fontSize="16px"
                                            fontFamily="arial black "
                                          >
                                            {contEventos}
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                    <Box
                                      width="15%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      onClick={() => {
                                        handleDecEventos();
                                      }}
                                    >
                                      <IoMdRemoveCircle color="red" size={30} />
                                    </Box>
                                  </Box>
                                </Paper>
                              </Box>
                              <Box
                                display="flex"
                                justifyContent="center"
                                width="100%"
                              >
                                <Paper
                                  style={{
                                    marginTop: 10,
                                    width: '90%',
                                    textAlign: 'center',
                                    background: '#fafafa',
                                    height: 40,
                                    borderRadius: 15,
                                    border: '1px solid #000',
                                  }}
                                >
                                  <Box
                                    width="100%"
                                    height="100%"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                  >
                                    <Box
                                      width="15%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      onClick={() => {
                                        handleIncVisitas();
                                      }}
                                    >
                                      <IoIosAddCircle color="green" size={30} />
                                    </Box>
                                    <Box
                                      width="70%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      sx={{ fontFamily: 'arial black' }}
                                    >
                                      <Box
                                        width="100%"
                                        display="flex"
                                        textAlign="center"
                                      >
                                        <Box
                                          ml={2}
                                          width="60%"
                                          mt={0.5}
                                          display="flex"
                                          justifyContent="center"
                                          fontSize="14px"
                                        >
                                          VISITAS
                                        </Box>
                                        <Box
                                          width="40%"
                                          mt={0}
                                          ml={-3}
                                          display="flex"
                                          color="blue"
                                          textAlign="center"
                                          fontSize="20px"
                                          fontFamily="arial black"
                                        >
                                          <Box
                                            mt={0.9}
                                            ml={2}
                                            mr={2}
                                            display="flex"
                                            color="#000"
                                            fontSize="16px"
                                            fontFamily="arial "
                                          >
                                            <FaLongArrowAltRight />
                                          </Box>
                                          <Box
                                            mt={0.5}
                                            display="flex"
                                            color="blue"
                                            fontSize="16px"
                                            fontFamily="arial black "
                                          >
                                            {contVisitas}
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Box>
                                    <Box
                                      width="15%"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      onClick={() => {
                                        handleDecVisitas();
                                      }}
                                    >
                                      <IoMdRemoveCircle color="red" size={30} />
                                    </Box>
                                  </Box>
                                </Paper>
                              </Box>
                              <Box
                                display="flex"
                                justifyContent="center"
                                width="100%"
                              >
                                <Box mt={0}>
                                  <TextareaAutosize
                                    maxRows={4}
                                    value={observacoes}
                                    aria-label="maximum height"
                                    placeholder="Observações"
                                    onChange={(e) => {
                                      setObservacoes(e.target.value);
                                    }}
                                    style={{
                                      display: 'flex',
                                      marginTop: 20,
                                      textAlign: 'center',
                                      width: '82vw',
                                      height: 80,
                                      borderRadius: 15,
                                      border: '1px solid #000',
                                    }}
                                  />
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
                    style={{
                      borderBottomLeftRadius: '16px',
                      borderBottomRightRadius: '16px',
                    }}
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
                              <Grid item xs={12} md={12} lg={12} xl={12}>
                                <Paper
                                  style={{
                                    borderRadius: 16,
                                    textAlign: 'center',
                                    background: '#feeffa',
                                    height: 40,
                                  }}
                                >
                                  <Button
                                    onClick={() => {
                                      handleTela2();
                                    }}
                                    endIcon={<IoArrowRedoSharp color="blue" />}
                                  >
                                    <Box
                                      mr={2}
                                      ml={2}
                                      mt={0.3}
                                      sx={{ fontFamily: 'arial black' }}
                                    >
                                      Próxima Tela
                                    </Box>
                                  </Button>
                                </Paper>
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
                                    {console.log(existeRelatorio)}
                                    {existeRelatorio ? (
                                      <Box>
                                        {podeEditar ? (
                                          <Box>
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
                                                  <Box
                                                    mt={-0.1}
                                                    ml={0.8}
                                                    mr={0}
                                                  >
                                                    Atualizando
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
                                              sx={{ fontFamily: 'arial black' }}
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
                                            onClick={handleSalvar}
                                            startIcon={
                                              <IoIosSave color="blue" />
                                            }
                                          >
                                            <Box
                                              mt={0.3}
                                              sx={{ fontFamily: 'arial black' }}
                                            >
                                              <Box>Salvar</Box>
                                            </Box>
                                          </Button>
                                        ) : (
                                          <Button>
                                            <Box
                                              display="flex"
                                              mt={0.5}
                                              sx={{ fontFamily: 'arial black' }}
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
                maxWidth={600}
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
                          {relPresentes.length}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    height="63.9%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={320}
                    width="100%"
                    color={corIgreja.iconeOn}
                    fontFamily="arial black"
                    fontSize="20px"
                    bgcolor={corIgreja.principal}
                    borderTop="2px solid #fff"
                    borderBottom="2px solid #fff"
                  >
                    <Box>ATENÇÃO!!!</Box>

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
                      <Box mt={2}>Você pode criar um novo relatório</Box>
                      <Box>ou editar um já criado nos ultimos 7 dias</Box>
                    </Box>

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
                      <Box> no botão FAZER RELATÓRIO</Box>
                    </Box>
                    <Box
                      mt={2}
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
                        PARA ABRIR UM QUE JÁ EXISTE:
                      </Box>
                      <Box>basta Selecionar a data do relatório</Box>
                      <Box>e ele será aberto automáticamente </Box>
                    </Box>
                  </Box>

                  <Box
                    height="10%"
                    minHeight={75}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor={corIgreja.principal}
                    style={{
                      borderBottomLeftRadius: '16px',
                      borderBottomRightRadius: '16px',
                    }}
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
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                              <Paper
                                style={{
                                  borderRadius: 16,
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
                                    FAZER RELATÓRIO
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
          )}
        </Box>
      )}
    </Box>
  );
}

export default RelCelula;
