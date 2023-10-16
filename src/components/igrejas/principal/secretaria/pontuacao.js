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
  };
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
  const [semana, setSemana] = React.useState(0);
  const [semanaF, setSemanaF] = React.useState(0);
  const [pontosCelulas, setPontosCelulas] = React.useState(0);
  const timeElapsed2 = Date.now();
  const dataAtual2 = new Date(timeElapsed2 - 60 * 60 * 1000 * 24 * 7);
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
  const timeElapsed22 = Date.now();

  const dataAtual22 = new Date(timeElapsed22);
  const [selectedDate2, setSelectedDate2] = React.useState(dataAtual22);
  const [inputValue2, setInputValue2] = React.useState(
    moment(dataAtual22).format('DD/MM/YYYY'),
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

  const handleCheckCelula = (celulaSelecionada) => {
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
        ),
      );
      setOpenDialog1(true);
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
        <Box width="100%" height="10%" display="flex" alignItems="center">
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
                  <ListItem
                    onClick={() => {
                      console.log('row', row);
                      handleCheckCelula(row);
                    }}
                    key={index}
                    alignItems="flex-start"
                  >
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
                            fontSize: '16px',
                            color: '#FFFF',
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
                            fontSize: '14px',
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
            </Box>
            <TableContainer sx={{ height: '90%' }}>
              <List
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {PontosCelulaSelecionada && (
                  <Box width="100%">
                    {console.log(
                      'PontosCelulaSelecionada',
                      PontosCelulaSelecionada,
                    )}
                    <ListItem>
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
                    <ListItem alignItems="flex-start">
                      <Box>
                        <ListItemText style={{ marginTop: -5 }}>
                          {/* 'CelebracaoIgreja',
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
      'Visitas', */}
                          <Box
                            mt={1}
                            style={{
                              display: 'flex',
                              marginLeft: 0,
                              fontFamily: 'Fugaz One',
                              fontSize: '16px',
                              color: '#FFFF',
                            }}
                          >
                            <Box ml={2} display="flex">
                              PONTOS POR RELATÓRIOS:
                              <Box ml={2} mr={2} color="yellow">
                                {PontosCelulaSelecionada.Relatorio +
                                  PontosCelulaSelecionada.RelCelebracao +
                                  PontosCelulaSelecionada.RelCelulaFeito +
                                  PontosCelulaSelecionada.RelDiscipulado +
                                  PontosCelulaSelecionada.Pontualidade}
                              </Box>
                              de
                              <Box ml={2} color="yellow">
                                {PontosCelulaSelecionada.semanas * 5}
                              </Box>
                            </Box>
                          </Box>
                          <Box
                            mt={1}
                            style={{
                              display: 'flex',
                              marginLeft: 0,
                              fontFamily: 'Rubik',
                              fontSize: '16px',
                              color: '#FFFF',
                            }}
                          >
                            <Box ml={2}>Preencher todos os Relatórios: </Box>
                            <Box color="yellow" ml={1} mr={2}>
                              {PontosCelulaSelecionada.Relatorio}
                            </Box>
                            de
                            <Box ml={2} color="yellow">
                              {PontosCelulaSelecionada.semanas * 1}
                            </Box>
                          </Box>
                          <Box
                            mt={1}
                            style={{
                              display: 'flex',
                              marginLeft: 0,
                              fontFamily: 'Rubik',
                              fontSize: '16px',
                              color: '#FFFF',
                            }}
                          >
                            <Box ml={2}>Relatório da Célula: </Box>
                            <Box color="yellow" ml={1} mr={2}>
                              {PontosCelulaSelecionada.RelCelulaFeito}
                            </Box>
                            de
                            <Box ml={2} color="yellow">
                              {PontosCelulaSelecionada.semanas * 1}
                            </Box>
                          </Box>
                        </ListItemText>
                      </Box>
                    </ListItem>
                  </Box>
                )}
              </List>
            </TableContainer>
          </Box>{' '}
        </Box>
      </Dialog>
    </Box>
  );
}
