import React from 'react';
import { Box } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import Modal from '@mui/material/Modal';
import TableContainer from '@mui/material/TableContainer';
import { BsMegaphone } from 'react-icons/bs';
import { MdOutlinePublishedWithChanges } from 'react-icons/md';
import { usePWAInstall } from 'react-use-pwa-install';
import { IoGameControllerOutline } from 'react-icons/io5';

import { RiInstallLine } from 'react-icons/ri';
import { useRouter } from 'next/router';

import Avisos from './Avisos';
import Mensagem from './mensagem';
// import PegaSemanaDomingo from 'src/utils/getSemanaDomingo';

const home = ({ perfilUser }) => {
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
  const handleAniversarios = () => {
    router.push({
      pathname: '/aniversariantes',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };
  const handleContribuicoes = () => {
    router.push({
      pathname: '/contribuicoes',
      query: { perfilUser },
    });
  };
  const handleInscricoes = () => {
    router.push({
      pathname: '/inscricoes',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };
  const handleSecretaria = () => {
    router.push({
      pathname: '/secretaria',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };
  const handleQuemSomos = () => {
    router.push({
      pathname: '/quemSomos',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };

  const handleMensagem = () => {
    router.push({
      pathname: '/principal/mensagem',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };
  const handleAtualizar = () => {
    router.push({
      pathname: '/atualizar',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };
  const handlePerfil = () => {
    router.push({
      pathname: '/meuPerfil',
      query: { perfilUser },
    });
  };

  const handleRelatorios = () => {
    router.push({
      pathname: '/relatorio',
      query: { perfilUser },
    });
  };

  const handlePlanejamento = () => {
    router.push({
      pathname: '/planejamento',
      //      query: { idCompra, qrCode, qrCodeCopy },
    });
  };

  const handleMudarPerfil = () => {
    router.push({
      pathname: '/selectPerfil',
    });
  };
  const install = usePWAInstall();
  const checkInstall = () => {
    if (install) {
      install();
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={350}
      bgcolor={corIgreja.principal2}
      height="calc(100vh - 56px)"
    >
      <Box
        mt={0.5}
        width="96%"
        height="97%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
        bgcolor={corIgreja.principal2}
      >
        <TableContainer
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            minHeight: 400,
          }}
        >
          <Box
            display="flex"
            width="100%"
            height="19%"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              onClick={handleMensagem}
              borderRadius={16}
              height="100%"
              width="32%"
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
                    height={35}
                    width={35}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">MENSAGENS</Box>
              </Box>
            </Box>
            <Box
              onClick={handleAvisos}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
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
                  <BsMegaphone size={35} />
                </Box>
                <Box fontSize="12px">AVISOS</Box>
              </Box>
            </Box>
            <Box
              onClick={handleAniversarios}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
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
                    height={35}
                    width={35}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">ANIVERSÁRIOS</Box>
              </Box>
            </Box>
          </Box>
          <Box
            mt={1}
            display="flex"
            width="100%"
            height="19%"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              onClick={handleInscricoes}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
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
                    src="/images/inscricoes.png"
                    height={35}
                    width={35}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">INSCRIÇÕES</Box>
              </Box>
            </Box>
            <Box
              onClick={handleSecretaria}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
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
                    height={35}
                    width={35}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">SECRETARIA</Box>
              </Box>
            </Box>
            <Box
              onClick={handleQuemSomos}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
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
                    height={35}
                    width={35}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">QUEM SOMOS</Box>
              </Box>
            </Box>
          </Box>
          <Box
            mt={1}
            display="flex"
            width="100%"
            height="19%"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              onClick={handlePerfil}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
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
                    src="/images/credencial.png"
                    height={40}
                    width={30}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">MEU PERFIL</Box>
              </Box>
            </Box>
            <Box
              onClick={handleContribuicoes}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
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
                    src="/images/contribuicoes.png"
                    height={35}
                    width={35}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">CONTRIBUIÇÃO</Box>
              </Box>
            </Box>
            <Box
              onClick={handleRelatorios}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
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
                    src="/images/relatorio.png"
                    height={35}
                    width={30}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">RELATÓRIOS</Box>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            width="100%"
            height="19%"
            justifyContent="center"
            alignItems="center"
            mt={1}
          >
            <Box
              onClick={handlePlanejamento}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
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
                    src="/images/planejamento.png"
                    height={35}
                    width={35}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="11px">PLANEJAMENTO</Box>
              </Box>
            </Box>
            <Box
              onClick={handleAtualizar}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
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
                    src="/images/atualizar.png"
                    height={35}
                    width={35}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">ATUALIZAR</Box>
              </Box>
            </Box>
            <Box
              onClick={console.log('ainda será feito')}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
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
                    src="/images/midia2.png"
                    height={35}
                    width={35}
                    alt="bolo"
                  />
                </Box>
                <Box fontSize="12px">MÍDIA</Box>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            width="100%"
            height="19%"
            mt={1}
            justifyContent="center"
            alignItems="center"
          >
            <Box
              onClick={console.log('em desenvolvimento')}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
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
                  <IoGameControllerOutline color="white" size={35} />
                </Box>
                <Box fontSize="12px">JOGOS</Box>
              </Box>
            </Box>
            <Box
              onClick={handleMudarPerfil}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
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
                  <MdOutlinePublishedWithChanges color="white" size={35} />
                </Box>
                <Box fontSize="12px">MUDAR PERFIL</Box>
              </Box>
            </Box>
            <Box
              onClick={checkInstall}
              ml={1}
              borderRadius={16}
              height="100%"
              width="32%"
              minWidth={80}
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
                  <RiInstallLine color="white" size={35} />
                </Box>
                <Box fontSize="12px">INSTALAR</Box>
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
