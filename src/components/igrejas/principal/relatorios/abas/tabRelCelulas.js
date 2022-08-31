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
  setIndexTabela,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [presSem1, setPresSem1] = React.useState([]);

  //  const [openRelatorio, setOpenRelatorio] = React.useState(false);

  // para usar semanas
  const [contSemana2, setContSemana2] = React.useState(contSemana);

  const [rankGeral, setRankGeral] = React.useState(0);

  const [posicaoRank, setPosicaoRank] = React.useState(0);
  const [posicaoFinal, setPosicaoFinal] = React.useState(0);

  const url1 = `/api/consultaRelatorioCelulasAno/${contSemana2}/${Ano}`;
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
              val.Celula === Number(6) &&
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

  //= ==================================================================

  return (
    <Box height="100%">
      <Box
        bgcolor="#c5e1a5"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height="16.66%"
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
          width="33%"
        >
          SEMANA
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="34%"
          sx={{
            borderLeft: '1px solid #000',
            borderRight: '1px solid #000',
          }}
        >
          DATA
        </Box>
        <Box textAlign="center" width="33%">
          VER
        </Box>
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        height="16.66%"
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
          width="33%"
        >
          {semana1}
        </Box>
        {sem1 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            {dataSem1 && dataSem1.Data ? dataSem1.Data : '-'}{' '}
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          width="33%"
        >
          {presSem1 ? (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => {
                setOpenPlan(true);

                setDataSend(dataSem1);
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
      <Box
        bgcolor="#eeeeee"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        height="16.66%"
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
          width="33%"
        >
          {semana2}
        </Box>
        {sem2 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            {dataSem2 && dataSem2.Data ? dataSem2.Data : '-'}{' '}
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          width="33%"
        >
          {presSem2 ? (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => {
                setOpenPlan(true);

                setDataSend(dataSem2);
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
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        height="16.66%"
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
          width="33%"
        >
          {semana3}
        </Box>
        {sem3 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            {dataSem3 && dataSem3.Data ? dataSem3.Data : '-'}{' '}
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          width="33%"
        >
          {presSem3 ? (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => {
                setOpenPlan(true);

                setDataSend(dataSem3);
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
      <Box
        bgcolor="#eeeeee"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '1px solid #000',
        }}
        height="16.66%"
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
          width="33%"
        >
          {semana4}
        </Box>
        {sem4 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            {dataSem4 && dataSem4.Data ? dataSem4.Data : '-'}
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          width="33%"
        >
          {presSem4 ? (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => {
                setOpenPlan(true);

                setDataSend(dataSem4);
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

      <Box
        sx={{
          fontFamily: 'arial black',
        }}
        height="16.66%"
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
          width="33%"
        >
          {semana5}
        </Box>
        {sem5 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            {dataSem5 && dataSem5.Data ? dataSem5.Data : '-'}
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          width="33%"
        >
          {presSem5 ? (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => {
                setOpenPlan(true);

                setDataSend(dataSem5);
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
  );
}
