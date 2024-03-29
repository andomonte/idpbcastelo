import * as React from 'react';
import { Box } from '@material-ui/core';
// import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR from 'swr';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import { Oval } from 'react-loading-icons';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { MdScreenSearchDesktop } from 'react-icons/md';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function TabCelula({
  Ano,
  perfilUser,
  contSemana,
  numeroCelula,
  setSendResumo,
  setDadosCelulaSend,
  setValorIndexSend,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [presSem1, setPresSem1] = React.useState([]);
  const [order, setOrder] = React.useState('Celula');

  //  const [openRelatorio, setOpenRelatorio] = React.useState(false);

  // para usar semanas
  const [contSemana2, setContSemana2] = React.useState(contSemana);

  const [rankGeral, setRankGeral] = React.useState(0);
  const [listaFinal, setListaFinal] = React.useState(0);
  const [posicaoRank, setPosicaoRank] = React.useState(0);
  const [posicaoFinal, setPosicaoFinal] = React.useState(0);

  const url1 = `/api/consultaRelatorioCelulas/${contSemana2}`;
  const url2 = `/api/consultaPontuacaoSemana/${contSemana2}`;

  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);
  const { data: pontos, errorPontos } = useSWR(url2, fetcher);

  React.useEffect(() => {
    setPresSem1([]);

    setContSemana2(contSemana);
  }, [contSemana]);

  React.useEffect(() => {
    setPresSem1([]);
    if (sem1) {
      if (sem1 && sem1[0]) {
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const presCelula = sem1.filter(
            (val) =>
              val.Celula === Number(numeroCelula[i]) &&
              val.Distrito === Number(perfilUser.Distrito) &&
              Number(val.Data.slice(6, 10)) === Number(Ano),
          );

          if (presCelula && presCelula[0]) {
            setPresSem1((presSemAtual) => [...presSemAtual, presCelula[0]]);
          } else {
            const semRel = { Celula: numeroCelula[i] };

            setPresSem1((presSemAtual) => [...presSemAtual, semRel]);
          }
        }
      } else
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const semRel = { Celula: numeroCelula[i] };

          setPresSem1((presSemAtual) => [...presSemAtual, semRel]);
        }
    }

    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1]);

  React.useEffect(() => {
    if (pontos) {
      if (pontos.length) {
        setRankGeral(
          pontos.sort((a, b) => {
            if (Number(a.TotalRank) < Number(b.TotalRank)) return 1;
            if (Number(b.TotalRank) < Number(a.TotalRank)) return -1;
            return 0;
          }),
        );
      }
    }
    if (errorPontos) return <div>An error occured.</div>;

    if (!pontos) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [pontos]);

  /* React.useEffect(() => {
    
  }, [pontosSem, pontosSem2, pontosSem3, pontosSem4]); */

  /* if (CelulaAtual.length) {
    const idCelula = CelulaAtual[0].id;
    const index = rankGeral.map((e) => e.id).indexOf(idCelula);

    setRank(index + 1);
  } */
  React.useEffect(() => {
    const listaPosicao = [];
    let contaPosicao = 0;

    if (Object.keys(rankGeral).length > 0) {
      for (let i = 0; i < numeroCelula.length; i += 1) {
        for (let j = 0; j < Object.keys(rankGeral).length; j += 1) {
          if (Number(numeroCelula[i]) === Number(rankGeral[j].Celula)) {
            listaPosicao[contaPosicao] = {
              Celula: numeroCelula[i],
              Posicao: j + 1,
            };

            contaPosicao += 1;
          }
        }
      }
    }

    setPosicaoRank(listaPosicao);
  }, [rankGeral]);

  React.useEffect(() => {
    const listaPosicao = [];
    let contaPosicao = 0;
    if (Object.keys(posicaoRank).length > 0) {
      for (let i = 0; i < numeroCelula.length; i += 1) {
        let contaPreenchimento = 0;

        for (let j = 0; j < Object.keys(posicaoRank).length; j += 1) {
          if (Number(numeroCelula[i]) === Number(posicaoRank[j].Celula)) {
            listaPosicao[contaPosicao] = {
              Celula: numeroCelula[i],
              Posicao: posicaoRank[j].Posicao,
            };
            contaPreenchimento += 1;
            contaPosicao += 1;
          }
        }
        if (contaPreenchimento === 0) {
          listaPosicao[contaPosicao] = {
            Celula: numeroCelula[i],
            Posicao: '',
          };

          contaPosicao += 1;
        }
      }
    }

    setPosicaoFinal(listaPosicao);
  }, [posicaoRank]);

  //= ==================================================================
  React.useEffect(() => {
    const listaPosicao = [];
    let dataEvento = 0;

    if (presSem1.length > 0 && Object.keys(posicaoFinal).length > 0) {
      for (let i = 0; i < Object.keys(posicaoFinal).length; i += 1) {
        for (let j = 0; j < presSem1.length; j += 1) {
          if (Number(presSem1[j].Celula) === Number(posicaoFinal[i].Celula)) {
            dataEvento = presSem1[j].Data;
          }
        }
        let pos;
        if (posicaoFinal[i].Posicao === '') pos = 999999999;
        else pos = posicaoFinal[i].Posicao;
        listaPosicao[i] = {
          Celula: posicaoFinal[i].Celula,
          Posicao: pos,
          Data: dataEvento,
        };
      }
    }

    if (pontos) {
      if (pontos.length) {
        setListaFinal(
          listaPosicao.sort((a, b) => {
            if (Number(a[order]) > Number(b[order])) return 1;
            if (Number(b[order]) > Number(a[order])) return -1;
            if (a[order] === '') return 1;
            return 0;
          }),
        );
      }
    }
  }, [posicaoFinal, order]);
  //= ==================================================================

  return (
    <Box>
      <Box
        bgcolor="#80cbc4"
        sx={{
          fontFamily: 'arial black',
          fontSize: '13px',
          borderBottom: '1px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height={40}
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="25%"
          onClick={() => {
            setOrder('Celula');
          }}
        >
          CÉLULA
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="30%"
          sx={{
            borderLeft: '1px solid #000',
            borderRight: '1px solid #000',
          }}
        >
          DATA
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="25%"
          sx={{
            borderRight: '1px solid #000',
          }}
          onClick={() => {
            setOrder('Posicao');
          }}
        >
          RANKING
        </Box>
        <Box textAlign="center" width="20%">
          VER
        </Box>
      </Box>

      {Object.keys(posicaoFinal).length ? (
        <TableContainer
          sx={{ height: '100%', minHeight: 335, maxHeight: '61vh' }}
        >
          {posicaoFinal.map((row, index) => (
            <Box
              mt={0}
              display="flex"
              alignItems="center"
              key={row.Celula}
              height="9vh"
            >
              <Box
                sx={{
                  fontFamily: 'arial black',
                }}
                borderBottom={
                  index + 1 < presSem1.length
                    ? '1px solid #000'
                    : '0px solid #000'
                }
                height="100%"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="25%"
                >
                  {row.Celula}
                </Box>

                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="30%"
                  sx={{
                    borderLeft: '1px solid #000',
                    borderRight: '1px solid #000',
                  }}
                >
                  {presSem1[index].Data ? presSem1[index].Data : '-'}
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="25%"
                  sx={{
                    borderRight: '1px solid #000',
                  }}
                >
                  {posicaoFinal[index] ? (
                    <Box
                      height="100%"
                      color="blue"
                      alignItems="center"
                      justifyContent="center"
                      display="flex"
                    >
                      <Box height="100%">
                        {posicaoFinal[index].Posicao ? (
                          <Box
                            height="100%"
                            color="blue"
                            alignItems="center"
                            justifyContent="center"
                            display="flex"
                          >
                            {posicaoFinal[index].Posicao} º
                          </Box>
                        ) : (
                          ''
                        )}
                      </Box>
                    </Box>
                  ) : (
                    ''
                  )}
                </Box>
                <Box
                  height="100%"
                  display="flex"
                  justifyContent="center"
                  textAlign="center"
                  alignItems="center"
                  width="20%"
                >
                  {presSem1[index].Data ? (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => {
                        setValorIndexSend(index);

                        setDadosCelulaSend(presSem1[index]);
                        setSendResumo(true);
                      }}
                    >
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <MdScreenSearchDesktop size={25} color="green" />
                      </SvgIcon>
                    </IconButton>
                  ) : (
                    '-'
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </TableContainer>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
          textAlign="center"
          width="100%"
        >
          <Box>
            <Box
              fontSize="16px"
              fontFamily="arial black"
              mb={5}
              mt={-2}
              textAlign="center"
            >
              Buscando Dados
            </Box>
            <Oval stroke="blue" width={50} height={50} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
