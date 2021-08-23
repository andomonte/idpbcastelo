import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { signOut } from 'next-auth/client';
import { Box, Button, Divider } from '@material-ui/core';
import React from 'react';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Formulario from './formularioSupervisao';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    alignItems: 'justify',
    marginTop: 2,
  },
  novoBox: {
    flexGrow: 1,

    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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

function TelaSupervisor({ item, secao }) {
  let enviarData;
  const mesAtual = new Date().getMonth();
  const anoAtual = new Date().getFullYear();
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

  const classes = useStyles();

  const [showMes, setShowMes] = React.useState(mes[mesAtual]);
  const [contMes, setContMes] = React.useState(mesAtual);
  const [showAno, setShowAno] = React.useState(anoAtual);

  //= ================================================================
  let newDate;
  if (contMes < 9) {
    newDate = `0${contMes + 1}`;
  } else {
    newDate = contMes + 1;
  }
  const dates = `01/${newDate}/${showAno}`;

  const handleSubMes = () => {
    let temCont = contMes - 1;
    if (temCont < 0) temCont = 11;
    setContMes(temCont);
    setShowMes(mes[temCont]);
  };
  const handleAddMes = () => {
    let temCont = contMes + 1;
    if (temCont > 11) temCont = 0;
    setContMes(temCont);
    setShowMes(mes[temCont]);
  };
  //= ============================================================
  const handleSubAno = () => {
    let temCont = showAno - 1;
    if (temCont < 2000) temCont = anoAtual;
    setShowAno(temCont);
  };
  const handleAddAno = () => {
    let temCont = showAno + 1;
    if (temCont > anoAtual) temCont = anoAtual;
    setShowAno(temCont);
  };

  const dadosUser = item.filter((val) => val.email === secao.user.email);
  if (dadosUser.length === 0) {
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  }
  return (
    <Box className={classes.box2} translate="no">
      <Hidden smDown>
        <Grid item xs={12} md={12} lg={12} xl={12} />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          //    style={{ minHeight: '100vh' }}
        >
          <Grid>
            <Box
              className={classes.box}
              mt={3}
              ml={2}
              mr={2}
              //  alignContent="center"
              // justifyContent="center"
              //              width="100%"
              width="auto"
              //            maxWidth={1200}
              height="auto"
              borderRadius={16}
              {...defaultProps}
            >
              <Formulario item={dadosUser} secao={secao} Data={enviarData} />
            </Box>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Box mt={2} textAlign="center">
          Data do Relatório
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignText="center"
          m={0}
          bgcolor="background.paper"
        >
          <Grid item xs={5}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              borderRadius={16}
              {...defaultProps}
              style={{ backgroundColor: '#eeff41' }}
            >
              <Grid item xs={2}>
                <Box mt={0.5} justifyContent="flex-start">
                  <ArrowLeftIcon
                    style={{ fontSize: 30 }}
                    color="primary"
                    onClick={handleSubMes}
                  />
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Box align="center">
                  <strong>{showMes}</strong>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box display="flex" flexGrow={1} justifyContent="flex-end">
                  <ArrowRightIcon
                    style={{ fontSize: 30 }}
                    color="primary"
                    onClick={handleAddMes}
                  />
                </Box>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              borderRadius={16}
              {...defaultProps}
              style={{ backgroundColor: '#eeff41' }}
            >
              <Grid item xs={2}>
                <Box mt={0.5} justifyContent="flex-start">
                  <ArrowLeftIcon
                    style={{ fontSize: 30 }}
                    color="primary"
                    onClick={handleSubAno}
                  />
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Box align="center">
                  <strong>{showAno}</strong>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box display="flex" flexGrow={1} justifyContent="flex-end">
                  <ArrowRightIcon
                    style={{ fontSize: 30 }}
                    color="primary"
                    onClick={handleAddAno}
                  />
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Box>

        <Box
          className={classes.box}
          mt={3}
          ml={1}
          mr={1}
          width="auto"
          //  width="100%"
          //          maxWidth={1200}
          height="auto"
        >
          <Formulario item={dadosUser} secao={secao} Data={dates} />
        </Box>
      </Hidden>
    </Box>
  );
}

export default TelaSupervisor;
