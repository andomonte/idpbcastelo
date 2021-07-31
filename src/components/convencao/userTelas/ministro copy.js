import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { signOut } from 'next-auth/client';
import { Box, Typography, Button } from '@material-ui/core';
import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import IconButton from '@material-ui/core/IconButton';

import Padrao from './telaPadrao';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  texto: {
    fontSize: '25px',
    fontWeight: 1000,
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
function TelaMinistro({ item, secao }) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  // console.log('mes:', selectedDate.getMonth() + 1);
  const dadosUser = item.filter((val) => val.email === secao.user.email);
  // console.log(dadosUser.length);
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
  const data = [
    'Não tem Relatório',
    'Não tem Relatório',
    'Não tem Relatório',
    'Não tem Relatório',
    'Não tem Relatório',
  ];
  const handleClick = (event) => {
    event.preventDefault();
    //  console.log('cheguei aqui');
    <Padrao />;
  };
  return (
    <Box mt={10}>
      <Hidden smDown>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Data do Relatório"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />

              <IconButton classes={{ label: classes.iconButtonLabel }}>
                <NoteAddIcon style={{ fontSize: 30 }} color="primary" />
                <div>Novo</div>
              </IconButton>
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>

        <Box
          className={classes.box}
          mt={3}
          ml={25}
          mr={25}
          width="auto"
          //            maxWidth={1200}
          height="auto"
          borderRadius={16}
          {...defaultProps}
        >
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            xl={12}
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box mt={4} mb={2} className={classes.texto} textAlign="center">
              Relatórios do Mês de {mes[selectedDate.getMonth()]}
            </Box>

            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Box mb={2} fontWeight={500} fontSize={20}>
                SEMANA 01:{' '}
                {data[0] ? (
                  <Button
                    size="small"
                    className={classes.margin}
                    onClick={handleClick}
                  >
                    {data[0]}
                  </Button>
                ) : (
                  'Sem Relatório'
                )}
              </Box>
            </Grid>
            <Box mb={2} fontWeight={500} fontSize={20} textAlign="center">
              SEMANA 02: {data[1]}
            </Box>
            <Box mb={2} fontWeight={500} fontSize={20} textAlign="center">
              SEMANA 03: {data[2]}
            </Box>
            <Box mb={2} fontWeight={500} fontSize={20} textAlign="center">
              SEMANA 04: {data[3]}
            </Box>
            <Box mb={2} fontWeight={500} fontSize={20} textAlign="center">
              SEMANA 05: {data[4]}
            </Box>
          </Grid>
        </Box>
      </Hidden>
      <Hidden mdUp>
        <Grid container className={classes.root} spacing={0}>
          <Grid item xs={12} md={12} lg={6} xl={6}>
            <Box borderRadius={16} {...defaultProps}>
              {dadosUser && (
                <Box m={4}>
                  <img src={secao.user.image} alt="" width="130" />
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Nome:</small>
                  </Typography>

                  <Typography
                    className={classes.caption}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    {dadosUser[0].nome}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Fução:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].funcaoNaIgreja}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Credencial:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].matricula}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Grau Ministerial:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].grauMinisterial}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Tipo de Usuario:</small>
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].NivelUser}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={12} lg={6} xl={6}>
            <Box borderRadius={16} {...defaultProps}>
              {dadosUser && (
                <Box m={4}>
                  <img src={dadosUser[0].imgIgreja} alt="" width="125" />
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Igreja:</small>
                  </Typography>

                  <Typography
                    className={classes.caption}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    {dadosUser[0].igreja}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Pastor Presidente:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].pastorPresidente}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Quantidade de Membros:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].membros}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Vínculada a:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].vinculadaA}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Codigo da Igreja:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].codigoIgreja}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Hidden>
    </Box>
  );
}

export default TelaMinistro;
