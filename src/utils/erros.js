import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Alert, AlertTitle } from '@material-ui/lab';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 500,
  minWidth: 400,
  bgcolor: '#ffebee',
  boxShadow: 24,
  p: 4,
};
export default function Erros({ descricao, setOpenErro }) {
  const handleClose = () => {
    setOpenErro(false);
  };

  if (descricao === 'banco') {
    return (
      <Modal
        open
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            height="50vh"
            width="100%"
            sx={{ background: '#ffebee' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Alert
              onClose={() => {
                handleClose();
              }}
              severity="error"
            >
              <AlertTitle>ERRO AO FAZER CADASTRO</AlertTitle>
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <strong style={{ textAlign: 'center' }}>
                  Nosso Banco de Dados
                </strong>
                <strong style={{ textAlign: 'center' }}>
                  Está Fora do Ar.
                </strong>
                <strong style={{ textAlign: 'center' }}>
                  Tente novamente, mais tarde.
                </strong>
              </Box>
            </Alert>
          </Box>
        </Box>
      </Modal>
    );
  }
}
