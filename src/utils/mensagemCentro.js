import React from 'react';
import { Box } from '@material-ui/core';

function MensagemCental({ mensagem }) {
  return (
    <Box
      height="90vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        <strong> {mensagem} </strong>
      </Box>
    </Box>
  );
}
export default MensagemCental;
