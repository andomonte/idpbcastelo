import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import TamanhoJanela from 'src/utils/screenSize';
import { Oval } from 'react-loading-icons';
import { useRouter } from 'next/router';
import cpfMask from 'src/components/mascaras/cpf';
import { TextField } from '@mui/material';
import ValidaCPF from 'src/utils/validarCPF';
import corIgreja from 'src/utils/coresIgreja';
import 'react-toastify/dist/ReactToastify.css';

import '@fontsource/rubik';
import '@fontsource/fugaz-one';
// Padrões para peso 400.
const useStyles = makeStyles(() => ({
  img: {
    maxWidth: '400px',
    maxHeight: '700px',
    minWidth: '300px',
    minHeight: '500px',
    width: '100vw',
    height: '99vh',
  },
  paper: {
    // backgroundColor: '#DA691D', // theme.palette.background.paper,
    backgroundImage: `url('/images/global/fundo.png')`,
    //    border: '0px solid #000',
    //    boxShadow: theme.shadows[5],
    //  padding: theme.spacing(1, 1, 1),
    backgroundPosition: 'center', // centraliza imagem
    backgroundSize: 'cover', // imagem cobre toda área do div
    height: '100vh',
    width: '100vw',
  },
  tf_s: {
    backgroundColor: '#FFFF',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '10px',
    border: '2px solid #9e9e9e',
  },
  root: {
    height: '100vh',
    // overflow: 'hidden',
    width: '100vw',
    minHeight: 500,
    maxHeight: 700,
    padding: 0,
    margin: 0,
  },
}));

function TelaLogin() {
  // const [newData, setNewData] = React.useState('');

  const altura = TamanhoJanela().height;

  const classes = useStyles();
  const [cpf, setCPF] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const cpfRef = React.useRef();

  const router = useRouter();
  const [adulto, setAdulto] = React.useState(true);

  // if (data) console.log(data);
  function entrarNoJogo() {
    let tipo = 'criança';
    if (adulto) tipo = 'Adulto';

    router.push({
      pathname: '/idpbAM/eventoIdpb/Convencao/iniciaCompra',
      query: {
        cpf,
        tipo,
      },
    });
  }

  const handleValida = () => {
    let valCPF = false;
    const valorCPF = cpf.replace(/\D/g, '');
    if (cpf.length > 0) {
      valCPF = ValidaCPF(valorCPF);

      if (valCPF) entrarNoJogo();
      else {
        setLoading(false);
        toast.info('ESSE CPF NÃO EXISTE !', {
          position: toast.POSITION.TOP_CENTER,
        });
        cpfRef.current.focus();
      }
    } else {
      setLoading(false);
      toast.info('PREENCHA O CAMPO CPF !', {
        position: toast.POSITION.TOP_CENTER,
      });
      cpfRef.current.focus();
    }

    return valCPF;
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const formId = event.target.id;
      if (formId === 'CPF') handleValida();
    }
  };

  //  const janela = TamanhoJanela();
  return (
    <Box
      mt="2vh"
      bgcolor="#9e9e9e"
      height="98vh"
      width="100vw"
      minHeight={500}
      justifyContent="center"
      display="flex"
      alignItems="center"
    >
      <Box>
        <Box>
          <Box
            mt={0}
            bgcolor={corIgreja.principal}
            color="white"
            fontFamily="Fugaz One"
            fontSize="16px"
            style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
            // borderRadius={16}

            height="88vh"
            width="90vw"
            // maxWidth={450}
            minHeight={470}
            //  maxWidth={400}
            justifyContent="center"
            display="flex"
            flexDirection="column"
            //            alignItems="center"
          >
            <Box
              mt={0}
              color="white"
              fontFamily="Fugaz One"
              fontSize="16px"
              borderRadius={16}
              height="63%"
              width="100%"
              minHeight={200}
              justifyContent="center"
              display="flex"
              alignItems="center"
            >
              <Stack
                mt={altura > 650 ? -2 : -4}
                direction="row"
                alignItems="center"
                spacing={0}
              >
                <Box
                  display="flex"
                  mt="1vh"
                  justifyContent="center"
                  flexDirection="row"
                  alignItems="center"
                  height={altura > 590 ? '53vh' : '46vh'}
                  width="100%"
                >
                  <Box>
                    <Box
                      mt={altura > 600 ? '15vh' : '15vh'}
                      height={100}
                      // bgcolor="#fff6d5"
                      width="90vw"
                      //   maxWidth={450}
                      //    maxWidth={400}
                      // mt={-2} // não mexer
                      ml={0}
                      sx={{ fontWeight: 'bold', fontSize: '10px' }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                    >
                      <Typography
                        style={{
                          fontSize: '16px',
                          fontFamily: 'Fugaz One',
                          color: '#fff',
                          marginTop: -0,
                        }}
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        FAÇA SUA INSCRIÇÃO
                      </Typography>
                      <Box
                        color="#AAFFAA"
                        fontSize="12px"
                        fontFamily="Roboto"
                        justifyContent="center"
                        width="100%"
                        display="flex"
                      >
                        Quem Sou?
                      </Box>
                      <Box mt={0}>
                        <Box
                          mt="1vh"
                          mb={0}
                          display="flex"
                          width="100%"
                          justifyContent="center"
                        >
                          <Box>
                            <Box
                              height={35}
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              width={120}
                              onClick={() => {
                                setAdulto(true);
                              }}
                              bgcolor={adulto ? '#ffdd55' : '#f6f6f6'}
                              style={{
                                border: '2px solid #9e9e9e',
                                borderRadius: 6,
                                fontFamily: 'Fugaz One',
                                color: '#000',
                              }}
                            >
                              ADULTO
                            </Box>
                          </Box>
                          <Box ml="6vw">
                            <Box
                              height={35}
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              width={120}
                              onClick={() => {
                                setAdulto(false);
                              }}
                              bgcolor={!adulto ? '#ffdd55' : '#f6f6f6'}
                              style={{
                                border: '2px solid #9e9e9e',
                                borderRadius: 6,
                                fontFamily: 'Fugaz One',
                                color: '#000',
                              }}
                            >
                              MENOR
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      height="100%"
                      width="100%"
                      display="flex"
                      justifyContent="center"
                    >
                      <Box height="100%" mt={0} width="100%">
                        <Box mt="8vh" mb="10vh" height="100%">
                          <Box
                            ml={0}
                            sx={{ fontWeight: 'bold', fontSize: '10px' }}
                            display="flex"
                            justifyContent="center"
                          >
                            <Typography
                              style={{
                                fontFamily: 'Fugaz One',

                                fontSize: '14px',
                                color: 'white',
                              }}
                              variant="caption"
                              display="block"
                              gutterBottom
                            >
                              {!adulto
                                ? 'CPF DO RESPONSÁVEL'
                                : 'DIGITE SEU CPF'}
                            </Typography>
                          </Box>
                          <Box
                            mt={0}
                            width="100%"
                            display="flex"
                            justifyContent="center"
                          >
                            <Box width="100$">
                              <TextField
                                id="CPF"
                                type="tel"
                                inputRef={cpfRef}
                                style={{ width: '100%' }}
                                className={classes.tf_s}
                                inputProps={{
                                  style: {
                                    textAlign: 'center',
                                  },
                                }}
                                value={cpf}
                                variant="outlined"
                                placeholder="999.999.999-99"
                                size="small"
                                onKeyDown={handleEnter}
                                onChange={(e) => {
                                  setCPF(cpfMask(e.target.value));
                                }}
                                onFocus={(e) => setCPF(cpfMask(e.target.value))}
                              />
                            </Box>
                          </Box>
                        </Box>

                        <Box
                          mt={altura > 650 ? '8vh' : '4vh'}
                          mb={altura > 650 ? '8vh' : '4vh'}
                          justifyContent="center"
                          height={80}
                          width="90vw"
                          bgcolor="#fff6d5"
                        >
                          {adulto ? (
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              width="100%"
                              mt={1}
                              ml={0}
                              height={80}
                            >
                              <Box m={1}>
                                <Box display="flex" justifyContent="center">
                                  <Typography
                                    style={{
                                      fontSize: '14px',
                                      color: 'black',
                                      fontFamily: 'Fugaz One',
                                    }}
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    SE DELEGADO
                                  </Typography>
                                </Box>

                                <Box
                                  fontSize="14px"
                                  fontFamily="Rubica"
                                  color="blue"
                                  mt={0}
                                  textAlign="center"
                                >
                                  <Box>Sua inscrição ficará pendente</Box>
                                  <Box>até a autorização do seu pastor</Box>
                                </Box>
                              </Box>
                            </Box>
                          ) : (
                            <Box width="100%" mt={1} ml={0} height={50}>
                              <Box m={1}>
                                <Box display="flex" justifyContent="center">
                                  <Typography
                                    style={{
                                      fontSize: '16px',
                                      color: '#000',
                                      fontFamily: 'Arial Black',
                                      fontWeight: 'bold',
                                    }}
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                  >
                                    ATENÇÃO!!!
                                  </Typography>
                                </Box>

                                <Box
                                  mt={0}
                                  display="flex"
                                  justifyContent="center"
                                >
                                  <Typography
                                    className={classes.texto}
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                    style={{
                                      fontSize: '12px',
                                      color: '#000',
                                      fontFamily: 'Arial Black',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    Apenas Pais Já inscritos
                                  </Typography>
                                </Box>
                              </Box>
                              <Box
                                mt={-1.5}
                                display={adulto ? 'none' : 'flex'}
                                justifyContent="center"
                              >
                                <Typography
                                  className={classes.texto}
                                  style={{
                                    fontSize: '12px',
                                    color: '#000',
                                    fontFamily: 'Arial Black',
                                    fontWeight: 'bold',
                                  }}
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                >
                                  Poderão inscrever seus filhos
                                </Typography>
                              </Box>
                            </Box>
                          )}
                        </Box>
                        <Box width="100%" mt="10vh">
                          <Box
                            mt="5vh"
                            mb={0}
                            display="flex"
                            width="100%"
                            justifyContent="center"
                          >
                            {loading ? (
                              <Box
                                display="flex"
                                width="80%"
                                height={40}
                                justifyContent="center"
                                alignItems="center"
                                style={{
                                  borderRadius: 16,
                                  background: '#ffdd55',
                                  fontFamily: 'Fugaz One',
                                }}
                              >
                                <Oval stroke="black" width={25} height={25} />
                              </Box>
                            ) : (
                              <Button
                                style={{
                                  borderRadius: 16,
                                  background: '#ffdd55',
                                  fontFamily: 'Fugaz One',
                                  width: '80%',
                                  height: 40,
                                }}
                                variant="contained"
                                value="value"
                                onClick={() => {
                                  setLoading(true);
                                  handleValida();
                                }}
                              >
                                FAZER INSCRIÇÃO
                              </Button>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
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
                </Box>
              </Stack>
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default TelaLogin;
