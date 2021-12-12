import React, { useEffect } from 'react';
import { useMercadopago } from 'react-sdk-mercadopago';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button } from '@material-ui/core';
import cpfMask from 'src/components/mascaras/cpf';
import cnpjMask from 'src/components/mascaras/cnpj';

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
    fontSize: '14px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
  },
  tf_s2: {
    margin: 10,
    textAlign: 'center',
    backgroundColor: '#f0f4c3',
    // marginRight: 8,

    width: '200',
    height: '35px',
    fontSize: '14px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    //    borderColor: '#9ccc65',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 5,
      fontSize: '14px',
      width: '150px',
    },
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

export default function CheckoutT({ Email }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [tipoDoc, setTipoDoc] = React.useState('CPF');
  const [docPay, setDocPay] = React.useState('');
  const mp = useMercadopago.v2('TEST-e965cf2f-8b17-4a13-871e-947e26f87ebd', {
    locale: 'pt-BR',
  });
  /*  const mercadopago = useMercadopago.v1(
    'TEST-e965cf2f-8b17-4a13-871e-947e26f87ebd',
  ); */

  const handleClose = () => {
    setOpen(false);
  };

  /* console.log('vai:', prefID);
  useEffect(() => {
    if (mercadopago) {
      mercadopago.checkout({
        preference: {
          id: prefID,
        },
        render: {
          container: '.cho-container',
          label: 'Pay',
        },
      });
    }
  }, [mercadopago]); */
  let cardForm = '';
  if (mp)
    cardForm = mp.cardForm({
      amount: '50',
      autoMount: true,
      form: {
        id: 'form-checkout',
        cardholderName: {
          id: 'form-checkout__cardholderName',
          placeholder: 'Titular do cartão',
        },
        cardholderEmail: {
          id: 'form-checkout__cardholderEmail',
          placeholder: 'E-mail',
        },
        cardNumber: {
          id: 'form-checkout__cardNumber',
          placeholder: 'Número do cartão',
        },
        cardExpirationMonth: {
          id: 'form-checkout__cardExpirationMonth',
          placeholder: 'MM',
        },
        cardExpirationYear: {
          id: 'form-checkout__cardExpirationYear',
          placeholder: 'AA',
        },
        securityCode: {
          id: 'form-checkout__securityCode',
          placeholder: 'Cód. de segurança',
        },
        installments: {
          id: 'form-checkout__installments',
          placeholder: 'Parcelas',
        },
        identificationType: {
          id: 'form-checkout__identificationType',
          placeholder: 'Tipo de documento',
        },
        identificationNumber: {
          id: 'form-checkout__identificationNumber',
          placeholder: 'Número do documento',
        },
        issuer: {
          id: 'form-checkout__issuer',
          placeholder: 'Banco emissor',
        },
      },
      callbacks: {
        onFormMounted: (error) => {
          if (error)
            return console.warn('Form Mounted handling error: ', error);
          console.log('Form mounted');
          return 0;
        },
        onSubmit: (event) => {
          event.preventDefault();
          const paymentMethodId = event.target.MPHiddenInputPaymentMethod.value;
          const emailE = event.target.cardholderEmail.value;
          const docType = event.target.identificationType.value;
          const docNumber = event.target.identificationNumber.value;

          console.log(paymentMethodId, emailE, docType, docNumber);
          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();
          console.log('sera:', paymentMethodId);
          fetch('/api/mercadoPago', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token,
              issuer: issuer_id,
              paymentMethodId,
              transactionAmount: Number(amount),
              installments: Number(installments),
              description: 'Inscrição Global',
              email: emailE,
              docType,
              docNumber,
            }),
          });
        },
        onFetching: (resource) => {
          console.log('Fetching resource: ', resource);

          // Animate progress bar
          const progressBar = document.querySelector('.progress-bar');
          progressBar.removeAttribute('value');

          return () => {
            progressBar.setAttribute('value', '0');
          };
        },
      },
    });

  const body = (
    <Box className={classes.paper}>
      <form id="form-checkout">
        {/* <Box>
          <Box>
            <Box className={classes.novoBox} mt={-2} display="none">
              <select
                className={classes.tf_4}
                name="identificationType"
                id="form-checkout__identificationType"
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
                type="email"
                name="cardholderEmail"
                id="form-checkout__cardholderEmail"
                className={classes.tf_m}
                readOnly
                value={Email}
              />
            </Box>
          </Box>
          <Box display="none">
            <Box width="100%" mt={-1} sx={{ fontSize: 'bold' }}>
              <Box className={classes.novoBox} mt={-2}>
                <input
                  type="text"
                  name="identificationNumber"
                  id="form-checkout__identificationNumber"
                  readOnly
                  value={CPF}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box width="100%" mt={-1} sx={{ fontSize: 'bold' }} textAlign="center">
          <h3>Detalhes do cartão</h3>
        </Box>

        <Box>
          <Box width="100%" mt={0} ml={2} sx={{ fontSize: 'bold' }}>
            <Typography variant="caption" display="block" gutterBottom>
              Titular do cartão
            </Typography>
          </Box>
          <Box className={classes.novoBox} mt={-2}>
            <input
              type="text"
              name="cardholderName"
              id="form-checkout__cardholderName"
              className={classes.tf_input}
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
                type="text"
                name="cardExpirationMonth"
                id="form-checkout__cardExpirationMonth"
                className={classes.tf_input2}
              />

              <input
                type="text"
                name="cardExpirationYear"
                id="form-checkout__cardExpirationYear"
                className={classes.tf_input2}
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
                className={classes.tf_input3}
                type="text"
                name="securityCode"
                id="form-checkout__securityCode"
              />
            </Box>
          </Grid>
        </Box>
        <Box display="none">
          <Box width="100%" mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
            <Typography variant="caption" display="block" gutterBottom>
              Banco emissor
            </Typography>
          </Box>
          <Box className={classes.novoBox} mt={-2}>
            <select
              className={classes.tf_s}
              name="issuer"
              id="form-checkout__issuer"
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
              name="installments"
              id="form-checkout__installments"
            />
          </Box>
        </Box>

         */}
        <Box>
          <Box>
            <Box width="100%" mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
              <Typography variant="caption" display="block" gutterBottom>
                Numero do cartão
              </Typography>
            </Box>
            <Box className={classes.novoBox} mt={-2}>
              <input
                type="text"
                name="cardNumber"
                id="form-checkout__cardNumber"
                className={classes.tf_input}
              />
            </Box>
          </Box>
          <Box display="flex" mt={0}>
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
                  type="text"
                  name="cardExpirationMonth"
                  id="form-checkout__cardExpirationMonth"
                  className={classes.tf_input2}
                />

                <input
                  type="text"
                  name="cardExpirationYear"
                  id="form-checkout__cardExpirationYear"
                  className={classes.tf_input2}
                />
              </Box>
            </Grid>
            <Grid item xs={5} md={3}>
              <Box width="100%" mt={-1} ml={-0.4} sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Cód. de segurança
                </Typography>
              </Box>
              <Box mt={-2.3} width="100%">
                <input
                  className={classes.tf_input3}
                  type="text"
                  name="securityCode"
                  id="form-checkout__securityCode"
                />
              </Box>
            </Grid>
          </Box>
          <Box>
            <Box width="100%" mt={-2.3} ml={2} sx={{ fontSize: 'bold' }}>
              <Typography variant="caption" display="block" gutterBottom>
                Titular do cartão
              </Typography>
            </Box>
            <Box className={classes.novoBox} mt={-2}>
              <input
                type="text"
                name="cardholderName"
                id="form-checkout__cardholderName"
                className={classes.tf_input}
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
                type="email"
                name="cardholderEmail"
                id="form-checkout__cardholderEmail"
                className={classes.tf_m}
                readOnly
                value={Email}
              />
            </Box>
          </Box>

          <Box display="none">
            <Box width="100%" mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
              <Typography variant="caption" display="block" gutterBottom>
                Banco emissor
              </Typography>
            </Box>
            <Box className={classes.novoBox} mt={-2}>
              <select
                className={classes.tf_s}
                name="issuer"
                id="form-checkout__issuer"
              />
            </Box>
          </Box>

          <Box display="flex" mt={0}>
            <Grid item xs={5} md={3}>
              <Box width="100%" mt={-1} ml={1.5} sx={{ fontSize: 'bold' }}>
                <Typography
                  style={{ marginBottom: '-22px' }}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  Doc. do Pagante
                </Typography>
              </Box>
              <Box className={classes.novoBox} mt={-2} mr={1.5}>
                <Box className={classes.novoBox} mt={-1}>
                  <select
                    className={classes.tf_input3}
                    name="identificationType"
                    id="form-checkout__identificationType"
                    onChange={(e) => {
                      setTipoDoc(e.target.value);
                      console.log('vamos ver', tipoDoc);
                    }}
                    onFocus={(e) => setTipoDoc(e.target.value)}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={7} md={3}>
              {console.log('vamos ver2', tipoDoc)}
              <Box width="100%" mt={-1} ml={1} sx={{ fontSize: 'bold' }}>
                <Typography variant="caption" display="block" gutterBottom>
                  Digite o {tipoDoc}
                </Typography>
              </Box>
              <Box mt={-2.3} width="100%">
                <input
                  type="text"
                  name="identificationNumber"
                  id="form-checkout__identificationNumber"
                  className={classes.tf_s2}
                  value={tipoDoc === 'CPF' ? cpfMask(docPay) : cnpjMask(docPay)}
                  onChange={(e) => setDocPay(e.target.value)}
                  onSelect={(e) => setDocPay(e.target.value)}
                  onFocus={(e) => setDocPay(e.target.value)}
                  onBlur={(e) => setDocPay(e.target.value)}
                />
              </Box>
            </Grid>
          </Box>
          <Box className={classes.novoBox} mt={-2}>
            <select
              className={classes.tf_s}
              name="installments"
              id="form-checkout__installments"
            />
          </Box>
          <Box
            mt={1}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              className={classes.button2}
              variant="contained"
              type="submit"
              id="form-checkout__submit"
            >
              FAZER O PAGAMENTO
            </Button>
          </Box>
        </Box>
        <progress value="0" className="progress-bar">
          Carregando...
        </progress>
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
