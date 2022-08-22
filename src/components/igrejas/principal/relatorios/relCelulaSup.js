import { Box, Grid } from '@material-ui/core';
import React from 'react';

import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

import PegaSemanaAtual from 'src/utils/getSemanaAtual';
import PegaMes from 'src/utils/getMes';

import Meses from 'src/utils/mesesAbrev';

import TamanhoJanela from 'src/utils/getSize';
import TabCelula from './supervisor/aba/tabRelSuperCelulas';
import TabSetor from './supervisor/aba/tabRelSuperTotal';
import TabResumo from './supervisor/aba/tabResumo';

const janela = TamanhoJanela();
function RelCelula({ perfilUser, lideranca }) {
  //= ================================================================
  const mes = Meses();
  const d = new Date();
  const mesAtual = Number(d.getMonth());
  const anoAtual = Number(d.getFullYear());
  const [contMes, setContMes] = React.useState(mesAtual);
  const [contAno, setContAno] = React.useState(anoAtual);

  const dataAtual = Date.now();
  const semanaAtual = PegaSemanaAtual(dataAtual);

  const [sendResumo, setSendResumo] = React.useState(false);
  const [dadosCelulaSend, setDadosCelulaSend] = React.useState([]);
  const [valorIndexSend, setValorIndexSend] = React.useState([]);
  const [indexTabela, setIndexTabela] = React.useState([]);

  const [contSemana, setContSemana] = React.useState(semanaAtual - 1);

  const lideresSetor = lideranca.sort((a, b) => {
    if (new Date(a.Celula) > new Date(b.Celula)) return 1;
    if (new Date(b.Celula) > new Date(a.Celula)) return -1;
    return 0;
  });

  const celulaSetor = lideresSetor.filter(
    (results) =>
      Number(results.supervisao) === Number(perfilUser.supervisao) &&
      Number(results.Distrito) === Number(perfilUser.Distrito) &&
      results.Funcao === 'Lider',
  );
  const numberCelulas = celulaSetor.map((itens) => itens.Celula);
  const uniqueArr = [...new Set(numberCelulas)];

  const [numeroCelula] = React.useState(uniqueArr);

  const tipo = ['Relatório das Celulas', 'Relatório Geral'];
  const [contTipo, setContTipo] = React.useState(0);
  const handleIncTipo = () => {
    let contTipoAtual = contTipo + 1;

    if (contTipoAtual > 1) {
      contTipoAtual = 0;
    }
    setContTipo(contTipoAtual);
  };
  const handleDecTipo = () => {
    let contTipoAtual = contTipo - 1;

    if (contTipoAtual < 0) {
      contTipoAtual = 1;
    }
    setContTipo(contTipoAtual);
  };

  const handleIncSemana = () => {
    let contSemanaAtual = contSemana + 1;
    if (contSemanaAtual > semanaAtual && contAno === anoAtual) {
      contSemanaAtual = semanaAtual;
    }
    if (contSemanaAtual > 52) {
      contSemanaAtual = 1;
      setContAno(contAno + 1);
    }
    setContMes(PegaMes(contSemanaAtual, anoAtual));

    setContSemana(contSemanaAtual);
  };
  const handleDecSemana = () => {
    let contSemanaAtual = contSemana - 1;
    if (contSemanaAtual < 1) {
      contSemanaAtual = 52;
      setContAno(contAno - 1);
    }
    setContMes(PegaMes(contSemanaAtual, anoAtual));
    setContSemana(contSemanaAtual);
  };
  React.useEffect(() => {}, [contMes]);
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
        width="96%"
        height="97%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
        bgcolor={corIgreja.principal}
      >
        {!sendResumo ? (
          <Box
            style={{
              borderRadius: '16px',
            }}
            height="100%"
            width="100%"
          >
            <Box height="100%">
              <Box
                height="100%"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Box width="96%" mt={-1} ml={1}>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                      <Box height={40} width="100%" display="flex">
                        <Box
                          height="100%"
                          width="10%"
                          display="flex"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleDecSemana();
                            }}
                          >
                            <BiCaretLeft color="white" size={35} />
                          </IconButton>
                        </Box>
                        <Box
                          width="80%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          fontSize="16px"
                          color="white"
                          sx={{ fontFamily: 'Fugaz One' }}
                        >
                          SEM - {contSemana}
                          <Box
                            ml={4}
                            color="white"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            fontSize="16px"
                            sx={{ fontFamily: 'Fugaz One' }}
                          >
                            {mes[contMes].descricao.toLocaleUpperCase()} /{' '}
                            {contAno}
                          </Box>
                        </Box>
                        <Box
                          width="10%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleIncSemana();
                            }}
                          >
                            <BiCaretRight size={35} color="white" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={1} width="96%" ml={1}>
                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                      <Box
                        borderRadius={5}
                        height={40}
                        bgcolor="white"
                        width="100%"
                        display="flex"
                      >
                        <Box
                          width="20%"
                          display="flex"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleDecTipo();
                            }}
                          >
                            <BiCaretLeft
                              size={35}
                              color={corIgreja.principal2}
                            />
                          </IconButton>
                        </Box>
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ fontSize: '14px', fontFamily: 'arial black' }}
                        >
                          {tipo[contTipo]}
                        </Box>
                        <Box
                          width="10%"
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                              handleIncTipo();
                            }}
                          >
                            <BiCaretRight
                              size={35}
                              color={corIgreja.principal2}
                            />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  mt={4}
                  style={{
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                  }}
                  height={janela.height > 570 ? '74%' : '70%'}
                  minWidth={300}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight={250}
                  width="95%"
                >
                  <Box
                    height="100%"
                    minHeight={225}
                    bgcolor="#fafafa"
                    width="100%"
                    borderRadius={16}
                  >
                    {!contTipo ? (
                      <TabCelula
                        perfilUser={perfilUser}
                        Mes={contMes}
                        Ano={contAno}
                        contSemana={contSemana}
                        numeroCelula={numeroCelula}
                        setSendResumo={setSendResumo}
                        setDadosCelulaSend={setDadosCelulaSend}
                        setValorIndexSend={setValorIndexSend}
                        setIndexTabela={setIndexTabela}
                      />
                    ) : (
                      <TabSetor
                        perfilUser={perfilUser}
                        Mes={contMes}
                        Ano={contAno}
                        contSemana={contSemana}
                        numeroCelula={numeroCelula}
                        setSendResumo={setSendResumo}
                        setDadosCelulaSend={setDadosCelulaSend}
                        setValorIndexSend={setValorIndexSend}
                      />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>
            <TabResumo
              perfilUser={perfilUser}
              lideranca={lideranca}
              Mes={contMes}
              Ano={contAno}
              contSemana={contSemana}
              numeroCelula={numeroCelula}
              setSendResumo={setSendResumo}
              dadosCelulaSend={dadosCelulaSend}
              valorIndexSend={valorIndexSend}
              indexTabela={indexTabela}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default RelCelula;
