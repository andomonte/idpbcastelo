import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
};
export default function Loading({ statusDrawer }) {
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
            <CircularProgress />
          </Box>
          <h1>Carregando</h1>
        </Box>
      </Box>
    </Box>
  );
}
