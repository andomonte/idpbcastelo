import React, { useRef } from 'react';
import { Box, Button, Typography, Grid } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TamanhoJanela from 'src/utils/getSize';
import ValidaCPF from 'src/utils/validarCPF';
import ValidaCNPJ from 'src/utils/validarCNPJ';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useSWR, { mutate } from 'swr';
import Drawer from '@material-ui/core/Drawer';
import { Alert, AlertTitle } from '@material-ui/lab';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import api from 'src/components/services/api';
import copy from 'copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { RepeatOneSharp } from '@material-ui/icons';
import { useRouter } from 'next/router';
import axios from 'axios';
import set from 'date-fns/esm/fp/set/index.js';
import GerarPdf from './pdfs/pdf';

const fetcher = (url) => axios.get(url).then((res) => res.data);
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
    background: '#790208',
    '&:hover': {
      backgroundColor: '#990208',
    },
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#FFF',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: 'blue',
    fontSize: '14px',
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
    border: '2px solid #b91a30',
  },
  paper: {
    // backgroundColor: '#b91a30', // theme.palette.background.paper,
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
    border: '2px solid #b91a30',

    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px', // fonte
    borderWidth: '0.5px',
    borderStyle: 'solid',
  },
  root: {
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
    padding: 0,
    margin: 0,
  },
}));
const QrPix = ({ codigo }) => {
  const classes = useStyles();

  const [dadosCompra, setDadosCompra] = React.useState('');
  const [open, setOpen] = React.useState(true);

  const [carregar, setCarregar] = React.useState(false);
  const router = useRouter();
  let idC = '000';
  if (codigo) idC = codigo.id;
  // const url = `${window.location.origin}/api/consultaInscGlobal/${idC}`;

  //  const { data, error } = useSWR(url, fetcher);
  /*  React.useEffect(() => {
    if (data) {
      //      const dadosMesa = data.filter((val) => val.codigo === Number(codigo));
      setDadosCompra(...data);
      //  console.log('dados', data.status);
      if (data.status === 'approved') setOpen(true);
    }
    //     mutate(["/api/albums/list?id=", appUser.id]);
    if (error) return <div>An error occured.</div>;
    if (!data) return <div>Loading ...</div>;

    return 0;
  }, [data]); */

  const janela = TamanhoJanela();

  const FecharCompra = () => {
    router.push({
      pathname: '/global',
      //   query: { dadosMesa2, numeroGame },
    });
    // setOpen(false);
    // window.location.reload();
  };
  const copyToClipboard = () => {
    // toast('copiado!');
    copy(codigo.qrCodeCopy);
    toast.info('copiado !', {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const defaultProps = {
    bgcolor: 'background.paper',
    height: '95vh',
    border: '2px solid #b91a30',
    width: '95%',
  };
  if (data) console.log('datos', data.status);
  return (
    <>
      {/*  {mutate(url)}
      {data &&
        data.status ===
          'approved'(
            <GerarPdf
              nome={dadosCompra.Nome}
              codigo={dadosCompra.idPagamento}
              adultos={dadosCompra.Adultos}
              criancas={dadosCompra.Criancas}
              valor={dadosCompra.total}
              fp="Pix"
              status="PAGAMENTO CONFIRMADO"
              parcelas="Parcela Única"
              cpf={dadosCompra.CPF}
              email={dadosCompra.Email}
            />,
          )} */}
      <Box className={classes.root}>
        <Box
          mt={2}
          height={janela.height}
          justifyContent="center"
          display="flex"
        >
          <Box borderRadius={16} {...defaultProps}>
            <Box mt={-1} ml={0}>
              <img src="/images/global/global1.png" alt="" width="100.8%" />
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              mt={1}
              sx={{ fontSize: 'bold', color: '#b91a30' }}
            >
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                style={{
                  fontSize: '16px',
                  color: '#b91a30',
                  fontWeight: 'bold',
                }}
              >
                CHAVE PIX PARA PAGAMENTO
              </Typography>
            </Box>

            <Box height={janela.height / 2} mt={1} textAlign="center">
              {codigo && (
                <img
                  className={classes.QrCode}
                  src={`data:image/jpeg;base64,${codigo.qrCode}`}
                  alt="qrCode"
                />
              )}
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              width="100%"
              mt={-10}
              sx={{ fontSize: 'bold', color: '#b91a30' }}
            >
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                style={{
                  fontSize: '12px',
                  color: '#000',
                  fontWeight: 'bold',
                }}
              >
                CHAVE ESPIRA EM:
              </Typography>
            </Box>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            <Box mt={2} display="flex" justifyContent="center">
              <Box
                mr={5}
                mt={0}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  className={classes.button2}
                  variant="contained"
                  id="reload"
                  onClick={copyToClipboard}
                >
                  <small>COPIAR CHAVE </small>{' '}
                </Button>
              </Box>
              <Box
                mt={0}
                mb={0}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  className={classes.button1}
                  variant="contained"
                  id="reload"
                  onClick={FecharCompra}
                >
                  FECHAR
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default QrPix;
