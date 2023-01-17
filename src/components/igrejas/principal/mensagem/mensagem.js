import React from 'react';
import { Box } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador

import IconButton from '@mui/material/IconButton';

import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';
import TableContainer from '@mui/material/TableContainer';

function Mensagem({ mensagem }) {
  const [boletim, setBoletim] = React.useState('');
  const [dataBr, setDataBr] = React.useState('');
  const d = new Date();
  const anoAtual = Number(d.getFullYear());
  const [contFonte, setContFonte] = React.useState(16);
  const [contSemana, setContSemana] = React.useState(mensagem.length);
  const [contSemanaFix] = React.useState(mensagem.length);
  const [contAno, setContAno] = React.useState(anoAtual);

  // const diaBr = Number(d.getDate());
  // const mesBr = Number(d.getMonth());
  // const anoBr = Number(d.getFullYear());
  // const dataBr = `${diaBr}/${mesBr}/${anoBr}`;

  const handleIncSemana = () => {
    let contSemanaAtual = contSemana + 1;
    if (contSemanaAtual > contSemanaFix) {
      contSemanaAtual = contSemanaFix;
    }
    setContSemana(contSemanaAtual);
  };
  const handleDecSemana = () => {
    let contSemanaAtual = contSemana - 1;
    if (contSemanaAtual < 1) {
      contSemanaAtual = 1;
      setContAno(contAno - 1);
    }
    setContSemana(contSemanaAtual);
  };

  const handleIncFonte = () => {
    let contFonteAtual = contFonte + 1;
    if (contFonteAtual > 24) contFonteAtual = 24;
    setContFonte(contFonteAtual);
  };

  const handleDecFonte = () => {
    let contFonteAtual = contFonte - 1;

    if (contFonteAtual < 8) contFonteAtual = 8;
    setContFonte(contFonteAtual);
  };

  React.useEffect(() => {
    setBoletim(mensagem[contSemana - 1]);
    const diaSemana = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];
    const diaMensagem = new Date(mensagem[contSemana - 1].Data);
    diaMensagem.setHours(diaMensagem.getHours() + 6);

    const diaSm = Number(diaMensagem.getDay());
    const diaBr = Number(diaMensagem.getDate());
    let mesBr = Number(diaMensagem.getMonth() + 1);
    if (mesBr < 10) mesBr = `0${mesBr}`;
    const anoBr = Number(diaMensagem.getFullYear());
    const dataBrTemp = `${diaSemana[diaSm]}  ${diaBr}/${mesBr}/${anoBr}`;

    setDataBr(dataBrTemp);
  }, [contSemana]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={300}
      bgcolor={corIgreja.principal2}
      height="calc(100vh - 56px)"
    >
      <Box
        width="96%"
        // maxWidth={450}

        bgcolor={corIgreja.secundaria}
        height="97%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
      >
        <Box
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundImage: `url('/images/filadelfia/mensagem2.png')`,
            backgroundPosition: 'center', // centraliza imagem
            backgroundSize: 'cover',
          }}
          display="flex"
          flexDirection="column"
          height="15vh"
          minHeight={120}
          width="100%"
        >
          <Box
            width="99%"
            mt={5}
            color="white"
            fontSize="25px"
            fontFamily="Fugaz One"
            display="flex"
            justifyContent="center"
          >
            <Box width="86%" textAlign="center">
              MENSAGEM
            </Box>
            <Box
              height="100%"
              width="12%"
              display="flex"
              justifyContent="flex-end"
            >
              <IconButton onClick={() => handleIncFonte()}>
                <Box
                  style={{
                    color: 'white',
                    fontFamily: 'arial black',
                    fontSize: '16px',
                  }}
                  display="flex"
                  justifyContent="flex-end"
                  width="100%"
                >
                  A+
                </Box>
              </IconButton>
            </Box>
          </Box>

          <Box
            height="100%"
            flexDirection="column"
            width="100%"
            display="flex"
            justifyContent="flex-end"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="98%"
              height="100%"
            >
              <Box
                height="100%"
                style={{
                  color: 'white',
                  fontFamily: 'arial black',
                  fontSize: '12px',
                }}
                width="80%"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  ml={2}
                  height="100%"
                >
                  <Box
                    height="100%"
                    width="10%"
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <IconButton onClick={() => handleDecSemana()}>
                      <Box
                        mt={-1}
                        style={{
                          color: 'white',
                          fontFamily: 'arial black',
                          fontSize: '16px',
                        }}
                        display="flex"
                        width="100%"
                      >
                        <MdOutlineArrowLeft size={55} color="white" />
                      </Box>
                    </IconButton>
                  </Box>
                  <Box
                    width="80%"
                    fontFamily="Fugaz One"
                    color="white"
                    mt={-0.3}
                    ml={-3}
                    display="flex"
                    justifyContent="center"
                  >
                    {dataBr ? `${dataBr}` : 'Não encontrado'}
                  </Box>
                  <Box
                    width="10%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton onClick={() => handleIncSemana()}>
                      <Box
                        mt={-1}
                        style={{
                          color: 'white',
                          fontFamily: 'arial black',
                          fontSize: '14px',
                        }}
                        display="flex"
                        justifyContent="flex-end"
                        width="100%"
                      >
                        <MdOutlineArrowRight size={55} color="white" />
                      </Box>
                    </IconButton>
                  </Box>
                </Box>{' '}
              </Box>
              <Box width="8%" />
              <Box
                height="100%"
                width="12%"
                display="flex"
                justifyContent="flex-end"
              >
                <IconButton onClick={() => handleDecFonte()}>
                  <Box
                    ml={0}
                    mr={0}
                    style={{
                      color: 'white',
                      fontFamily: 'arial black',
                      fontSize: '16px',
                    }}
                    display="flex"
                    justifyContent="flex-end"
                    width="100%"
                  >
                    A-
                  </Box>
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <TableContainer
          style={{
            minWidth: 280,
            width: '96vw',
            height: '98vh',
            minHeight: 400,
          }}
        >
          <Box height="100%" width="100%">
            <Box height="100%">
              <Box height="100%" mt={0} width="100%">
                <Box
                  height="100%"
                  display="flex"
                  width="100%"
                  mb={1}
                  justifyContent="center"
                  fontFamily="Fugaz One"
                  sx={{ textAlign: 'justify' }}
                >
                  {boletim ? (
                    <Box width="90%" color="black">
                      <Box width="100%">
                        <Box
                          mb={3}
                          fontFamily="Rubik"
                          fontSize={contFonte}
                          sx={{ textAlign: 'justify', textIndent: '30px' }}
                        >
                          <section
                            className="not-found-controller"
                            dangerouslySetInnerHTML={{
                              __html: boletim.Mensagem,
                            }}
                          />
                        </Box>

                        <Box width="100%" height="100%">
                          <Box
                            mt={0}
                            width="100%"
                            fontSize={contFonte}
                            fontFamily="Rubik"
                            borderRadius={16}
                            style={{
                              textAlign: 'justify',

                              border: '2px solid',
                              borderColor: corIgreja.principal,
                            }}
                          >
                            <Box
                              width="100%"
                              display="flex"
                              justifyContent="center"
                            >
                              <Box
                                mt={-1.4}
                                fontSize={16}
                                color={corIgreja.principal}
                                width={200}
                                bgcolor="#fafafa"
                                textAlign="center"
                              >
                                PARA COMPARTILHAR
                              </Box>
                            </Box>
                            <Box ml={1} mt={1} mb={3} width="100%">
                              <Box
                                sx={{
                                  textAlign: 'justify',
                                }}
                                width="100%"
                                display="flex"
                                fontSize={contFonte}
                              >
                                <Box width="85%" ml={1}>
                                  Qual foi a afirmação ou versículo mais
                                  importante que você aprendeu com esta
                                  mensagem?
                                </Box>
                              </Box>
                            </Box>
                            <Box ml={1} mt={1} width="100%">
                              <Box
                                sx={{
                                  textAlign: 'justify',
                                }}
                                width="100%"
                                display="flex"
                                fontSize={contFonte}
                              >
                                <Box ml={1}>2.</Box>

                                <Box width="85%" ml={1}>
                                  O que Deus quer que você faça em resposta ao
                                  que Ele falou a você hoje?
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                          <Box height={10} mt={1} />
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      height="75vh"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      SEM BOLETIM REGISTRADO NESSA SEMANA
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Mensagem;
