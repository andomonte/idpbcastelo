import * as React from 'react';
import { Box } from '@material-ui/core';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useSWR from 'swr';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@mui/material/Slide';
import TabDetalhes from './tabDetalhes';

const fetcher = (url) => axios.get(url).then((res) => res.data);

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const theme = createTheme();
theme.typography.hs4 = {
  fontSize: '8px',
  '@media (min-width:360px)': {
    fontSize: '10px',
  },
  '@media (min-width:400px)': {
    fontSize: '11px',
  },
  '@media (min-width:500px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '13px',
  },
};
theme.typography.hs3 = {
  fontSize: '10px',
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
theme.typography.hs2 = {
  fontSize: '12px',
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
function createDetalhes(
  Nome,
  Descricao,
  valor,
  NomeCategoria,
  data,
  conta,
  centroCusto,
) {
  return {
    Nome,
    Descricao,
    valor,
    NomeCategoria,
    data,
    conta,
    centroCusto,
  };
}
export default function TabCelula({
  Mes,
  Ano,
  perfilUser,
  listaContas,
  listaCC,
  tipo,
  entradas,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));

  const [dadosFiltrados, setDadosFiltrados] = React.useState([]);
  const [entradasMes, setEntradasMes] = React.useState([]);
  const [valorEntradas, setValorEntradas] = React.useState([]);
  const [valorFLanc, setValorFLanc] = React.useState([]);
  const [loadingCT, setLoadingCT] = React.useState(false);
  const [loadingCC, setLoadingCC] = React.useState(false);
  const [loadingLC, setLoadingLC] = React.useState(false);
  const [loading, setLoading] = React.useState([]);
  const [contConta, setContConta] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [qytLoading, setQytLoading] = React.useState(0);
  const listaTipos = [
    { label: 'RECEITA', value: 0 },
    { label: 'DESPESA', value: 1 },
  ];

  const url1 = `/api/consultaMembros`;
  const { data: membros } = useSWR(url1, fetcher);

  const calculaLancamento = () => {
    const newEntrada = entradas?.filter(
      (val) =>
        Number(val.LANC_DATA.substring(5, 7)) === Number(Mes) + 1 &&
        val.LANC_TIPO.toUpperCase() === listaTipos[contConta].label,
    );
    const setPerson = new Set();
    const filterPerson = newEntrada?.filter((person) => {
      const duplicatedPerson = setPerson.has(person.CAT_NOME);
      setPerson.add(person.CAT_NOME);
      return !duplicatedPerson;
    });
    const arrayLanc = [];
    const valorFinalLanc = [];

    if (filterPerson) {
      if (newEntrada.length) {
        setEntradasMes(newEntrada);
      }
      filterPerson?.map((val, index) => {
        arrayLanc[index] = newEntrada?.filter(
          (val2) => val.CAT_NOME === val2.CAT_NOME,
        );
        valorFinalLanc[index] = arrayLanc[index].reduce(
          (prev, curr) => prev + Number(curr.LANC_VALOR),
          0,
        );
        return 0;
      });

      setValorEntradas(filterPerson);
      setLoading(filterPerson?.map(() => false));
      setLoadingLC(false);
    }
    setValorFLanc(valorFinalLanc);
  };

  //= ======================================================
  const calculaContas = () => {
    const newEntrada = entradas;
    const setPerson = new Set();
    const filterPerson = newEntrada?.filter((person) => {
      const duplicatedPerson = setPerson.has(person.GC_ID);
      setPerson.add(person.GC_ID);
      return !duplicatedPerson;
    });
    const arrayLanc = [];
    const valorFinalLanc = [];
    console.log('newPerson', filterPerson, listaContas);
    if (filterPerson) {
      if (newEntrada.length) {
        setEntradasMes(newEntrada);
      }
      filterPerson?.map((val, index) => {
        arrayLanc[index] = newEntrada?.filter(
          (val2) => val.CAT_NOME === val2.CAT_NOME,
        );
        valorFinalLanc[index] = arrayLanc[index].reduce(
          (prev, curr) => prev + Number(curr.LANC_VALOR),
          0,
        );
        return 0;
      });
      console.log('aquei a soma', filterPerson);
      setValorEntradas(filterPerson);
      setLoading(filterPerson?.map(() => false));
      setLoadingLC(false);
    }
    setValorFLanc(valorFinalLanc);
  };
  //= ======================================================
  console.log(entradas);
  React.useEffect(() => {
    if (entradas) {
      setEntradasMes(entradas);
    }
  }, [entradas]);
  React.useEffect(() => {
    if (!open) {
      setLoading(valorEntradas?.map(() => false));
      setQytLoading(0);
    } else {
      let contQyt = 0;
      for (let i = 0; i < loading.length; i += 1) {
        if (loading[i]) contQyt = +1;
      }
      setTimeout(() => {
        setQytLoading(contQyt);
      }, 1000);
    }
  }, [open]);

  React.useEffect(() => {
    if (tipo === 'LANÇAMENTOS') {
      calculaLancamento();
    }

    if (tipo === 'CONTAS') {
      calculaContas();
    }

    if (tipo === 'CENTRO CUSTO') {
      console.log('espera centro');
    }
  }, [tipo]);

  React.useEffect(() => {
    setLoadingLC(true);

    if (tipo === 'LANÇAMENTOS') {
      calculaLancamento();
    }
  }, [contConta]);

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
  const handleDetalhes = (dados) => {
    const filterValor = entradasMes?.filter(
      (val) => val.CAT_NOME === dados.CAT_NOME,
    );
    const detalhes = [];
    filterValor?.map((val, index) => {
      const filterNome = membros?.filter(
        (val2) => val2.RolMembro === Number(val.id_membro),
      );

      detalhes[index] = createDetalhes(
        filterNome.length ? filterNome[0].Nome : val.LANC_DESCRICAO,
        val.LANC_DESCRICAO,
        val.LANC_VALOR,
        val.CAT_NOME,
        val.LANC_DATA,
        val.CT_ID,
        val.CC_ID,
      );

      return 0;
    });
    setDadosFiltrados(detalhes);
    setOpen(true);
  };

  return (
    <Box height="100%">
      {!loadingLC ? (
        <Box height="100%">
          {tipo === 'LANÇAMENTOS' ? (
            <Box height="100%">
              <Box
                bgcolor="#80cbc4"
                sx={{
                  fontFamily: 'arial black',
                  borderBottom: '1px solid #000',
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px',
                }}
                height="10%"
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
                  width="70%"
                  sx={{
                    borderRight: '1px solid #000',
                  }}
                >
                  {' '}
                  <ThemeProvider theme={theme}>
                    <Typography variant="hs2">
                      <Box
                        display="flex"
                        justifyContent="center"
                        height={40}
                        width="100%"
                        minWidth={300}
                      >
                        <Box width="100%" display="flex">
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
                              <BiCaretLeft
                                size={35}
                                color={corIgreja.principal2}
                              />
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
                              <BiCaretRight
                                size={35}
                                color={corIgreja.principal2}
                              />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Typography>
                  </ThemeProvider>
                </Box>

                <Box textAlign="center" width="30%">
                  <ThemeProvider theme={theme}>
                    <Typography variant="hs2">VALOR</Typography>
                  </ThemeProvider>
                </Box>
              </Box>

              <TableContainer sx={{ minHeight: 320, height: '90%' }}>
                {valorEntradas && valorEntradas.length ? (
                  <Box width="100%" height="100%" fontSize="12px">
                    {valorEntradas?.map((row, index) => (
                      <Box
                        key={index}
                        borderBottom={
                          index < entradasMes.length
                            ? '1px solid #000'
                            : '0px solid #000'
                        }
                        sx={{
                          fontFamily: 'arial black',
                        }}
                        height="17%"
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          height="100%"
                          display="flex"
                          justifyContent="center"
                          textAlign="center"
                          alignItems="center"
                          width="70%"
                          sx={{
                            borderRight: '1px solid #000',
                          }}
                        >
                          {!loading[index] ? (
                            <Box
                              color={
                                row.LANC_TIPO === 'Receita' ? 'blue' : 'red'
                              }
                              onClick={() => {
                                const valLoading = loading;
                                valLoading[index] = true;
                                setLoading(valLoading);

                                handleDetalhes(row);
                              }}
                            >
                              <ThemeProvider theme={theme}>
                                <Typography variant="hs4">
                                  {row.CAT_NOME !== 'Recursos de Terceiros'
                                    ? row.CAT_NOME.toUpperCase()
                                    : row.LANC_DESCRICAO.toUpperCase()}
                                </Typography>
                              </ThemeProvider>
                            </Box>
                          ) : (
                            <Box>Processando...</Box>
                          )}
                        </Box>
                        <Box
                          height="100%"
                          display="flex"
                          justifyContent="center"
                          textAlign="center"
                          alignItems="center"
                          width="30%"
                          sx={{
                            borderRight: '1px solid #000',
                          }}
                        >
                          <Box>
                            {valorFLanc[index] ? (
                              <Box>
                                <ThemeProvider theme={theme}>
                                  <Typography variant="hs4">
                                    <Box>
                                      {Number(valorFLanc[index]).toLocaleString(
                                        'pt-br',
                                        {
                                          style: 'currency',
                                          currency: 'BRL',
                                        },
                                      )}
                                    </Box>
                                    <Box>{row.forma_pagamento}</Box>
                                  </Typography>
                                </ThemeProvider>
                              </Box>
                            ) : (
                              '-'
                            )}
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box
                    height="40vh"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    SEM LANÇAMENTOS NESSE PERÍODO
                  </Box>
                )}
              </TableContainer>
            </Box>
          ) : null}
          {tipo === 'CONTAS' ? (
            <Box height="100%">
              <Box
                bgcolor="#e0e0e0"
                sx={{
                  fontFamily: 'arial black',
                  borderBottom: '1px solid #000',
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px',
                }}
                height="10%"
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
                  width="70%"
                  sx={{
                    borderRight: '1px solid #000',
                  }}
                >
                  {' '}
                  <ThemeProvider theme={theme}>
                    <Typography variant="hs2">
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height={40}
                        width="100%"
                        minWidth={300}
                      >
                        CONTAS
                      </Box>
                    </Typography>
                  </ThemeProvider>
                </Box>

                <Box textAlign="center" width="30%">
                  <ThemeProvider theme={theme}>
                    <Typography variant="hs2">VALOR</Typography>
                  </ThemeProvider>
                </Box>
              </Box>

              <TableContainer sx={{ minHeight: 320, height: '90%' }}>
                {listaContas && listaContas.length ? (
                  <Box width="100%" height="100%" fontSize="12px">
                    {listaContas?.map((row, index) => (
                      <Box
                        key={index}
                        borderBottom={
                          index < entradasMes.length
                            ? '1px solid #000'
                            : '0px solid #000'
                        }
                        sx={{
                          fontFamily: 'arial black',
                        }}
                        height="17%"
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Box
                          height="100%"
                          display="flex"
                          justifyContent="center"
                          textAlign="center"
                          alignItems="center"
                          width="70%"
                          sx={{
                            borderRight: '1px solid #000',
                          }}
                        >
                          {!loading[index] ? (
                            <Box
                              color="black"
                              onClick={() => {
                                const valLoading = loading;
                                valLoading[index] = true;
                                setLoading(valLoading);

                                handleDetalhes(row);
                              }}
                            >
                              <ThemeProvider theme={theme}>
                                <Typography variant="hs4">
                                  {row.label ? row.label.toUpperCase() : ''}
                                </Typography>
                              </ThemeProvider>
                            </Box>
                          ) : (
                            <Box>Processando...</Box>
                          )}
                        </Box>
                        <Box
                          height="100%"
                          display="flex"
                          justifyContent="center"
                          textAlign="center"
                          alignItems="center"
                          width="30%"
                          sx={{
                            borderRight: '1px solid #000',
                          }}
                        >
                          <Box>
                            {valorFLanc[index] ? (
                              <Box>
                                <ThemeProvider theme={theme}>
                                  <Typography variant="hs4">
                                    <Box>
                                      {Number(valorFLanc[index]).toLocaleString(
                                        'pt-br',
                                        {
                                          style: 'currency',
                                          currency: 'BRL',
                                        },
                                      )}
                                    </Box>
                                    <Box>{row.forma_pagamento}</Box>
                                  </Typography>
                                </ThemeProvider>
                              </Box>
                            ) : (
                              '-'
                            )}
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box
                    height="40vh"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    SEM LANÇAMENTOS NESSE PERÍODO
                  </Box>
                )}
              </TableContainer>
            </Box>
          ) : (
            'CALCULANDO VALORES...'
          )}
        </Box>
      ) : (
        'CALCULANDO VALORES...'
      )}
      {console.log('loading', qytLoading, open)}
      <Dialog fullScreen open={qytLoading} TransitionComponent={Transition}>
        <TabDetalhes
          qytLoading={qytLoading}
          entradas={dadosFiltrados}
          setOpen={setOpen}
        />
      </Dialog>
    </Box>
  );
}
