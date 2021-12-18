import React, { useRef } from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CardMedia from '@mui/material/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import cpfMask from 'src/components/mascaras/cpf';
import dataMask from 'src/components/mascaras/datas';
import api from 'src/components/services/api';
// import InputLabel from '@material-ui/core/InputLabel';
// import celularMask from 'src/components/mascaras/celular';
// import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
// import PagCC from './pagCC';
// import CheckoutPro from './checkouPro';
import FormControl from '@material-ui/core/FormControl';

import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import ValidaCPF from 'src/utils/validarCPF';
import Drawer from '@material-ui/core/Drawer';
import { Alert, AlertTitle } from '@material-ui/lab';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import validator from 'validator';

import CheckoutT from './checkouT';
import Pix from './pix';

// const validateDate = require('validate-date');

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
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: '100%',
  },
  img1: {
    width: '20px',
    height: '20px',
    marginLeft: 40,
    marginRight: 8,
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

const Home = ({ inscritos }) => {
  const classes = useStyles();
  // const router = useRouter();
  const [nome, setNome] = React.useState('');
  const [validarNome, setValidarNome] = React.useState('sim');
  const [cpf, setCPF] = React.useState('');
  const [validarCPF, setValidarCPF] = React.useState('sim');
  const [email, setEmail] = React.useState('');
  const [validarEmail, setValidarEmail] = React.useState('sim');
  const [dataNascimento, setDataNascimento] = React.useState('');
  const [validarDataNascimento, setValidarDataNascimento] = React.useState(
    'sim',
  );
  const [open, setOpen] = React.useState(false);
  const [valorErro, setValorErro] = React.useState('');
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [validacaoNome, setValidacaoNome] = React.useState('testar');
  const [validacaoCPF, setValidacaoCPF] = React.useState('testar');
  const [validacaoEmail, setValidacaoEmail] = React.useState('testar');
  const [validacaoData, setValidacaoData] = React.useState('testar');

  const [fPagamento, setFPagamento] = React.useState('');

  const nomeRef = useRef();
  const cpfRef = useRef();
  const dataRef = useRef();
  const emailRef = useRef();
  const fpRef = useRef();

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

  const comprar = () => {
    api
      .post('/api/notification', {
        action: 'payment',
        data: { id: '1244662421' },
      })

      .then((response) => {
        const prefID = response;
        console.log('pref:', prefID);
        //   setOpen(true);
      })

      .catch((error) => {
        console.log(error);
        //  updateFile(uploadedFile.id, { error: true });
      });
  };
  React.useEffect(() => {
    if (!validacaoNome) {
      setOpenDrawer(true);
      setValorErro('Digite Nome e Sobrenome');
      nomeRef.current.focus();
    }
  }, [validacaoNome]);

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

    if (validacaoCPF !== 'testar') {
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
  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const form = event.target.id;
      if (form === 'Nome') cpfRef.current.focus();
      if (form === 'CPF') dataRef.current.focus();
      if (form === 'DataNascimento') emailRef.current.focus();
      if (form === 'Email') {
        const emailVal = event.target.value;
        if (validator.isEmail(emailVal)) {
          setValidacaoEmail(true);
          fpRef.current.focus();
          console.log('form', form, validacaoCPF, validacaoData);
        } else {
          setValidacaoEmail(false);
        }
      }
      // console.log('aqui no final', form);
    }
  };
  //= ======================================================================
  // validação dos dados
  //= ======================================================================
  // Nome
  const handleValidarNome = (e) => {
    const valorNome = e.target.value;
    comprar();
    if (!validacaoNome) nomeRef.current.focus();

    if (e.target.value !== '') {
      const regName = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
      const vaiNome = regName.test(valorNome);

      if (!vaiNome) {
        setValidacaoNome(false);
      } else {
        setValidacaoNome(true);
      }
    } else setValidacaoNome(false);
  };

  // CPF
  const handleValidarCPF = (e) => {
    const campoCPF = e.target.value;
    const valorCPF = e.target.value.replace(/\D/g, '');
    console.log('validacaoCPF=', validacaoCPF);
    console.log('inscritos=', inscritos);
    if (validacaoCPF !== 'next' && validacaoCPF !== 'testar')
      cpfRef.current.focus();

    if (campoCPF !== '') {
      const vCPF = ValidaCPF(valorCPF);
      if (vCPF) {
        const dadosCPF = inscritos.filter((val) => val.CPF === campoCPF);
        console.log('dadosCPF=', dadosCPF.length);
        if (dadosCPF.length === 0) {
          setValidacaoCPF('next');
        } else
          setValidacaoCPF(
            `CPF já inscrito, com pagamento ${dadosCPF[0].status}`,
          );
      } else setValidacaoCPF('número de CPF inválido');
      // setValidacaoCPF(vCPF);
    } else setValidacaoCPF('preencha o campo CPF');
  };

  // Email
  const handlevalidarEmail = (e) => {
    const emailVal = e.target.value;

    if (!validacaoEmail) emailRef.current.focus();
    if (validator.isEmail(emailVal)) {
      setValidacaoEmail(true);
    } else {
      setValidacaoEmail(false);
    }
  };

  // data

  const handlevalidarData = (e) => {
    const dataV = e.target.value;

    if (!validacaoData) dataRef.current.focus();
    const dia = dataV.slice(0, 2);
    const mes = dataV.slice(3, 5);
    const ano = dataV.slice(6, 10);
    const dataVal = `${ano}/${mes}/${dia}`;
    const validarData = validator.isDate(dataVal);

    if (validarData) {
      setValidacaoData(true);
    } else {
      setValidacaoData(false);
    }
  };
  //= ====================================================================
  return (
    <Box style={{ backgroundColor: '#b91a30', height: '90vh' }}>
      <ClickAwayListener onClickAway={handleDrawerClose}>
        <Box>
          <Hidden smDown>
            <CardMedia
              component="img"
              height="125"
              image="/images/global/pgIni01.png"
              alt="green iguana"
              style={{ borderRadius: 16 }}
            />
          </Hidden>
          <Hidden mdUp>
            <Box mt={-1} className={classes.input1}>
              <Box mt={-1} display="flex" flexDirection="row">
                <Grid item xs={12} md={12}>
                  <Box mt={1} ml={3} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Nome
                    </Typography>
                  </Box>

                  <Box className={classes.novoBox} mt={-1.5}>
                    <TextField
                      className={classes.tf_s}
                      id="Nome"
                      // label="Matricula"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={nome}
                      variant="outlined"
                      placeholder="Digite o Nome do Inscrito"
                      size="small"
                      onBlur={handleValidarNome}
                      onChange={(e) => {
                        setNome(e.target.value);
                        handleDrawerClose();
                      }}
                      error={validarNome === 'nao'}
                      onFocus={(e) => setNome(e.target.value)}
                      autoFocus
                      onKeyDown={handleEnter}
                      inputRef={nomeRef}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box mt={2} display="flex" flexDirection="row">
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={3} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      CPF
                    </Typography>
                  </Box>

                  <Box className={classes.novoBox} mt={-1.5}>
                    <TextField
                      className={classes.tf_s}
                      id="CPF"
                      inputRef={cpfRef}
                      //                      ref={cpfRef}
                      // // // label="CPF"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={cpfMask(cpf)}
                      variant="outlined"
                      placeholder="digite o CPF do inscrito"
                      size="small"
                      onBlur={(e) => {
                        if (validacaoNome) handleValidarCPF(e);
                      }}
                      onChange={(e) => {
                        setCPF(e.target.value);
                        handleDrawerClose();
                      }}
                      error={validarCPF === 'nao'}
                      onFocus={(e) => setCPF(e.target.value)}
                      onKeyDown={handleEnter}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box mt={2} display="flex" flexDirection="row">
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={3} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Data de Nascimento
                    </Typography>
                  </Box>

                  <Box className={classes.novoBox} mt={-1.5}>
                    <TextField
                      className={classes.tf_s}
                      id="DataNascimento"
                      // label="Data de Nascimento"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={dataMask(dataNascimento)}
                      variant="outlined"
                      placeholder="dd/mm/aaaa"
                      size="small"
                      onBlur={(e) => {
                        if (validacaoCPF === 'next') handlevalidarData(e);
                      }}
                      onChange={(e) => {
                        setDataNascimento(e.target.value);
                        handleDrawerClose();
                      }}
                      error={validarDataNascimento === 'nao'}
                      onFocus={(e) => setDataNascimento(e.target.value)}
                      onKeyDown={handleEnter}
                      inputRef={dataRef}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box mt={2} display="flex" flexDirection="row">
                <Grid item xs={12} md={6}>
                  <Box mt={-1} ml={3} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Email
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-1.5}>
                    <TextField
                      className={classes.tf_s}
                      id="Email"
                      type="text"
                      InputLabelProps={{
                        style: {
                          textTransform: 'uppercase',
                        },
                        shrink: true,
                      }}
                      value={email}
                      variant="outlined"
                      placeholder="email para envio de comprovante"
                      size="small"
                      onBlur={(e) => {
                        if (validacaoData) handlevalidarEmail(e);
                      }}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        handleDrawerClose();
                      }}
                      error={validarEmail === 'nao'}
                      onFocus={(e) => setEmail(e.target.value)}
                      onKeyDown={handleEnter}
                      inputRef={emailRef}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box
                mt={1}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box mt={1}>
                  <FormControl>
                    <Box mt={-1} ml={3} sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Forma de Pagamento
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      width="100vw"
                      //                      height={300}
                      style={{}}
                    >
                      <NativeSelect
                        //                        className={classes.tf_}
                        style={{
                          width: '100%',
                          marginLeft: 20,
                          marginRight: 20,
                        }}
                        inputRef={fpRef}
                        id="fPagamento"
                        value={fPagamento}
                        onChange={handleChangeFP}
                        input={<BootstrapInput />}
                        disabled={
                          !(
                            validacaoData === true &&
                            validacaoEmail === true &&
                            validacaoCPF === 'next' &&
                            validacaoNome === true
                          )
                        }
                      >
                        <option value={0}>Escolha a Forma de pagamento</option>

                        <option value="Cartão de Crédito">
                          Cartão de Crédito
                        </option>
                        <option value="Pix">Pix</option>
                        <option value="Boleto">Boleto</option>
                      </NativeSelect>
                    </Box>
                  </FormControl>
                </Box>
                {/* <Button
                className={classes.button1}
                variant="contained"
                onClick={pagar}
              >
                FAZER O PAGAMENTO
              </Button> */}
              </Box>
            </Box>
            {fPagamento === 'Cartão de Crédito' && (
              <CheckoutT
                nome={nome}
                cpf={cpf}
                nascimento={dataNascimento}
                email={email}
                fPagamento={fPagamento}
              />
            )}
            {fPagamento === 'Pix' && (
              <Pix
                nome={nome}
                cpf={cpf}
                nascimento={dataNascimento}
                email={email}
              />
            )}

            {/* {open && <PagCC email={email} cpf={cpf} />} */}
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
  );
};
export default Home;
