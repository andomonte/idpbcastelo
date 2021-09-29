import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { signOut } from 'next-auth/client';
import { Box, Button, Avatar } from '@material-ui/core';
import React from 'react';
// import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import MostrarBuscarEventos from './mostrarBuscaEventos';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    alignItems: 'justify',
    marginTop: -45,
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

function BuscarEventos({ item, secao, statusDrawer, perfilUser }) {
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

  const dadosUser = item.filter(
    (val) => val.email === secao.user.email && val.NivelUser === perfilUser,
  );
  if (dadosUser.length === 0) {
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  }

  return (
    <Box className={classes.box2} translate="no">
      <Hidden smDown>
        <Box>
          <Box borderRadius={16} {...defaultProps}>
            <Box>
              <Grid container className={classes.root} spacing={2}>
                <Grid item xs={2}>
                  <Grid container justifyContent="flex-end">
                    <Box style={{ fontSize: '20px' }} mt={5} mb={1}>
                      <Avatar
                        style={{ width: 100 }}
                        alt="Travis Howard"
                        src="/images/Missoes_2.png"
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid container justifyContent="flex-start">
                    <Box style={{ fontSize: '20px' }} mt={6}>
                      Supervisão:<strong> {item[0].RegiaoIDPB}</strong>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={7}>
                  <Grid container justifyContent="center">
                    <Box mr={5} mt={0} display="flex" justifyContent="flex-end">
                      <Box>
                        <Box mt={2} textAlign="center">
                          <h3> Data do Relatório </h3>
                        </Box>

                        <Box
                          align="center"
                          display="flex"
                          justifyContent="center"
                        >
                          <Box mr={1} mb={2} mt={-1}>
                            <ButtonGroup
                              size="small"
                              color="secondary"
                              aria-label="large outlined primary button group"
                              variant="contained"
                            >
                              <Button
                                style={{
                                  backgroundColor: '#afb42b',
                                  height: 30,
                                }}
                              >
                                <ArrowLeftIcon
                                  style={{ fontSize: 35, color: '#000' }}
                                  color="primary"
                                  onClick={handleSubMes}
                                  type="button"
                                />
                              </Button>
                              <Button
                                style={{
                                  width: 120,
                                  backgroundColor: '#afb42b',
                                  fontSize: '12px',
                                  height: 30,
                                }}
                              >
                                <Box align="center" position="fixed">
                                  <strong>{showMes}</strong>
                                </Box>
                              </Button>
                              <Button
                                style={{
                                  backgroundColor: '#afb42b',
                                  height: 30,
                                }}
                              >
                                <ArrowRightIcon
                                  style={{ fontSize: 35, color: '#000' }}
                                  color="primary"
                                  onClick={handleAddMes}
                                />
                              </Button>
                            </ButtonGroup>
                          </Box>
                          <Box mt={-1}>
                            <ButtonGroup
                              size="small"
                              color="secondary"
                              aria-label="large outlined primary button group"
                              variant="contained"
                            >
                              <Button
                                style={{
                                  backgroundColor: '#afb42b',
                                  height: 30,
                                }}
                              >
                                <ArrowLeftIcon
                                  style={{ fontSize: 35, color: '#000' }}
                                  onClick={handleSubAno}
                                  type="button"
                                />
                              </Button>
                              <Button
                                style={{
                                  width: 120,
                                  height: 30,
                                  backgroundColor: '#afb42b',
                                  fontSize: '16px',
                                }}
                              >
                                <Box align="center" position="fixed">
                                  <strong>{showAno}</strong>
                                </Box>
                              </Button>
                              <Button
                                style={{
                                  backgroundColor: '#afb42b',
                                  height: 30,
                                }}
                              >
                                <ArrowRightIcon
                                  style={{ fontSize: 35, color: '#000' }}
                                  onClick={handleAddAno}
                                />
                              </Button>
                            </ButtonGroup>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
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
            <MostrarBuscarEventos
              item={dadosUser}
              Data={dates}
              statusDrawer={statusDrawer}
            />
          </Box>
        </Box>
      </Hidden>
      <Hidden mdUp>
        <Box alignItems="center">
          <Box borderRadius={16} {...defaultProps} alignItems="center">
            <Box mt={2} textAlign="center">
              <Box
                className={classes.novoBox}
                mt={-2}
                mb={-1}
                style={{ color: '#000' }}
              >
                Supervisão:{' '}
                <strong style={{ color: '#000' }}>{item[0].RegiaoIDPB} </strong>
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              align="center"
              m={0}
              bgcolor="background.paper"
            >
              <Grid item xs={6}>
                <Box
                  alignItems="center"
                  display="flex"
                  flexDirection="row"
                  borderRadius={16}
                  {...defaultProps}
                  style={{ backgroundColor: '#81d4fa', height: 30 }}
                >
                  <Grid item xs={2}>
                    <Box mt={0.5} justifyContent="flex-start">
                      <ArrowLeftIcon
                        style={{ fontSize: 40, color: '#ef6c00' }}
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
                        style={{ fontSize: 40, color: '#ef6c00' }}
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
                  style={{ backgroundColor: '#81d4fa', height: 30 }}
                >
                  <Grid item xs={2}>
                    <Box mt={0.5} justifyContent="flex-start">
                      <ArrowLeftIcon
                        style={{ fontSize: 40, color: '#ef6c00' }}
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
                        style={{ fontSize: 40, color: '#ef6c00' }}
                        color="primary"
                        onClick={handleAddAno}
                      />
                    </Box>
                  </Grid>
                </Box>
              </Grid>
            </Box>
            <Grid item xs={12} style={{ marginBottom: 10 }} />
          </Box>
          <Box
            className={classes.box}
            ml={1}
            mr={1}
            width="auto"
            //  width="100%"
            //          maxWidth={1200}
            height="auto"
          >
            <MostrarBuscarEventos
              item={dadosUser}
              Data={dates}
              statusDrawer={statusDrawer}
            />
          </Box>
        </Box>
      </Hidden>
    </Box>
  );
}

export default BuscarEventos;
