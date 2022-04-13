import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Box from '@material-ui/core/Box';

import { BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

export default function TabDiscipuado({ rolMembros, perfilUser }) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [respostas, setRespostas] = React.useState({});
  const dados = rolMembros.filter(
    (val) => Number(val.Celula) === Number(perfilUser.Celula),
  );
  console.log(dados, perfilUser.Celula);
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
      {dados.map((row, index) => (
        <Box
          mt={0}
          bgcolor={Object.keys(respostas).length && respostas[index]}
          display="flex"
          alignItems="center"
          key={row.Nome}
          height={40}
          sx={{ borderBottom: '2px solid #00a' }}
        >
          <Box display="flex" width="100%">
            <Box width="100%" display="flex" alignItems="center" ml={1}>
              {row.Nome}
            </Box>
            <Box width="10%" display="flex" alignItems="center" ml={1}>
              {dados[index].Nascimento}
            </Box>
          </Box>
        </Box>
      ))}
    </Paper>
  );
}
