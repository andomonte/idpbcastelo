import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Box from '@material-ui/core/Box';
import { MdScreenSearchDesktop } from 'react-icons/md';

export default function TabCelula({
  lideranca,
  perfilUser,
  setBuscarNome,
  setOpenBuscar,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const lideresParcial = lideranca.filter(
    (val) =>
      Number(val.supervisao) === Number(perfilUser.supervisao) &&
      Number(val.Distrito) === Number(perfilUser.Distrito) &&
      val.Funcao === 'Lider',
  );

  const lideresSetor = lideresParcial.sort((a, b) => {
    if (new Date(a.Celula) > new Date(b.Celula)) return 1;
    if (new Date(b.Celula) > new Date(a.Celula)) return -1;
    return 0;
  });

  return (
    <Paper
      sx={{
        background: '#fff9',
        width: '100%',
        height: '100%',
        borderRadius: 5,
        overflow: 'hidden',
      }}
    >
      <TableContainer sx={{ maxHeight: '100%' }}>
        {lideresSetor &&
          lideresSetor.map((row, index) => (
            <Box
              mt={0}
              // bgcolor={Object.keys(respostas).length && respostas[index]}
              display="flex"
              alignItems="center"
              key={row.id}
              height={40}
              sx={{ borderBottom: '1px solid #00a' }}
            >
              <Box display="flex" width="100%">
                <Box width="100%" display="flex" alignItems="center" ml={1}>
                  {row.Celula} -{' '}
                  {row.Nome.length > 30
                    ? row.Nome.substring(0, row.Nome.lastIndexOf(' '))
                    : row.Nome}
                </Box>
                <Box
                  onClick={() => {
                    setBuscarNome(lideresSetor[index]);
                    setOpenBuscar(true);
                  }}
                  width="10%"
                  display="flex"
                  alignItems="center"
                  ml={1}
                >
                  <MdScreenSearchDesktop size={25} color="green" />
                </Box>
              </Box>
            </Box>
          ))}
      </TableContainer>
    </Paper>
  );
}
