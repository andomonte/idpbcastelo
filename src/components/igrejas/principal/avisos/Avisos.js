import React from 'react';
import { Box } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import IconButton from '@mui/material/IconButton';
import { GiCheckMark } from 'react-icons/gi';
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';
import TableContainer from '@mui/material/TableContainer';

function Avisos({ dadosAvisos }) {
  const [avisos, setAvisos] = React.useState('');

  const d = new Date();
  const anoAtual = Number(d.getFullYear());
  const [contFonte, setContFonte] = React.useState(14);
  const [contSemana, setContSemana] = React.useState(dadosAvisos.length);
  const [contSemanaFix] = React.useState(dadosAvisos.length);
  const [contAno, setContAno] = React.useState(anoAtual);

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
    setAvisos(dadosAvisos[contSemana - 1]);
  }, [contSemana]);

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
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={350}
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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          width="100%"
          display="flex"
          height="15vh"
          minHeight={90}
          bgcolor="#1d3557"
          flexDirection="column"
        >
          <Box width="100%" height="70%" display="flex">
            <Box
              mb={1}
              width="60%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                ml={2}
                mt={2}
                fontFamily="Fugaz One"
                color="orange"
                fontSize="30px"
              >
                AVISOS
              </Box>
            </Box>
            <Box width="40%" display="flex" justifyContent="center">
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
              <IconButton onClick={() => handleDecFonte()}>
                <Box
                  ml={4}
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

          <Box
            height="30%"
            width="100%"
            display="flex"
            justifyContent="flex-end"
          >
            <Box
              mb={1}
              ml={0}
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <Box width="10%" display="flex" justifyContent="center">
                <IconButton onClick={() => handleDecSemana()}>
                  <Box
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
                fontSize="14px"
                ml={-1}
                mr={-1}
                fontFamily="Rubik"
                width="80%"
                display="flex"
                justifyContent="center"
              >
                {avisos ? (
                  <Box display="flex" justifyContent="center">
                    <Box>Domingo</Box>

                    <Box ml={2}>{avisos.ano}</Box>
                  </Box>
                ) : (
                  'Não encontrado'
                )}
              </Box>

              <Box
                width="10%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton onClick={() => handleIncSemana()}>
                  <Box
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
          </Box>
        </Box>
        <Box height="82vh" width="100%" minHeight={400}>
          <TableContainer
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              minHeight: 40,
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
                    justifyContent="center"
                    fontFamily="Fugaz One"
                    sx={{ textAlign: 'justify' }}
                  >
                    {avisos ? (
                      <Box
                        width="94%"
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box width="100%">
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
        </Box>
      </Box>
    </Box>
  );
}

export default Avisos;
