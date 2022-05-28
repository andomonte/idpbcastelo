// Display posts in frontend (in /pages/index.tsx)
import React from 'react';
import { Box, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@mui/material/List';

import corIgreja from 'src/utils/coresIgreja';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import SearchList from './searchList';

const useStyles = makeStyles((theme) => ({
  input_Box: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 4,
    [theme.breakpoints.down('md')]: {
      marginLeft: 4,
      marginRight: 4,
      marginTop: 4,
    },
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  search: {
    background: '#fafafa',
    padding: '0px 0px',
    display: 'flex',
    // alignCelulass: 'center',
    height: 55,
    width: '100%',
    borderRadius: 0,
    //  maxWidth: 900,
    marginBottom: 0,

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 4,
      marginBottom: 5,
    },
  },
  search2: {
    width: '90%',
    marginTop: 10,

    [theme.breakpoints.down('md')]: {
      marginTop: 4,
    },
  },
  tf_s: {
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '10px',
    border: '2px solid #fff',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 16,
  },
  imgSearch: {
    display: 'flex',
    alignCelulass: 'center',
    height: '40%',
    width: '50%',
    marginLeft: '40%',
    marginBottom: 20,
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '20%',
      marginLeft: '40%',
      marginTop: 4,
    },
  },
}));

function converteData(DataDDMMYY) {
  const dataSplit = DataDDMMYY.split('/');
  const novaData = new Date(
    parseInt(2000, 10),
    parseInt(dataSplit[1], 10) - 1,
    parseInt(dataSplit[0], 10),
  );

  return novaData;
}

function compare(a, b) {
  if (converteData(a.Nascimento) < converteData(b.Nascimento)) return -1;
  return true;
}

function BuscarAniversariantes({ rolMembros }) {
  const classes = useStyles();

  // const mes = Meses();

  //= ========================================================================
  // data de inicio
  //= ========================================================================
  const timeElapsed2 = Date.now();
  const dataAtual2 = new Date(timeElapsed2);
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);
  const [inputValue, setInputValue] = React.useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const [open, setIsPickerOpen] = React.useState(false);
  const handleDateChange = (date, value) => {
    setInputValue(value);
    setSelectedDate(date);
    setIsPickerOpen(false);
  };

  const getData = () => {
    //  enviarData = inputValue;
    //  enviarDia = Number(inputValue.slice(0, 2));
  };

  const handleDateClick = () => {
    //   setSelectedDate();
    setIsPickerOpen(true);
  };

  //= ========================================================================

  //= ========================================================================
  // data de Final
  //= ========================================================================
  const [selectedDate2, setSelectedDate2] = React.useState(dataAtual2);
  const [inputValue2, setInputValue2] = React.useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const [open2, setIsPickerOpen2] = React.useState(false);
  const handleDateChange2 = (date, value) => {
    setInputValue2(value);
    setSelectedDate2(date);
    setIsPickerOpen2(false);
  };

  const getData2 = () => {
    //  enviarData = inputValue;
    //  enviarDia = Number(inputValue.slice(0, 2));
  };

  const handleDateClick2 = () => {
    //   setSelectedDate();
    setIsPickerOpen2(true);
  };

  //= ========================================================================

  const dataInicial = converteData(inputValue);
  const dataFinal = converteData(inputValue2);

  const niverGeral = rolMembros.filter(
    (results) =>
      converteData(results.Nascimento) >= dataInicial &&
      converteData(results.Nascimento) <= dataFinal,
  );
  /* const niverSetor = niverGeral.filter((results) => {
    if (
      Number(results.Coordenacao) === Number(perfilUser.Coordenacao) &&
      Number(results.Distrito) === Number(perfilUser.Distrito)
    ) {
      return results;
    }
    return 0;
  }); */
  const niverSetorOrdenado = niverGeral.sort(compare);
  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Box className={classes.search2}>
          <Box
            height="25%"
            minHeight={150}
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
            <Box width="100%" ml={1} minWidth={300}>
              <Box mb={2} textAlign="center" color="yellow">
                ANIVERSARIANTES DA IGREJA
              </Box>
              <Grid container item xs={12} spacing={1}>
                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <Box textAlign="center" color="white">
                    Escolha a Data Inicial
                  </Box>
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
                <Grid item xs={6} md={6} lg={6} xl={6}>
                  <Box textAlign="center" color="white">
                    Escolha a Data Final
                  </Box>
                  <Paper style={{ background: '#fafafa', height: 40 }}>
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
                          onClose={getData2()}
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
              </Grid>
            </Box>
          </Box>
          {/* <TextField
            InputProps={{
              endAdornment: (
                <Tooltip title="Pesquisar Igreja">
                  <Box onClick={handleClick} style={{ cursor: 'pointer' }}>
                    <SearchIcon />
                  </Box>
                </Tooltip>
              ),
            }}
            className={classes.search}
            id="field1"
            name="password"
            autoComplete="off"
            type="text"
            value={valor}
            variant="outlined"
            placeholder="Nome ou Número da Celula, Nome do Lider"
            onChange={handleChange}
            // onKeyPress={handlePress}
            onKeyPress={handlePress}
          /> */}
        </Box>
      </Box>
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {Object.keys(niverSetorOrdenado).length ? (
          <Box height="65vh" width="90%" border={1}>
            <List
              sx={{
                width: '100%',
                height: '60vh',

                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 480,
                '& ul': { padding: 0 },
              }}
              subheader={<li />}
            >
              {niverSetorOrdenado.map((itens) => (
                <Box ml={0} key={itens.id}>
                  <Box>
                    <Grid>
                      <SearchList rolMembros={itens} />
                    </Grid>
                  </Box>
                </Box>
              ))}
            </List>
          </Box>
        ) : (
          <Box height="65vh" width="90%" border={1}>
            <Box mt={20} textAlign="center">
              {' '}
              Não temos aniversariantes registrados nesse Periodo
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BuscarAniversariantes;
