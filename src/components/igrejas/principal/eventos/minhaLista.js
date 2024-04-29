import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { Box } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import Avatar from '@mui/material/Avatar';

import { useRouter } from 'next/router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme = createTheme();
theme.typography.hs4 = {
  fontWeight: 'normal',
  fontSize: '10px',
  '@media (min-width:350px)': {
    fontSize: '11px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
theme.typography.hs3 = {
  fontWeight: 'normal',
  fontSize: '12px',
  '@media (min-width:350px)': {
    fontSize: '13px',
  },
  '@media (min-width:400px)': {
    fontSize: '14px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '15px',
  },
};
theme.typography.hs2 = {
  fontWeight: 'normal',
  fontSize: '12px',
  '@media (min-width:350px)': {
    fontSize: '13px',
  },
  '@media (min-width:400px)': {
    fontSize: '14px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '16px',
  },
};

export default function TabCelula({ eventos }) {
  const router = useRouter();
  const handleInscricao = (eventoSelecionado) => {
    if (eventoSelecionado.TipoEvento.toUpperCase() === 'CONVENÇÃO') {
      if (eventoSelecionado.Jurisdicao === 0)
        router.push({
          pathname: '/eventos/convencao',
          query: eventoSelecionado.nomeEvento,
        });
      if (eventoSelecionado.Jurisdicao === 1)
        router.push({
          pathname: '/idpbAM/convencao',
          query: eventoSelecionado,
        });
    } else if (eventoSelecionado.TipoEvento.toUpperCase() === 'REUNIÕES') {
      if (eventoSelecionado.Jurisdicao === 1)
        router.push({
          pathname: '/principal/reunioesAM',
          query: eventoSelecionado,
        });
    } else if (eventoSelecionado.TipoEvento.toUpperCase() === 'ENQUETE')
      router.push({
        pathname: '/idpbAM/enquete',
      });
    else
      router.push({
        pathname: 'eventoIdpb/verTicket2',
        query: { eventoSelecionado: JSON.stringify(eventoSelecionado) },
      });
  };

  return (
    <Paper
      sx={{
        background: '#f0f0f0',
        width: '100%',
        height: 'calc(100%)',
        marginTop: 0,
        overflow: 'hidden',
        borderRadius: 5,
      }}
    >
      <TableContainer sx={{ height: '100%' }}>
        {eventos.map((row, index) => (
          <Box
            mt={3}
            //            bgcolor={Object.keys(respostas).length && respostas[index]}
            display="flex"
            alignItems="center"
            key={index}
          >
            <Box ml={0.5} display="flex" alignItems="center">
              <Avatar
                alt="User"
                src={row.LogoEvento}
                sx={{
                  width: '20vw',
                  maxWidth: 100,
                  height: '20vw',
                  maxHeight: 100,
                }}
              />
            </Box>
            <Box mt={index === 0 ? 2 : 1} ml={-2} mb={index === 0 ? 1 : 0}>
              <Box mt={0} ml={2}>
                <Box fontFamily="Fugaz One" mt={0} ml={2} display="flex">
                  <ThemeProvider theme={theme}>
                    <Typography variant="hs2">
                      {row.nomeEvento
                        ? row.nomeEvento.toLocaleUpperCase()
                        : null}
                    </Typography>
                  </ThemeProvider>
                </Box>
                {row.AutorizacaoPastor ? (
                  <Box ml={2} display="flex">
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs2">
                        <Box display="flex">
                          <Box>
                            <Box display="flex">
                              <Box
                                color="#781008"
                                ml={0}
                                fontFamily="Fugaz One"
                              >
                                {'se for membro Precisa de Autorização do '.toLocaleUpperCase()}
                              </Box>
                            </Box>
                            <Box display="flex">
                              <Box
                                color="#781008"
                                ml={0}
                                fontFamily="Fugaz One"
                              >
                                {'Pastor da igreja Local'.toLocaleUpperCase()}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Typography>
                    </ThemeProvider>
                  </Box>
                ) : null}
                <Box ml={2} display="flex">
                  <ThemeProvider theme={theme}>
                    <Typography variant="hs3">
                      <Box>
                        <Box display="flex" color={corIgreja.principal2}>
                          <Box color="#1a237e" ml={0} fontFamily="Fugaz One">
                            {row.Local.toLocaleUpperCase()}
                          </Box>
                        </Box>
                      </Box>
                    </Typography>
                  </ThemeProvider>
                </Box>

                <Box
                  width="100%"
                  mt={1}
                  mb={0}
                  display="flex"
                  justifyContent="flex-start"
                  ml={0}
                >
                  <ThemeProvider theme={theme}>
                    <Typography variant="hs2">
                      <Box
                        ml={2}
                        mt={0}
                        onClick={() => {
                          handleInscricao(row);
                        }}
                        style={{
                          width: '100%',
                          color: 'blue',
                          fontFamily: 'Fugaz One',
                        }}
                        sx={{ cursor: 'pointer' }}
                      >
                        VER MINHA INSCRIÇÃO
                      </Box>
                    </Typography>
                  </ThemeProvider>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </TableContainer>
    </Paper>
  );
}
