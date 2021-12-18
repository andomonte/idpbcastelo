import React, { useRef } from 'react';
import { Box, Button, Typography, Grid } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CardMedia from '@mui/material/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import cpfMask from 'src/components/mascaras/cpf';
import dataMask from 'src/components/mascaras/datas';
import api from 'src/components/services/api';
import InputLabel from '@material-ui/core/InputLabel';
import Modal from '@material-ui/core/Modal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import celularMask from 'src/components/mascaras/celular';
// import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
// import PagCC from './pagCC';
// import CheckoutPro from './checkouPro';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import ValidaCPF from 'src/utils/validarCPF';
import Drawer from '@material-ui/core/Drawer';
import { Alert, AlertTitle } from '@material-ui/lab';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import validator from 'validator';

import CheckoutT from './checkouT';

const validateDate = require('validate-date');

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
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#b91a30',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: '#b91a30',
    fontSize: '16px',
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
  paper: {
    backgroundColor: '#b91a30', // theme.palette.background.paper,
    border: '0px solid #000',
    boxShadow: theme.shadows[5],
    //  padding: theme.spacing(1, 1, 1),
    height: '100%',
    width: '100%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    with: '100%',
  },
}));

const Pix = ({
  emailInsc,
  cpfInsc,
  nomeInsc,
  nascimentoInsc,
  fPagamentoInsc,
}) => {
  const classes = useStyles();
  // const router = useRouter();
  const [cpf, setCPF] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [tipoDoc, setTipoDoc] = React.useState('');
  const [valorErro, setValorErro] = React.useState('');
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [validacaoNome, setValidacaoNome] = React.useState('testar');
  const [validacaoCPF, setValidacaoCPF] = React.useState('testar');
  const [validacaoEmail, setValidacaoEmail] = React.useState('testar');
  const [open, setOpen] = React.useState(true);
  const [fPagamento, setFPagamento] = React.useState('');

  const nomeRef = useRef();
  const cpfRef = useRef();

  const emailRef = useRef();
  const fpRef = useRef();

  const handleChangeFP = (event) => {
    // console.log(event.target.value);
    setFPagamento(event.target.value);
  };

  const comprar = () => {
    api
      .post('/api/notification', {
        action: 'payment',
        data: { id: '1244662421' },
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

  //  setOpenDrawer(false);

  const handleDrawerClose = () => {
    if (validacaoCPF !== 'testar') {
      setValidacaoCPF('testar');
      cpfRef.current.focus();
    }
    if (!validacaoEmail) {
      setValidacaoEmail('testar');
      emailRef.current.focus();
    }

    setOpenDrawer(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const voltar = () => {
    setOpen(false);
    // window.location.reload();
  };
  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const formId = event.target.id;

      if (formId === 'CPF') emailRef.current.focus();
      if (formId === 'Email') fpRef.current.focus();
      // console.log('aqui no final', form);
    }
  };
  //= ======================================================================
  // validação dos dados
  //= ======================================================================
  // Nome

  // CPF
  const handleValidarCPF = (e) => {
    const campoCPF = e.target.value;
    const valorCPF = e.target.value.replace(/\D/g, '');

    if (validacaoCPF !== 'next' && validacaoCPF !== 'testar')
      cpfRef.current.focus();

    if (campoCPF !== '') {
      const vCPF = ValidaCPF(valorCPF);
      if (vCPF) {
        setValidacaoCPF('next');
      } else setValidacaoCPF('número de CPF inválido');
      // setValidacaoCPF(vCPF);
    } else setValidacaoCPF('preencha o campo CPF');
  };

  // Email
  const handlevalidarEmail = (e) => {
    const emailVal = e.target.value;
    console.log(validacaoCPF, validacaoEmail);
    if (!validacaoEmail) emailRef.current.focus();
    if (validator.isEmail(emailVal)) {
      setValidacaoEmail(true);
    } else {
      setValidacaoEmail(false);
    }
  };

  //= ====================================================================
  const body = (
    <Box className={classes.paper}>
      <Box>
        <Box display="flex" width="100%" mt={0} ml={1}>
          <Grid item xs={2} md={3}>
            <Box
              height={10}
              p={1}
              ml={0}
              mr={0}
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
          <Grid item xs={1} md={3} />

          <Grid item xs={9} md={3} />
        </Box>
      </Box>

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
            <Box mt={4} className={classes.input1}>
              <form id="form-checkout">
                <Box mt={2} display="flex" flexDirection="row">
                  <Grid item xs={12} md={3}>
                    <Box mt={-1} ml={3} sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Digite o CPF ou CNPJ do Pagante
                      </Typography>
                    </Box>

                    <Box className={classes.novoBox} mt={-1.5}>
                      <TextField
                        className={classes.tf_s}
                        id="CPF"
                        inputRef={cpfRef}
                        //                      ref={cpfRef}
                        // // // label="CPF"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={cpf}
                        variant="outlined"
                        placeholder="Somente números"
                        size="small"
                        onBlur={handleValidarCPF}
                        onChange={(e) => {
                          const eventName = e.target.name;
                          const eventValue = e.target.value;
                          setCPF(eventValue);
                          if (eventName === 'identificationNumber') {
                            //      setNumberDoc(e.target.value);
                            if (eventValue.length > 11) setTipoDoc('CNPJ');
                            else setTipoDoc('CPF');
                          }
                          handleDrawerClose();
                        }}
                        onFocus={(e) => setCPF(e.target.value)}
                        onKeyDown={handleEnter}
                      />
                    </Box>
                  </Grid>
                </Box>
                <Box mt={2} display="flex" flexDirection="row">
                  <Grid item xs={12} md={6}>
                    <Box mt={-1} ml={3} sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Email do Pagante
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
                          console.log('sai do email');
                          if (validacaoCPF === 'next') handlevalidarEmail(e);
                        }}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          handleDrawerClose();
                        }}
                        onFocus={(e) => setEmail(e.target.value)}
                        onKeyDown={handleEnter}
                        inputRef={emailRef}
                      />
                    </Box>
                  </Grid>
                </Box>
                <Box
                  mt={3}
                  sx={{
                    background: '#f0f4c3',
                    height: 70,
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Box mt={1}>
                    <Box mt={0.8}>
                      <Box>
                        <input type="button" ref={fpRef} />
                      </Box>

                      <Button
                        className={classes.button2}
                        variant="contained"
                        id="pagPix"
                        onClick={comprar}
                        style={{ width: '100%' }}
                        // inputRef={fpRef}
                        disabled={
                          !(validacaoEmail === true && validacaoCPF === 'next')
                        }
                      >
                        Gerar chave Pix
                      </Button>
                    </Box>
                  </Box>
                </Box>

                {/* <Button
                className={classes.button1}
                variant="contained"
                onClick={pagar}
              >
                FAZER O PAGAMENTO
              </Button> */}
              </form>
            </Box>
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
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};
export default Pix;
