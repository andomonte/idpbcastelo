import { Box } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgrejaFiladelfia';

import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import TabLideresCoord from './abas/tabLideresCoord';
import BuscarNome from '../relatorios/supervisor/buscarNome';

function Fucao({ perfilUser, lideranca, rolMembros }) {
  const [buscarNome, setBuscarNome] = React.useState([]);
  const [openBuscar, setOpenBuscar] = React.useState(false);
  const numeroFuncoes = ['Supervisor', 'Lider'];
  const tipoLiderados = ['Supervisões', 'Células'];
  const [contNumeroFucao, setContNumeroFucao] = React.useState(0);
  //= ===================================================================
  const membrosCoordenacao = rolMembros.filter(
    (val) =>
      Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
      Number(val.Distrito) === Number(perfilUser.Distrito),
  );

  const celulasSetorP = lideranca.filter(
    (val) =>
      Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
      Number(val.Distrito) === Number(perfilUser.Distrito) &&
      val.Funcao === numeroFuncoes[contNumeroFucao],
  );
  const numberCelulas = celulasSetorP.map((itens) => itens.Celula);
  const celulaSetor = [...new Set(numberCelulas)];

  const handleIncFucao = () => {
    let contFuncaoAtual = contNumeroFucao + 1;
    if (contFuncaoAtual > numeroFuncoes.length - 1) contFuncaoAtual = 0;
    setContNumeroFucao(contFuncaoAtual);
  };

  const handleDecFucao = () => {
    let contFuncaoAtual = contNumeroFucao - 1;

    if (contFuncaoAtual < 0) contFuncaoAtual = numeroFuncoes.length - 1;
    setContNumeroFucao(contFuncaoAtual);
  };
  return (
    <Box width="100%" height="90vh" minHeight={500} minWidth={300}>
      {!openBuscar ? (
        <Box
          height="100%"
          width="100vw"
          minWidth={300}
          mt={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            minWidth={300}
            height="100%"
            width="100%"
            border="4px solid #fff"
          >
            <Box width="100%" height="100%">
              <Box
                style={{
                  borderRadius: '16px',
                }}
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={350}
                minWidth={300}
                width="100%"
                bgcolor={corIgreja.principal}
                borderTop="2px solid #fff"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  mt={1}
                  mb={1}
                  width="95%"
                  height="100%"
                >
                  <Box justifyContent="center" width="100%" display="flex">
                    <Box
                      mb={2}
                      bgcolor="#fff"
                      height={35}
                      justifyContent="center"
                      width="100%"
                      display="flex"
                      borderRadius={10}
                    >
                      <Box ml={-1.8} width="100%" display="flex">
                        <Box
                          width="20%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleDecFucao();
                            }}
                          >
                            <SvgIcon sx={{ color: corIgreja.iconeOn }} />{' '}
                            <BiCaretLeft />
                          </IconButton>
                        </Box>
                        <Box
                          width="100%"
                          ml={2}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="14px"
                          sx={{ fontFamily: 'arial black' }}
                        >
                          {numeroFuncoes[contNumeroFucao]}
                        </Box>
                        <Box
                          width="20%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleIncFucao();
                            }}
                          >
                            <SvgIcon sx={{ color: corIgreja.iconeOn }} />
                            <BiCaretRight />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box justifyContent="center" width="100%" display="flex">
                    <Box
                      mb={2}
                      bgcolor="#fff"
                      height={35}
                      justifyContent="center"
                      width="48%"
                      display="flex"
                      borderRadius={10}
                    >
                      <Box
                        color="black"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius={10}
                        width="100%"
                        height={30}
                        ml={1}
                        mt={0.3}
                        fontSize="12px"
                      >
                        Total de {tipoLiderados[contNumeroFucao]}:{' '}
                        <Box
                          fontFamily="arial black"
                          fontSize="14px"
                          color="blue"
                          mt={0}
                          ml={1}
                        >
                          {celulaSetor.length}
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      bgcolor="white"
                      color="black"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      borderRadius={10}
                      width="50%"
                      height={35}
                      ml={1}
                      mt={0}
                      fontSize="12px"
                    >
                      Total de Membros:{' '}
                      <Box
                        fontSize="14px"
                        fontFamily="arial black"
                        color="blue"
                        mt={0}
                        ml={1}
                      >
                        {membrosCoordenacao.length}
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    height="75%"
                    minHeight={315}
                    display="flex"
                    bgcolor="#fafafa"
                    width="100%"
                    borderRadius={16}
                  >
                    <TabLideresCoord
                      setBuscarNome={setBuscarNome}
                      perfilUser={perfilUser}
                      lideranca={lideranca}
                      setOpenBuscar={setOpenBuscar}
                      Funcao={numeroFuncoes[contNumeroFucao]}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <BuscarNome perfilUser={buscarNome} setOpenBuscar={setOpenBuscar} />
      )}
    </Box>
  );
}

export default Fucao;
