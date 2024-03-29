import { Box } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import Espera from 'src/utils/espera';
import useSWR from 'swr';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Meses from 'src/utils/meses';

import TabLancamentos from './tabLancamentos';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const theme = createTheme();
theme.typography.hs4 = {
  fontWeight: 'normal',
  fontSize: '10px',
  '@media (min-width:350px)': {
    fontSize: '11px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
theme.typography.hs3 = {
  fontWeight: 'normal',
  fontSize: '12px',
  '@media (min-width:350px)': {
    fontSize: '13px',
  },
  '@media (min-width:400px)': {
    fontSize: '14px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '15px',
  },
};
theme.typography.hs2 = {
  fontWeight: 'normal',
  fontSize: '12px',
  '@media (min-width:350px)': {
    fontSize: '13px',
  },
  '@media (min-width:400px)': {
    fontSize: '14px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '16px',
  },
};
function createListaOpcoes(label, value, loading) {
  return { label, value, loading };
}

function RelCelula({ perfilUser }) {
  //= ================================================================
  const mes = Meses();
  const d = new Date();
  const mesAtual = Number(d.getMonth());
  const anoAtual = Number(d.getFullYear());
  const [contMes, setContMes] = React.useState(mesAtual);
  const [contAno, setContAno] = React.useState(anoAtual);
  const [contConta, setContConta] = React.useState(0);
  const [entradas, setEntradas] = React.useState([]);
  const [listaContas, setListaContas] = React.useState([]);
  const [listaCC, setListaCC] = React.useState([]);
  const listaTipos = [
    { label: 'CONTAS', value: 0 },
    { label: 'CENTRO DE CUSTO', value: 1 },
    { label: 'LANÇAMENTOS', value: 2 },
  ];
  const url1 = `/api/consultaContas`;
  const { data: contas, errorContas } = useSWR(url1, fetcher);

  const url2 = `/api/consultaCentroCusto`;
  const { data: centroCusto, errorCentroCusto } = useSWR(url2, fetcher);

  const url = `/api/consultaContribuicoesIgreja/${contAno}/${contMes}`;
  const { data: contribuicoes, errorContribuicoes } = useSWR(url, fetcher);

  React.useEffect(() => {
    setEntradas(contribuicoes);

    if (errorContribuicoes) return <div>An error occured.</div>;
    if (!contribuicoes) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [contribuicoes]);
  React.useEffect(() => {
    if (contas) {
      const newContas = contas.map((row, index) =>
        createListaOpcoes(row.CT_NOME, index),
      );
      setListaContas(newContas);
    }
    if (errorContas) return <div>An error occured.</div>;
    if (!contas) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [contas]);

  React.useEffect(() => {
    if (centroCusto) {
      const newCentroCusto = centroCusto.map((row, index) =>
        createListaOpcoes(row.CC_NOME, index),
      );
      setListaCC(newCentroCusto);
    }

    if (errorCentroCusto) return <div>An error occured.</div>;
    if (!centroCusto) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [centroCusto]);

  const handleIncAno = () => {
    let contAnoAtual = contAno + 1;

    if (contAnoAtual > anoAtual) contAnoAtual = anoAtual;
    setContAno(contAnoAtual);
  };
  const handleDecAno = () => {
    let contAnoAtual = contAno - 1;

    if (contAnoAtual < 2020) contAnoAtual = 2020;
    setContAno(contAnoAtual);
  };

  const handleIncMes = () => {
    let contMesAtual = contMes + 1;

    if (contMesAtual > 11) {
      contMesAtual = 0;
      handleIncAno();
    }
    setContMes(contMesAtual);
  };
  const handleDecMes = () => {
    let contMesAtual = contMes - 1;

    if (contMesAtual < 0) {
      contMesAtual = 11;
      handleDecAno();
    }
    setContMes(contMesAtual);
  };

  const handleIncConta = () => {
    let contContaAtual = contConta + 1;

    if (contContaAtual > listaTipos.length - 1) contContaAtual = 0;
    setContConta(contContaAtual);
  };
  const handleDecConta = () => {
    let contContaAtual = contConta - 1;

    if (contContaAtual < 0) contContaAtual = listaTipos.length - 1;
    setContConta(contContaAtual);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={300}
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
        <Box
          display="flex"
          justifyContent="center"
          height="6%"
          width="100%"
          minWidth={300}
          mb={1}
        >
          <Box width="96%" display="flex" bgcolor="white">
            <Box
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
                  handleDecMes();
                }}
              >
                <BiCaretLeft size={35} color={corIgreja.principal2} />
              </IconButton>
            </Box>
            <Box
              width="80%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="16px"
              color="black"
              sx={{ fontFamily: 'Fugaz One' }}
            >
              {mes[contMes].descricao.toUpperCase()} / {contAno}
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
                  handleIncMes();
                }}
              >
                <BiCaretRight size={35} color={corIgreja.principal2} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          height="6%"
          width="100%"
          minWidth={300}
        >
          <Box width="96%" display="flex" bgcolor="white">
            <Box
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
                  handleDecConta();
                }}
              >
                <BiCaretLeft size={35} color={corIgreja.principal2} />
              </IconButton>
            </Box>
            <Box
              width="80%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="16px"
              color="black"
              sx={{ fontFamily: 'Fugaz One' }}
            >
              {listaTipos[contConta].label.toUpperCase()}
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
                  handleIncConta();
                }}
              >
                <BiCaretRight size={35} color={corIgreja.principal2} />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box
          width="100%"
          ml={0}
          mt={1}
          height="5%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="16px"
          sx={{ fontFamily: 'Rubik' }}
        >
          <Box
            color="white"
            fontSize="12px"
            height="30%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          />
          <Box
            color="white"
            fontSize="12px"
            height="30%"
            width="30%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontFamily="Fugaz One"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="hs4">RECEITAS</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="white"
            fontSize="12px"
            height="30%"
            width="2%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          />
          <Box
            color="white"
            fontSize="12px"
            height="35%"
            width="30%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontFamily="Fugaz One"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="hs4">DESPESAS</Typography>
            </ThemeProvider>
          </Box>
          <Box
            color="white"
            fontSize="12px"
            height="30%"
            width="2%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          />
          <Box
            color="white"
            fontSize="12px"
            height="30%"
            width="30%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontFamily="Fugaz One"
          >
            <ThemeProvider theme={theme}>
              <Typography variant="hs4">SALDO TOTAL</Typography>
            </ThemeProvider>
          </Box>
        </Box>
        <Box
          width="100%"
          height="5%"
          ml={0}
          mb={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="16px"
          sx={{ fontFamily: 'Rubik' }}
        >
          <Box
            color="black"
            fontSize="12px"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          />
          <Box
            color="black"
            bgcolor="#ffff8d"
            fontSize="12px"
            height="100%"
            borderRadius={6}
            width="30%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            ola
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="30%"
            width="2%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          />
          <Box
            color="black"
            bgcolor="#ffff8d"
            borderRadius={6}
            fontSize="12px"
            height="100%"
            width="30%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            teste
          </Box>
          <Box
            color="black"
            fontSize="12px"
            height="30%"
            width="2%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          />
          <Box
            fontSize="12px"
            color="black"
            bgcolor="#ffff8d"
            borderRadius={6}
            height="100%"
            width="30%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            tudo
          </Box>
        </Box>
        <Box width="100%" height="70%">
          <Box
            style={{
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
            }}
            height="100%"
            minWidth={300}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={350}
            width="100%"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="96%"
              height="100%"
            >
              <Box
                height="96%"
                minHeight={315}
                bgcolor="#fafafa"
                width="100%"
                borderRadius={16}
              >
                <TabLancamentos
                  perfilUser={perfilUser}
                  Mes={contMes}
                  Ano={contAno}
                  listaContas={listaContas}
                  listaCC={listaCC}
                  tipo={listaTipos[contConta].label}
                  entradas={entradas}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RelCelula;
