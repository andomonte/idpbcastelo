import * as React from 'react';
import { Box } from '@material-ui/core';
// import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR from 'swr';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import { Oval } from 'react-loading-icons';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { MdScreenSearchDesktop } from 'react-icons/md';
import { object } from 'joi';
import { keys } from 'lodash';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function TabCelula({
  perfilUser,
  contSemana,

  setSendResumo,
  setDadosCelulaSend,
  setValorIndexSend,
  Mes,
  Ano,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [relEncontrado, setRelEncontrado] = React.useState([]);
  const [rel, setRel] = React.useState('nada');

  //  const [openRelatorio, setOpenRelatorio] = React.useState(false);

  // para usar semanas
  const [contSemana2, setContSemana2] = React.useState(contSemana);

  const [rankGeral, setRankGeral] = React.useState(0);

  const [posicaoRank, setPosicaoRank] = React.useState(0);
  const [posicaoFinal, setPosicaoFinal] = React.useState(0);

  const url1 = `/api/consultaRelatorioSupervisao/${Mes}/${Ano}`;

  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);

  React.useEffect(() => {
    setRel('nada');
    if (sem1) {
      setRel(sem1);
      if (sem1 && sem1[0]) {
        console.log('rel', sem1);
      }
    }
    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1]);

  //= ==================================================================

  return (
    <Box height="100%">
      <Box
        bgcolor="#80cbc4"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '2px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height="16.66%"
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
          width="25%"
        >
          CÉLULA
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="30%"
          sx={{
            borderLeft: '2px solid #000',
            borderRight: '2px solid #000',
          }}
        >
          DATA
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="25%"
          sx={{
            borderRight: '2px solid #000',
          }}
        >
          RANKING
        </Box>
        <Box textAlign="center" width="20%">
          VER
        </Box>
      </Box>

      {rel !== 'nada' ? (
        <TableContainer sx={{ maxHeight: 290 }}>
          {relEncontrado && Object.keys(relEncontrado).length > 0 ? (
            <Box>
              {relEncontrado.map((row, index) => (
                <Box
                  mt={0}
                  display="flex"
                  alignItems="center"
                  key={row.Celula}
                  height={58}
                >
                  <Box
                    sx={{
                      fontFamily: 'arial black',
                      borderBottom: '2px solid #000',
                    }}
                    height="100%"
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
                      width="25%"
                    >
                      {relEncontrado[index] ? relEncontrado[index].Celula : '-'}
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      textAlign="center"
                      width="30%"
                      sx={{
                        borderLeft: '2px solid #000',
                        borderRight: '2px solid #000',
                      }}
                    >
                      {relEncontrado[index].Data
                        ? relEncontrado[index].Data
                        : '-'}
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      textAlign="center"
                      width="25%"
                      sx={{
                        borderRight: '2px solid #000',
                      }}
                    >
                      {posicaoFinal[index] ? (
                        <Box color="blue" display="flex">
                          <Box>
                            {posicaoFinal[index].Posicao ? (
                              <Box> {posicaoFinal[index].Posicao} º</Box>
                            ) : (
                              ''
                            )}
                          </Box>
                        </Box>
                      ) : (
                        ''
                      )}
                    </Box>
                    <Box
                      height="100%"
                      display="flex"
                      justifyContent="center"
                      textAlign="center"
                      alignItems="center"
                      width="20%"
                    >
                      {relEncontrado[index].Data ? (
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            setValorIndexSend(index);

                            setDadosCelulaSend(relEncontrado[index]);
                            setSendResumo(true);
                          }}
                        >
                          <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                            <MdScreenSearchDesktop size={25} color="green" />
                          </SvgIcon>
                        </IconButton>
                      ) : (
                        '-'
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Box
              height="45vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              Sem relatórios
            </Box>
          )}
        </TableContainer>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80%"
          textAlign="center"
          width="100%"
        >
          <Box>
            <Box
              fontSize="16px"
              fontFamily="arial black"
              mb={5}
              mt={-2}
              textAlign="center"
            >
              Buscando Dados
            </Box>
            <Oval stroke="blue" width={50} height={50} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
