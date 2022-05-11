import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

/* import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'; 
import moment from 'moment'; */
import Meses from 'src/utils/meses';

import TabCelula from './abas/tabCelula';

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
}));

function Label({ lab1, lab2 }) {
  return (
    <>
      <Grid item xs={6}>
        <Box color="#fff" textAlign="center">
          {lab1}
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box color="#fff" textAlign="center">
          {lab2}
        </Box>
      </Grid>
    </>
  );
}
function RelCelula({ perfilUser }) {
  const classes = useStyles();
  //= ================================================================
  const mes = Meses();
  const d = new Date();
  const mesAtual = Number(d.getMonth());
  const anoAtual = Number(d.getFullYear());
  const [contMes, setContMes] = React.useState(mesAtual);
  const [contAno, setContAno] = React.useState(anoAtual);
  /*
  let enviarDia;
  let enviarData;
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [open, setIsPickerOpen] = React.useState(false);

  const [inputValue, setInputValue] = React.useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );
  const dates = selectedDate;
   const firstDay = new Date(dates.getFullYear(), dates.getMonth(), 1).getDay();
  // const lastDay = new Date(dates.getFullYear(), dates.getMonth() + 1, 0);
  let firstSunday;

  if (firstDay > 0) {
    firstSunday = 1 + (7 - firstDay);
  } else {
    firstSunday = 1;
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
  };

  //= ============================================================
  const handleDateClick = () => {
    //   setSelectedDate();
    setIsPickerOpen(true);
  };
 */

  /* 
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
                                label="Data"
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
                          </MuiPickersUtilsProvider>
                        </Grid> */

  const handleIncMes = () => {
    let contMesAtual = contMes + 1;

    if (contMesAtual > 11) contMesAtual = 0;
    setContMes(contMesAtual);
  };
  const handleDecMes = () => {
    let contMesAtual = contMes - 1;

    if (contMesAtual < 0) contMesAtual = 11;
    setContMes(contMesAtual);
  };

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

  return (
    <Box height="90vh" minHeight={500}>
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
          height="100%"
          width="100vw"
          maxWidth={600}
          minWidth={370}
          border="4px solid #fff"
        >
          <Box height="100%">
            <Box
              height="25%"
              minHeight={150}
              minWidth={370}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor={corIgreja.principal}
              style={{
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
              }}
            >
              <Box width="100%" ml={1} minWidth={370}>
                <Grid container spacing={0}>
                  <Grid container item xs={12} spacing={1}>
                    <Label lab1="Selecione o Mês" lab2="Selecione o Ano" />
                    <Grid item xs={6}>
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
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ fontFamily: 'arial black' }}
                          >
                            {mes[contMes].descricao}
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
                    <Grid item xs={6}>
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
                                handleDecAno();
                              }}
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }} />{' '}
                              <BiCaretLeft />
                            </IconButton>
                          </Box>
                          <Box
                            width="60%"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ fontFamily: 'arial black' }}
                          >
                            {contAno}
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
                                handleIncAno();
                              }}
                            >
                              <SvgIcon sx={{ color: corIgreja.iconeOn }} />
                              <BiCaretRight />
                            </IconButton>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box
              style={{
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
              }}
              height="73%"
              minWidth={370}
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={350}
              width="100%"
              bgcolor={corIgreja.principal}
              borderTop="2px solid #fff"
            >
              <Box width="95%" height="100%">
                <Box
                  height="10%"
                  minHeight={50}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    bgcolor: corIgreja.principal,
                    color: '#ffff',
                    fontFamily: 'Geneva',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  PARTICIPAÇÃO NAS REUNIÕES DA CÉLULA
                </Box>
                <Box
                  height="85%"
                  minHeight={315}
                  bgcolor="#fafafa"
                  width="100%"
                  borderRadius={16}
                >
                  <TabCelula
                    perfilUser={perfilUser}
                    Mes={contMes}
                    Ano={contAno}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RelCelula;
