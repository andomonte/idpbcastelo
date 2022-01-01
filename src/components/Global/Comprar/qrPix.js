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
import Moment from 'react-moment';
import moment from 'moment';
import { date } from 'joi';
import { useTimer } from 'react-timer-hook';
import GerarPdf from './pdfs/pdf';

const janela = TamanhoJanela();
const fetcher = (url) => axios.get(url).then((res) => res.data);
const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '500px',
    maxHeight: '700px',
    minWidth: '300px',
    minHeight: '500px',
    width: '100vw',
    height: '100vh',
  },
  QrCode: {
    //    maxWidth: '1410px',
    //    maxHeight: '600px',
    width: janela.height - 350,
    height: janela.height - 350,
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
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#FFF',
    width: 125,
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
    // overflow: 'hidden',
    width: '100vw',
    minHeight: 500,
    padding: 0,
    margin: 0,
  },
}));

const QrPix = ({ codigo }) => {
  const classes = useStyles();
  //  const valCodigo = codigo;
  const [dadosCompra, setDadosCompra] = React.useState('');
  const [cancelamento, setCancelamento] = React.useState(true);
  const [url, setUrl] = React.useState();
  const [urlCreate, setUrlCreate] = React.useState();
  const [relogio, setRelogio] = React.useState();
  // const [carregar, setCarregar] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (codigo) {
      const urls = `${window.location.origin}/api/consultaInscGlobal/${codigo.id}`;
      setUrl(urls);
      const urlC = `${window.location.origin}/api/updateInscGlobal/${codigo.id}`;
      setUrlCreate(urlC);
    }
  }, [codigo]);

  const { data, error } = useSWR(url, fetcher);
  React.useEffect(() => {
    if (data) {
      //      const dadosMesa = data.filter((val) => val.codigo === Number(codigo));
      setDadosCompra(...data);
    }
    if (error) return <div>An error occured.</div>;
    if (!data) return <div>Loading ...</div>;

    return 0;
  }, [data]);
  // mutate([url]);
  //  React.useEffect(() => {});
  React.useEffect(() => {
    if (data && data[0].createdAt) {
      const dataAtual = new Date();
      const date1 = moment(dataAtual);
      const date2 = moment(data[0].createdAt);
      const diff = date2.diff(date1, 'seconds');
      // soma 30 minutes ou seja 1800segundos
      const time = new Date();
      time.setSeconds(time.getSeconds() + diff);

      setRelogio(time);
    }
  }, [data]);

  console.log(data, relogio);

  const CancelarCompra = async () => {
    try {
      const body = {
        status: 'cancelada',
      };

      await fetch(urlCreate, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (errors) {
      // enviar email para idpb informando para cancelar manualmente
      console.errors();
    }
    router.push({
      pathname: '/global',
    });
  };

  const FecharCompra = () => {
    setCancelamento(true);
  };

  const copyToClipboard = () => {
    // toast('copiado!');
    copy(codigo.qrCodeCopy);
    toast.info('copiado !', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  function MyTimer({ expiryTimestamp }) {
    const { seconds, minutes } = useTimer({
      expiryTimestamp,
      onExpire: () => {
        CancelarCompra();
        console.warn('onExpire called');
      },
    });
    let minutos = minutes;
    let segundos = seconds;
    if (minutes < 10) minutos = `0${minutes}`;
    if (seconds < 10) segundos = `0${seconds}`;
    return (
      <div>
        <div style={{ fontSize: '16px' }}>
          <span>{minutos}</span>:<span>{segundos}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {relogio > 0 && (
        <Box>
          {(data && data[0].status) === 'approved' ? (
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
            />
          ) : (
            <Box className={classes.root}>
              <Box
                mt={0}
                height={janela.height}
                justifyContent="center"
                display="flex"
              >
                <Box>
                  <Box mt={0} ml={0}>
                    <img
                      src="/images/global/fundo2.png"
                      alt=""
                      width="100%"
                      className={classes.img}
                    />
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="center"
                    width="100%"
                    mt={-(janela.height * 0.082)}
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

                  <Box height={janela.height / 2} mt={0} textAlign="center">
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
                    mt={-9}
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
                      <Box display="flex" justifyContent="center">
                        CHAVE EXPIRA EM:{' '}
                        <Box mt={-0.5} ml={1}>
                          <MyTimer expiryTimestamp={relogio} />
                        </Box>
                      </Box>
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
                        SAIR
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};
export default QrPix;
