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

import moment from 'moment';
import Formulario from './formulario';
import Grafico from './graficos';

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
}));
const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
};

function GraficoMinistro({ item, secao }) {
  let enviarDia;
  let enviarData;
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [open, setIsPickerOpen] = React.useState(false);

  // const [selectedDate, setDate] = useState(moment());
  const [inputValue, setInputValue] = React.useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );

  //= ================================================================

  const dates = selectedDate;
  const firstDay = new Date(dates.getFullYear(), dates.getMonth(), 1).getDay();
  // const lastDay = new Date(dates.getFullYear(), dates.getMonth() + 1, 0);
  let firstSunday;

  if (firstDay > 0) {
    firstSunday = 1 + (7 - firstDay);
  }

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

    //  setData(moment(inputValue).format('DD/MM/YYYY'));
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
            <Grid container justify="center">
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
              Grficos Mês de {mes[selectedDate.getMonth()]}{' '}
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
          justify="center"
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
            <Grafico />
          </Box>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="center">
              <KeyboardDatePicker
                open={open}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Data do Relatório"
                value={selectedDate}
                onClick={handleDateClick}
                onChange={handleDateChange}
                size="small"
                //                setData(moment(e.getUTCDate()).format('DD/MM/YYYY'));
                onClose={getData}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />

              {/* <IconButton classes={{ label: classes.iconButtonLabel }}>
                <NoteAddIcon style={{ fontSize: 30 }} color="primary" />
                <div>Novo</div>
              </IconButton> */}
            </Grid>
          </MuiPickersUtilsProvider>
          <Box mt={1} ml={2} className={classes.texto} textAlign="center">
            Mês de {mes[selectedDate.getMonth()]}{' '}
          </Box>
        </Grid>

        <Box
          className={classes.box}
          mt={3}
          ml={1}
          mr={1}
          width="auto"
          //            maxWidth={1200}
          height="auto"
          borderRadius={16}
          {...defaultProps}
        >
          {enviarDia < firstSunday + 7 ? (
            <Formulario
              item={dadosUser}
              secao={secao}
              Data={enviarData}
              Semana={1}
            />
          ) : null}
          {enviarDia > firstSunday + 6 && enviarDia < firstSunday + 14 ? (
            <Formulario
              item={dadosUser}
              secao={secao}
              Data={enviarData}
              Semana={2}
            />
          ) : null}
          {enviarDia > firstSunday + 13 && enviarDia < firstSunday + 21 ? (
            <Formulario
              item={dadosUser}
              secao={secao}
              Data={enviarData}
              Semana={3}
            />
          ) : null}
          {enviarDia > firstSunday + 20 && enviarDia < firstSunday + 28 ? (
            <Formulario
              item={dadosUser}
              secao={secao}
              Data={enviarData}
              Semana={4}
            />
          ) : null}
          {enviarDia > firstSunday + 27 ? (
            <Formulario
              item={dadosUser}
              secao={secao}
              Data={enviarData}
              Semana={5}
            />
          ) : null}
        </Box>
      </Hidden>
    </Box>
  );
}

export default GraficoMinistro;
