import React, { useRef } from 'react';
import { Box, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import cpfMask from 'src/components/mascaras/cpf';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@material-ui/core/TextField';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import CheckoutPro from './checkouPro';
// import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import InputBase from '@material-ui/core/InputBase';
import ValidaCPF from 'src/utils/validarCPF';
import Drawer from '@material-ui/core/Drawer';

import validator from 'validator';

import 'react-toastify/dist/ReactToastify.css';
import SvgIcon from '@mui/material/SvgIcon';
import celularMask from 'src/components/mascaras/celular';
import moment from 'moment';
import api from 'src/components/services/api';
import dataMask from 'src/components/mascaras/datas';
import { Oval } from 'react-loader-spinner';
import TamanhoJanela from 'src/utils/getSize';

const janela = TamanhoJanela();
let altura;
let largura;
if (janela.height < 500) altura = 500;
else altura = janela.height;
// const validateDate = require('validate-date');
if (janela.width < 300) largura = 300;
else largura = janela.width;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
    padding: 0,
    margin: 0,
  },
  imgBack: {
    //    width: '100%',
    height: altura,
    backgroundImage: "url('/images/global/fundo.png')",
    //    backgroundImage: url(/images/global/ticket.png), //seleciona imagem
    backgroundPosition: 'center', // centraliza imagem
    backgroundSize: 'cover', // imagem cobre toda área do div
  },
  img: {
    maxWidth: '400px',
    maxHeight: '700px',
    minWidth: '300px',
    minHeight: '500px',
    width: '100vw',
    height: '99vh',
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
  hamburger: {
    cursor: 'pointer',
    height: 28,
    color: '#fff',
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
    color: '#780208',
    width: '90%',
    height: 0,
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
    height: 50,
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
    backgroundColor: '#fafafa',
    textAlign: 'center',
    width: '90%',
    height: '40px',
    fontSize: '14px',
    [theme.breakpoints.down('md')]: {},
    //  borderRadius: '10px',
    //   border: '0px solid #b91a30',
  },
}));
/* const defaultProps = {
  bgcolor: 'background.paper',
  m: 0,
  // border: '2px solid #b91a30',
  width: janela.width,
  height: janela.height,
}; */

function Comprador() {
  const classes = useStyles();

  // const router = useRouter();
  const [idCompra, setIdCompra] = React.useState('');
  const [validarIdCompra, setValidarIdCompra] = React.useState('sim');

  const router = useRouter();

  /* const pagar = () => {
    if (email && cpf) {
      setOpen(true);
    }
  };
  
  const prefID = ''; */
  const [progress, setProgress] = React.useState(10);

  const handleEnviar = () => {
    api
      .post('/api/pegarDadosMP', {
        id: '20545056854',
      })

      .then((response) => {
        if (response) {
          // router.push(cursoSelecionado[0].link);
        }
      })
      .catch((error) => {
        console.log('error:', error);
        //  updateFile(uploadedFile.id, { error: true });
      });
  };

  //= ====================================================================

  return (
    <Box
      height="auto"
      minHeight={altura}
      style={{ backgroundColor: '#3f50b5' }}
    >
      <Box height={50} width={100} />
      <Box>
        <Box p={2} ml={1} mt={5}>
          <ArrowBackIcon
            style={{ fontSize: 35, color: '#fff' }}
            color="primary"
            onClick={handleVoltar}
            className={classes.hamburger}
            type="button"
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <Box mt={-6} height="100%" width="100%" ml={0}>
            <Box display="flex" justifyContent="center">
              <Box
                border={1}
                borderColor={validacaoIdCompra ? 'green' : 'red'}
                mt={2}
                display="flex"
                flexDirection="row"
                bgcolor="#fafafa"
                borderRadius="16px"
                height={120}
                width="46%"
                mr={2}
              >
                <Grid item xs={12} md={12}>
                  <Box
                    mt={2}
                    mb={1}
                    ml={3}
                    sx={{ fontSize: 'bold', color: '#000' }}
                  >
                    <Typography variant="caption" display="block" gutterBottom>
                      Digite o ID da Compra
                    </Typography>
                  </Box>

                  <Box mt={0} textAlign="center">
                    <Box>
                      <TextField
                        className={classes.tf_s}
                        id="Email"
                        type="text"
                        inputRef={idCompraRef}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          style: {
                            WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                          },
                        }}
                        value={idCompra}
                        variant="standard"
                        placeholder="digite seu email"
                        size="small"
                        onChange={(e) => {
                          setIdCompra(e.target.value);
                          setValidarIdCompra('sim');
                        }}
                        error={validarIdCompra === 'nao'}
                        onFocus={(e) => {
                          setIdCompra(e.target.value);
                        }}
                      />
                    </Box>
                  </Box>
                  {!validacaoIdCompra && (
                    <Box display="flex" ml={5} mt={0} color="#000">
                      <SvgIcon sx={{ color: 'red' }}>
                        <ErrorOutlineIcon />{' '}
                      </SvgIcon>
                      <Box mt={0.3} ml={2} color="red">
                        ID NÃO ENCONTRADO
                      </Box>
                    </Box>
                  )}
                </Grid>
              </Box>

              <Box
                border={1}
                mt={2}
                display="flex"
                flexDirection="row"
                bgcolor="#fafafa"
                borderRadius="16px"
                height={120}
                width="48%"
                mr={2}
              >
                <Grid item xs={12} md={12}>
                  <Box
                    mt={2}
                    mb={1}
                    ml={3}
                    sx={{ fontSize: 'bold', color: '#000' }}
                  >
                    <Typography variant="caption" display="block" gutterBottom>
                      Módulo
                    </Typography>
                  </Box>

                  <Box mt={0} textAlign="center">
                    <Box>
                      <TextField
                        value={curso}
                        select
                        inputRef={cursoRef}
                        onChange={handleSelect}
                        disabled={
                          !validacaoEmail || validacaoEmail === 'testar'
                        }
                        variant="standard"
                        className={classes.tf_s}
                        style={{
                          textAlign: 'start',
                          WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                        }}
                      >
                        <MenuItem value={curso}>
                          <em>Escolha o Módulo</em>
                        </MenuItem>

                        {cursoAtivo?.map((items) => (
                          <MenuItem key={items.nome} value={items.id}>
                            {items.id} - {items.nome ?? items.nome}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                    {cursoSelecionado !== '0' && (
                      <Box display="flex" ml={5} mt={0} color="#000">
                        <Box mt={0.3} ml={2} color="blue">
                          Valor do Curso: R$ {cursoSelecionado[0].valor},00
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Comprador;
