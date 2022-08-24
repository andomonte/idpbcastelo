import React from 'react';
import { Box, Button } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import useSWR from 'swr';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import api from 'src/components/services/api';

import { GiCheckMark } from 'react-icons/gi';
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';
import TableContainer from '@mui/material/TableContainer';
// import PegaSemanaDomingo from 'src/utils/getSemanaDomingo';

const fetcher = (url) => axios.get(url).then((res) => res.data);
// import { useRouter } from 'next/router';

function Avisos({ setOpenAviso }) {
  //  const classes = useStyles();
  // somente letras  const zapOnlyLetters = userIgrejas[0].contatoWhatsApp.replace(/[^a-z]+/gi, '').split('');
  const [avisos, setAvisos] = React.useState('');

  const d = new Date();
  const anoAtual = Number(d.getFullYear());
  const [contFonte, setContFonte] = React.useState(14);
  const [contSemana, setContSemana] = React.useState(0);
  const [contSemanaFix, setContSemanaFix] = React.useState(0);
  const [contAno, setContAno] = React.useState(anoAtual);

  const url = `/api/consultaAvisos`;

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
        .post('/api/consultaAvisos2', {
          id: Number(contSemana),
        })
        .then((response) => {
          if (response) {
            // enviarPontuacao();
            setAvisos(response.data);
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
  if (!ponto.length && avisos) {
    if (avisos.avisos1) {
      ponto[0] = avisos.avisos1;
      conteudo[0] = avisos.conteudo1;
    }
    if (avisos.avisos1) {
      ponto[1] = avisos.avisos2;
      conteudo[1] = avisos.conteudo2;
    }

    if (avisos.avisos3) {
      ponto[2] = avisos.avisos3;
      conteudo[2] = avisos.conteudo3;
    }
    if (avisos.avisos4) {
      ponto[3] = avisos.avisos4;
      conteudo[3] = avisos.conteudo4;
    }
    if (avisos.avisos5) {
      ponto[4] = avisos.avisos5;
      conteudo[4] = avisos.conteudo5;
    }
    if (avisos.avisos6) {
      ponto[5] = avisos.avisos6;
      conteudo[5] = avisos.conteudo6;
    }
    if (avisos.avisos7) {
      ponto[6] = avisos.avisos7;
      conteudo[6] = avisos.conteudo7;
    }
    if (avisos.avisos8) {
      ponto[7] = avisos.avisos8;
      conteudo[7] = avisos.conteudo8;
    }
    if (avisos.avisos9) {
      ponto[8] = avisos.avisos9;
      conteudo[8] = avisos.conteudo9;
    }
    if (avisos.avisos10) {
      ponto[9] = avisos.avisos10;
      conteudo[9] = avisos.conteudo10;
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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            backgroundImage: `url('/images/filadelfia/imgAvisos.png')`,
            backgroundSize: '100% 100%',
          }}
          display="flex"
          height="22vh"
        >
          <Box
            flexDirection="column"
            width="100%"
            display="flex"
            justifyContent="flex-end"
          >
            <Box
              ml={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <Box width="100%" display="flex" justifyContent="flex-end">
                <IconButton onClick={() => handleDecSemana()}>
                  <Box
                    mt={2}
                    style={{
                      color: 'white',
                      fontFamily: 'arial black',
                      fontSize: '16px',
                    }}
                    display="flex"
                    width="100%"
                  >
                    <MdOutlineArrowLeft color="#fafafa" size={55} />
                  </Box>
                </IconButton>
              </Box>
              <Box
                color="#fafafa"
                fontSize="16px"
                ml={-1}
                mr={-1}
                fontFamily="Fugaz One"
                mt={2.5}
              >
                {contSemana}
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <IconButton onClick={() => handleIncSemana()}>
                  <Box
                    mt={2}
                    style={{
                      color: '#fafafa',
                      fontFamily: 'arial black',
                      fontSize: '22px',
                    }}
                    display="flex"
                    justifyContent="flex-end"
                    width="100%"
                  >
                    <MdOutlineArrowRight size={55} />
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
                mt="15vh"
                ml="2vw"
                style={{
                  color: 'white',
                  fontFamily: 'arial black',
                  fontSize: '12px',
                }}
                width="100%"
              >
                {avisos ? `Domingo ${avisos.ano}` : 'Não encontrado'}
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
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '88vh',
            minHeight: 400,
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
          >
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
                  {avisos ? (
                    <Box
                      width="94%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box width="100%">
                        <Box
                          mb={2}
                          fontFamily="Rubik"
                          fontSize={contFonte}
                          sx={{ textAlign: 'justify', textIndent: '30px' }}
                        >
                          {avisos && avisos.introducao}
                        </Box>

                        <Box width="100%" height="100%">
                          {ponto.length &&
                            ponto.map((row, index) => (
                              <Box key={index} mb={5} width="100%">
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
                                    <GiCheckMark color="green" size={15} />{' '}
                                  </Box>

                                  <Box ml={1}>
                                    {ponto[index].toUpperCase()}{' '}
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
                      SEM AVISOS REGISTRADO NESSA SEMANA
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </TableContainer>

        <Button
          onClick={() => {
            setOpenAviso(false);
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

export default Avisos;
