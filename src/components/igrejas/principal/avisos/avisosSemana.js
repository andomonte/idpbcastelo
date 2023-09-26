import React from 'react';
import { Box } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador

import IconButton from '@mui/material/IconButton';

import TableContainer from '@mui/material/TableContainer';

function Mensagem({ dadosAvisos, perfilUser }) {
  const [boletim, setBoletim] = React.useState('');

  const [avisoF, setAvisoF] = React.useState('');
  const [contFonte, setContFonte] = React.useState(16);

  React.useEffect(() => {
    if (boletim) {
      setAvisoF(boletim.conteudo.replace(/font-size/g, 'font-sizes'));
    }
  }, [boletim]);

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
    if (dadosAvisos) {
      let dataMens2 = dadosAvisos.filter(
        (val) => Number(val.Distrito) === Number(perfilUser.Distrito),
      );
      if (!dataMens2.length)
        dataMens2 = dadosAvisos.filter(
          (val) => Number(val.Distrito) === 0 || Number(val.Distrito) === 1,
        );

      setBoletim(dataMens2[dataMens2.length - 1]);
    }
  }, [dadosAvisos]);

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
            backgroundImage: `url('/images/avisos.png')`,
            backgroundPosition: 'center', // centraliza imagem
            backgroundSize: 'cover',
          }}
          display="flex"
          height="15vh"
          minHeight={120}
          width="100%"
        >
          <Box
            height="30%"
            mt={5}
            width="50%"
            display="flex"
            justifyContent="start"
          >
            <IconButton onClick={() => handleIncFonte()}>
              <Box
                style={{
                  color: 'white',
                  fontFamily: 'arial black',
                  fontSize: '16px',
                }}
                ml={5}
                display="flex"
                justifyContent="flex-end"
                width="100%"
              >
                A+
              </Box>
            </IconButton>
          </Box>
          <Box
            mt={0}
            mr={3}
            height="100%"
            width="50%"
            display="flex"
            justifyContent="flex-end"
          >
            <Box
              display="flex"
              justifyContent="end"
              alignItems="center"
              width="100%"
              height="100%"
            >
              <Box
                width="12%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton onClick={() => handleDecFonte()}>
                  <Box
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
                              __html: avisoF,
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      height="65vh"
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
  );
}

export default Mensagem;
