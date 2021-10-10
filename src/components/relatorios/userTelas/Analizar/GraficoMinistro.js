import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { signOut } from 'next-auth/client';
import { Box } from '@material-ui/core';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import moment from 'moment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grafico2 from './graficos2';
import Grafico1 from './graficos1';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    alignItems: 'justify',
    marginTop: 2,
  },
  box2: {
    marginTop: 20,
    [theme.breakpoints.down('md')]: {
      marginTop: 2,
    },

    // justifyContent: 'center',
  },

  texto: {
    fontSize: '25px',
    fontWeight: 1000,
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
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
  page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    marginTop: -10,
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
      fontSize: '14px',
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
  },
  iconButtonLabel: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
    color: 'black',
    marginRight: 10,
  },
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    // marginBottom: 4,
    marginTop: -25,
    marginLeft: 20,
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
};

function GraficoMinistro({ item, secao }) {
  // let enviarDia;
  let enviarData;
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [open, setIsPickerOpen] = React.useState(false);
  const [age, setAge] = React.useState(0);
  // const [selectedDate, setDate] = useState(moment());
  const [inputValue, setInputValue] = React.useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const tipoGrafico = ['linhas', 'barras', 'acumulados'];
  //= ================================================================

  // const dates = selectedDate;
  // const firstDay = new Date(dates.getFullYear(), dates.getMonth(), 1).getDay();
  // const lastDay = new Date(dates.getFullYear(), dates.getMonth() + 1, 0);
  // let firstSunday;

  //= ==============================================================
  const handleDateChange = (date, value) => {
    setInputValue(value);
    setSelectedDate(date);
    setIsPickerOpen(false);
  };
  //= ==================================================================

  const getData = () => {
    enviarData = inputValue;
    //   enviarDia = Number(inputValue.slice(0, 2));

    //  setData(moment(inputValue).format('DD/MM/YYYY'));
  };
  //= ============================================================
  // selecionar tipo de grafico
  //= ============================================================

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  //= ============================================================
  const handleDateClick = () => {
    //   setSelectedDate();
    setIsPickerOpen(true);
  };
  const dadosUser = item.filter((val) => val.email === secao.user.email);
  if (dadosUser.length === 0) {
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  }

  const mes = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  return (
    <Box className={classes.box2}>
      <Hidden smDown>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="center">
              <KeyboardDatePicker
                open={open}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Data do Relatório"
                value={selectedDate}
                inputValue={inputValue}
                onClick={handleDateClick}
                onChange={handleDateChange}
                onClose={getData()}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Box
              mt={4}
              mb={2}
              ml={0}
              className={classes.texto}
              textAlign="center"
            >
              Graficos Mês de {mes[selectedDate.getMonth()]}{' '}
            </Box>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid
          item
          xl={12}
          container
          spacing={0}
          // direction="column"
          alignItems="center"
          justifyContent="center"
          //    style={{ minHeight: '100vh' }}
        >
          <Box
            className={classes.box}
            mt={3}
            ml={0}
            mr={0}
            mb={5}
            borderRadius={16}
            {...defaultProps}
          >
            <Grafico1
              item={item}
              secao={secao}
              Data={enviarData}
              tipo="linhas"
            />
          </Box>
          <Box
            className={classes.box}
            mt={3}
            ml={5}
            mr={0}
            mb={5}
            borderRadius={16}
            {...defaultProps}
          >
            <Grafico1
              item={item}
              secao={secao}
              Data={enviarData}
              tipo="barras"
            />
          </Box>
          <Box
            className={classes.box}
            mt={3}
            ml={5}
            mr={0}
            mb={5}
            borderRadius={16}
            {...defaultProps}
          >
            <Grafico1
              item={item}
              secao={secao}
              Data={enviarData}
              tipo="acumulados"
            />
          </Box>
        </Grid>
        <Grid
          item
          xl={12}
          container
          spacing={0}
          alignItems="center"
          justifyContent="center"
          //          style={{ height: '40vh', with: '500px' }}
        >
          <Box
            className={classes.box}
            mt={3}
            ml={0}
            mr={0}
            borderRadius={16}
            {...defaultProps}
          >
            <Grafico2
              item={item}
              secao={secao}
              Data={enviarData}
              tipo="linhas"
            />
          </Box>
          <Box
            className={classes.box}
            mt={3}
            ml={5}
            mr={0}
            borderRadius={16}
            {...defaultProps}
          >
            <Grafico2
              item={item}
              secao={secao}
              Data={enviarData}
              tipo="barras"
            />
          </Box>
          <Box
            className={classes.box}
            mt={5}
            ml={5}
            mr={0}
            borderRadius={16}
            {...defaultProps}
          >
            <Grafico2
              item={item}
              secao={secao}
              Data={enviarData}
              tipo="acumulados"
            />
          </Box>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="center">
              <KeyboardDatePicker
                open={open}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Data do Relatório"
                value={selectedDate}
                inputValue={inputValue}
                onClick={handleDateClick}
                onChange={handleDateChange}
                onClose={getData()}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Box
              mt={4}
              mb={2}
              ml={0}
              className={classes.texto}
              textAlign="center"
            >
              Mês de {mes[selectedDate.getMonth()]}{' '}
              <FormControl className={classes.formControl}>
                <InputLabel id="tGrafico">Tipo</InputLabel>
                <Select
                  labelId="tGrafico"
                  id="tGrafico"
                  value={age}
                  onChange={handleChange}
                  label="Tipo"
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  <MenuItem value={0}>Linha</MenuItem>
                  <MenuItem value={1}>Barras</MenuItem>
                  <MenuItem value={2}>Acumulados</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid
          item
          xl={12}
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          //    style={{ minHeight: '100vh' }}
        >
          <Box
            className={classes.box}
            mt={3}
            ml={0}
            mr={0}
            borderRadius={16}
            {...defaultProps}
          >
            <Grafico1
              item={item}
              secao={secao}
              Data={enviarData}
              tipo={tipoGrafico[age]}
            />
          </Box>
        </Grid>
        <Grid
          item
          xl={12}
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          //    style={{ minHeight: '100vh' }}
        >
          <Box
            className={classes.box}
            mt={3}
            ml={0}
            mr={0}
            borderRadius={16}
            {...defaultProps}
          >
            <Grafico2
              item={item}
              secao={secao}
              Data={enviarData}
              tipo={tipoGrafico[age]}
            />
          </Box>
        </Grid>
      </Hidden>
    </Box>
  );
}

export default GraficoMinistro;
