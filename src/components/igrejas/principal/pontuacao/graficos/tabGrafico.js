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
  pessoasCel,
  pessoasCeleb,
  periodo,
  setOpenAdulto,
  setOpenCriancas,
  setOpenVisA,
  setOpenVisC,
  setOpenConv,
  setOpenTotal,
  corCel1,
  corCel2,
  corCeleb1,
  corCeleb2,
  tipo,
}) {
  const label1 = `${tipo} Células`;
  const label2 = `${tipo} Celebração`;

  const labels = periodo;
  const data = {
    labels,
    datasets: [
      {
        fill: false,
        label: label1,
        data: pessoasCel,
        borderColor: corCel1,
        backgroundColor: corCel2,
      },
      {
        fill: false,
        label: label2,
        data: pessoasCeleb,
        borderColor: corCeleb1,
        backgroundColor: corCeleb2,
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
                setOpenAdulto(false);
                setOpenCriancas(false);
                setOpenVisA(false);
                setOpenVisC(false);
                setOpenConv(false);
                setOpenTotal(false);
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
