import React from 'react';
import { Box } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import TableContainer from '@mui/material/TableContainer';

const options2 = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Chart.js Pie Chart',
    },
  },
};

export default function App({
  pessoas,
  periodo,
  setOpenLeitura,
  setOpenDisc,
  setOpenEvento,
  setOpenVisitas,
  cor1,
  cor2,
  tipo,
}) {
  const label1 = `${tipo}`;

  const labels = periodo;
  const data = {
    labels,
    datasets: [
      {
        fill: false,
        label: label1,
        data: pessoas,
        borderColor: cor1,
        backgroundColor: cor2,
      },
    ],
  };

  /// ===========================================================
  //= =============================================================

  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="80%">
        <TableContainer sx={{ minHeight: 320, height: '100%' }}>
          <Box mt={3}>
            <Line options={options2} data={data} />
          </Box>
        </TableContainer>
        <Box mt={5} display="flex" width="100%" justifyContent="center">
          <Box
            bgcolor="#fdd835"
            color="black"
            fontSize="16px"
            borderRadius={16}
            fontFamily="Fugaz One"
            alignItems="center"
            height={40}
            width="60%"
            sx={{ cursor: 'pointer' }}
          >
            <Box
              variant="contained"
              value="value"
              display="flex"
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
              onClick={() => {
                setOpenLeitura(false);
                setOpenDisc(false);
                setOpenEvento(false);
                setOpenVisitas(false);
              }}
            >
              FECHAR
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
