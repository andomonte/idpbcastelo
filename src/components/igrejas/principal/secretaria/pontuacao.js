import React from 'react';
import { Box, Grid, Paper } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TableContainer from '@mui/material/TableContainer';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);
function createListaNome(Celula, Lider, Pontos) {
  return {
    Celula,
    Lider,
    Pontos,
  };
}
export default function NestedGrid() {
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
  const [semana, setSemana] = React.useState(0);
  const [semanaF, setSemanaF] = React.useState(0);

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

  React.useEffect(() => {
    if (selectedDate) {
      setSemana(semanaExata(selectedDate));
    }
    if (selectedDate) {
      setSemanaF(semanaExata(selectedDate2));
    }
  }, [selectedDate2, selectedDate]);

  const handleDateClick2 = () => {
    //   setSelectedDate();
    setIsPickerOpen2(true);
  };
  const url = `/api/consultaPontosSemAno/${semana}/${semanaF}/${anoI}/${anoF}/`;
  const { data: members, error: errorMembers } = useSWR(url, fetcher);

  React.useEffect(() => {
    if (members) {
      const pontuacao = [];
      const distrito = members.filter((val) => val.Distrito === 1);

      const setPerson = new Set();
      const listaCelulas = distrito.filter((person) => {
        const duplicatedPerson = setPerson.has(person.Celula);
        setPerson.add(person.Celula);
        return !duplicatedPerson;
      });

      for (let i = 0; i <= listaCelulas.length; i += 1) {
        let pontosAgora = 0;
        let liderAgora = 'Sem';
        distrito.map((val) => {
          if (val.Celula === i + 1) {
            pontosAgora += Number(val.TotalRank);
            liderAgora = val.CriadoPor ? val.CriadoPor : 'Sem';
          }

          return 0;
        });

        pontuacao[i] = createListaNome(
          i + 1,
          liderAgora,
          pontosAgora.toFixed(),
        );
      }
      console.log(
        'members',

        pontuacao.sort((a, b) => b.Pontos - a.Pontos),
      );
      setListaFinal(pontuacao.sort((a, b) => b.Pontos - a.Pontos));
    }
    if (errorMembers) return <div>An error occured.</div>;
    if (!members) return <div>Loading ...</div>;
    return 0;
  }, [members]);
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
        <Box mb={2} width="100%" height={40} display="flex">
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
        <TableContainer sx={{ maxHeight: '85%' }}>
          <List sx={{ width: '100%', maxWidth: 360 }}>
            {listaFinal &&
              listaFinal.length &&
              listaFinal.map((row, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <Box
                  /* onClick={() => {
                  setOpenModal2(true);
                }} */
                  >
                    <ListItemText style={{ marginTop: 8 }}>
                      <Box
                        style={{
                          display: 'flex',
                          marginLeft: 10,
                          fontFamily: 'Fugaz One',
                          fontSize: '16px',
                          color: '#FFFF',
                        }}
                      >
                        {console.log('oi lider', row)}
                        {row.Lider && row.Lider.length > 30
                          ? row.Lider.substring(
                              0,
                              row.Lider.lastIndexOf(' '),
                            ).toUpperCase()
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
        </TableContainer>
      </Box>
    </Box>
  );
}
