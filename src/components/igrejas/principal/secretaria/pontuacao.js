import React from 'react';
import { Box, Grid, Paper } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { IoClose } from 'react-icons/io5';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TableContainer from '@mui/material/TableContainer';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import api from 'src/components/services/api';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import Grafico from './graf';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));
function createListaNome(Celula, Lider, Pontos, semanas) {
  return {
    Celula,
    Lider,
    Pontos,
    semanas,
  };
}
function createCelulaSelecionada(
  Celula,
  semanas,
  CelebracaoIgreja,
  CelebracaoLive,
  Discipulados,
  Eventos,
  LeituraBiblica,
  NovoMembro,
  Pontualidade,
  PresentesCelula,
  RelCelebracao,
  RelCelulaFeito,
  RelDiscipulado,
  Relatorio,
  VisitantesCelebracao,
  VisitantesCelula,
  Visitas,
  percCelebracaoIgreja,
  percCelebracaoLive,
  percDiscipulado,
  percLeituraBiblica,
  percPresentes,
) {
  return {
    Celula,
    semanas,
    CelebracaoIgreja,
    CelebracaoLive,
    Discipulados,
    Eventos,
    LeituraBiblica,
    NovoMembro,
    Pontualidade,
    PresentesCelula,
    RelCelebracao,
    RelCelulaFeito,
    RelDiscipulado,
    Relatorio,
    VisitantesCelebracao,
    VisitantesCelula,
    Visitas,
    percCelebracaoIgreja,
    percCelebracaoLive,
    percDiscipulado,
    percLeituraBiblica,
    percPresentes,
  };
}
function getPreviousMonday(date) {
  const previousMonday = date;

  previousMonday.setDate(date.getDate() - ((date.getDay() + 6) % 7));

  return previousMonday;
}
export default function Pontuacao({ perfilUser }) {
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
  const [listaFinal, setListaFinal] = React.useState('');
  const [openDialog1, setOpenDialog1] = React.useState(false);
  const [openDialog2, setOpenDialog2] = React.useState(false);
  const [semana, setSemana] = React.useState(0);
  const [semanaF, setSemanaF] = React.useState(0);
  const [pontosCelulas, setPontosCelulas] = React.useState(0);
  const timeElapsed2 = Date.now();
  const dataAtual2 = new Date(timeElapsed2);
  moment(getPreviousMonday(dataAtual2)).format('DD/MM/YYYY');
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);
  const [inputValue, setInputValue] = React.useState(
    moment(dataAtual2).format('DD/MM/YYYY'),
  );
  const [open, setIsPickerOpen] = React.useState(false);
  const [anoI, setAnoI] = React.useState(dataAtual2.getFullYear());

  const handleDateChange = (date, value) => {
    setInputValue(value);
    setSelectedDate(date);
    setIsPickerOpen(false);
    setSemana(semanaExata(date));
    setAnoI(date.getFullYear());
  };

  const handleDateClick = () => {
    //   setSelectedDate();
    setIsPickerOpen(true);
  };

  const [selectedDate2, setSelectedDate2] = React.useState(dataAtual2);
  const [inputValue2, setInputValue2] = React.useState(
    moment(dataAtual2).format('DD/MM/YYYY'),
  );
  const [anoF, setAnoF] = React.useState(dataAtual2.getFullYear());
  const [open2, setIsPickerOpen2] = React.useState(false);
  const handleDateChange2 = (date, value) => {
    setInputValue2(value);
    setSelectedDate2(date);
    setIsPickerOpen2(false);
    setSemanaF(semanaExata(date));
    setAnoF(date.getFullYear());

    // setSemana(semanaExata(dataAtual));
  };
  const verPontos = () => {
    api
      .post('/api/consultaPontuacao', {
        semanaI: semana,
        semanaF,
        anoI,
        anoF,
      })
      .then((response) => {
        if (response) {
          const pontuacao = [];
          const members = response.data;
          const distrito = members.filter(
            (val) => val.Distrito === Number(perfilUser.Distrito),
          );

          setPontosCelulas(distrito);
          const setPerson = new Set();
          const listaCelulas = distrito.filter((person) => {
            const duplicatedPerson = setPerson.has(person.Celula);
            setPerson.add(person.Celula);
            return !duplicatedPerson;
          });

          for (let i = 0; i < listaCelulas.length; i += 1) {
            let pontosAgora = 0;
            let liderAgora = 'Sem';
            let celulaAgora = 0;
            distrito.map((val) => {
              if (val.Celula === listaCelulas[i].Celula) {
                pontosAgora += Number(val.TotalRank);
                celulaAgora = val.Celula;
                liderAgora = val.CriadoPor ? val.CriadoPor : 'Sem';
              }

              return 0;
            });

            pontuacao[i] = createListaNome(
              celulaAgora,
              liderAgora,
              pontosAgora.toFixed(),
              semanaF - semana + 1,
            );
          }

          setListaFinal(pontuacao.sort((a, b) => b.Pontos - a.Pontos));
        }
      })
      .catch((erro) => {
        console.log(erro); //  updateFile(uploadedFile.id, { error: true });
      });
  };
  React.useEffect(() => {
    if (selectedDate) {
      setSemana(semanaExata(selectedDate));
    }
    if (selectedDate2) {
      setSemanaF(semanaExata(selectedDate2));
    }
  }, [selectedDate2, selectedDate]);
  React.useEffect(() => {
    if (semana !== 0 && semanaF !== 0) {
      verPontos();
    }

    verPontos();
  }, [semana, semanaF]);
  const handleDateClick2 = () => {
    //   setSelectedDate();
    setIsPickerOpen2(true);
  };

  const [PontosCelulaSelecionada, setPontosCelulaSelecionada] =
    React.useState('');

  const handleCheckCelula = async (celulaSelecionada, openD) => {
    const celulaFiltrada = pontosCelulas.filter(
      (val) => val.Celula === celulaSelecionada.Celula,
    );
    const detalhesPontos = [];
    if (celulaFiltrada.length) {
      celulaFiltrada.map((val, index) => {
        detalhesPontos[index] = JSON.parse(val.Pontuacao);

        return 0;
      });
    }

    const parametrosPontuacao = [
      'CelebracaoIgreja',
      'CelebracaoLive',
      'Discipulados',
      'Eventos',
      'LeituraBiblica',
      'NovoMembro',
      'Pontualidade',
      'PresentesCelula',
      'RelCelebracao',
      'RelCelulaFeito',
      'RelDiscipulado',
      'Relatorio',
      'VisitantesCelebracao',
      'VisitantesCelula',
      'Visitas',
      'percCelebracaoIgreja',
      'percCelebracaoLive',
      'percDiscipulado',
      'percLeituraBiblica',
      'percPresentes',
    ];
    if (detalhesPontos.length) {
      const arrayTeste = [];
      for (let i = 0; i < parametrosPontuacao.length; i += 1) {
        arrayTeste[i] = detalhesPontos.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue[parametrosPontuacao[i]],
          0,
          {},
        );
      }
      let qytMembros = 0;

      const nan = String(arrayTeste[15]);

      if (nan === 'NaN') {
        qytMembros = await api
          .post('/api/consultaCelulaParaPontos', {
            semanaI: semana,
            semanaF,
            anoI,
            anoF,
            Celula: celulaSelecionada.Celula,
          })
          .then((response) => {
            if (response) {
              if (response.data.length) {
                const qytMembrosF = JSON.parse(
                  response.data[0].NomesMembros,
                ).length;

                return qytMembrosF;
              }
              return 0;
            }
            return 0;
          })
          .catch((erro) => {
            console.log(erro); //  updateFile(uploadedFile.id, { error: true });
            return 0;
          });
        console.log(
          'aqui',
          parseFloat((arrayTeste[4] * 100) / qytMembros).toFixed(2),
        );
      }

      setPontosCelulaSelecionada(
        createCelulaSelecionada(
          celulaSelecionada.Celula,
          celulaSelecionada.semanas,
          arrayTeste[0],
          arrayTeste[1],
          arrayTeste[2],
          arrayTeste[3],
          arrayTeste[4],
          arrayTeste[5],
          arrayTeste[6],
          arrayTeste[7],
          arrayTeste[8],
          arrayTeste[9],
          arrayTeste[10],
          arrayTeste[11],
          arrayTeste[12],
          arrayTeste[13],
          arrayTeste[14],
          String(arrayTeste[15]) !== 'NaN'
            ? arrayTeste[15]
            : parseFloat(
                parseFloat((arrayTeste[0] * 100) / qytMembros).toFixed(2) / 10,
              ).toFixed(2),
          String(arrayTeste[16]) !== 'NaN'
            ? arrayTeste[16]
            : parseFloat(
                parseFloat((arrayTeste[1] * 100) / qytMembros).toFixed(2) / 10,
              ).toFixed(2),
          String(arrayTeste[17]) !== 'NaN'
            ? arrayTeste[17]
            : parseFloat(
                parseFloat((arrayTeste[2] * 100) / qytMembros).toFixed(2) / 10,
              ).toFixed(2),
          String(arrayTeste[18]) !== 'NaN'
            ? arrayTeste[18]
            : parseFloat(
                parseFloat((arrayTeste[4] * 100) / qytMembros).toFixed(2) / 10,
              ).toFixed(2),
          String(arrayTeste[19]) !== 'NaN'
            ? arrayTeste[19]
            : parseFloat(
                parseFloat((arrayTeste[7] * 100) / qytMembros).toFixed(2) / 10,
              ).toFixed(2),
        ),
      );
      if (openD === 1) setOpenDialog1(true);
      if (openD === 2) setOpenDialog2(true);
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={300}
      bgcolor={corIgreja.principal2}
      height="calc(100vh - 56px)"
    >
      <Box
        width="96%"
        height="97%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
        bgcolor={corIgreja.principal}
      >
        <Box
          width="100%"
          height="10%"
          justifyContent="center"
          display="flex"
          alignItems="center"
        >
          <Paper style={{ marginLeft: 10, background: '#fafafa', height: 40 }}>
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
          <Box ml={2} />
          <Paper style={{ marginRight: 10, background: '#fafafa', height: 40 }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="center">
                <KeyboardDatePicker
                  open={open2}
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  id="date-picker-inline"
                  value={selectedDate2}
                  inputValue={inputValue2}
                  onClick={handleDateClick2}
                  onChange={handleDateChange2}
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
        </Box>
        {semanaF >= semana ? (
          <TableContainer sx={{ height: '90%' }}>
            {listaFinal && listaFinal.length ? (
              <List sx={{ width: '100%', maxWidth: 360 }}>
                {listaFinal.map((row, index) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        src=""
                        alt="User"
                        style={{
                          width: 50,
                          height: 50,
                          background: '#aed581',
                          color: 'black',
                          fontSize: '18px',
                          fontWeight: 'bold',
                        }}
                        onClick={() => {
                          handleCheckCelula(row, 2);
                        }}
                      >
                        {index + 1}º
                      </Avatar>
                    </ListItemAvatar>
                    <Box>
                      <ListItemText style={{ marginTop: 12 }}>
                        <Box
                          style={{
                            display: 'flex',
                            marginLeft: 10,
                            fontFamily: 'Fugaz One',
                            fontSize: '12px',
                            color: '#FFFF',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            handleCheckCelula(row, 1);
                          }}
                        >
                          {row.Lider && row.Lider.length > 25
                            ? row.Lider.substring(0, 25).toUpperCase()
                            : row.Lider.toUpperCase()}
                        </Box>
                      </ListItemText>
                      <ListItemText style={{ marginTop: -5 }}>
                        <Box
                          style={{
                            display: 'flex',
                            marginLeft: 0,
                            fontFamily: 'Rubik',
                            fontSize: '12px',
                            color: '#FFFF',
                          }}
                        >
                          <Box ml={2}>Célula: </Box>
                          <Box color="yellow" ml={1}>
                            {' '}
                            {row.Celula}
                          </Box>
                          <Box ml={2}>Pontos: </Box>
                          <Box color="yellow" ml={1}>
                            {' '}
                            {row.Pontos}
                          </Box>
                        </Box>
                      </ListItemText>
                    </Box>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Box
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontFamily="Fugaz one"
                fontSize="22px"
                color="white"
              >
                BUSCANDO DADOS...
              </Box>
            )}
          </TableContainer>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="90%"
            fontFamily="Fugaz one"
            fontSize="22px"
            color="white"
          >
            PERÍODO INVÁLIDO
          </Box>
        )}
      </Box>
      <Dialog fullScreen open={openDialog1} TransitionComponent={Transition}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          minHeight={570}
          minWidth={300}
          bgcolor={corIgreja.principal2}
          height="calc(100vh )"
        >
          <Box
            width="96%"
            height="97%"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            borderRadius={16}
            ml={0}
            bgcolor={corIgreja.principal}
          >
            <Box ml={2} height="5%" display="flex" alignItems="start">
              <Box
                display="flex"
                alignItems="center"
                onClick={() => {
                  setOpenDialog1(false);
                }}
              >
                <IoClose size={25} color="white" />
              </Box>
              <ListItem
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box width="100%">
                  <ListItemText style={{ marginTop: -5 }}>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginLeft: 0,
                        fontFamily: 'Fugaz One',
                        fontSize: '18px',
                        color: '#FFFF',
                      }}
                    >
                      <Box display="flex">
                        CÉLULA{' '}
                        <Box ml={2} color="yellow">
                          {' '}
                          {PontosCelulaSelecionada.Celula}{' '}
                        </Box>{' '}
                      </Box>
                    </Box>
                  </ListItemText>
                </Box>
              </ListItem>
            </Box>
            <TableContainer sx={{ width: '100%', height: '90%' }}>
              <List
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {PontosCelulaSelecionada && (
                  <Box width="100%">
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box width="98%">
                        <ListItemText style={{ width: '100%', marginTop: -5 }}>
                          <Box
                            mt={1}
                            height={40}
                            style={{
                              border: '1px solid #a1887f',
                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              color: 'black',
                              width: '100%',
                              background: '#c5e1a5',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO POR RELATÓRIOS
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              REAIS
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              POSSÍVEIS
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              FEZ TODOS OS RELATÓRIOS
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.Relatorio >=
                                PontosCelulaSelecionada.semanas * 1
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {PontosCelulaSelecionada.Relatorio}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              {PontosCelulaSelecionada.semanas * 1}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              RELATÓRIO DA CÉLULA
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.RelCelulaFeito >=
                                PontosCelulaSelecionada.semanas * 1
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {PontosCelulaSelecionada.RelCelulaFeito}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              {PontosCelulaSelecionada.semanas * 1}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              RELATÓRIO DA CELEBRAÇÃO
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.RelCelebracao >=
                                PontosCelulaSelecionada.semanas * 1
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {PontosCelulaSelecionada.RelCelebracao}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              {PontosCelulaSelecionada.semanas * 1}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              RELATÓRIO DE DISCIPULADO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.RelDiscipulado >=
                                PontosCelulaSelecionada.semanas * 1
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {PontosCelulaSelecionada.RelDiscipulado}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              {PontosCelulaSelecionada.semanas * 1}
                            </Box>
                          </Box>

                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUALIDADE NA ENTREGA
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.Pontualidade >=
                                PontosCelulaSelecionada.semanas * 1
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {PontosCelulaSelecionada.Pontualidade}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              {PontosCelulaSelecionada.semanas * 1}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#bdbdbd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO DOS RELATÓRIOS
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.Relatorio +
                                  PontosCelulaSelecionada.RelCelulaFeito +
                                  PontosCelulaSelecionada.RelCelebracao +
                                  PontosCelulaSelecionada.RelDiscipulado +
                                  PontosCelulaSelecionada.Pontualidade >=
                                PontosCelulaSelecionada.semanas * 5
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {PontosCelulaSelecionada.Relatorio +
                                PontosCelulaSelecionada.RelCelulaFeito +
                                PontosCelulaSelecionada.RelCelebracao +
                                PontosCelulaSelecionada.RelDiscipulado +
                                PontosCelulaSelecionada.Pontualidade}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              {PontosCelulaSelecionada.semanas * 5}
                            </Box>
                          </Box>
                        </ListItemText>
                      </Box>
                    </Box>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box width="98%">
                        <ListItemText style={{ width: '100%', marginTop: -5 }}>
                          <Box
                            mt={1}
                            height={40}
                            style={{
                              border: '1px solid #a1887f',
                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              color: 'black',
                              width: '100%',
                              background: '#4fc3f7',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO POR PARTICIPAÇÕES
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              REAIS
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              POSSÍVEIS
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PRESENÇA NA CÉLULA
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.percPresentes &&
                                PontosCelulaSelecionada.percPresentes >=
                                  PontosCelulaSelecionada.semanas * 8
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {PontosCelulaSelecionada.percPresentes || '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              {PontosCelulaSelecionada.semanas * 10}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PRESENÇA CELEBRAÇÃO IGREJA
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.percCelebracaoIgreja &&
                                PontosCelulaSelecionada.percCelebracaoIgreja >=
                                  PontosCelulaSelecionada.semanas * 8
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {PontosCelulaSelecionada.percCelebracaoIgreja
                                ? PontosCelulaSelecionada.percCelebracaoIgreja
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              {PontosCelulaSelecionada.semanas * 10}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PRESENÇA CELEBRAÇÃO ON-LINE
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color="black"
                            >
                              {PontosCelulaSelecionada.percCelebracaoLive
                                ? PontosCelulaSelecionada.percCelebracaoLive
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              {PontosCelulaSelecionada.semanas * 5}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              RECEBEU DISCIPULADO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.percDiscipulado &&
                                PontosCelulaSelecionada.percDiscipulado >=
                                  PontosCelulaSelecionada.semanas * 5
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {PontosCelulaSelecionada.percDiscipulado
                                ? PontosCelulaSelecionada.percDiscipulado
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              {PontosCelulaSelecionada.semanas * 10}
                            </Box>
                          </Box>

                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              LEITURA BÍBLICA
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.percLeituraBiblica &&
                                PontosCelulaSelecionada.percLeituraBiblica >=
                                  PontosCelulaSelecionada.semanas * 8
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {PontosCelulaSelecionada.percLeituraBiblica
                                ? PontosCelulaSelecionada.percLeituraBiblica
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              {PontosCelulaSelecionada.semanas * 10}
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#bdbdbd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO POR PARTICIPAÇÃO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                parseFloat(
                                  parseFloat(
                                    PontosCelulaSelecionada.percCelebracaoIgreja,
                                  ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percCelebracaoLive,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percDiscipulado,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percPresentes,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percLeituraBiblica,
                                    ),
                                ).toFixed(2) >=
                                PontosCelulaSelecionada.semanas * 29 // pontos 80% celula, celebração e leitura - online + 50% do discipulado
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {console.log(
                                '',
                                PontosCelulaSelecionada.semanas,
                                PontosCelulaSelecionada.semanas * 29,
                                parseFloat(
                                  parseFloat(
                                    PontosCelulaSelecionada.percCelebracaoIgreja,
                                  ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percCelebracaoLive,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percDiscipulado,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percPresentes,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percLeituraBiblica,
                                    ),
                                ).toFixed(2),
                              )}
                              {parseFloat(
                                parseFloat(
                                  PontosCelulaSelecionada.percCelebracaoIgreja,
                                ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percCelebracaoLive,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percDiscipulado,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percPresentes,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percLeituraBiblica,
                                  ),
                              ).toFixed(2)}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              {PontosCelulaSelecionada.semanas * 40}
                            </Box>
                          </Box>
                        </ListItemText>
                      </Box>
                    </Box>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Box width="98%">
                        <ListItemText style={{ width: '100%', marginTop: -5 }}>
                          <Box
                            mt={1}
                            height={40}
                            style={{
                              border: '1px solid #a1887f',
                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              color: 'black',
                              width: '100%',
                              background: '#ff8a65',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO POR DESEMPENHO
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              REAIS
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              POSSÍVEIS
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              VISITANTES NA CÉLULA
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.VisitantesCelula &&
                                PontosCelulaSelecionada.VisitantesCelula >=
                                  PontosCelulaSelecionada.semanas * 1
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {PontosCelulaSelecionada.VisitantesCelula || '0'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              -
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              VISITANTES NA CELEBRAÇÃO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.VisitantesCelebracao &&
                                PontosCelulaSelecionada.VisitantesCelebracao >=
                                  PontosCelulaSelecionada.semanas * 1
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {PontosCelulaSelecionada.VisitantesCelebracao
                                ? PontosCelulaSelecionada.VisitantesCelebracao
                                : '0'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              -
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              VISITA DO LIDER AOS MEMBROS
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.Visitas &&
                                PontosCelulaSelecionada.Visitas >=
                                  PontosCelulaSelecionada.semanas * 1
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {PontosCelulaSelecionada.Visitas
                                ? PontosCelulaSelecionada.Visitas
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              -
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#f0f0f0',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              EVENTO EVANGELISTICO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.Eventos &&
                                PontosCelulaSelecionada.Eventos >=
                                  PontosCelulaSelecionada.semanas * 1
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {PontosCelulaSelecionada.Eventos
                                ? PontosCelulaSelecionada.Eventos
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              -
                            </Box>
                          </Box>

                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#e3f2fd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              NOVO MEMBRO NA CÉLULA
                            </Box>
                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.NovoMembro &&
                                PontosCelulaSelecionada.NovoMembro >=
                                  PontosCelulaSelecionada.semanas * 10
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {PontosCelulaSelecionada.NovoMembro
                                ? PontosCelulaSelecionada.NovoMembro
                                : '-'}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              -
                            </Box>
                          </Box>
                          <Box
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#bdbdbd',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              PONTUAÇÃO POR DESEMPENHO
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                PontosCelulaSelecionada.VisitantesCelula +
                                  PontosCelulaSelecionada.VisitantesCelebracao +
                                  PontosCelulaSelecionada.Visitas +
                                  PontosCelulaSelecionada.Eventos +
                                  PontosCelulaSelecionada.NovoMembro >=
                                PontosCelulaSelecionada.semanas * 5
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {PontosCelulaSelecionada.VisitantesCelula +
                                PontosCelulaSelecionada.VisitantesCelebracao +
                                PontosCelulaSelecionada.Visitas +
                                PontosCelulaSelecionada.Eventos +
                                PontosCelulaSelecionada.NovoMembro}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              -
                            </Box>
                          </Box>
                          <Box
                            mt={1}
                            height={40}
                            style={{
                              borderBottom: '1px solid #a1887f',
                              borderLeft: '1px solid #a1887f',
                              borderRight: '1px solid #a1887f',

                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '12px',
                              width: '100%',
                              color: 'black',

                              background: '#ffeb3b',
                            }}
                          >
                            <Box
                              width="60%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                            >
                              TOTAL GERAL
                            </Box>

                            <Box
                              width="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              sx={{ borderRight: '1px solid #a1887f' }}
                              color={
                                parseFloat(
                                  parseFloat(
                                    PontosCelulaSelecionada.VisitantesCelula,
                                  ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.VisitantesCelebracao,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percCelebracaoIgreja,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percCelebracaoLive,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percPresentes,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percDiscipulado,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.percLeituraBiblica,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.Visitas,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.Eventos,
                                    ) +
                                    parseFloat(
                                      PontosCelulaSelecionada.NovoMembro,
                                    ),
                                ).toFixed(2) >=
                                PontosCelulaSelecionada.semanas * 5
                                  ? 'blue'
                                  : 'red'
                              }
                            >
                              {parseFloat(
                                parseFloat(
                                  PontosCelulaSelecionada.VisitantesCelula,
                                ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.VisitantesCelebracao,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percCelebracaoIgreja,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percCelebracaoLive,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percPresentes,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percDiscipulado,
                                  ) +
                                  parseFloat(
                                    PontosCelulaSelecionada.percLeituraBiblica,
                                  ) +
                                  parseFloat(PontosCelulaSelecionada.Visitas) +
                                  parseFloat(PontosCelulaSelecionada.Eventos) +
                                  parseFloat(
                                    PontosCelulaSelecionada.NovoMembro,
                                  ),
                              ).toFixed(2)}

                              {/* PontosCelulaSelecionada.Visitas +
                                PontosCelulaSelecionada.Eventos +
                                PontosCelulaSelecionada.NovoMembro +
                                PontosCelulaSelecionada.percCelebracaoIgreja +
                                PontosCelulaSelecionada.percCelebracaoLive +
                                PontosCelulaSelecionada.percDiscipulado +
                                PontosCelulaSelecionada.percLeituraBiblica +
                                PontosCelulaSelecionada.percPresentes +
                                PontosCelulaSelecionada.Relatorio +
                                PontosCelulaSelecionada.RelCelulaFeito +
                                PontosCelulaSelecionada.RelCelebracao +
                                PontosCelulaSelecionada.RelDiscipulado +
                                PontosCelulaSelecionada.Pontualidade} */}
                            </Box>
                            <Box
                              width="20%"
                              display="flex"
                              justifyContent="center"
                            >
                              -
                            </Box>
                          </Box>
                        </ListItemText>
                      </Box>
                    </Box>
                  </Box>
                )}
              </List>
            </TableContainer>
          </Box>{' '}
        </Box>
      </Dialog>
      <Dialog fullScreen open={openDialog2} TransitionComponent={Transition}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          minHeight={570}
          minWidth={300}
          bgcolor={corIgreja.principal2}
          height="calc(100vh )"
        >
          <Box
            width="96%"
            height="97%"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            borderRadius={16}
            ml={0}
            bgcolor={corIgreja.principal}
          >
            <Box ml={2} height="5%" display="flex" alignItems="start">
              <Box
                display="flex"
                alignItems="center"
                onClick={() => {
                  setOpenDialog2(false);
                }}
              >
                <IoClose size={25} color="white" />
              </Box>
              <ListItem
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box width="100%">
                  <ListItemText style={{ marginTop: -5 }}>
                    <Box
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginLeft: 0,
                        fontFamily: 'Fugaz One',
                        fontSize: '18px',
                        color: '#FFFF',
                      }}
                    >
                      <Box display="flex">
                        CÉLULA{' '}
                        <Box ml={2} color="yellow">
                          {' '}
                          {PontosCelulaSelecionada.Celula}{' '}
                        </Box>{' '}
                      </Box>
                    </Box>
                  </ListItemText>
                </Box>
              </ListItem>
            </Box>
            <TableContainer
              sx={{ background: 'white', width: '100%', height: '90%' }}
            >
              <Grafico dados={PontosCelulaSelecionada} />
            </TableContainer>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
