import React from 'react';
import { Box } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import Modal from '@mui/material/Modal';
import TableContainer from '@mui/material/TableContainer';
import Avisos from './Avisos';
import Mensagem from './mensagem';
// import PegaSemanaDomingo from 'src/utils/getSemanaDomingo';

const home = () => {
  //  const classes = useStyles();
  // somente letras  const zapOnlyLetters = userIgrejas[0].contatoWhatsApp.replace(/[^a-z]+/gi, '').split('');

  const [openMensagem, setOpenMensagem] = React.useState(false);
  const [openAviso, setOpenAviso] = React.useState(false);

  const handleAvisos = () => {
    setOpenAviso(true);
  };
  const handleMensagem = () => {
    setOpenMensagem(true);
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100vw"
      minHeight={570}
      bgcolor={corIgreja.principal}
      height="90.8vh"
    >
      <Box
        width="96%"
        maxWidth={450}
        borderRadius={16}
        bgcolor="#f0f0f0"
        height="96%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        ml={0}
        mt={1.5}
      >
        <TableContainer
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            height: 'auto',
            minHeight: 400,
          }}
        >
          <Box
            onClick={handleAvisos}
            mt={1}
            width="90vw"
            minHeight={127}
            minWidth={300}
            maxWidth={420}
            mb={1}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              backgroundImage: `url('/images/filadelfia/imgAvisos.png')`,
              backgroundSize: '100% 100%',
              //  backgroundSize: 'cover',
            }}
          />
          <Box
            onClick={handleMensagem}
            mt={1}
            width="90vw"
            maxWidth={420}
            minHeight={127}
            minWidth={300}
            mb={1}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              backgroundImage: `url('/images/filadelfia/imgMensagem.png')`,
              backgroundSize: '100% 100%',
              //  backgroundSize: 'cover',
            }}
          />
          <Box
            mt={1}
            width="90vw"
            maxWidth={420}
            minHeight={127}
            minWidth={300}
            mb={1}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              backgroundImage: `url('/images/filadelfia/imgAniversariantes.png')`,
              backgroundSize: '100% 100%',
              //  backgroundSize: 'cover',
            }}
          />
        </TableContainer>
      </Box>
      {openAviso && (
        <Modal
          open={openAviso}
          //  onClose={!openAviso}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Avisos setOpenAviso={setOpenAviso} />
        </Modal>
      )}
      {openMensagem && (
        <Modal
          open={openMensagem}
          //  onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Mensagem setOpenMensagem={setOpenMensagem} />
        </Modal>
      )}
    </Box>
  );
};

export default home;
