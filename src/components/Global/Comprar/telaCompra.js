import React from 'react';
import { Box, Button, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@mui/material/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import cpfMask from 'src/components/mascaras/cpf';
import dataMask from 'src/components/mascaras/datas';
import api from 'src/components/services/api';
// import celularMask from 'src/components/mascaras/celular';
// import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
// import PagCC from './pagCC';
// import CheckoutPro from './checkouPro';
import CheckoutT from './checkouT';

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
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#b91a30',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: '#b91a30',
    fontSize: '12px',
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
  },
  tf_m: {
    backgroundColor: '#f0f4c3',

    width: '100%',
    fontSize: '5px',
  },
}));

const Home = () => {
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

  const pagar = () => {
    if (email && cpf) {
      setOpen(true);
    }
  };

  let prefID = '';

  const comprar = () => {
    api
      .post('/api/mercadoPagoPro', {})

      .then((response) => {
        prefID = response.data;
        console.log('pref:', prefID);
        setOpen(true);
      })

      .catch(() => {
        //  updateFile(uploadedFile.id, { error: true });
      });
  };

  return (
    <Box style={{ backgroundColor: '#b91a30', height: '90vh' }}>
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
                <Box mt={1} ml={2} sx={{ fontSize: 'bold' }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Nome
                  </Typography>
                </Box>

                <Box className={classes.novoBox} mt={-1.5}>
                  <TextField
                    className={classes.tf_m}
                    id="Nome"
                    // label="Matricula"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={nome}
                    variant="outlined"
                    placeholder=""
                    size="small"
                    onBlur={
                      nome === ''
                        ? () => setValidarNome('nao')
                        : () => setValidarNome('sim')
                    }
                    onChange={(e) => setNome(e.target.value)}
                    error={validarNome === 'nao'}
                    onFocus={(e) => setNome(e.target.value)}
                  />
                </Box>
              </Grid>
            </Box>
            <Box mt={2} display="flex" flexDirection="row">
              <Grid item xs={12} md={3}>
                <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    CPF
                  </Typography>
                </Box>

                <Box className={classes.novoBox} mt={-1.5}>
                  <TextField
                    className={classes.tf_m}
                    id="CPF"
                    // // // label="CPF"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={cpfMask(cpf)}
                    variant="outlined"
                    placeholder=""
                    size="small"
                    onBlur={
                      cpf === ''
                        ? () => setValidarCPF('nao')
                        : () => setValidarCPF('sim')
                    }
                    onChange={(e) => setCPF(e.target.value)}
                    error={validarCPF === 'nao'}
                    onFocus={(e) => setCPF(e.target.value)}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={3}>
                <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Data de Nascimento
                  </Typography>
                </Box>

                <Box className={classes.novoBox} mt={-1.5}>
                  <TextField
                    className={classes.tf_m}
                    id="DataNascimento"
                    // label="Data de Nascimento"
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={dataMask(dataNascimento)}
                    variant="outlined"
                    placeholder=""
                    size="small"
                    onBlur={
                      dataNascimento === ''
                        ? () => setValidarDataNascimento('nao')
                        : () => setValidarDataNascimento('sim')
                    }
                    onChange={(e) => setDataNascimento(e.target.value)}
                    error={validarDataNascimento === 'nao'}
                    onFocus={(e) => setDataNascimento(e.target.value)}
                  />
                </Box>
              </Grid>
            </Box>
            <Box mt={2} display="flex" flexDirection="row">
              <Grid item xs={12} md={6}>
                <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Email
                  </Typography>
                </Box>
                <Box className={classes.novoBox} mt={-1.5}>
                  <TextField
                    className={classes.tf_m}
                    id="Email"
                    type="text"
                    InputLabelProps={{
                      style: { textTransform: 'uppercase' },
                      shrink: true,
                    }}
                    value={email}
                    variant="outlined"
                    placeholder=""
                    size="small"
                    onBlur={
                      email === ''
                        ? () => setValidarEmail('nao')
                        : () => setValidarEmail('sim')
                    }
                    onChange={(e) => setEmail(e.target.value)}
                    error={validarEmail === 'nao'}
                    onFocus={(e) => setEmail(e.target.value)}
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
              <Button
                className={classes.button1}
                variant="contained"
                onClick={pagar}
              >
                FAZER O PAGAMENTO
              </Button>
            </Box>
          </Box>
          {open && <CheckoutT CPF={cpf} Email={email} />}
          {/* {open && <PagCC email={email} cpf={cpf} />} */}
        </Hidden>
      </Box>
    </Box>
  );
};
export default Home;
