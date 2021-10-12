import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { signOut } from 'next-auth/client';
import { Box, Button } from '@material-ui/core';
import React from 'react';
// import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import RegioesMM from 'src/utils/regioesMM';
import Formulario from './formularioSupervisao';

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

function TelaSupervisor({ item, secao, statusDrawer, perfilUser }) {
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
  const mesMobile = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  const classes = useStyles();
  const [contRegiao, setContRegiao] = React.useState(0);
  const [showMes, setShowMes] = React.useState(mes[mesAtual]);
  const [showMesMob, setShowMesMob] = React.useState(mesMobile[mesAtual]);
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
    setShowMesMob(mesMobile[temCont]);
  };
  const handleAddMes = () => {
    let temCont = contMes + 1;
    if (temCont > 11) temCont = 0;
    setContMes(temCont);
    setShowMesMob(mesMobile[temCont]);

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
  const regiao = RegioesMM(dadosUser[0].RegiaoIDPB);

  const handleSubRegiao = () => {
    let temCont = contRegiao - 1;
    if (temCont < 0) temCont = regiao.length - 1;
    setContRegiao(temCont);
  };
  const handleAddRegiao = () => {
    let temCont = contRegiao + 1;
    if (temCont > regiao.length - 1) temCont = 0;
    setContRegiao(temCont);
  };

  return (
    <Box className={classes.box2} translate="no">
      <Hidden smDown>
        <Box>
          <Box borderRadius={16} {...defaultProps}>
            <Box display="flex" justifyContent="center" mr={4}>
              <Grid container className={classes.root}>
                <Grid item xs={6}>
                  <Grid container justifyContent="center">
                    <Box
                      mr={10}
                      mt={0}
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <Box>
                        <Box mt={2} textAlign="center">
                          Coordenação:{' '}
                          <strong> {dadosUser[0].RegiaoIDPB}</strong>{' '}
                        </Box>
                        <Box
                          align="center"
                          display="flex"
                          justifyContent="center"
                        >
                          <Box mr={1} mb={2} mt={1}>
                            <ButtonGroup
                              size="small"
                              color="secondary"
                              aria-label="large outlined primary button group"
                              variant="contained"
                            >
                              <Button
                                style={{
                                  backgroundColor: '#1565c0',
                                  height: 30,
                                }}
                              >
                                <ArrowLeftIcon
                                  style={{ fontSize: 35, color: '#000' }}
                                  color="primary"
                                  onClick={handleSubRegiao}
                                  type="button"
                                />
                              </Button>
                              <Button
                                style={{
                                  width: 150,
                                  backgroundColor: '#1565c0',
                                  fontSize: '12px',
                                  height: 30,
                                }}
                              >
                                <Box align="center" position="fixed">
                                  <strong>{regiao[contRegiao]}</strong>
                                </Box>
                              </Button>
                              <Button
                                style={{
                                  backgroundColor: '#1565c0',
                                  height: 30,
                                }}
                              >
                                <ArrowRightIcon
                                  style={{ fontSize: 35, color: '#000' }}
                                  color="primary"
                                  onClick={handleAddRegiao}
                                />
                              </Button>
                            </ButtonGroup>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <Grid container justifyContent="center">
                    <Box
                      mr={15}
                      mt={0}
                      display="flex"
                      justifyContent="flex-end"
                    >
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
            {regiao[contRegiao] && (
              <Formulario
                regiaoSelect={regiao[contRegiao]}
                item={dadosUser}
                Data={dates}
                statusDrawer={statusDrawer}
              />
            )}
          </Box>
        </Box>
      </Hidden>
      <Hidden mdUp>
        <Box alignItems="center">
          <Box borderRadius={16} {...defaultProps} alignItems="center">
            <Box
              display="flex"
              justifyContent="center"
              align="center"
              m={1}
              mt={1}
              bgcolor="background.paper"
            >
              <Grid item xs={12}>
                <Box
                  alignItems="center"
                  display="flex"
                  flexDirection="row"
                  style={{ height: 30 }}
                  mt={1}
                >
                  <Grid item xs={12}>
                    <Box className={classes.novoBox} style={{ color: '#000' }}>
                      <strong style={{ color: '#000' }}>
                        {dadosUser[0].RegiaoIDPB}{' '}
                      </strong>
                    </Box>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  mt={1}
                  mr={2}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  height={30}
                  width={200}
                >
                  <Grid item xs={2}>
                    <Button>
                      <ArrowLeftIcon
                        style={{ fontSize: 40 }}
                        onClick={handleSubRegiao}
                      />
                    </Button>
                  </Grid>
                  <Grid item xs={8}>
                    <Box
                      ml={2.8}
                      display="flex"
                      justifyContent="center"
                      textAlign="center"
                    >
                      <strong>{regiao[contRegiao]}</strong>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Button>
                      <ArrowRightIcon
                        style={{ fontSize: 40 }}
                        onClick={handleAddRegiao}
                      />
                    </Button>
                  </Grid>
                </Box>
              </Grid>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              align="center"
              m={0}
              bgcolor="background.paper"
            >
              <Grid item xs={12}>
                <Box
                  alignItems="center"
                  display="flex"
                  flexDirection="row"
                  borderRadius={16}
                  {...defaultProps}
                  style={{ backgroundColor: '#81d4fa', height: 30 }}
                >
                  <Box alignItems="center" display="flex">
                    <Button mt={0}>
                      <ArrowLeftIcon
                        style={{
                          fontSize: 40,
                          color: '#ef6c00',
                        }}
                        color="primary"
                        onClick={handleSubMes}
                      />
                    </Button>
                    <Box align="center">
                      <strong>{showMesMob}</strong>
                    </Box>
                    <Button>
                      <ArrowRightIcon
                        style={{ fontSize: 40, color: '#ef6c00' }}
                        color="primary"
                        onClick={handleAddMes}
                      />
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  borderRadius={16}
                  {...defaultProps}
                  mt={1}
                  style={{ backgroundColor: '#81d4fa', height: 30 }}
                >
                  <Button>
                    <ArrowLeftIcon
                      style={{ fontSize: 40, color: '#ef6c00' }}
                      onClick={handleSubAno}
                    />
                  </Button>
                  <Box align="center">
                    <strong>{showAno}</strong>
                  </Box>
                  <Button>
                    <ArrowRightIcon
                      style={{ fontSize: 40, color: '#ef6c00' }}
                      color="primary"
                      onClick={handleAddAno}
                    />
                  </Button>
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
            {regiao[contRegiao] && (
              <Formulario
                regiaoSelect={regiao[contRegiao]}
                item={dadosUser}
                Data={dates}
                statusDrawer={statusDrawer}
              />
            )}
          </Box>
        </Box>
      </Hidden>
    </Box>
  );
}

export default TelaSupervisor;
