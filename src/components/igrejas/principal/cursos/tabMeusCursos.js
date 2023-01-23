import * as React from 'react';
import { Box } from '@material-ui/core';

import Espera from 'src/utils/espera';
import useSWR from 'swr';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import ConverteData from 'src/utils/convData2';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function TabCelula({ Ano, perfilUser }) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [meusCursos, setMeusCursos] = React.useState('inicio');

  // para usar semanas

  const rolMembros = perfilUser.RolMembro;
  const url = `/api/consultaMeusCurso/${Ano}/${rolMembros}`;
  const { data: meusCursos2, errorMeusCursos2 } = useSWR(url, fetcher);

  React.useEffect(() => {
    //  mutate(url);
    setMeusCursos('inicio');
  }, [Ano]);

  React.useEffect(() => {
    if (meusCursos2 && meusCursos2.length) {
      setMeusCursos(meusCursos2);
    }
    if (errorMeusCursos2) return <div>An error occured.</div>;
    if (!meusCursos2) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [meusCursos2]);

  return (
    <Box
      height="100%"
      sx={{
        fontFamily: 'arial black',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
      }}
    >
      {meusCursos !== 'inicio' && meusCursos.length ? (
        <Box width="100%" height="100%">
          <TableContainer sx={{ minHeight: 320, height: '60%' }}>
            <Box
              sx={{
                fontFamily: 'arial black',
                borderBottom: '1px solid #000',
              }}
              fontSize="12px"
              height="10.66%"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="30%"
              >
                DATA
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                textAlign="center"
                width="70%"
                sx={{
                  borderLeft: '1px solid #000',
                  borderRight: '1px solid #000',
                }}
              >
                NOME DO CURSO
              </Box>
            </Box>
            {meusCursos.map((row, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    fontFamily: 'arial black',
                    borderBottom: '1px solid #000',
                  }}
                  height="8vh"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    fontSize="12px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="30%"
                  >
                    {row.Data ? ConverteData(row.Data) : '-'}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    textAlign="center"
                    width="70%"
                    sx={{
                      borderLeft: '1px solid #000',
                      borderRight: '1px solid #000',
                    }}
                  >
                    <Box width="96%">{row.Curso ? row.Curso : '-'}</Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </TableContainer>
        </Box>
      ) : (
        <Box
          height="40vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          Sem Registro da Secretaria
        </Box>
      )}
    </Box>
  );
}
