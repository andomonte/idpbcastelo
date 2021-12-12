// <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button } from '@material-ui/core';
import { useMercadopago } from 'react-sdk-mercadopago';
import React from 'react';
import api from 'src/components/services/api';
import Typography from '@mui/material/Typography';
// import MercadoPago from 'mercadopago';
// const MercadoPago = require('mercadopago');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignContent: 'center',
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
    height: '95%',
    width: '95%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    with: '100%',
  },
  label: {
    color: 'black',
    fontSize: '30px',
    '@media (min-width:600px)': {
      fontSize: '20px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
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
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
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
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  tf_12: {
    // marginLeft: theme.spacing(1),
    //  marginRight: theme.spacing(1),
    width: '500px',
    backgroundColor: '#f0f4c3',

    margin: 10,
    [theme.breakpoints.down('md')]: {
      width: '20',
    },
  },
  tf_m: {
    backgroundColor: '#f0f4c3',

    width: '100%',
    fontSize: '5px',
  },
  tf_s: {
    backgroundColor: '#f0f4c3',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '14px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
  },
  tf_input: {
    backgroundColor: '#f0f4c3',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
  },
  tf_6: {
    //    marginRight: 8,
    backgroundColor: '#f0f4c3',

    margin: 10,
    width: '240px',
    textAlign: 'center',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      margin: 10,
      width: '205px',
    },
  },
  tf_4: {
    margin: 10,
    // marginRight: 8,
    backgroundColor: '#f0f4c3',
    width: '155px',
    textAlign: 'center', // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      width: '130px',
    },
  },
  tf_3: {
    margin: 10,
    textAlign: 'center',
    backgroundColor: '#f0f4c3',
    // marginRight: 8,
    width: '120px',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      width: '110px',
    },
  },
  tf_input2: {
    margin: 10,
    textAlign: 'center',
    backgroundColor: '#f0f4c3',
    // marginRight: 8,

    width: '100%',
    height: '35px',
    fontSize: '14px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    //    borderColor: '#9ccc65',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: -5,
      fontSize: '12px',
      width: '55px',
    },
  },

  tf_input3: {
    margin: 10,
    textAlign: 'center',
    backgroundColor: '#f0f4c3',
    // marginRight: 8,

    width: '100',
    height: '35px',
    fontSize: '14px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    //    borderColor: '#9ccc65',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: -5,
      fontSize: '12px',
      width: '108px',
    },
  },
  tf_2: {
    margin: 10,
    textAlign: 'center',
    backgroundColor: '#f0f4c3',
    // marginRight: 8,
    width: '60px',

    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: -5,
      fontSize: '8px',
      width: '55px',
    },
  },

  button2: {
    display: 'flex',
    background: '#b91a30',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },
}));

function PagCC({ email, cpf }) {
  const classes = useStyles();
  //  const response = fetch(process.env.REACT_APP_LINK_API);
  let publicKey = 'TEST-e965cf2f-8b17-4a13-871e-947e26f87ebd';
  console.log(publicKey);
  //  const script = document.createElement('script');
  const [open, setOpen] = React.useState(true);
  const [enviarDados, setEnviarDados] = React.useState(true);
  const paymentForm = document.getElementById('paymentForm');

  if (process.env.NODE_ENV !== 'production')
    publicKey = process.env.MP_LOCAL_PUBLIC_KEY;
  else publicKey = process.env.MP_PUBLIC_KEY; // MP_ACESS_TOKEN
  publicKey = 'TEST-e965cf2f-8b17-4a13-871e-947e26f87ebd';
  console.log(publicKey);
  const handleClose = () => {
    setOpen(false);
  };

  //= =================================================================
  // SDK V2

  const Mercadopago = useMercadopago.v1(publicKey);
  // Mercadopago.getIdentificationTypes();

  if (Mercadopago) window.Mercadopago.getIdentificationTypes();

  //= ======================================================================
  const enviarForm = (event) => {
    console.log('chegou aqui sim');
    event.preventDefault();
    const transactionAmount = event.target.transactionAmount.value;
    const installments = event.target.installments.value;
    // const transactionAmount = event.target.transactionAmount.value;
    // const transactionAmount = event.target.transactionAmount.value;
    // console.log('event', event.target);
    const token = event.target.token.value ? event.target.token.value : 'ola';
    alert(`${transactionAmount}, ${installments}, ${token}`);
  };
  const handleEnviarDados = (event) => {
    console.log('A key was pressed', event.keyCode);
  };
  React.useEffect(() => {
    if (paymentForm) {
      document
        .getElementById('paymentForm')
        .addEventListener('submit', enviarForm);
      //    window.addEventListener('keydown', handleKeyDown);
      console.log('chegou aqui dentro e por');
    }
    // cleanup this component
    return () => {
      window.removeEventListener('change', handleEnviarDados);
    };
  }, [enviarDados]);

  let doSubmit = false;
  function setCardTokenAndPay(status, response) {
    if (status === 200 || status === 201) {
      const form = document.getElementById('paymentForm');
      const card = document.createElement('input');
      card.setAttribute('name', 'token');
      card.setAttribute('type', 'hidden');
      card.setAttribute('value', response.id);
      form.appendChild(card);
      doSubmit = true;
      setEnviarDados(!enviarDados);
      // form.submit();
    } else {
      alert(
        `Verifique os dados preenchidos!\n${JSON.stringify(response, null, 4)}`,
      );
    }
  }

  function getCardToken(event) {
    event.preventDefault();
    if (!doSubmit) {
      const $form = document.getElementById('paymentForm');
      window.Mercadopago.createToken($form, setCardTokenAndPay);
      return false;
    }
    return true;
  }

  const handlepaymentForm = (event) => {
    console.log('A key was pressed', event.keyCode);
  };

  React.useEffect(() => {
    if (paymentForm)
      document
        .getElementById('paymentForm')
        .addEventListener('submit', getCardToken);
    //    window.addEventListener('keydown', handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener('change', handlepaymentForm);
    };
  }, [paymentForm]);

  function setInstallments(status, response) {
    if (status === 200) {
      document.getElementById('installments').options.length = 0;
      response[0].payer_costs.forEach((payerCost) => {
        const opt = document.createElement('option');
        opt.text = payerCost.recommended_message;
        opt.value = payerCost.installments;
        document.getElementById('installments').appendChild(opt);
      });
    } else {
      alert(`installments method info error: ${response}`);
    }
  }
  function getInstallments(paymentMethodId, transactionAmount, issuerId) {
    window.Mercadopago.getInstallments(
      {
        payment_method_id: paymentMethodId,
        amount: parseFloat(transactionAmount),
        issuer_id: Number(issuerId),
      },
      setInstallments,
    );
  }
  function setIssuers(status, response) {
    if (status === 200) {
      const issuerSelect = document.getElementById('issuer');
      response.forEach((issuer) => {
        const opt = document.createElement('option');
        opt.text = issuer.name;
        opt.value = issuer.id;
        issuerSelect.appendChild(opt);
      });

      getInstallments(
        document.getElementById('paymentMethodId').value,
        document.getElementById('transactionAmount').value,
        issuerSelect.value,
      );
    } else {
      alert(`issuers method info error: ${response}`);
    }
  }

  function getIssuers(paymentMethodId) {
    window.Mercadopago.getIssuers(paymentMethodId, setIssuers);
  }

  function setPaymentMethod(status, response) {
    console.log(status, response[0]);
    if (status === 200) {
      const paymentMethod = response[0];
      document.getElementById('paymentMethodId').value = paymentMethod.id;

      getIssuers(paymentMethod.id);
    } else {
      alert(`payment method info error: ${response}`);
    }
  }
  function guessPaymentMethod(event) {
    const cardnumber = document.getElementById('cardNumber').value;

    if (cardnumber.length >= 6) {
      const bin = cardnumber.substring(0, 6);
      window.Mercadopago.getPaymentMethod(
        {
          bin,
        },
        setPaymentMethod,
      );
    }
  }

  const cardNumber = document.getElementById('cardNumber');

  const handleKeyDown = (event) => {
    console.log('A key was pressed', event.keyCode);
  };

  React.useEffect(() => {
    if (cardNumber)
      document
        .getElementById('cardNumber')
        .addEventListener('change', guessPaymentMethod);
    //    window.addEventListener('keydown', handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener('change', handleKeyDown);
    };
  }, [cardNumber]);

  //= ======================================================================
  const comprar = async (event) => {
    event.preventDefault();
    const transactionAmount = event.target.transactionAmount.value;
    const installments = event.target.installments.value;
    // const transactionAmount = event.target.transactionAmount.value;
    // const transactionAmount = event.target.transactionAmount.value;
    // console.log('event', event.target);
    //  const token = event.target.token.value ? event.target.token.value : 'ola';
    alert(`${transactionAmount}, ${installments}`);

    /*     api
      .post('/api/mercadoPago', { transactionAmount, token })

      .then((response) => {
        console.log(response);
      })

      .catch(() => {
        //  updateFile(uploadedFile.id, { error: true });
      });
 */
  };
  const body = (
    <Box className={classes.paper}>
      <form method="post" id="paymentForm">
        <Box>
          <Box />
          <Box>
            <Box width="100%" mt={1} ml={2} sx={{ fontSize: 'bold' }} />
            <Box className={classes.novoBox} mt={-2} display="none">
              <select
                className={classes.tf_4}
                id="docType"
                name="docType"
                data-checkout="docType"
                type="text"
              />
            </Box>
          </Box>
          <Box display="none">
            <Box width="100%" mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
              <Typography variant="caption" display="block" gutterBottom>
                Email
              </Typography>
            </Box>
            <Box className={classes.novoBox} mt={-2}>
              <input
                id="email"
                name="email"
                type="text"
                className={classes.tf_m}
                variant="outlined"
                placeholder=""
                size="small"
                readOnly
                value={email}
              />
            </Box>
          </Box>
          <Box display="none">
            <Box width="100%" mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
              <Typography variant="caption" display="block" gutterBottom>
                Numero do cartão
              </Typography>
            </Box>

            <Box width="100%" mt={-1} sx={{ fontSize: 'bold' }}>
              <Box className={classes.novoBox} mt={-2}>
                <input
                  id="docNumber"
                  name="docNumber"
                  data-checkout="docNumber"
                  type="text"
                  readOnly
                  value={cpf}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box width="100%" mt={-1} sx={{ fontSize: 'bold' }} textAlign="center">
          <h3>Detalhes do cartão</h3>
        </Box>
        <Box>
          <Box width="100%" mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
            <Typography variant="caption" display="block" gutterBottom>
              Numero do cartão
            </Typography>
          </Box>
          <Box className={classes.novoBox} mt={-2}>
            <input
              type="text"
              id="cardNumber"
              data-checkout="cardNumber"
              className={classes.tf_input}
              placeholder=""
              onSelect={(e) => {
                e.preventDefault();
                return false;
              }}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onCut={(e) => {
                e.preventDefault();
                return false;
              }}
              onCopy={(e) => {
                e.preventDefault();
                return false;
              }}
              onDrag={(e) => {
                e.preventDefault();
                return false;
              }}
              onDrop={(e) => {
                e.preventDefault();
                return false;
              }}
              //                onDrop="return false"
              autoComplete="off"
            />
          </Box>
        </Box>
        <Box>
          <Box width="100%" mt={0} ml={2} sx={{ fontSize: 'bold' }}>
            <Typography variant="caption" display="block" gutterBottom>
              Titular do cartão
            </Typography>
          </Box>
          <Box className={classes.novoBox} mt={-2}>
            <input
              id="cardholderName"
              data-checkout="cardholderName"
              type="text"
              className={classes.tf_input}
              variant="outlined"
              placeholder=""
              size="small"
            />
          </Box>
        </Box>
        <Box display="flex" mt={2}>
          <Grid item xs={7} md={3}>
            <Box width="100%" mt={-1} ml={1.5} sx={{ fontSize: 'bold' }}>
              <Typography
                style={{ marginBottom: '-22px' }}
                variant="caption"
                display="block"
                gutterBottom
              >
                Data de Vencimento
              </Typography>
            </Box>
            <Box className={classes.novoBox} mt={-2} mr={1.5}>
              <input
                className={classes.tf_input2}
                type="text"
                placeholder="MM"
                id="cardExpirationMonth"
                data-checkout="cardExpirationMonth"
                onSelect={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onCut={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onCopy={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onDrag={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  return false;
                }}
                autoComplete="off"
              />

              <input
                className={classes.tf_input2}
                type="text"
                placeholder="YY"
                id="cardExpirationYear"
                data-checkout="cardExpirationYear"
                //                inputProps={{ maxLength: 2 }}
                onSelect={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onCut={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onCopy={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onDrag={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  return false;
                }}
                autoComplete="off"
              />
            </Box>
          </Grid>
          <Grid item xs={5} md={3}>
            <Box width="100%" mt={-1} ml={0.2} sx={{ fontSize: 'bold' }}>
              <Typography variant="caption" display="block" gutterBottom>
                Cód. de segurança
              </Typography>
            </Box>
            <Box mt={-1} width="100%">
              <input
                style={{ margin: '0px' }}
                variant="outlined"
                placeholder=""
                size="small"
                id="securityCode"
                data-checkout="securityCode"
                type="text"
                className={classes.tf_input3}
                onSelect={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onCut={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onCopy={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onDrag={(e) => {
                  e.preventDefault();
                  return false;
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  return false;
                }}
                //                onDrop="return false"
                autoComplete="off"
              />
            </Box>
          </Grid>
        </Box>
        <Box>
          <Box width="100%" mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
            <Typography variant="caption" display="block" gutterBottom>
              Banco emissor
            </Typography>
          </Box>
          <Box className={classes.novoBox} mt={-2}>
            <select
              className={classes.tf_s}
              id="issuer"
              name="issuer"
              data-checkout="issuer"
            />
          </Box>
        </Box>
        <Box>
          <Box width="100%" mt={0} ml={2} sx={{ fontSize: 'bold' }}>
            <Typography variant="caption" display="block" gutterBottom>
              Parcelas
            </Typography>
          </Box>
          <Box className={classes.novoBox} mt={-2}>
            <select
              className={classes.tf_s}
              type="text"
              id="installments"
              name="installments"
            />
          </Box>
        </Box>
        <input
          type="hidden"
          name="transactionAmount"
          id="transactionAmount"
          value="50"
        />
        <input type="hidden" name="paymentMethodId" id="paymentMethodId" />
        <input type="hidden" name="description" id="description" />

        <Box
          mt={1}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button className={classes.button2} variant="contained" type="submit">
            FAZER O PAGAMENTO
          </Button>
        </Box>
      </form>
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
}

export default PagCC;
