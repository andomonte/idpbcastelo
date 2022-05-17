import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Box from '@material-ui/core/Box';
import { MdScreenSearchDesktop } from 'react-icons/md';

export default function TabCelula({
  membroCelula,
  setBuscarNome,
  setOpenBuscar,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  /* // limitar nomes até 30 caracteres ou ultimo espaço antes de 30
const nomes = dadosCelula[0].Lider;
let nomeLider;
if (nomes.length > 30) nomeLider = nomes.substring(0, nomes.lastIndexOf(' '));
else nomeLider = nomes;
 */
  return (
    <Paper
      sx={{
        background: '#fff9',
        width: '98%',
        height: '95%',
        marginLeft: 0.5,
        marginTop: 1,
        overflow: 'hidden',
      }}
    >
      <TableContainer sx={{ maxHeight: 410 }}>
        {membroCelula &&
          membroCelula.map((row, index) => (
            <Box
              mt={0}
              // bgcolor={Object.keys(respostas).length && respostas[index]}
              display="flex"
              alignItems="center"
              key={row.Nome}
              height={40}
              sx={{ borderBottom: '2px solid #00a' }}
            >
              <Box display="flex" width="100%">
                <Box width="100%" display="flex" alignItems="center" ml={1}>
                  {row.Nome.length > 30
                    ? row.Nome.substring(0, row.Nome.lastIndexOf(' '))
                    : row.Nome}
                </Box>

                <Box
                  onClick={() => {
                    setBuscarNome(membroCelula[index]);
                    setOpenBuscar(true);
                  }}
                  width="15%"
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
