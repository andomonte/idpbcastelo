import React, { useRef } from 'react';
import { Box, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CardMedia from '@mui/material/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddIcon from '@mui/icons-material/Add';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import api from 'src/components/services/api';

import InputBase from '@material-ui/core/InputBase';
import ValidaCPF from 'src/utils/validarCPF';
import Drawer from '@material-ui/core/Drawer';
import { Alert, AlertTitle } from '@material-ui/lab';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import validator from 'validator';

import TamanhoJanela from 'src/utils/getSize';

import TelaCompra from './telaCompra';

// const validateDate = require('validate-date');

const janela = TamanhoJanela();
let ajAlturaMin = -(janela.height / 10) + 10;
if (ajAlturaMin < -46.9) ajAlturaMin = -49;
if (ajAlturaMin > -45) ajAlturaMin = -45;
const ajAlturaMax = -janela.height / 10;
// if (ajAlturaMax < -53) ajAlturaMax = -53;
// if (ajAlturaMax > -35) ajAlturaMax = -35;
const ajustAltura = janela.height / 10;

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    // overflow: 'hidden',
    width: '100vw',
    padding: 0,
    margin: 0,
    marginTop: 0,
  },
  img: {
    maxWidth: '400px',
    maxHeight: '700px',
    minWidth: '300px',
    minHeight: '500px',
    width: '100%',
    height: janela.height - 24,
    padding: 0,
    margin: 0,
  },
  img2: {
    maxWidth: '400px',
    maxHeight: '697px',
    minWidth: '300px',
    minHeight: '500px',
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
  },
  input1: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },
  letras1: {
    display: 'flex',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fffd',
    marginBottom: 0,
  },
  letras2: {
    display: 'flex',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
  },
  letras3: {
    display: 'flex',
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
    padding: 2,
  },
  legenda1: {
    display: 'flex',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fffd',
  },

  fundoBranco: {
    display: 'flex',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
  },
  button1: {
    display: 'flex',
    background: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#b91a30',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: '#b91a30',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },

  imgMobile: {
    maxWidth: '1110px',
    maxHeight: '500px',
    width: '100%',
    height: 'auto',
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
    marginLeft: '10px',
    marginRight: '10px',
  },
  tf_m: {
    backgroundColor: '#f0f4c3',

    width: '100%',
    fontSize: '5px',
  },
  tf_s: {
    backgroundColor: '#ffff',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '14px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '10px',
    border: '2px solid #b91a30',
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#b91a30'),
    backgroundColor: '#b91a30',
    '&:hover': {
      backgroundColor: '#b91a30',
    },
  },
}))(Button);
const TelaInicial = ({ inscritos }) => {
  const classes = useStyles();
  // const router = useRouter();
  const [carregar, setCarregar] = React.useState(false);
  const [valorErro, setValorErro] = React.useState('');
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [validacaoNome, setValidacaoNome] = React.useState('testar');
  const [validacaoCPF, setValidacaoCPF] = React.useState('testar');
  const [validacaoEmail, setValidacaoEmail] = React.useState('testar');
  const [validacaoData, setValidacaoData] = React.useState('testar');
  const [qtyA, setQtyA] = React.useState(0);
  const [qtyC, setQtyC] = React.useState(0);
  const [vAdultos, setVAdultos] = React.useState(0);
  const [vCriancas, setVCriancas] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [openDados, setOpenDados] = React.useState(false);

  const [fPagamento, setFPagamento] = React.useState('');
  const nomeRef = useRef();
  const cpfRef = useRef();
  const dataRef = useRef();
  const emailRef = useRef();
  const fpRef = useRef();
  const router = useRouter();
  const handleChangeFP = (event) => {
    // console.log(event.target.value);
    setFPagamento(event.target.value);
  };
  /* const pagar = () => {
    if (email && cpf) {
      setOpen(true);
    }
  };

  const prefID = ''; */

  React.useEffect(() => {
    if (validacaoCPF !== 'next' && validacaoCPF !== 'testar') {
      setOpenDrawer(true);
      setValorErro(validacaoCPF);
      cpfRef.current.focus();
    }
  }, [validacaoCPF]);
  React.useEffect(() => {
    if (!validacaoEmail) {
      setOpenDrawer(true);
      setValorErro('Não é um Email Válido');
      emailRef.current.focus();
    }
  }, [validacaoEmail]);
  React.useEffect(() => {
    if (!validacaoData) {
      setOpenDrawer(true);
      setValorErro('Não é uma Data Válida');
      dataRef.current.focus();
    }
  }, [validacaoData]);
  //  setOpenDrawer(false);

  const handleDrawerClose = () => {
    if (!validacaoNome) {
      setValidacaoNome('testar');
      nomeRef.current.focus();
    }

    if (validacaoCPF !== 'testar' && validacaoCPF !== 'next') {
      setValidacaoCPF('testar');
      cpfRef.current.focus();
    }
    if (!validacaoEmail) {
      setValidacaoEmail('testar');
      emailRef.current.focus();
    }
    if (!validacaoData) {
      setValidacaoData('testar');
      dataRef.current.focus();
    }
    setOpenDrawer(false);
  };
  const comprar = () => {
    console.log('oi');
    api
      .post('/api/notification2', {
        action: 'payment',
        data: { id: '1245207030' },
      })

      .then((response) => {
        const prefID = response.data;
        console.log('pref:', prefID);
        //   setOpen(true);
      })

      .catch((error) => {
        console.log(error);
        //  updateFile(uploadedFile.id, { error: true });
      });
  };

  const handleAdd = () => {
    // comprar();
    let newQtyA = qtyA + 1;
    if (newQtyA > 99) newQtyA = 99;
    setQtyA(newQtyA);
    const valAdultos = Number(50 * newQtyA).toFixed(2);
    setVAdultos(valAdultos);
    const newTotal = Number(
      parseFloat(valAdultos) + parseFloat(vCriancas),
    ).toFixed(2);
    setTotal(newTotal);
  };

  const handleSub = () => {
    let newQtyA = qtyA - 1;
    if (newQtyA < 1) newQtyA = 0;
    setQtyA(newQtyA);
    const valAdultos = Number(50 * newQtyA).toFixed(2);
    setVAdultos(valAdultos);
    const newTotal = Number(
      parseFloat(valAdultos) + parseFloat(vCriancas),
    ).toFixed(2);

    setTotal(newTotal);
  };

  const handleAddC = () => {
    let newQtyC = qtyC + 1;
    if (newQtyC > 99) newQtyC = 99;
    setQtyC(newQtyC);
    const valCriancas = Number(25 * newQtyC).toFixed(2);

    setVCriancas(valCriancas);
    //   const newTotal = Number(valCriancas + vAdultos).toFixed(2);
    const newTotal = Number(
      parseFloat(valCriancas) + parseFloat(vAdultos),
    ).toFixed(2);

    setTotal(newTotal);
  };

  const handleSubC = () => {
    let newQtyC = qtyC - 1;
    if (newQtyC < 1) newQtyC = 0;
    setQtyC(newQtyC);

    const valCriancas = Number(25 * newQtyC).toFixed(2);
    setVCriancas(valCriancas);
    const newTotal = Number(
      parseFloat(valCriancas) + parseFloat(vAdultos),
    ).toFixed(2);

    setTotal(newTotal);
  };

  const voltar = () => {
    router.push({
      pathname: '/global',
      //   query: { dadosMesa2, numeroGame },
    });
    // setOpen(false);
    // window.location.reload();
  };

  const handleContinua = () => {
    setCarregar(true);
    router.push({
      pathname: '/global/dadosComprador',
      query: { qtyA, qtyC, total },
    });
  };

  //= ====================================================================
  return (
    <>
      <Box className={classes.root}>
        <ClickAwayListener onClickAway={handleDrawerClose}>
          <Box height={janela.height} style={{ backgroundColor: '#fafafa' }}>
            <Hidden smDown>
              <Box mt={-1} ml={0}>
                <Box display="flex" justifyContent="center">
                  <Box ml={0}>
                    <Box
                      style={{
                        backgroundColor: '#b3b3b3',
                        height: '100vh',
                        width: 400,
                      }}
                    >
                      <Box mt={0}>
                        <img
                          src="/images/global/telaVenda1.png"
                          alt=""
                          //    width="100%"
                          //     height={janela.height}
                          className={classes.img2}
                        />
                      </Box>

                      <Box
                        width="100%"
                        mt={
                          janela.height > 570
                            ? janela.height < 630
                              ? -85
                              : -85
                            : -85
                        }
                        ml={janela.height > 632 ? 3 : 2}
                      >
                        <Grid item xs={2} md={3}>
                          <Box
                            height={10}
                            p={1}
                            ml={0}
                            mr={0}
                            mt={-14}
                            display="flex"
                            alignItems="center"
                          >
                            <ArrowBackIcon
                              sx={{
                                fontSize: 20,
                                color: '#fff',
                              }}
                              onClick={voltar}
                            />
                          </Box>
                        </Grid>
                      </Box>
                      <Box display="flex" justifyContent="center" width="100%">
                        <Box mt={18} ml={0}>
                          <Box
                            width="85%"
                            //                  mt={ajustAltura > 52 ? -ajustAltura + 10 : -ajustAltura + 1}
                          >
                            <Box
                              mt={
                                janela.height > 570
                                  ? janela.height < 630
                                    ? 8
                                    : 8
                                  : 8
                              }
                              display="flex"
                              justifyContent="center"
                            >
                              <Grid item xs={6} md={12}>
                                <Box
                                  mr={10}
                                  style={{
                                    height: 40,
                                    //   boxShadow: '0 0 0 0.1rem #780208',
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      width: '100%',
                                      fontSize: '16px',
                                      color: '#000',
                                      fontFamily: 'Arial Black',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box
                                      bg="#ffaa"
                                      mt={0}
                                      ml={8}
                                      display="flex"
                                      justifyContent="flex-start"
                                    >
                                      ADULTOS
                                    </Box>
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      width: '100%',
                                      fontSize: '12px',
                                      color: '#00A',
                                      fontFamily: 'Arial',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box
                                      bg="#ffaa"
                                      mt={-1}
                                      ml={9}
                                      display="flex"
                                      justifyContent="flex-start"
                                    >
                                      R$ 50,00
                                    </Box>
                                  </Typography>
                                </Box>
                              </Grid>
                              <Box ml={5} />
                              <Grid item xs={6} md={12}>
                                <Box
                                  mr={-2}
                                  style={{
                                    height: 40,
                                    //   boxShadow: '0 0 0 0.1rem #780208',
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      fontSize: '22px',
                                      color: '#000',

                                      fontFamily: 'Arial Black',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box
                                      display="flex"
                                      justifyContent="center"
                                      mt={0}
                                    >
                                      <Box mt={-1} mr={0}>
                                        {qtyA ? (
                                          <IconButton
                                            style={{ color: 'red' }}
                                            aria-label="add to shopping cart"
                                            onClick={handleSub}
                                          >
                                            <RemoveTwoToneIcon
                                              style={{
                                                color: 'red',
                                                fontSize: 35,
                                              }}
                                            />
                                          </IconButton>
                                        ) : (
                                          <IconButton
                                            disabled
                                            aria-label="add to shopping cart"
                                          >
                                            <RemoveTwoToneIcon
                                              style={{
                                                color: '#bdbdbd',
                                                fontSize: 35,
                                              }}
                                            />
                                          </IconButton>
                                        )}
                                      </Box>
                                      <Box
                                        width={40}
                                        mt={0}
                                        ml={0}
                                        mr={0}
                                        display="flex"
                                        justifyContent="center"
                                      >
                                        {qtyA}
                                      </Box>
                                      <Box mt={-1} ml={0}>
                                        <IconButton
                                          onClick={handleAdd}
                                          color="primary"
                                          aria-label="add to shopping cart"
                                        >
                                          <AddIcon sx={{ fontSize: 35 }} />
                                        </IconButton>
                                      </Box>
                                    </Box>
                                  </Typography>
                                </Box>
                              </Grid>
                            </Box>
                            <Box mt={4} display="flex" flexDirection="row">
                              <Grid item xs={6} md={12}>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                  style={{
                                    width: '100%',
                                    fontSize: '16px',
                                    color: '#000',
                                    fontFamily: 'Arial Black',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  <Box
                                    bg="#ffaa"
                                    mt={0}
                                    ml={7}
                                    display="flex"
                                    justifyContent="flex-start"
                                  >
                                    CRIANÇAS
                                  </Box>
                                </Typography>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                  style={{
                                    width: '100%',
                                    fontSize: '12px',
                                    color: '#00A',
                                    fontFamily: 'Arial',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  <Box
                                    bg="#ffaa"
                                    mt={-1}
                                    ml={8}
                                    display="flex"
                                    justifyContent="flex-start"
                                  >
                                    R$ 25,00
                                  </Box>
                                </Typography>
                              </Grid>
                              <Box ml={2} />
                              <Grid item xs={6} md={12}>
                                <Box
                                  mr={-11}
                                  style={{
                                    height: 40,
                                    //   boxShadow: '0 0 0 0.1rem #780208',
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      fontSize: '22px',
                                      color: '#000',

                                      fontFamily: 'Arial Black',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box
                                      display="flex"
                                      justifyContent="center"
                                      mt={0}
                                    >
                                      <Box mt={-1}>
                                        {qtyC ? (
                                          <IconButton
                                            style={{ color: 'red' }}
                                            aria-label="add to shopping cart"
                                            onClick={handleSubC}
                                          >
                                            <RemoveTwoToneIcon
                                              style={{
                                                color: 'red',
                                                fontSize: 35,
                                              }}
                                            />
                                          </IconButton>
                                        ) : (
                                          <IconButton
                                            disabled
                                            aria-label="add to shopping cart"
                                          >
                                            <RemoveTwoToneIcon
                                              style={{
                                                color: '#bdbdbd',
                                                fontSize: 35,
                                              }}
                                            />
                                          </IconButton>
                                        )}
                                      </Box>
                                      <Box
                                        width={40}
                                        mt={0}
                                        ml={0}
                                        mr={0}
                                        display="flex"
                                        justifyContent="center"
                                      >
                                        {qtyC}
                                      </Box>
                                      <Box mt={-1} ml={0}>
                                        <IconButton
                                          onClick={handleAddC}
                                          color="primary"
                                          aria-label="add to shopping cart"
                                        >
                                          <AddIcon sx={{ fontSize: 35 }} />
                                        </IconButton>
                                      </Box>
                                    </Box>
                                  </Typography>
                                </Box>
                              </Grid>
                            </Box>

                            <Box
                              mt={
                                janela.height > 570
                                  ? janela.height < 630
                                    ? 13
                                    : 10
                                  : 13
                              }
                            >
                              <Box display="flex" justifyContent="center">
                                <Box
                                  ml={8}
                                  width={380}
                                  height={100}
                                  mt={janela.height > 632 ? 4 : 2}
                                >
                                  <Box
                                    ml={2}
                                    width="100%"
                                    height="100%"
                                    display="flex"
                                    justifyContent="center"
                                  >
                                    <Grid item xs={7} md={12}>
                                      <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                        style={{
                                          width: '100%',
                                          fontSize: '14px',
                                          color: '#000',
                                          fontFamily: 'Arial Black',
                                          fontWeight: 'bold',
                                        }}
                                      >
                                        <Box
                                          bg="#ffaa"
                                          mt={1}
                                          ml={-2}
                                          display="flex"
                                          justifyContent="flex-start"
                                        >
                                          Adultos
                                        </Box>
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={5} md={12}>
                                      <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                        style={{
                                          width: '100%',
                                          fontSize: '14px',
                                          color: '#000',
                                          fontFamily: 'Arial Black',
                                          fontWeight: 'bold',
                                        }}
                                      >
                                        <Box
                                          bg="#ffaa"
                                          mt={1}
                                          mr={0}
                                          display="flex"
                                          justifyContent="flex-end"
                                        >
                                          R$ {vAdultos}
                                        </Box>
                                      </Typography>
                                    </Grid>
                                  </Box>
                                </Box>
                              </Box>
                              <Box mt={-8} display="flex" flexDirection="row">
                                <Grid item xs={6} md={12}>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      width: '100%',
                                      fontSize: '14px',
                                      color: '#000',
                                      fontFamily: 'Arial Black',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box
                                      bg="#ffaa"
                                      mt={0}
                                      ml={8}
                                      display="flex"
                                      justifyContent="flex-start"
                                    >
                                      Crianças
                                    </Box>
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} md={12}>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      width: '100%',
                                      fontSize: '14px',
                                      color: '#000',
                                      fontFamily: 'Arial Black',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box
                                      bg="#ffaa"
                                      mt={0}
                                      mr={-2}
                                      display="flex"
                                      justifyContent="flex-end"
                                    >
                                      R$ {vCriancas}
                                    </Box>
                                  </Typography>
                                </Grid>
                              </Box>
                              <Box mt={0} display="flex" flexDirection="row">
                                <Grid item xs={6} md={12}>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      width: '100%',
                                      fontSize: '14px',
                                      color: '#000',
                                      fontFamily: 'Arial Black',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box
                                      bg="#ffaa"
                                      mt={0}
                                      ml={8}
                                      display="flex"
                                      justifyContent="flex-start"
                                    >
                                      TOTAL
                                    </Box>
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} md={12}>
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      width: '100%',
                                      fontSize: '14px',
                                      color: '#000',
                                      fontFamily: 'Arial Black',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box
                                      bg="#ffaa"
                                      mt={0}
                                      mr={-2}
                                      display="flex"
                                      justifyContent="flex-end"
                                    >
                                      R$ {total}
                                    </Box>
                                  </Typography>
                                </Grid>
                              </Box>
                              <Box
                                ml={6}
                                mt={janela.height > 632 ? 8 : 5}
                                display="flex"
                                justifyContent="center"
                              >
                                <ColorButton
                                  style={{ borderRadius: 16 }}
                                  variant="contained"
                                  value="value"
                                  disabled={!(qtyA > 0 || qtyC > 0)}
                                  onClick={handleContinua}
                                >
                                  CONTINUAR
                                </ColorButton>
                              </Box>
                            </Box>
                            {carregar && (
                              <Box className={classes.novoBox} mt={-8}>
                                <Box ml={10}>
                                  <LinearProgress />
                                  <small style={{ color: '#fff' }}>
                                    Carregando...
                                  </small>
                                </Box>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Hidden>
            <Hidden mdUp>
              <Box
                width={janela.width}
                style={{
                  backgroundColor: '#fafafa',
                  height: janela.height,
                  minWidth: '300px',
                  minHeight: '500px',
                }}
              >
                <Box ml={0} display="flex" justifyContent="center">
                  <Box ml={0}>
                    <Box mt={2} ml={0}>
                      <img
                        src="/images/global/telaVenda1.png"
                        alt=""
                        className={classes.img}
                      />
                    </Box>

                    <Box
                      width="100%"
                      mt={
                        janela.height > 570
                          ? janela.height < 630
                            ? -janela.height / 10 - 11
                            : -janela.height / 10 - 11
                          : -62
                      }
                    >
                      <Grid item xs={2} md={3}>
                        <Box
                          height={10}
                          p={1}
                          ml={0}
                          mr={0}
                          mt={janela.height > 600 ? 0 : ajAlturaMin + 15}
                          display="flex"
                          alignItems="center"
                        >
                          <ArrowBackIcon
                            sx={{
                              fontSize: 20,
                              color: '#fff',
                            }}
                            onClick={voltar}
                          />
                        </Box>
                      </Grid>
                    </Box>
                    <Box
                      mt={
                        janela.height > 570
                          ? janela.height < 630
                            ? janela.height / 100 + 7
                            : janela.height / 100 + 7
                          : 14
                      }
                      display="flex"
                      justifyContent="center"
                    >
                      <Box
                        width={janela.width - 30}
                        //                  mt={ajustAltura > 52 ? -ajustAltura + 10 : -ajustAltura + 1}
                      >
                        <Box
                          mt={
                            janela.height > 570
                              ? janela.height / 100 + 1
                              : janela.height / 300
                          }
                          display="flex"
                          justifyContent="center"
                        >
                          <Grid item xs={6} md={12}>
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              style={{
                                width: '100%',
                                fontSize: '16px',
                                color: '#000',
                                fontFamily: 'Arial Black',
                                fontWeight: 'bold',
                              }}
                            >
                              <Box
                                bg="#ffaa"
                                mt={0}
                                ml={3}
                                display="flex"
                                justifyContent="flex-start"
                              >
                                ADULTOS
                              </Box>
                            </Typography>
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              style={{
                                width: '100%',
                                fontSize: '12px',
                                color: '#00A',
                                fontFamily: 'Arial',
                                fontWeight: 'bold',
                              }}
                            >
                              <Box
                                bg="#ffaa"
                                mt={-1}
                                ml={3}
                                display="flex"
                                justifyContent="flex-start"
                              >
                                R$ 50,00
                              </Box>
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={12}>
                            <Box
                              mr={3}
                              style={{
                                height: 40,
                                //   boxShadow: '0 0 0 0.1rem #780208',
                              }}
                            >
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                style={{
                                  fontSize: '22px',
                                  color: '#000',

                                  fontFamily: 'Arial Black',
                                  fontWeight: 'bold',
                                }}
                              >
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  mt={0}
                                >
                                  <Box mt={-1}>
                                    {qtyA ? (
                                      <IconButton
                                        style={{ color: 'red' }}
                                        aria-label="add to shopping cart"
                                        onClick={handleSub}
                                      >
                                        <RemoveTwoToneIcon
                                          style={{ color: 'red', fontSize: 35 }}
                                        />
                                      </IconButton>
                                    ) : (
                                      <IconButton
                                        disabled
                                        aria-label="add to shopping cart"
                                      >
                                        <RemoveTwoToneIcon
                                          style={{
                                            color: '#bdbdbd',
                                            fontSize: 35,
                                          }}
                                        />
                                      </IconButton>
                                    )}
                                  </Box>
                                  <Box
                                    width={40}
                                    mt={0}
                                    ml={0}
                                    mr={0}
                                    display="flex"
                                    justifyContent="center"
                                  >
                                    {qtyA}
                                  </Box>
                                  <Box mt={-1} ml={0}>
                                    <IconButton
                                      onClick={handleAdd}
                                      color="primary"
                                      aria-label="add to shopping cart"
                                    >
                                      <AddIcon sx={{ fontSize: 35 }} />
                                    </IconButton>
                                  </Box>
                                </Box>
                              </Typography>
                            </Box>
                          </Grid>
                        </Box>
                        <Box mt={2} display="flex" flexDirection="row">
                          <Grid item xs={6} md={12}>
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              style={{
                                width: '100%',
                                fontSize: '16px',
                                color: '#000',
                                fontFamily: 'Arial Black',
                                fontWeight: 'bold',
                              }}
                            >
                              <Box
                                bg="#ffaa"
                                mt={0}
                                ml={3}
                                display="flex"
                                justifyContent="flex-start"
                              >
                                CRIANÇAS
                              </Box>
                            </Typography>
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                              style={{
                                width: '100%',
                                fontSize: '12px',
                                color: '#00A',
                                fontFamily: 'Arial',
                                fontWeight: 'bold',
                              }}
                            >
                              <Box
                                bg="#ffaa"
                                mt={-1}
                                ml={3}
                                display="flex"
                                justifyContent="flex-start"
                              >
                                R$ 25,00
                              </Box>
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={12}>
                            <Box
                              mr={3}
                              style={{
                                height: 40,
                                //   boxShadow: '0 0 0 0.1rem #780208',
                              }}
                            >
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                style={{
                                  fontSize: '22px',
                                  color: '#000',

                                  fontFamily: 'Arial Black',
                                  fontWeight: 'bold',
                                }}
                              >
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  mt={0}
                                >
                                  <Box mt={-1}>
                                    {qtyC ? (
                                      <IconButton
                                        style={{ color: 'red' }}
                                        aria-label="add to shopping cart"
                                        onClick={handleSubC}
                                      >
                                        <RemoveTwoToneIcon
                                          style={{ color: 'red', fontSize: 35 }}
                                        />
                                      </IconButton>
                                    ) : (
                                      <IconButton
                                        disabled
                                        aria-label="add to shopping cart"
                                      >
                                        <RemoveTwoToneIcon
                                          style={{
                                            color: '#bdbdbd',
                                            fontSize: 35,
                                          }}
                                        />
                                      </IconButton>
                                    )}
                                  </Box>
                                  <Box
                                    width={40}
                                    mt={0}
                                    ml={0}
                                    mr={0}
                                    display="flex"
                                    justifyContent="center"
                                  >
                                    {qtyC}
                                  </Box>
                                  <Box mt={-1} ml={0}>
                                    <IconButton
                                      onClick={handleAddC}
                                      color="primary"
                                      aria-label="add to shopping cart"
                                    >
                                      <AddIcon sx={{ fontSize: 35 }} />
                                    </IconButton>
                                  </Box>
                                </Box>
                              </Typography>
                            </Box>
                          </Grid>
                        </Box>

                        <Box
                          mt={
                            janela.height > 570
                              ? janela.height < 630
                                ? 10
                                : 11
                              : 7
                          }
                        >
                          <Box display="flex" justifyContent="center">
                            <Box
                              width="96%"
                              height={100}
                              mt={janela.height > 632 ? 4 : 2}
                              display="flex"
                              justifyContent="center"
                            >
                              <Grid item xs={7} md={12}>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                  style={{
                                    width: '100%',
                                    fontSize: '14px',
                                    color: '#000',
                                    fontFamily: 'Arial Black',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  <Box
                                    bg="#ffaa"
                                    mt={1}
                                    ml={3}
                                    display="flex"
                                    justifyContent="flex-start"
                                  >
                                    Adultos
                                  </Box>
                                </Typography>
                              </Grid>
                              <Grid item xs={5} md={12}>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                  style={{
                                    width: '100%',
                                    fontSize: '14px',
                                    color: '#000',
                                    fontFamily: 'Arial Black',
                                    fontWeight: 'bold',
                                  }}
                                >
                                  <Box
                                    bg="#ffaa"
                                    mt={1}
                                    mr={5}
                                    display="flex"
                                    justifyContent="flex-end"
                                  >
                                    R$ {vAdultos}
                                  </Box>
                                </Typography>
                              </Grid>
                            </Box>
                          </Box>
                          <Box mt={-8} display="flex" flexDirection="row">
                            <Grid item xs={6} md={12}>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                style={{
                                  width: '100%',
                                  fontSize: '14px',
                                  color: '#000',
                                  fontFamily: 'Arial Black',
                                  fontWeight: 'bold',
                                }}
                              >
                                <Box
                                  bg="#ffaa"
                                  mt={0}
                                  ml={4.2}
                                  display="flex"
                                  justifyContent="flex-start"
                                >
                                  Crianças
                                </Box>
                              </Typography>
                            </Grid>
                            <Grid item xs={6} md={12}>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                style={{
                                  width: '100%',
                                  fontSize: '14px',
                                  color: '#000',
                                  fontFamily: 'Arial Black',
                                  fontWeight: 'bold',
                                }}
                              >
                                <Box
                                  bg="#ffaa"
                                  mt={0}
                                  mr={6.2}
                                  display="flex"
                                  justifyContent="flex-end"
                                >
                                  R$ {vCriancas}
                                </Box>
                              </Typography>
                            </Grid>
                          </Box>
                          <Box mt={0} display="flex" flexDirection="row">
                            <Grid item xs={6} md={12}>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                style={{
                                  width: '100%',
                                  fontSize: '14px',
                                  color: '#000',
                                  fontFamily: 'Arial Black',
                                  fontWeight: 'bold',
                                }}
                              >
                                <Box
                                  bg="#ffaa"
                                  mt={0}
                                  ml={4.2}
                                  display="flex"
                                  justifyContent="flex-start"
                                >
                                  TOTAL
                                </Box>
                              </Typography>
                            </Grid>
                            <Grid item xs={6} md={12}>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                                style={{
                                  width: '100%',
                                  fontSize: '14px',
                                  color: '#000',
                                  fontFamily: 'Arial Black',
                                  fontWeight: 'bold',
                                }}
                              >
                                <Box
                                  bg="#ffaa"
                                  mt={0}
                                  mr={6.2}
                                  display="flex"
                                  justifyContent="flex-end"
                                >
                                  R$ {total}
                                </Box>
                              </Typography>
                            </Grid>
                          </Box>
                          <Box
                            mt={janela.height > 632 ? 5 : 2}
                            display="flex"
                            justifyContent="center"
                          >
                            <ColorButton
                              style={{ borderRadius: 16 }}
                              variant="contained"
                              value="value"
                              disabled={!(qtyA > 0 || qtyC > 0)}
                              onClick={handleContinua}
                            >
                              CONTINUAR
                            </ColorButton>
                          </Box>
                        </Box>
                        {carregar && (
                          <Box className={classes.novoBox} mt={1}>
                            <LinearProgress />
                            <small style={{ color: '#fff' }}>
                              Carregando...
                            </small>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Hidden>

            <Drawer variant="persistent" anchor="bottom" open={openDrawer}>
              <Box height={260} sx={{ background: '#ffebee' }}>
                <Alert onClose={handleDrawerClose} severity="error">
                  <AlertTitle>ERRO DE PREENCHIMENTO </AlertTitle>
                  <strong>{valorErro}</strong>
                </Alert>
              </Box>
            </Drawer>
          </Box>
        </ClickAwayListener>
      </Box>
      {openDados && <TelaCompra setOpenDados={setOpenDados} />}
    </>
  );
};
export default TelaInicial;
