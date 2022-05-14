import * as React from 'react';
import { Box } from '@material-ui/core';
import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { BsFillEmojiSmileFill, BsFillEmojiFrownFill } from 'react-icons/bs';
import { Oval } from 'react-loading-icons';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { MdScreenSearchDesktop } from 'react-icons/md';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function TabCelula({ Mes, Ano, perfilUser, numeroCelula }) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));
  console.log(numeroCelula);
  const [presSem1, setPresSem1] = React.useState(false);
  const [dataSem1, setDataSem1] = React.useState([]);
  const [presSem2, setPresSem2] = React.useState([]);
  const [dataSem2, setDataSem2] = React.useState([]);
  const [presSem3, setPresSem3] = React.useState([]);
  const [dataSem3, setDataSem3] = React.useState([]);
  const [presSem4, setPresSem4] = React.useState([]);
  const [dataSem4, setDataSem4] = React.useState([]);
  const [presSem5, setPresSem5] = React.useState([]);
  const [dataSem5, setDataSem5] = React.useState([]);
  const semana = PegaSemana(Mes, Ano);
  // para usar semanas

  const semana1 = semana;
  const semana2 = semana + 1;
  const semana3 = semana + 2;
  const semana4 = semana + 3;
  const semana5 = semana + 4;

  const url1 = `/api/consultaRelatorioCelulas/${semana1}`;
  const url2 = `/api/consultaRelatorioCelulas/${semana2}`;
  const url3 = `/api/consultaRelatorioCelulas/${semana3}`;
  const url4 = `/api/consultaRelatorioCelulas/${semana4}`;
  const url5 = `/api/consultaRelatorioCelulas/${semana5}`;
  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);
  const { data: sem2, errorSem2 } = useSWR(url2, fetcher);
  const { data: sem3, errorSem3 } = useSWR(url3, fetcher);
  const { data: sem4, errorSem4 } = useSWR(url4, fetcher);
  const { data: sem5, errorSem5 } = useSWR(url5, fetcher);

  React.useEffect(() => {
    mutate(url1);
    mutate(url2);
    mutate(url3);
    mutate(url4);
    mutate(url5);
    setDataSem1([]);
    setPresSem1([]);
    setDataSem2([]);
    setPresSem2([]);
    setDataSem3([]);
    setPresSem3([]);
    setDataSem4([]);
    setPresSem4([]);
    setDataSem5([]);
    setPresSem5([]);
  }, [semana]);

  React.useEffect(() => {
    if (sem1 && sem1.length) {
      const presCelula = sem1.filter(
        (val) =>
          val.Celula === Number(numeroCelula) &&
          val.Distrito === Number(perfilUser.Distrito) &&
          Number(val.Data.slice(6, 10)) === Number(Ano),
      );

      if (presCelula.length) {
        setPresSem1(presCelula);
      }
    }
    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1, numeroCelula]);

  React.useEffect(() => {
    if (sem2 && sem2.length) {
      const presCelula = sem2.filter(
        (val) =>
          val.Celula === Number(numeroCelula) &&
          val.Distrito === Number(perfilUser.Distrito) &&
          Number(val.Data.slice(6, 10)) === Number(Ano),
      );

      if (presCelula.length) {
        const nomes = Object.keys(presCelula).map((i) =>
          JSON.parse(presCelula[Number(i)].NomesMembros),
        );

        setDataSem2(presCelula[0].Data);
        const pSem2 = nomes[0].filter(
          (val) =>
            val.Rol === Number(perfilUser.RolMembro) ||
            val.Nome === perfilUser.Nome,
        );
        setPresSem2(pSem2);
      }
    }
    if (errorSem2) return <div>An error occured.</div>;
    if (!sem2) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem2, numeroCelula]);

  React.useEffect(() => {
    if (sem3 && sem3.length) {
      const presCelula = sem3.filter(
        (val) =>
          val.Celula === Number(numeroCelula) &&
          val.Distrito === Number(perfilUser.Distrito) &&
          Number(val.Data.slice(6, 10)) === Number(Ano),
      );
      if (presCelula.length) {
        const nomes = Object.keys(presCelula).map((i) =>
          JSON.parse(presCelula[Number(i)].NomesMembros),
        );
        setDataSem3(presCelula[0].Data);
        const pSem3 = nomes[0].filter(
          (val) => val.Rol === Number(perfilUser.RolMembro),
        );
        setPresSem3(pSem3);
      }
    }
    if (errorSem3) return <div>An error occured.</div>;
    if (!sem3) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem3]);

  React.useEffect(() => {
    if (sem4 && sem4.length) {
      const presCelula = sem4.filter(
        (val) =>
          val.Celula === Number(numeroCelula) &&
          val.Distrito === Number(perfilUser.Distrito) &&
          Number(val.Data.slice(6, 10)) === Number(Ano),
      );
      if (presCelula.length) {
        const nomes = Object.keys(presCelula).map((i) =>
          JSON.parse(presCelula[Number(i)].NomesMembros),
        );
        setDataSem4(presCelula[0].Data);
        const pSem4 = nomes[0].filter(
          (val) => val.Rol === Number(perfilUser.RolMembro),
        );
        setPresSem4(pSem4);
      }
    }
    if (errorSem4) return <div>An error occured.</div>;
    if (!sem4) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem4]);
  React.useEffect(() => {
    if (sem5 && sem5.length) {
      const presCelula = sem5.filter(
        (val) =>
          val.Celula === Number(numeroCelula) &&
          val.Distrito === Number(perfilUser.Distrito) &&
          Number(val.Data.slice(6, 10)) === Number(Ano),
      );
      if (presCelula.length) {
        const nomes = Object.keys(presCelula).map((i) =>
          JSON.parse(presCelula[Number(i)].NomesMembros),
        );
        setDataSem5(presCelula[0].Data);
        const pSem5 = nomes[0].filter(
          (val) => val.Rol === Number(perfilUser.RolMembro),
        );
        setPresSem5(pSem5);
      }
    }
    if (errorSem5) return <div>An error occured.</div>;
    if (!sem5) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem5]);

  return (
    <Box height="100%">
      <Box
        bgcolor="#80cbc4"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '2px solid #000',
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
            borderLeft: '2px solid #000',
            borderRight: '2px solid #000',
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
          borderBottom: '2px solid #000',
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
        {presSem1 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '2px solid #000',
              borderRight: '2px solid #000',
            }}
          >
            {console.log('presSem1', presSem1)}
            {presSem1.length ? presSem1[0].Data : '-'}
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
              borderLeft: '2px solid #000',
              borderRight: '2px solid #000',
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
                //  setOpenPlan(true);
                //  setDataSend(dataSem1);
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
          borderBottom: '2px solid #000',
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
              borderLeft: '2px solid #000',
              borderRight: '2px solid #000',
            }}
          >
            {dataSem2.length ? dataSem2 : '-'}
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
              borderLeft: '2px solid #000',
              borderRight: '2px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box textAlign="center" width="33%">
          {presSem2.length ? (
            <Box>
              {presSem2[0].Presenca ? (
                <BsFillEmojiSmileFill size={25} color="green" />
              ) : (
                <BsFillEmojiFrownFill size={25} color="red" />
              )}
            </Box>
          ) : (
            '-'
          )}
        </Box>
      </Box>
      <Box
        sx={{
          fontFamily: 'arial black',
          borderBottom: '2px solid #000',
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
              borderLeft: '2px solid #000',
              borderRight: '2px solid #000',
            }}
          >
            {dataSem3.length ? dataSem3 : '-'}
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
              borderLeft: '2px solid #000',
              borderRight: '2px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box textAlign="center" width="33%">
          {presSem3.length ? (
            <Box>
              {presSem3[0].Presenca ? (
                <BsFillEmojiSmileFill size={25} color="green" />
              ) : (
                <BsFillEmojiFrownFill size={25} color="red" />
              )}
            </Box>
          ) : (
            '-'
          )}
        </Box>
      </Box>
      <Box
        bgcolor="#eeeeee"
        sx={{
          fontFamily: 'arial black',
          borderBottom: '2px solid #000',
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
        {sem4 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="34%"
            sx={{
              borderLeft: '2px solid #000',
              borderRight: '2px solid #000',
            }}
          >
            {dataSem4.length ? dataSem4 : '-'}
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
              borderLeft: '2px solid #000',
              borderRight: '2px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box textAlign="center" width="33%">
          {presSem4.length ? (
            <Box>
              {presSem4[0].Presenca ? (
                <BsFillEmojiSmileFill size={25} color="green" />
              ) : (
                <BsFillEmojiFrownFill size={25} color="red" />
              )}
            </Box>
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
              borderLeft: '2px solid #000',
              borderRight: '2px solid #000',
            }}
          >
            {dataSem5.length ? dataSem5 : '-'}
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
              borderLeft: '2px solid #000',
              borderRight: '2px solid #000',
            }}
          >
            <Oval stroke="blue" width={20} height={20} />
          </Box>
        )}
        <Box textAlign="center" width="33%">
          {presSem5.length ? (
            <Box>
              {presSem5[0].Presenca ? (
                <BsFillEmojiSmileFill size={25} color="green" />
              ) : (
                <BsFillEmojiFrownFill size={25} color="red" />
              )}
            </Box>
          ) : (
            '-'
          )}
        </Box>
      </Box>
    </Box>
  );
}