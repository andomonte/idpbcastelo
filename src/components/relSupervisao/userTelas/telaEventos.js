import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { signOut } from 'next-auth/client';
import { Box, Grid } from '@material-ui/core';
import moment from 'moment';
import { signOut } from 'next-auth/client';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Formulario from './eventos/formulario';
// import FileList from '../../fileList/index';

const useStyles = makeStyles(() => ({
  box2: {
    display: 'flex',
    alignItems: 'justify',
    margin: 20,
    justifyContent: 'center',
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  boxInterno: {
    width: '100%',
    maxWidth: '400px',
    margin: '30px',
    background: '#bcaaa4',
    borderRadius: '4px',
    padding: '20px',
  },
}));
const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
};
export default function TelaEventos({ item, secao }) {
  const classes = useStyles();

  let enviarData;

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [open, setIsPickerOpen] = React.useState(false);

  // const [selectedDate, setDate] = useState(moment());
  const [inputValue, setInputValue] = React.useState(
    moment(new Date()).format('DD/MM/YYYY'),
  );

  //= ================================================================
  // const lastDay = new Date(dates.getFullYear(), dates.getMonth() + 1, 0);

  //= ==============================================================
  const handleDateChange = (date, value) => {
    setInputValue(value);
    setSelectedDate(date);
    setIsPickerOpen(false);
  };
  //= ==================================================================

  const getData = () => {
    enviarData = inputValue;

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

  return (
    <Box className={classes.box}>
      <Box
        className={classes.box2}
        mt={3}
        ml={0}
        mr={0}
        //  alignContent="center"
        // justifyContent="center"
        width="100%"
        //            maxWidth={1200}
        height="auto"
        borderRadius={16}
        {...defaultProps}
      >
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
                label="Data do Evento"
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
            <Box>
              <Formulario
                item={dadosUser}
                secao={secao}
                Data={enviarData}
                Semana={1}
              />
            </Box>
          </MuiPickersUtilsProvider>
        </Grid>
      </Box>
    </Box>
  );
}
