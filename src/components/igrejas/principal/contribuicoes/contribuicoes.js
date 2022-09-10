import { Box } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

/* import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'; 
import moment from 'moment'; */
import Meses from 'src/utils/meses';

import TabCelula from './tabContribuicoes';

function RelCelula({ perfilUser }) {
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

  const handleIncMes = () => {
    let contMesAtual = contMes + 1;

    if (contMesAtual > 11) {
      contMesAtual = 0;
      handleIncAno();
    }
    setContMes(contMesAtual);
  };
  const handleDecMes = () => {
    let contMesAtual = contMes - 1;

    if (contMesAtual < 0) {
      contMesAtual = 11;
      handleDecAno();
    }
    setContMes(contMesAtual);
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
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundImage: `url('/images/contribuicoes.jpg')`,
            backgroundPosition: 'center', // centraliza imagem
            backgroundSize: 'cover',
          }}
          width="100%"
          display="flex"
          height="15vh"
          minHeight={90}
          flexDirection="column"
        >
          <Box
            height="100%"
            minHeight={60}
            minWidth={300}
            width="100%"
            color="white"
            fontFamily="Fugaz One"
            fontSize="20px"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            style={{
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
          >
            <Box mr={2}> MINHAS CONTRIBUÇÕES</Box>
          </Box>
        </Box>
        <Box height={50} width="100%" minWidth={300} bgcolor="white">
          <Box width="100%" display="flex">
            <Box
              width="10%"
              display="flex"
              justifyContent="flex-start"
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
                <BiCaretLeft size={35} color={corIgreja.principal2} />
              </IconButton>
            </Box>
            <Box
              width="80%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="16px"
              color="black"
              sx={{ fontFamily: 'Fugaz One' }}
            >
              {mes[contMes].descricao.toUpperCase()} / {contAno}
            </Box>
            <Box
              width="10%"
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
                <BiCaretRight size={35} color={corIgreja.principal2} />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box width="100%" height="85%">
          <Box
            style={{
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
            }}
            height="100%"
            minWidth={300}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={350}
            width="100%"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="96%"
              height="100%"
            >
              <Box
                height="96%"
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
  );
}

export default RelCelula;
