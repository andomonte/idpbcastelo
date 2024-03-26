import React from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TamanhoJanela from 'src/utils/getSize';

import Drawer from '@material-ui/core/Drawer';
import { Alert, AlertTitle } from '@material-ui/lab';
import api from 'src/components/services/api';
import 'react-toastify/dist/ReactToastify.css';
// import { RepeatOneSharp } from '@material-ui/icons';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Oval } from 'react-loading-icons';

const janela = TamanhoJanela();
let largura = janela.width;
if (largura > 400) largura = 400;
let altura;
if (janela.height < 500) altura = 500;
else altura = janela.height;
const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: '100%',
  },
  QrCode: {
    //    maxWidth: '1410px',
    //    maxHeight: '600px',
    width: '70%',
    height: '70%',
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
    background: '#bf360c',
    '&:hover': {
      backgroundColor: '#d84315',
    },
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#FFF',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: '#e0711a',
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
  texto: {
    color: '#780208',
    fontWeight: 'bold',
    fontSize: '12px',
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
    border: '2px solid #e0711a',
  },
  paper: {
    // backgroundColor: '#e0711a', // theme.palette.background.paper,
    backgroundImage: `url('/images/global/fundo.png')`,
    //    border: '0px solid #000',
    //    boxShadow: theme.shadows[5],
    //  padding: theme.spacing(1, 1, 1),
    backgroundPosition: 'center', // centraliza imagem
    backgroundSize: 'cover', // imagem cobre toda área do div
    height: '100vh',
    width: '100vw',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    with: '100%',
  },
  tf_input: {
    backgroundColor: '#ffff',
    borderRadius: '8px',
    border: '2px solid #e0711a',

    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px', // fonte
    borderWidth: '0.5px',
    borderStyle: 'solid',
  },
  root: {
    height: altura,

    //  overflow: 'hidden',
    width: largura,
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
}));
/* const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#e0711a'),
    backgroundColor: '#e0711a',
    '&:hover': {
      backgroundColor: '#e0711a',
    },
  },
}))(Button); */
function Boleto({ dadosIsento }) {
  const { email } = dadosIsento;
  const { cpf } = dadosIsento;
  const { nome } = dadosIsento;
  const { Responsavel } = dadosIsento;

  const { fone } = dadosIsento;

  const { estadia } = dadosIsento;
  const { genero } = dadosIsento;
  const { grau } = dadosIsento;
  const { horario } = dadosIsento;
  const { igrejas } = dadosIsento;
  const { jEstadual } = dadosIsento;
  const { nascimento } = dadosIsento;
  const { dataChegada } = dadosIsento;

  const classes = useStyles();
  // console.log('params:', setFPagamento);
  // const router = useRouter();

  const [valorErro, setValorErro] = React.useState('');
  const [openDrawer, setOpenDrawer] = React.useState(false);

  // const [open, setOpen] = React.useState(true);
  const [messageErro, setMessageErro] = React.useState(0);
  // const [fPagamento, setFPagamento] = React.useState('');
  const [openDrawerErro, setOpenDrawerErro] = React.useState(false);

  const router = useRouter();

  /* const handleRouter = () => {
    router.push({
      pathname: '/global/chavePix',
      query: { idCompra, qrCode, qrCodeCopy },
    });
  }; */

  const voltar = () => {
    router.push({
      pathname: './dadosComprador',
    });
  };
  const FecharCompra = () => {
    router.push({
      pathname: './iniciaCompra',
      //   query: { dadosMesa2, numeroGame },
    });
    // setOpen(false);
    // window.location.reload();
  };

  const fazerCadastro = () => {
    api
      .post('/api/cadastroIsentoConvencao', {
        nome,
        cpf,
        total: 0,
        fone,
        email,
        estadia,
        genero,
        grau,
        horario,
        igrejas,
        jEstadual,
        nascimento,
        dataChegada,
        Responsavel,
      })

      .then((response) => {
        if (response) {
          if (response.data.cpf !== '')
            router.push({
              pathname: './meuTicket',
              query: { cpf },
            });
        }
        //        const prefID = response.data.body.point_of_interaction.transaction_data;
        else {
          setValorErro(
            `Não conseguimos fazer sua Inscrição. Será necessário refaze-la.`,
          );
          setOpenDrawerErro(true);
          setMessageErro(response.data.message);
        }
      })
      .catch((error) => {
        console.log('error:', error);
        //  updateFile(uploadedFile.id, { error: true });
      });
  };

  React.useEffect(async () => {
    try {
      const url = `${window.location.origin}/api/consultaInscritosSim`;
      const res = await axios.get(url);

      if (res.data && res.data.length) {
        const inscrito = res.data.filter(
          (val) =>
            val.status === 'approved' &&
            val.CPF.replace(/([^0-9])/g, '') === cpf.replace(/([^0-9])/g, ''),
        );

        if (inscrito.length)
          router.push({
            pathname: './meuTicket',
            query: { cpf },
          });
        else {
          fazerCadastro();
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Box width="100vw" display="flex" justifyContent="center">
      <Box width="100%" height="100vh">
        <Box>
          <Box
            mt={0}
            ml={0}
            height="25vh"
            width="100%"
            style={{
              backgroundImage: `url('/images/evento/cabecalho1.png')`,
              backgroundPosition: 'center', // centraliza imagem
              backgroundSize: 'cover', // imagem cobre toda área do div
            }}
          >
            <Box p={2}>
              <ArrowBackIcon
                sx={{
                  fontSize: 20,
                  color: '#fff',
                }}
                onClick={voltar}
              />
            </Box>
          </Box>
          <Box
            justifyContent="center"
            alignItems="center"
            display="flex"
            flexDirection="column"
            height="70vh"
          >
            <Box
              justifyContent="center"
              alignItems="center"
              display="flex"
              mb={2}
            >
              Salvando dados...
            </Box>
            <Oval stroke="blue" width={80} height={80} />{' '}
          </Box>

          <Drawer variant="persistent" anchor="bottom" open={openDrawer}>
            <Box height={260} sx={{ background: '#ffebee' }}>
              <Alert onClose={handleDrawerClose} severity="error">
                <AlertTitle>ERRO DE PREENCHIMENTO </AlertTitle>
                <strong>{valorErro}</strong>
              </Alert>
            </Box>
          </Drawer>
          <Drawer variant="persistent" anchor="bottom" open={openDrawerErro}>
            <Box height={janela.height} sx={{ background: '#ffebee' }}>
              <Box mt={25}>
                {messageErro ? (
                  <Box>
                    <Box display="flex" justifyContent="center">
                      <h2>DADOS ERRADOS !</h2>
                    </Box>
                    <Box m={2} textAlign="center">
                      <strong>{valorErro}</strong>
                    </Box>

                    <Box mt={4} textAlign="center">
                      <strong>A operadora Informou:</strong>
                    </Box>
                    <Box m={0} textAlign="center">
                      <strong>{messageErro}</strong>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Box display="flex" justifyContent="center">
                      <h2>ERRO NO PAGAMENTO !</h2>
                    </Box>
                    <Box m={2} textAlign="center">
                      <strong>{valorErro}</strong>
                    </Box>
                  </Box>
                )}
                <Box
                  mt={4}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    className={classes.button2}
                    variant="contained"
                    id="reload"
                    onClick={FecharCompra}
                  >
                    Fechar
                  </Button>
                </Box>
              </Box>
            </Box>
          </Drawer>
        </Box>
      </Box>
    </Box>
  );
}
export default Boleto;
