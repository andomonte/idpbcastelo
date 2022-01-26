import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
// import CardMedia from '@mui/material/CardMedia';
import Fab from '@mui/material/Fab';
import Avatar from '@mui/material/Avatar';
import useSWR from 'swr';
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Loading from 'src/utils/loading';
import MesageErro from 'src/utils/mesageErro';
import Drawer from '@material-ui/core/Drawer';
import QRCode from 'react-qr-code';
import TamanhoJanela from 'src/utils/getSize';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useRouter } from 'next/router';
import Divider from '@mui/material/Divider';
import { Oval } from 'react-loading-icons';
import GeneratePdf from './generatePdfTicket';

const janela = TamanhoJanela();
let largura;
let altura;
if (janela.width > 400) largura = 400;
else largura = janela.width;

if (janela.height > 700) altura = 700;
else altura = janela.height;

if (janela.height < 500) altura = 500;
else altura = janela.height;
// const fetcher = (urls) => axios.get(urls).then((res) => res.data);

const ajusteAltura = Number(altura / 11).toFixed(0) - 5;

const useStyles = makeStyles((theme) => ({
  root: {
    height: altura,
    minHeight: 500,
    //  overflow: 'hidden',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: '100%',
  },
  imgBack: {
    //    width: '100%',
    height: altura,
    backgroundImage: `url('/images/global/ticket.png')`,
    //    backgroundImage: url(/images/global/ticket.png), //seleciona imagem
    backgroundPosition: 'center', // centraliza imagem
    backgroundSize: 'cover', // imagem cobre toda área do div
  },
  tf_s: {
    backgroundColor: '#ffff',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '10px',
    border: '2px solid #b91a30',
  },
}));

const defaultProps = {
  bgcolor: 'background.paper',
  m: 0,
  // border: '2px solid #b91a30',
  width: largura,
  height: altura,
};

function PesquisaCPF({ cpf, setOpen }) {
  const classes = useStyles();
  const ref1 = React.useRef();
  const ref2 = React.useRef();
  const ref3 = React.useRef();
  const url = `${window.location.origin}/api/consultaInscGlobalCPF/${cpf}`;
  const [posts, setPosts] = React.useState('vazio');
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openDrawerInval, setOpenDrawerInval] = React.useState(false);
  const [openDrawerPend, setOpenDrawerPend] = React.useState(false);
  const [openDrawerPend2, setOpenDrawerPend2] = React.useState(false);
  const [inscCancel, setInscCancel] = React.useState([]);
  const [nome, setNome] = React.useState('');
  const [adultos, setAdultos] = React.useState('');
  const [criancas, setCriancas] = React.useState('');
  const [idPagamento, setIdPagamento] = React.useState('');
  const router = useRouter();
  React.useEffect(async () => {
    try {
      const res = await axios.get(url);
      if (res.data) setPosts(() => [...res.data]);
      // setArray
      else {
        setPosts('nada');
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  React.useEffect(async () => {
    if (posts !== 'vazio') {
      if (posts.length > 0) {
        const inscrito = posts.filter((val) => val.status !== 'cancelled');
        const inscCancelada = posts.filter((val) => val.status === 'cancelled');

        if (inscrito.length) {
          if (inscrito[0].CPF === cpf) {
            setNome(posts[0].Nome);
            setAdultos(posts[0].Adultos);
            setCriancas(posts[0].Criancas);
            setIdPagamento(posts[0].idPagamento);

            if (inscrito[0].status === 'approved') setOpenDrawer(true);
            if (
              inscrito[0].status !== 'cancelled' &&
              inscrito[0].status !== 'approved'
            )
              setOpenDrawerPend(true);
          } else setOpenDrawerInval(true);
        } else {
          setOpenDrawerPend2(true);

          setInscCancel(() => [...inscCancelada]);
        }
      } else setOpenDrawerInval(true);
    }
  }, [posts]);
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('#b91a30'),
      backgroundColor: '#b91a30',
      '&:hover': {
        backgroundColor: '#b91a30',
      },
    },
  }))(Button);

  /*   const handleCloseOK = () => {
    router.push({
      pathname: '/global',
    });
  }; */
  const handleClose = () => {
    setOpenDrawerInval(false);
    setOpenDrawerPend(false);
    setOpen(false); // fechar o open da função pai que chamou -> telaLogin
    return null;
  };

  return (
    <>
      <Box>
        <Box>
          <Box justifyContent="center" display="flex">
            <Box>
              <Box {...defaultProps}>
                <Box mt={-1} ml={0}>
                  <img
                    src="/images/global/informe.png"
                    alt=""
                    width="100%"
                    height={altura}
                  />
                  <Box>
                    {posts === 'vazio' ? (
                      <Box ml={2} width="90%" mt={-45}>
                        <Box display="flex" justifyContent="center">
                          <Oval stroke="blue" width={80} height={25} />
                        </Box>
                        <Box display="flex" justifyContent="center">
                          <small>Carregando</small>
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        {openDrawerInval && (
                          <Box>
                            <Box>
                              <div
                                className="content"
                                ref={ref1}
                                id="comprovante"
                              >
                                <Box
                                  display="flex"
                                  flexDirection="column"
                                  justifyContent="center"
                                  mt={
                                    altura > 570
                                      ? altura < 630
                                        ? -ajusteAltura + 2
                                        : -ajusteAltura + 5
                                      : -ajusteAltura
                                  }
                                >
                                  <Box textAlign="center">
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                      style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        fontFamily: 'Arial Black',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      <Box>Não temos registro</Box>
                                    </Typography>
                                  </Box>
                                  <Box textAlign="center" mt={0}>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                      style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        fontFamily: 'Arial Black',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      <Box>
                                        <Typography
                                          variant="caption"
                                          display="block"
                                          gutterBottom
                                          style={{
                                            fontSize: '16px',
                                            color: '#000',
                                            fontFamily: 'Arial Black',
                                            fontWeight: 'bold',
                                          }}
                                        >
                                          <Box>de compra no cpf</Box>
                                        </Typography>
                                      </Box>
                                    </Typography>
                                  </Box>
                                  <Box textAlign="center">
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                      style={{
                                        fontSize: '16px',
                                        color: '#000',
                                        fontFamily: 'Arial Black',
                                        fontWeight: 'bold',
                                      }}
                                    >
                                      <Box>
                                        <Typography
                                          variant="caption"
                                          display="block"
                                          gutterBottom
                                          style={{
                                            fontSize: '16px',
                                            color: 'blue',
                                            fontFamily: 'Arial Black',
                                            fontWeight: 'bold',
                                          }}
                                        >
                                          <Box>{cpf}</Box>
                                        </Typography>
                                      </Box>
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box
                                  mt={
                                    altura > 570 ? (altura < 630 ? 25 : 32) : 20
                                  }
                                  display="flex"
                                  width="100%"
                                  justifyContent="center"
                                >
                                  <Box>
                                    <ColorButton
                                      style={{ borderRadius: 16 }}
                                      variant="contained"
                                      value="value"
                                      onClick={handleClose}
                                    >
                                      FECHAR
                                    </ColorButton>
                                  </Box>
                                </Box>
                              </div>
                            </Box>
                          </Box>
                        )}
                        {openDrawerPend && (
                          <Box>
                            <Box
                              mt={
                                altura > 570 ? (altura < 630 ? -48 : -54) : -43
                              }
                            >
                              <Box
                                //              height={10} // defome tamanho do fundo para sobrepor a imagem de fundo
                                width={largura}
                                ml={-0.3}

                                // className={classes.imgBack}
                                // sx={{ backgroundImage: `url('/images/global/ticket.png')` }}
                              >
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  width="100%"
                                  mb={0}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      fontSize: '16px',
                                      color: '#000',
                                      fontFamily: 'Arial Black',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box mt={-3}>CPF: {cpf}</Box>
                                  </Typography>
                                </Box>
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  width="100%"
                                  mb={0}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      fontSize: '14px',
                                      color: '#000',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box mt={2}>STATUS DE PAGAMENTO ESTÁ</Box>
                                  </Typography>
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
                                      color: 'blue',
                                      fontFamily: 'Arial Black',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box mt={-1}>PENDENTE</Box>
                                  </Typography>
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
                                      color: 'green',
                                      fontFamily: 'Arial Black',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box mt={0}>
                                      <Box
                                        display="flex"
                                        justifyContent="space-around"
                                      >
                                        <strong style={{ color: '#000' }}>
                                          código
                                        </strong>
                                      </Box>
                                      <Box
                                        display="flex"
                                        justifyContent="space-around"
                                      >
                                        {idPagamento}
                                      </Box>
                                    </Box>
                                  </Typography>
                                </Box>
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  width="92%"
                                  height={0}
                                  mt={1}
                                  ml={2}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      fontSize: '13px',
                                      color: '#000',
                                      fontWeight: 'bold',
                                      marginTop: 10,
                                      marginLeft: 2,

                                      width: largura - 28,
                                      height: 60,
                                      textAlign: 'center',
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderLeft: 0,
                                        borderRight: 0,
                                        borderBottom: 0,
                                      }}
                                      mt={
                                        altura > 570
                                          ? altura < 630
                                            ? 3
                                            : 5
                                          : 0
                                      }
                                    >
                                      <Box mt={1}>
                                        {' '}
                                        Central de atendimento:{' '}
                                      </Box>
                                    </Box>
                                  </Typography>
                                </Box>
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  width="100%"
                                  mt={0}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      fontSize: '13px',
                                      color: '#000',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box
                                      mt={
                                        altura > 570
                                          ? altura < 630
                                            ? 0
                                            : 0
                                          : -4
                                      }
                                    >
                                      (92) 9134-4368
                                    </Box>
                                  </Typography>
                                </Box>
                              </Box>

                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              />

                              <Box
                                mt={0}
                                mb={2}
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              />
                            </Box>
                            <Box
                              mt={altura > 570 ? (altura < 630 ? 6 : 10) : 5}
                              display="flex"
                              width="100%"
                              justifyContent="center"
                            >
                              <Box>
                                <ColorButton
                                  style={{ borderRadius: 16 }}
                                  variant="contained"
                                  value="value"
                                  onClick={handleClose}
                                >
                                  FECHAR
                                </ColorButton>
                              </Box>
                            </Box>
                          </Box>
                        )}
                        {openDrawerPend2 && (
                          <Box>
                            <Box
                              mt={
                                altura > 570 ? (altura < 630 ? -48 : -56) : -40
                              }
                            >
                              <Box
                                //              height={10} // defome tamanho do fundo para sobrepor a imagem de fundo
                                width={largura}
                                ml={-0.3}

                                // className={classes.imgBack}
                                // sx={{ backgroundImage: `url('/images/global/ticket.png')` }}
                              >
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  width="100%"
                                  mb={0}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      fontSize: '16px',
                                      color: '#000',
                                      fontFamily: 'Arial Black',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box mt={-3}>CPF: {cpf}</Box>
                                  </Typography>
                                </Box>
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  width="100%"
                                  mb={0}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      fontSize: '14px',
                                      color: '#000',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box mt={0}>
                                      Quantidade de inscrições ={' '}
                                      <strong>{inscCancel.length}</strong>
                                    </Box>
                                  </Typography>
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
                                      color: 'blue',
                                      fontFamily: 'Arial Black',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box mt={0}>CANCELADA</Box>
                                  </Typography>
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
                                      color: 'green',
                                      fontFamily: 'Arial Black',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box mt={0}>
                                      <Box
                                        display="flex"
                                        justifyContent="space-around"
                                      >
                                        <strong style={{ color: '#000' }}>
                                          código
                                        </strong>
                                      </Box>
                                      <Box
                                        display="flex"
                                        justifyContent="space-around"
                                      >
                                        {inscCancel.length &&
                                          inscCancel[0].idPagamento}
                                      </Box>
                                    </Box>
                                  </Typography>
                                </Box>
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  width="92%"
                                  height={0}
                                  mt={1}
                                  ml={2}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      fontSize: '13px',
                                      color: '#000',
                                      fontWeight: 'bold',
                                      marginTop: 10,
                                      marginLeft: 2,

                                      width: largura - 28,
                                      height: 60,
                                      textAlign: 'center',
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        borderLeft: 0,
                                        borderRight: 0,
                                        borderBottom: 0,
                                      }}
                                      mt={
                                        altura > 570
                                          ? altura < 630
                                            ? 3
                                            : 5
                                          : 0
                                      }
                                    >
                                      <Box mt={1}>
                                        {' '}
                                        Central de atendimento:{' '}
                                      </Box>
                                    </Box>
                                  </Typography>
                                </Box>
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  width="100%"
                                  mt={0}
                                >
                                  <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      fontSize: '13px',
                                      color: '#000',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    <Box
                                      mt={
                                        altura > 570
                                          ? altura < 630
                                            ? 0
                                            : 0
                                          : -4
                                      }
                                    >
                                      (92) 9134-4368
                                    </Box>
                                  </Typography>
                                </Box>
                              </Box>

                              <Box
                                mt={1}
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              />

                              <Box
                                mt={0}
                                mb={2}
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              />
                            </Box>
                            <Box
                              mt={altura > 570 ? (altura < 630 ? 6 : 10) : 5}
                              display="flex"
                              width="100%"
                              justifyContent="center"
                            >
                              <Box>
                                <ColorButton
                                  style={{ borderRadius: 16 }}
                                  variant="contained"
                                  value="value"
                                  onClick={handleClose}
                                >
                                  FECHAR
                                </ColorButton>
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* <Drawer variant="persistent" anchor="bottom" open={openDrawerPend2}>
          <Box className={classes.root}>
            <Box>
              <div className="content" ref={ref2} id="comprovante">
                <Box width="100%" mb={1}>
                  <Box {...defaultProps}>
                    <Box mt={-1} ml={0}>
                      <img
                        src="/images/global/informe.png"
                        alt=""
                        width="100%"
                        height={altura}
                      />
                    </Box>
                  </Box>
                </Box>
              </div>
              <Box
                mt={altura > 570 ? (altura < 630 ? 8 : 12) : 0}
                display="flex"
                justifyContent="center"
              >
                <ColorButton
                  style={{ borderRadius: 16 }}
                  variant="contained"
                  value="value"
                  onClick={handleClose}
                >
                  FECHAR
                </ColorButton>
              </Box>
            </Box>
          </Box>
        </Drawer> */}
        <Drawer variant="persistent" anchor="bottom" open={openDrawer}>
          <Box className={classes.root}>
            <Box>
              <div className="content" ref={ref3} id="comprovante">
                <Box width="100%" mb={1}>
                  <Box {...defaultProps}>
                    <Box mt={-1} ml={0}>
                      <img
                        src="/images/global/ticket.png"
                        alt=""
                        width="100%"
                        height={altura}
                      />
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      width="100%"
                      mt={-ajusteAltura - 8}
                      mb={0}
                      sx={{
                        fontSize: '16px',
                        color: '#b91a30',
                        fontWeight: 'bold',
                      }}
                    >
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        style={{
                          fontSize: '16px',
                          color: '#000',
                          fontFamily: 'Arial Black',
                          fontWeight: 'bold',
                        }}
                      >
                        {nome}
                      </Typography>
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
                          color: '#000',
                          fontWeight: 'bold',
                        }}
                      >
                        ADULTOS:{' '}
                        <strong
                          style={{
                            fontSize: '16px',
                            color: 'blue',
                            fontFamily: 'Arial Black',
                            fontWeight: 'bold',
                          }}
                        >
                          {adultos}
                        </strong>
                      </Typography>
                      <Box ml={5} />
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        style={{
                          fontSize: '16px',
                          color: '#000',
                          fontWeight: 'bold',
                        }}
                      >
                        CRIANÇAS:{' '}
                        <strong
                          style={{
                            fontSize: '16px',
                            color: 'blue',
                            fontFamily: 'Arial Black',
                            fontWeight: 'bold',
                          }}
                        >
                          {criancas}
                        </strong>
                      </Typography>
                    </Box>

                    <Box
                      mt={1}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    />

                    <Box
                      mt={0}
                      mb={2}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Box mt={altura < 610 ? 0 : 2}>
                        <QRCode
                          fgColor="#b91a30"
                          size={altura > 610 ? 250 : 180}
                          value={cpf}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </div>
              <Box mt={-4}>
                <GeneratePdf html={ref3} cpf={cpf} />
              </Box>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

export default PesquisaCPF;
