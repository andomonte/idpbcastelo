import * as React from 'react';
import { Box } from '@mui/material';
import SentimentDissatisfiedRoundedIcon from '@mui/icons-material/SentimentDissatisfiedRounded';

const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
};

export default function MensagemErro({ statusDrawer }) {
  let largura = window.innerWidth;

  if (statusDrawer) largura -= 240;

  return (
    <Box display="flex" alignItems="center" mt={8}>
      <Box
        display="flex"
        width={largura - 25}
        mr={1}
        height={350}
        borderRadius={4}
        {...defaultProps}
        justifyContent="center"
      >
        <Box mt={10} textAlign="center">
          <Box>
            <SentimentDissatisfiedRoundedIcon
              style={{ fontSize: 60, color: 'red' }}
            />
          </Box>
          <h1>OCORREU UM ERRO</h1>
          <h1>TENTE MAIS TARDE</h1>
        </Box>
      </Box>
    </Box>
  );
}
