import React from 'react';
import { Box, Button } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import useSWR from 'swr';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import api from 'src/components/services/api';

import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';
import TableContainer from '@mui/material/TableContainer';
// import PegaSemanaDomingo from 'src/utils/getSemanaDomingo';

const fetcher = (url) => axios.get(url).then((res) => res.data);
// import { useRouter } from 'next/router';

function Mensagem({ setOpenMensagem }) {
  //  const classes = useStyles();
  // somente letras  const zapOnlyLetters = userIgrejas[0].contatoWhatsApp.replace(/[^a-z]+/gi, '').split('');
  const [boletim, setBoletim] = React.useState('');

  const d = new Date();
  const anoAtual = Number(d.getFullYear());
  const [contFonte, setContFonte] = React.useState(16);
  const [contSemana, setContSemana] = React.useState(0);
  const [contSemanaFix, setContSemanaFix] = React.useState(0);
  const [contAno, setContAno] = React.useState(anoAtual);

  const url = `/api/consultaBoletim`;

  const { data, error } = useSWR(url, fetcher);

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
      contSemanaAtual = contSemanaFix;
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
    if (contSemana > 0)
      api
        .post('/api/consultaBoletim2', {
          id: Number(contSemana),
        })
        .then((response) => {
          if (response) {
            // enviarPontuacao();
            setBoletim(response.data);
          }
        })
        .catch((err1) => {
          console.log('erros', err1);
        });
  }, [contSemana]);

  React.useEffect(() => {
    if (data) {
      setContSemana(Number(data));
      setContSemanaFix(Number(data));
    }
    if (error) return <div>An error occured.</div>;
    if (!data) return <div>Loading ...</div>;

    return 0;
  }, [data]);

  const ponto = [];
  const conteudo = [];
  if (!ponto.length && boletim) {
    if (boletim.ponto1) {
      ponto[0] = boletim.ponto1;
      conteudo[0] = boletim.conteudo1;
    }
    if (boletim.ponto1) {
      ponto[1] = boletim.ponto2;
      conteudo[1] = boletim.conteudo2;
    }

    if (boletim.ponto3) {
      ponto[2] = boletim.ponto3;
      conteudo[2] = boletim.conteudo3;
    }
    if (boletim.ponto4) {
      ponto[3] = boletim.ponto4;
      conteudo[3] = boletim.conteudo4;
    }
    if (boletim.ponto5) {
      ponto[4] = boletim.ponto5;
      conteudo[4] = boletim.conteudo5;
    }
    if (boletim.ponto6) {
      ponto[5] = boletim.ponto6;
      conteudo[5] = boletim.conteudo6;
    }
    if (boletim.ponto7) {
      ponto[6] = boletim.ponto7;
      conteudo[6] = boletim.conteudo7;
    }
    if (boletim.ponto8) {
      ponto[7] = boletim.ponto8;
      conteudo[7] = boletim.conteudo8;
    }
    if (boletim.ponto9) {
      ponto[8] = boletim.ponto9;
      conteudo[8] = boletim.conteudo9;
    }
    if (boletim.ponto10) {
      ponto[9] = boletim.ponto10;
      conteudo[9] = boletim.conteudo10;
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100vw"
      minHeight={570}
      bgcolor={corIgreja.principal2}
      height="100vh"
    >
      <Box
        width="96%"
        // maxWidth={450}

        bgcolor={corIgreja.secundaria}
        height="96%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
        mt={1.5}
      >
        <Box
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundImage: `url('/images/castelo/mensagem.png')`,
            backgroundPosition: 'center', // centraliza imagem
            backgroundSize: 'cover',
          }}
          display="flex"
          height="12vh"
        >
          <Box
            flexDirection="column"
            width="100%"
            display="flex"
            justifyContent="flex-end"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <Box width="100%" display="flex" justifyContent="flex-end">
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
                    <MdOutlineArrowLeft size={45} />
                  </Box>
                </IconButton>
              </Box>
              <Box fontFamily="Fugaz One" color="white" mt={-0.3}>
                {contSemana}
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <IconButton onClick={() => handleIncSemana()}>
                  <Box
                    mt={-1}
                    style={{
                      color: 'white',
                      fontFamily: 'arial black',
                      fontSize: '16px',
                    }}
                    display="flex"
                    justifyContent="flex-end"
                    width="100%"
                  >
                    <MdOutlineArrowRight size={45} />
                  </Box>
                </IconButton>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <Box
                mt={2}
                ml="8vw"
                style={{
                  color: 'white',
                  fontFamily: 'arial black',
                  fontSize: '12px',
                }}
                width="100%"
              >
                {boletim ? `Domingo ${boletim.ano}` : 'Não encontrado'}
              </Box>
              <Box
                ml={-4}
                width="100%"
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

              <Box display="flex" justifyContent="center" alignItems="center">
                <IconButton onClick={() => handleDecFonte()}>
                  <Box
                    ml={4}
                    mr={2}
                    style={{
                      color: 'white',
                      fontFamily: 'arial black',
                      fontSize: '16px',
                    }}
                    display="flex"
                    justifyContent="flex-end"
                  >
                    A-
                  </Box>
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <TableContainer
          style={{ width: '96vw', height: '82vh', minHeight: 400 }}
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
                    <Box width="94%">
                      <Box width="100%">
                        <Box
                          mt={2}
                          mb={2}
                          textAlign="center"
                          style={{
                            fontFamily: 'Fugaz One',
                            fontSize: contFonte + 2,
                            width: '100%',
                          }}
                        >
                          {boletim && boletim.titulo}
                        </Box>

                        <Box
                          fontSize={contFonte + 1}
                          textAlign="center"
                          mb={1}
                          fontFamily="Fugaz One"
                        >
                          {boletim && 'INTRODUÇÃO'}
                        </Box>
                        <Box
                          mb={3}
                          fontFamily="Rubik"
                          fontSize={contFonte}
                          sx={{ textAlign: 'justify', textIndent: '30px' }}
                        >
                          {boletim && boletim.introducao}
                        </Box>

                        <Box width="100%" height="100%">
                          {ponto.length &&
                            ponto.map((row, index) => (
                              <Box key={index} mb={3} width="100%">
                                <Box
                                  ml={1}
                                  sx={{
                                    textAlign: 'justify',
                                    textIndent: '10px',
                                  }}
                                  width="100%"
                                  display="flex"
                                  fontSize={contFonte}
                                >
                                  <Box ml={1}>
                                    {ponto[index].substring(
                                      0,
                                      ponto[index].indexOf(' '),
                                    )}{' '}
                                  </Box>

                                  <Box ml={1}>
                                    {ponto[index].substring(
                                      ponto[index].indexOf(' '),
                                    )}{' '}
                                  </Box>
                                </Box>
                                <Box
                                  fontFamily="Rubik"
                                  fontSize={contFonte}
                                  ml={2}
                                  mt={1}
                                  sx={{
                                    textAlign: 'justify',
                                    textIndent: '30px',
                                  }}
                                >
                                  {conteudo[index]}
                                </Box>
                              </Box>
                            ))}
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
                                <Box ml={1}>1.</Box>

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
        <Button
          onClick={() => {
            setOpenMensagem(false);
          }}
        >
          <Box
            width={160}
            height={40}
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius={16}
            bgcolor={corIgreja.principal}
            color="#f0f0f0"
            mr={2}
            ml={2}
            mt={0.3}
            sx={{ fontFamily: 'arial black' }}
          >
            Fechar
          </Box>
        </Button>
      </Box>
    </Box>
  );
}

export default Mensagem;
