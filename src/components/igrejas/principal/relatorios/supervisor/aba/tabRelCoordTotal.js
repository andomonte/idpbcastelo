import * as React from 'react';
import { Box } from '@material-ui/core';
// import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function TabCelula({
  Ano,
  perfilUser,
  contSemana,
  numeroCelula,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [presSem1, setPresSem1] = React.useState([]);
  const [presCeleb, setPresCeleb] = React.useState([]);
  const [presDisc, setPresDisc] = React.useState([]);

  //  const [openRelatorio, setOpenRelatorio] = React.useState(false);

  // para usar semanas
  const [contSemana2, setContSemana2] = React.useState(contSemana);

  const [adulCelulas, setAdulCelulas] = React.useState(0);
  const [criCelulas, setCriCelulas] = React.useState(0);
  const [visCelulas, setVisCelulas] = React.useState(0);
  const [convCelulas, setConvCelulas] = React.useState(0);
  const [totalCelulas, setTotalCelulas] = React.useState(0);

  const [adulCeleb, setAdulCeleb] = React.useState(0);
  const [criCeleb, setCriCeleb] = React.useState(0);
  const [visCeleb, setVisCeleb] = React.useState(0);
  const [convCeleb, setConvCeleb] = React.useState(0);
  const [totalCeleb, setTotalCeleb] = React.useState(0);

  const [adulDisc, setAdulDisc] = React.useState(0);
  const [criDisc, setCriDisc] = React.useState(0);
  const [visDisc, setVisDisc] = React.useState(0);
  const [convDisc, setConvDisc] = React.useState(0);
  const [totalDisc, setTotalDisc] = React.useState(0);

  const url1 = `/api/consultaRelatorioCelulas/${contSemana2}`;
  const url2 = `/api/consultaRelatorioCelebracao/${contSemana2}`;
  const url3 = `/api/consultaRelatorioDiscipulado/${contSemana2}`;

  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);

  const { data: culto, errorCulto } = useSWR(url2, fetcher);
  const { data: discipular, errorDiscipular } = useSWR(url3, fetcher);

  React.useEffect(() => {
    setPresSem1([]);
    setPresCeleb([]);
    setPresDisc([]);
    setAdulCelulas(0);
    setCriCelulas(0);
    setVisCelulas(0);
    setConvCelulas(0);
    setTotalCelulas(0);

    setAdulCeleb(0);
    setCriCeleb(0);
    setVisCeleb(0);
    setConvCeleb(0);
    setTotalCeleb(0);

    setAdulDisc(0);
    setCriDisc(0);
    setVisDisc(0);
    setConvDisc(0);
    setTotalDisc(0);

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
    setPresCeleb([]);
    if (culto) {
      if (culto && culto[0]) {
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const presCelula = culto.filter(
            (val) =>
              val.Celula === Number(numeroCelula[i]) &&
              val.Distrito === Number(perfilUser.Distrito) &&
              Number(val.Data.slice(6, 10)) === Number(Ano),
          );

          if (presCelula && presCelula[0]) {
            setPresCeleb((presSemAtual) => [...presSemAtual, presCelula[0]]);
          } else {
            const semRel = { Celula: numeroCelula[i] };

            setPresCeleb((presSemAtual) => [...presSemAtual, semRel]);
          }
        }
      } else
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const semRel = { Celula: numeroCelula[i] };

          setPresCeleb((presSemAtual) => [...presSemAtual, semRel]);
        }
    }

    if (errorCulto) return <div>An error occured.</div>;

    if (!culto) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [culto]);

  React.useEffect(() => {
    setPresDisc([]);
    if (discipular) {
      if (discipular && discipular[0]) {
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const presCelula = discipular.filter(
            (val) =>
              val.Celula === Number(numeroCelula[i]) &&
              val.Distrito === Number(perfilUser.Distrito) &&
              Number(val.Data.slice(6, 10)) === Number(Ano),
          );

          if (presCelula && presCelula[0]) {
            setPresDisc((presSemAtual) => [...presSemAtual, presCelula[0]]);
          } else {
            const semRel = { Celula: numeroCelula[i] };

            setPresDisc((presSemAtual) => [...presSemAtual, semRel]);
          }
        }
      } else
        for (let i = 0; i < numeroCelula.length; i += 1) {
          const semRel = { Celula: numeroCelula[i] };

          setPresDisc((presSemAtual) => [...presSemAtual, semRel]);
        }
    }

    if (errorDiscipular) return <div>An error occured.</div>;

    if (!discipular) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [discipular]);

  React.useEffect(() => {
    if (presSem1.length) {
      const somaAdultos = presSem1
        .map((item) => {
          if (item.Adultos !== undefined) return item.Adultos;
          return 0;
        })
        .reduce((prev, curr) => prev + curr, 0);
      setAdulCelulas(somaAdultos);

      const somaCriancas = presSem1
        .map((item) => {
          if (item.Criancas !== undefined) return item.Criancas;
          return 0;
        })
        .reduce((prev, curr) => prev + curr, 0);
      setCriCelulas(somaCriancas);

      const somaVisitantes = presSem1
        .map((item) => {
          if (item.Visitantes !== undefined) return item.Visitantes;
          return 0;
        })
        .reduce((prev, curr) => prev + curr, 0);
      setVisCelulas(somaVisitantes);

      const somaConversoes = presSem1
        .map((item) => {
          if (item.Conversoes !== undefined) return item.Conversoes;
          return 0;
        })
        .reduce((prev, curr) => prev + curr, 0);
      setConvCelulas(somaConversoes);

      const totalPres = adulCelulas + criCelulas + visCelulas + convCelulas;
      setTotalCelulas(totalPres);
    }
  }, [presSem1]);

  React.useEffect(() => {
    if (presCeleb.length) {
      const somaAdultos = presCeleb
        .map((item) => {
          if (item.Adultos !== undefined) return item.Adultos;
          return 0;
        })
        .reduce((prev, curr) => prev + curr, 0);
      setAdulCeleb(somaAdultos);

      const somaCriancas = presCeleb
        .map((item) => {
          if (item.Criancas !== undefined) return item.Criancas;
          return 0;
        })
        .reduce((prev, curr) => prev + curr, 0);
      setCriCeleb(somaCriancas);

      const somaVisitantes = presCeleb
        .map((item) => {
          if (item.Visitantes !== undefined) return item.Visitantes;
          return 0;
        })
        .reduce((prev, curr) => prev + curr, 0);
      setVisCeleb(somaVisitantes);

      const somaConversoes = presCeleb
        .map((item) => {
          if (item.Conversoes !== undefined) return item.Conversoes;
          return 0;
        })
        .reduce((prev, curr) => prev + curr, 0);
      setConvCeleb(somaConversoes);
      const totalPres = adulCeleb + criCeleb + visCeleb + convCeleb;
      setTotalCeleb(totalPres);
    }
  }, [presCeleb]);

  React.useEffect(() => {
    if (presDisc.length) {
      const somaAdultos = presDisc
        .map((item) => {
          if (item.Adultos !== undefined) return item.Adultos;
          return 0;
        })
        .reduce((prev, curr) => prev + curr, 0);
      setAdulDisc(somaAdultos);

      const somaCriancas = presDisc
        .map((item) => {
          if (item.Criancas !== undefined) return item.Criancas;
          return 0;
        })
        .reduce((prev, curr) => prev + curr, 0);
      setCriDisc(somaCriancas);

      const somaVisitantes = presDisc
        .map((item) => {
          if (item.Visitantes !== undefined) return item.Visitantes;
          return 0;
        })
        .reduce((prev, curr) => prev + curr, 0);
      setVisDisc(somaVisitantes);

      const somaConversoes = presDisc
        .map((item) => {
          if (item.Conversoes !== undefined) return item.Conversoes;
          return 0;
        })
        .reduce((prev, curr) => prev + curr, 0);
      setConvDisc(somaConversoes);
      const totalPres = adulDisc + criDisc + visDisc + convDisc;
      setTotalDisc(totalPres);
    }
  }, [presDisc]);

  React.useEffect(() => {
    if (presSem1.length) {
      const totalPres = adulCelulas + criCelulas + visCelulas + convCelulas;
      setTotalCelulas(totalPres);
    }
  }, [adulCelulas]);

  React.useEffect(() => {
    const totalPres = adulCelulas + criCelulas + visCelulas + convCelulas;
    setTotalCelulas(totalPres);
  }, [adulCelulas]);
  React.useEffect(() => {
    const totalPres = adulCeleb + criCeleb + visCeleb + convCeleb;
    setTotalCeleb(totalPres);
  }, [adulCeleb]);
  React.useEffect(() => {
    const totalPres = adulDisc + criDisc + visDisc + convDisc;
    setTotalDisc(totalPres);
  }, [adulDisc]);

  //= ==================================================================

  return (
    <Box height="100%">
      <Box
        bgcolor="#d1c4e9"
        sx={{
          fontFamily: 'arial black',
          fontSize: '10px',
          borderBottom: '1px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height="33%"
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
          RELATÓRIO
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="15%"
          sx={{
            borderLeft: '1px solid #000',
            borderRight: '1px solid #000',
          }}
        >
          ADUL
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="15%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          CRIAN
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="15%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          VISIT
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="15%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          CONV
        </Box>

        <Box textAlign="center" width="15%">
          TOTAL
        </Box>
      </Box>

      <Box height="70%">
        <Box
          sx={{
            fontFamily: 'arial black',
            fontSize: '10px',
            borderBottom: '1px solid #000',
          }}
          height="33%"
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
            color="blue"
          >
            CÉLULA
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="15%"
            fontSize="12px"
            color="blue"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            {adulCelulas}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="15%"
            fontSize="12px"
            color="blue"
            sx={{
              borderRight: '1px solid #000',
            }}
          >
            {criCelulas}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="15%"
            fontSize="12px"
            color="blue"
            sx={{
              borderRight: '1px solid #000',
            }}
          >
            {visCelulas}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="15%"
            fontSize="12px"
            color="blue"
            sx={{
              borderRight: '1px solid #000',
            }}
          >
            {convCelulas}
          </Box>

          <Box textAlign="center" width="15%" fontSize="12px" color="blue">
            {totalCelulas}
          </Box>
        </Box>
        <Box
          sx={{
            fontFamily: 'arial black',
            fontSize: '10px',
            borderBottom: '1px solid #000',
          }}
          height="33%"
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
            color="brown"
          >
            CELEBRAÇÃO
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="15%"
            fontSize="12px"
            color="brown"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            {adulCeleb}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="15%"
            fontSize="12px"
            color="brown"
            sx={{
              borderRight: '1px solid #000',
            }}
          >
            {criCeleb}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="15%"
            fontSize="12px"
            color="brown"
            sx={{
              borderRight: '1px solid #000',
            }}
          >
            {visCeleb}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="15%"
            fontSize="12px"
            color="brown"
            sx={{
              borderRight: '1px solid #000',
            }}
          >
            {convCeleb}
          </Box>

          <Box textAlign="center" width="15%" fontSize="12px" color="brown">
            {totalCeleb}
          </Box>
        </Box>
        <Box
          sx={{
            fontFamily: 'arial black',
            fontSize: '10px',
            borderBottom: '1px solid #000',
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px',
          }}
          height="33%"
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
            color="#7b1fa2"
          >
            DISCIPUL.
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="15%"
            fontSize="12px"
            color="#7b1fa2"
            sx={{
              borderLeft: '1px solid #000',
              borderRight: '1px solid #000',
            }}
          >
            {adulDisc}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="15%"
            fontSize="12px"
            color="#7b1fa2"
            sx={{
              borderRight: '1px solid #000',
            }}
          >
            {criDisc}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="15%"
            fontSize="12px"
            color="#7b1fa2"
            sx={{
              borderRight: '1px solid #000',
            }}
          >
            {visDisc}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="15%"
            fontSize="12px"
            color="#7b1fa2"
            sx={{
              borderRight: '1px solid #000',
            }}
          >
            {convDisc}
          </Box>

          <Box textAlign="center" width="15%" fontSize="12px" color="#7b1fa2">
            {totalDisc}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
