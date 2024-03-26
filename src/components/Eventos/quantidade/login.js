import React from 'react';
import { Box, Typography, Button, TextField } from '@material-ui/core';
import validaAcesso from 'src/utils/validarCodigo';
import { TiArrowBack } from 'react-icons/ti';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import { Oval } from 'react-loading-icons';
// const fetcher = (urls) => axios.get(urls).then((res) => res.data);
import { makeStyles } from '@material-ui/core/styles';
import '@fontsource/rubik';
import '@fontsource/fugaz-one';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador

const useStyles = makeStyles((theme) => ({
  root2: {
    backgroundColor: '#D2691E',
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    height: '12vh',
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
function LoginConv() {
  const router = useRouter();
  const classes = useStyles();
  const [codigoAcesso, setCodigoAcesso] = React.useState('');
  const [acesso, setAcesso] = React.useState('inicio');
  const [espera, setEspera] = React.useState(false);
  const acessoRef = React.useRef();

  const voltar = () => {
    router.push({
      pathname: '/eventoIdpb',
    });
  };
  const handleValida = () => {
    setAcesso(false);

    if (codigoAcesso.length > 3) {
      const valAcesso = validaAcesso(codigoAcesso);

      if (valAcesso) {
        setAcesso(true);
        setEspera(true);
        router.push({
          pathname: '/eventoIdpb/inscritos',
          query: { codigoAcesso },
        });
      } else {
        setCodigoAcesso('');
        acessoRef.current.focus();
      }
    } else {
      acessoRef.current.focus();
    }
  };
  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const formid = event.target.id;
      if (formid === 'Acesso') handleValida();
    }
  };
  return (
    <Box height="100vh" minHeight={500} bgcolor="#D2691E" minWidth={340}>
      <Box display="flex" justifyContent="center">
        <Box>
          <Box height="100vh" width="100vw" mb={0}>
            <Box
              flexDirection="column"
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              minHeight={75}
            >
              <Box height="100%" width="100%">
                <Box
                  mb={2}
                  mt={2}
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  textAlign="center"
                >
                  <Box display="flex" justifyContent="center" width="100%">
                    <AppBar className={classes.root2}>
                      <Box
                        width="90%"
                        minWidth={300}
                        bgcolor="#803300"
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        mt={4}
                        style={{
                          borderTopLeftRadius: 16,
                          borderTopRightRadius: 16,
                        }}
                        ml={0}
                      >
                        <Box
                          display="flex"
                          justifyContent="flex-start"
                          ml={2}
                          width="10%"
                        >
                          <TiArrowBack size={30} onClick={voltar} />
                        </Box>
                        <Box
                          mb={2}
                          mt={2}
                          width="80%"
                          display="flex"
                          justifyContent="center"
                          textAlign="center"
                          minWidth={200}
                        >
                          <img
                            src="/images/idpb.png"
                            alt="Castelo"
                            width={40}
                            height={45}
                          />
                          <Box
                            ml={1}
                            color="white"
                            display="flex"
                            justifyContent="center"
                            flexDirection="column"
                            fontSize="15px"
                            fontFamily="Fugaz One"
                          >
                            <Box width="100%" textAlign="left" mt={0.5}>
                              CONVENÇÃO NACIONAL
                            </Box>
                            <Box width="100%" textAlign="left" mt={-0.5}>
                              2022 ANO DA UNIDADE
                            </Box>
                          </Box>
                        </Box>
                        <Box width="10%" />
                      </Box>
                    </AppBar>

                    <Box
                      height="94vh"
                      minWidth={300}
                      minHeight={470}
                      width="90%"
                      bgcolor="#803300"
                      color="white"
                      fontFamily="Fugaz One"
                      fontSize="16px"
                      style={{
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 16,
                      }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {!espera ? (
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="center"
                        >
                          <Box mt={0} width="100%">
                            <Box mt={0}>
                              <Box
                                mt={2}
                                ml={0}
                                sx={{
                                  fontWeight: 'bold',
                                  fontSize: '10px',
                                }}
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
                                  DIGITE O CÓDIGO DE ACESSO
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
                                    id="Acesso"
                                    type="password"
                                    inputRef={acessoRef}
                                    style={{
                                      borderRadius: 10,
                                      width: '100%',
                                      color: 'black',
                                      background: '#f0f0f0',
                                    }}
                                    className={classes.tf_s}
                                    inputProps={{
                                      style: {
                                        textAlign: 'center',
                                      },
                                    }}
                                    value={codigoAcesso}
                                    variant="outlined"
                                    placeholder="*****"
                                    size="small"
                                    onKeyDown={handleEnter}
                                    onChange={(e) => {
                                      setAcesso('inicio');
                                      setCodigoAcesso(e.target.value);
                                    }}
                                  />
                                  <Box
                                    display={!acesso ? 'flex' : 'none'}
                                    justifyContent="center"
                                    fontFamily="Rubik"
                                    mt={1}
                                    color="yellow"
                                  >
                                    Código Errado!!!
                                  </Box>
                                </Box>
                              </Box>
                            </Box>

                            <Box mt="10vh">
                              <Box
                                mt="5vh"
                                mb={0}
                                display="flex"
                                width="100%"
                                justifyContent="center"
                              >
                                <Box>
                                  <Button
                                    style={{
                                      borderRadius: 16,
                                      background: '#ffdd55',
                                      fontFamily: 'Fugaz One',
                                    }}
                                    variant="contained"
                                    value="value"
                                    onClick={handleValida}
                                  >
                                    Gerar Acesso
                                  </Button>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          mt="0vh"
                          bgcolor="#D2691E"
                          height="96vh"
                          width="100vw"
                          minHeight={570}
                          justifyContent="center"
                          display="flex"
                          alignItems="center"
                        >
                          <Box height="100%">
                            <Box>
                              <Box
                                mt={0}
                                height="94vh"
                                bgcolor="#803300"
                                color="white"
                                fontFamily="Fugaz One"
                                fontSize="16px"
                                style={{
                                  borderBottomLeftRadius: 16,
                                  borderBottomRightRadius: 16,
                                }}
                                // borderRadius={16}

                                width="90vw"
                                // maxWidth={450}
                                minHeight={570}
                                //  maxWidth={400}
                                justifyContent="center"
                                display="flex"
                                alignItems="center"
                                flexDirection="column"
                                //            alignItems="center"
                              >
                                <Box
                                  height="100%"
                                  display="flex"
                                  justifyContent="center"
                                  alignItems="center"
                                  color="white"
                                >
                                  <Box>
                                    <Box>VERIFICANDO...</Box>

                                    <Box
                                      display="flex"
                                      justifyContent="center"
                                      width="100%"
                                      mt="15vh"
                                      mb={-0}
                                      sx={{
                                        fontSize: '12px',

                                        fontWeight: 'bold',
                                      }}
                                    >
                                      <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                        style={{
                                          fontSize: '16px',
                                          fontFamily: 'Fugaz One',
                                        }}
                                      >
                                        <Oval
                                          stroke="white"
                                          width={80}
                                          height={80}
                                        />
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginConv;
