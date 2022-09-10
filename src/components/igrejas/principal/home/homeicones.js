import React from 'react';
import { Box } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import Modal from '@mui/material/Modal';
import TableContainer from '@mui/material/TableContainer';
import { BsMegaphone } from 'react-icons/bs';
import { useRouter } from 'next/router';
import Avisos from './Avisos';
import Mensagem from './mensagem';

// import PegaSemanaDomingo from 'src/utils/getSemanaDomingo';

const home = () => {
  //  const classes = useStyles();
  // somente letras  const zapOnlyLetters = userIgrejas[0].contatoWhatsApp.replace(/[^a-z]+/gi, '').split('');

  const [openMensagem, setOpenMensagem] = React.useState(false);
  const [openAviso, setOpenAviso] = React.useState(false);
  const router = useRouter();
  const handleAvisos = () => {
    router.push({
      pathname: '/principal/aviso',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };
  const handleMensagem = () => {
    router.push({
      pathname: '/principal/mensagem',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
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
        borderRadius={16}
        bgcolor={corIgreja.principal2}
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
            display="flex"
            width="96%"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              onClick={handleMensagem}
              mt={1}
              borderRadius={16}
              height={120}
              width="30vw"
              minWidth={80}
              mb={1}
              bgcolor={corIgreja.principal}
              display="flex"
              color="white"
              fontFamily="Rubik"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box mb={1}>
                  <img
                    src="/images/biblia.png"
                    height={50}
                    width={50}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">MENSAGENS</Box>
              </Box>
            </Box>
            <Box
              onClick={handleAvisos}
              mt={1}
              ml={2}
              borderRadius={16}
              height={120}
              width="30vw"
              minWidth={80}
              mb={1}
              bgcolor={corIgreja.principal}
              display="flex"
              color="white"
              fontFamily="Rubik"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box mb={1}>
                  <BsMegaphone size={50} />
                </Box>
                <Box fontSize="12px">AVISOS</Box>
              </Box>
            </Box>
            <Box
              onClick={handleAvisos}
              mt={1}
              ml={2}
              borderRadius={16}
              height={120}
              width="30vw"
              minWidth={80}
              mb={1}
              bgcolor={corIgreja.principal}
              display="flex"
              color="white"
              fontFamily="Rubik"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box mb={1}>
                  <img
                    src="/images/bolo.png"
                    height={50}
                    width={50}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">ANIVERSÁRIOS</Box>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            width="96%"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              onClick={handleMensagem}
              mt={1}
              borderRadius={16}
              height={120}
              width="30vw"
              minWidth={80}
              mb={1}
              bgcolor={corIgreja.principal}
              display="flex"
              color="white"
              fontFamily="Rubik"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box mb={1}>
                  <img
                    src="/images/school.png"
                    height={50}
                    width={50}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">CURSOS</Box>
              </Box>
            </Box>
            <Box
              onClick={handleAvisos}
              mt={1}
              ml={2}
              borderRadius={16}
              height={120}
              width="30vw"
              minWidth={80}
              mb={1}
              bgcolor={corIgreja.principal}
              display="flex"
              color="white"
              fontFamily="Rubik"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box mb={1}>
                  <img
                    src="/images/secretaria.png"
                    height={50}
                    width={50}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">SECRETARIA</Box>
              </Box>
            </Box>
            <Box
              onClick={handleAvisos}
              mt={1}
              ml={2}
              borderRadius={16}
              height={120}
              width="30vw"
              minWidth={80}
              mb={1}
              bgcolor={corIgreja.principal}
              display="flex"
              color="white"
              fontFamily="Rubik"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box mb={1}>
                  <img
                    src="/images/quemSomos.png"
                    height={50}
                    width={50}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">QUEM SOMOS</Box>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            width="96%"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              onClick={handleMensagem}
              mt={1}
              borderRadius={16}
              height={120}
              width="30vw"
              minWidth={80}
              mb={1}
              bgcolor={corIgreja.principal}
              display="flex"
              color="white"
              fontFamily="Rubik"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box mb={1}>
                  <img
                    src="/images/school.png"
                    height={50}
                    width={50}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">CREDENCIAL</Box>
              </Box>
            </Box>
            <Box
              onClick={handleAvisos}
              mt={1}
              ml={2}
              borderRadius={16}
              height={120}
              width="30vw"
              minWidth={80}
              mb={1}
              bgcolor={corIgreja.principal}
              display="flex"
              color="white"
              fontFamily="Rubik"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box mb={1}>
                  <img
                    src="/images/secretaria.png"
                    height={50}
                    width={50}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">CONTRIBUIÇÃO</Box>
              </Box>
            </Box>
            <Box
              onClick={handleAvisos}
              mt={1}
              ml={2}
              borderRadius={16}
              height={120}
              width="30vw"
              minWidth={80}
              mb={1}
              bgcolor={corIgreja.principal}
              display="flex"
              color="white"
              fontFamily="Rubik"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box mb={1}>
                  <img
                    src="/images/quemSomos.png"
                    height={50}
                    width={50}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">CELULAS</Box>
              </Box>
            </Box>
          </Box>
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
