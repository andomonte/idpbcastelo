import * as React from 'react';
import { Box } from '@material-ui/core';
// import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR from 'swr';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import { Oval } from 'react-loading-icons';
import 'react-toastify/dist/ReactToastify.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TabGrafico from './tabGrafico';

const theme = createTheme();
theme.typography.hs4 = {
  fontWeight: 'normal',
  fontSize: '7px',
  '@media (min-width:350px)': {
    fontSize: '8px',
  },
  '@media (min-width:400px)': {
    fontSize: '9px',
  },
  '@media (min-width:460px)': {
    fontSize: '10px',
  },
  '@media (min-width:520px)': {
    fontSize: '11px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
theme.typography.hs3 = {
  fontWeight: 'normal',
  fontSize: '10px',
  '@media (min-width:350px)': {
    fontSize: '11px',
  },
  '@media (min-width:400px)': {
    fontSize: '13px',
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

const fetcher = (url) => axios.get(url).then((res) => res.data);
function ordenaArray(a, b) {
  return a - b;
}
const somatorio = (presDisc, valor, qytSemanas, semana) => {
  const newDados = [];

  let dados;
  semana?.map((val) => {
    dados = presDisc.filter((val2) => val2.Semana === val);
    if (dados.length) {
      const soma = dados
        ?.map((item) => {
          if (Number(item[valor]) !== undefined) return Number(item[valor]);
          return 0;
        })
        .reduce((prev, curr) => prev + curr, 0);
      newDados.push(soma);
    }
    return 0;
  });

  return newDados;
};

export default function TabCelula({
  supervisoes,
  coordenacoes,
  distritos,

  numeroCelula,
  anoIni,
  anoFim,

  celulaSetor,
}) {
  // const dados = nomesCelulas?.map((row) => createData(row.Nome, true));

  const [adultosCel, setAdultosCel] = React.useState(0);
  const [criancasCel, setCriancasCel] = React.useState(0);
  const [visCCel, setVisCCel] = React.useState(0);
  const [visACel, setVisACel] = React.useState(0);
  const [totalCel, setTotalCel] = React.useState(0);
  const [adultosCeleb, setAdultosCeleb] = React.useState(0);
  const [criancasCeleb, setCriancasCeleb] = React.useState(0);
  const [visACeleb, setVisACeleb] = React.useState(0);
  const [visCCeleb, setVisCCeleb] = React.useState(0);
  const [totalCeleb, setTotalCeleb] = React.useState(0);
  const [disc, setDisc] = React.useState(0);
  const [leitura, setLeitura] = React.useState(0);
  const [convCel, setConvCel] = React.useState(0);
  const [convCeleb, setConvCeleb] = React.useState(0);
  const [periodo, setPeriodo] = React.useState(0);

  // para usar semanas

  const diaI = anoIni.substring(0, 2);
  const mesI = anoIni.substring(3, 5);
  const anoI = anoIni.substring(6, 10);
  const novaData1 = `${anoI}-${mesI}-${diaI}`;
  const diaF = anoFim.substring(0, 2);
  const mesF = anoFim.substring(3, 5);
  const anoF = anoFim.substring(6, 10);
  const novaData2 = `${anoF}-${mesF}-${diaF}`;

  const url1 = `/api/consultaRelatorioCelulasPeriodo/${novaData1}/${novaData2}`;
  const url3 = `/api/consultaRelatorioCelebracaoPeriodo/${novaData1}/${novaData2}`;
  const url4 = `/api/consultaRelatorioDiscipuladoPeriodo/${novaData1}/${novaData2}`;
  const { data: sem1, errorSem1 } = useSWR(url1, fetcher);
  const { data: celebracao, errorCelebracao } = useSWR(url3, fetcher);
  const { data: discipulado, errorDiscipulado } = useSWR(url4, fetcher);

  React.useEffect(() => {
    setTotalCel(
      Number(adultosCel) +
        Number(criancasCel) +
        Number(visACel) +
        Number(visCCel),
    );
  }, [adultosCel, criancasCel, visACel, visCCel]);
  React.useEffect(() => {
    setTotalCeleb(
      Number(adultosCeleb) +
        Number(criancasCeleb) +
        Number(visACeleb) +
        Number(visCCeleb),
    );
  }, [adultosCeleb, criancasCeleb, visACeleb, visCCeleb]);
  React.useEffect(() => {
    // pegar a quantidade de semanas do periodo selecionado
    const numberSuper = sem1?.map((itens) => itens.Semana);
    const uniqueArrSuper = [...new Set(numberSuper)];
    const qytSemanas = uniqueArrSuper.length;
    //= ==============================================

    if (sem1 && numeroCelula.length) {
      if (sem1 && sem1[0]) {
        if (
          distritos.Distrito_Nome === 'TODOS OS DISTRITOS' &&
          distritos.Distrito === 0
        ) {
          if (
            coordenacoes.Coordenacao_Nome === 'TODAS AS COORDENAÇÕES' &&
            coordenacoes.coordenacao === 0
          ) {
            if (
              supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
              supervisoes.Supervisao === 0
            ) {
              const setPerson = new Set();
              const newSem1 = sem1?.map((val) => val.Semana);
              const tiposSemana = newSem1?.filter((person) => {
                const duplicatedPerson = setPerson.has(person);
                setPerson.add(person);
                return !duplicatedPerson;
              });
              tiposSemana?.sort(ordenaArray);
              console.log('tiposSemanas', tiposSemana);
              setPeriodo(tiposSemana);

              setAdultosCel(
                somatorio(sem1, 'Adultos', qytSemanas, tiposSemana),
              );
              setCriancasCel(
                somatorio(sem1, 'Crianca', qytSemanas, tiposSemana),
              );
              setVisACel(
                somatorio(sem1, 'Visitantes', qytSemanas, tiposSemana),
              );
              setVisCCel(
                somatorio(sem1, 'NomesVisitantes', qytSemanas, tiposSemana),
              );

              setVisCCel(
                setConvCel(sem1, 'Conversoes', qytSemanas, tiposSemana),
              );

              // ('todos em  0');
            } else {
              const sem1F = [];
              sem1?.map((val) => {
                if (celulaSetor.length)
                  celulaSetor?.map((val2) => {
                    if (
                      val.Celula === val2.Celula &&
                      val.Distrito === val2.Distrito
                    )
                      sem1F.push(val);
                    return 0;
                  });
                return 0;
              });

              const setPerson = new Set();
              const newSem1 = sem1F?.map((val) => val.Semana);
              const tiposSemana = newSem1?.filter((person) => {
                const duplicatedPerson = setPerson.has(person);
                setPerson.add(person);
                return !duplicatedPerson;
              });
              tiposSemana?.sort(ordenaArray);
              setPeriodo(tiposSemana);

              setAdultosCel(
                somatorio(sem1F, 'Adultos', qytSemanas, tiposSemana),
              );
              setCriancasCel(
                somatorio(sem1F, 'Crianca', qytSemanas, tiposSemana),
              );
              setVisACel(
                somatorio(sem1F, 'Visitantes', qytSemanas, tiposSemana),
              );
              setVisCCel(
                somatorio(sem1F, 'NomesVisitantes', qytSemanas, tiposSemana),
              );

              setVisCCel(
                setConvCel(sem1F, 'Conversoes', qytSemanas, tiposSemana),
              );
              // ('dist 0 e coor 0 e super 1');
            }
          } else if (
            supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
            supervisoes.Supervisao === 0
          ) {
            // ('dist 0 e coor 1 e super em 0');
            const setPerson = new Set();
            const newSem1 = sem1?.map((val) => val.Semana);
            const tiposSemana = newSem1?.filter((person) => {
              const duplicatedPerson = setPerson.has(person);
              setPerson.add(person);
              return !duplicatedPerson;
            });
            tiposSemana?.sort(ordenaArray);
            console.log('tiposSemanas', tiposSemana);
            setPeriodo(tiposSemana);

            setAdultosCel(somatorio(sem1, 'Adultos', qytSemanas, tiposSemana));
            setCriancasCel(somatorio(sem1, 'Crianca', qytSemanas, tiposSemana));
            setVisACel(somatorio(sem1, 'Visitantes', qytSemanas, tiposSemana));
            setVisCCel(
              somatorio(sem1, 'NomesVisitantes', qytSemanas, tiposSemana),
            );

            setVisCCel(setConvCel(sem1, 'Conversoes', qytSemanas, tiposSemana));
          } else {
            const sem1F = [];
            sem1?.map((val) => {
              if (celulaSetor.length)
                celulaSetor?.map((val2) => {
                  if (
                    val.Celula === val2.Celula &&
                    val.Distrito === val2.Distrito
                  )
                    sem1F.push(val);
                  return 0;
                });
              return 0;
            });

            const setPerson = new Set();
            const newSem1 = sem1F?.map((val) => val.Semana);
            const tiposSemana = newSem1?.filter((person) => {
              const duplicatedPerson = setPerson.has(person);
              setPerson.add(person);
              return !duplicatedPerson;
            });
            tiposSemana?.sort(ordenaArray);
            setPeriodo(tiposSemana);

            setAdultosCel(somatorio(sem1F, 'Adultos', qytSemanas, tiposSemana));
            setCriancasCel(
              somatorio(sem1F, 'Crianca', qytSemanas, tiposSemana),
            );
            setVisACel(somatorio(sem1F, 'Visitantes', qytSemanas, tiposSemana));
            setVisCCel(
              somatorio(sem1F, 'NomesVisitantes', qytSemanas, tiposSemana),
            );

            setVisCCel(
              setConvCel(sem1F, 'Conversoes', qytSemanas, tiposSemana),
            ); // ('dist 0 e coor 0 e super 1');
          }
        } else if (
          coordenacoes.Coordenacao_Nome === 'TODAS AS COORDENAÇÕES' &&
          coordenacoes.coordenacao === 0
        ) {
          if (
            supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
            supervisoes.Supervisao === 0
          ) {
            // ('distrito em 1 e os outros 2 em  0');
            const setPerson = new Set();
            const newSem1 = sem1?.map((val) => val.Semana);
            const tiposSemana = newSem1?.filter((person) => {
              const duplicatedPerson = setPerson.has(person);
              setPerson.add(person);
              return !duplicatedPerson;
            });
            tiposSemana?.sort(ordenaArray);
            console.log('tiposSemanas', tiposSemana);
            setPeriodo(tiposSemana);

            setAdultosCel(somatorio(sem1, 'Adultos', qytSemanas, tiposSemana));
            setCriancasCel(somatorio(sem1, 'Crianca', qytSemanas, tiposSemana));
            setVisACel(somatorio(sem1, 'Visitantes', qytSemanas, tiposSemana));
            setVisCCel(
              somatorio(sem1, 'NomesVisitantes', qytSemanas, tiposSemana),
            );

            setVisCCel(setConvCel(sem1, 'Conversoes', qytSemanas, tiposSemana));
          } else {
            const sem1F = [];
            sem1?.map((val) => {
              if (celulaSetor.length)
                celulaSetor?.map((val2) => {
                  if (
                    val.Celula === val2.Celula &&
                    supervisoes.Supervisao &&
                    val.Distrito === val2.Distrito
                  )
                    sem1F.push(val);
                  return 0;
                });
              return 0;
            });

            const setPerson = new Set();
            const newSem1 = sem1F?.map((val) => val.Semana);
            const tiposSemana = newSem1?.filter((person) => {
              const duplicatedPerson = setPerson.has(person);
              setPerson.add(person);
              return !duplicatedPerson;
            });
            tiposSemana?.sort(ordenaArray);
            setPeriodo(tiposSemana);

            setAdultosCel(somatorio(sem1F, 'Adultos', qytSemanas, tiposSemana));
            setCriancasCel(
              somatorio(sem1F, 'Crianca', qytSemanas, tiposSemana),
            );
            setVisACel(somatorio(sem1F, 'Visitantes', qytSemanas, tiposSemana));
            setVisCCel(
              somatorio(sem1F, 'NomesVisitantes', qytSemanas, tiposSemana),
            );

            setVisCCel(
              setConvCel(sem1F, 'Conversoes', qytSemanas, tiposSemana),
            );
            // ('dist 0 e coor 0 e super 1');
          }
          // ('dist 1 e coor 0');
        } else if (
          supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
          supervisoes.Supervisao === 0
        ) {
          // ('dist 1 e coor 1 e super em 0');
          const setPerson = new Set();
          const newSem1 = sem1?.map((val) => val.Semana);
          const tiposSemana = newSem1?.filter((person) => {
            const duplicatedPerson = setPerson.has(person);
            setPerson.add(person);
            return !duplicatedPerson;
          });
          tiposSemana?.sort(ordenaArray);
          console.log('tiposSemanas', tiposSemana);
          setPeriodo(tiposSemana);

          setAdultosCel(somatorio(sem1, 'Adultos', qytSemanas, tiposSemana));
          setCriancasCel(somatorio(sem1, 'Crianca', qytSemanas, tiposSemana));
          setVisACel(somatorio(sem1, 'Visitantes', qytSemanas, tiposSemana));
          setVisCCel(
            somatorio(sem1, 'NomesVisitantes', qytSemanas, tiposSemana),
          );

          setVisCCel(setConvCel(sem1, 'Conversoes', qytSemanas, tiposSemana));
        } else {
          const sem1F = [];
          sem1?.map((val) => {
            if (celulaSetor.length)
              celulaSetor?.map((val2) => {
                if (
                  val.Celula === val2.Celula &&
                  supervisoes.Supervisao &&
                  val.Distrito === val2.Distrito
                )
                  sem1F.push(val);
                return 0;
              });
            return 0;
          });

          const setPerson = new Set();
          const newSem1 = sem1F?.map((val) => val.Semana);
          const tiposSemana = newSem1?.filter((person) => {
            const duplicatedPerson = setPerson.has(person);
            setPerson.add(person);
            return !duplicatedPerson;
          });
          tiposSemana?.sort(ordenaArray);
          setPeriodo(tiposSemana);

          setAdultosCel(somatorio(sem1F, 'Adultos', qytSemanas, tiposSemana));
          setCriancasCel(somatorio(sem1F, 'Crianca', qytSemanas, tiposSemana));
          setVisACel(somatorio(sem1F, 'Visitantes', qytSemanas, tiposSemana));
          setVisCCel(
            somatorio(sem1F, 'NomesVisitantes', qytSemanas, tiposSemana),
          );

          setVisCCel(setConvCel(sem1F, 'Conversoes', qytSemanas, tiposSemana));
          // (''dist 1 e coor 1 e super em 0'');
        }
      }
    }

    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1, numeroCelula, distritos, coordenacoes, supervisoes, celulaSetor]);

  React.useEffect(() => {
    // pegar a quantidade de semanas do periodo selecionado
    const numberSuper = sem1?.map((itens) => itens.Semana);
    const uniqueArrSuper = [...new Set(numberSuper)];
    const qytSemanas = uniqueArrSuper.length;
    //= ==============================================

    if (celebracao && numeroCelula.length) {
      if (celebracao && celebracao[0]) {
        if (
          distritos.Distrito_Nome === 'TODOS OS DISTRITOS' &&
          distritos.Distrito === 0
        ) {
          if (
            coordenacoes.Coordenacao_Nome === 'TODAS AS COORDENAÇÕES' &&
            coordenacoes.coordenacao === 0
          ) {
            if (
              supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
              supervisoes.Supervisao === 0
            ) {
              // ('todos em  0');
              const setPerson = new Set();
              const newSem1 = celebracao?.map((val) => val.Semana);
              const tiposSemana = newSem1?.filter((person) => {
                const duplicatedPerson = setPerson.has(person);
                setPerson.add(person);
                return !duplicatedPerson;
              });
              tiposSemana?.sort();

              setAdultosCeleb(
                somatorio(celebracao, 'Adultos', qytSemanas, tiposSemana),
              );
              setCriancasCeleb(somatorio(celebracao, 'Criancas', qytSemanas));
              setVisACeleb(somatorio(celebracao, 'Visitantes', qytSemanas));
              setVisCCeleb(
                somatorio(celebracao, 'NomesVisitantes', qytSemanas),
              );
              setConvCeleb(somatorio(celebracao, 'Conversoes', 1));
            } else {
              const celebracaoF = [];
              celebracao?.map((val) => {
                if (celulaSetor.length)
                  celulaSetor?.map((val2) => {
                    if (
                      val.Celula === val2.Celula &&
                      val.Distrito === val2.Distrito
                    )
                      celebracaoF.push(val);
                    return 0;
                  });
                return 0;
              });

              setAdultosCeleb(somatorio(celebracaoF, 'Adultos', qytSemanas));
              setCriancasCeleb(somatorio(celebracaoF, 'Criancas', qytSemanas));
              setVisACeleb(somatorio(celebracaoF, 'Visitantes', qytSemanas));
              setVisCCeleb(
                somatorio(celebracaoF, 'NomesVisitantes', qytSemanas),
              );
              setConvCeleb(somatorio(celebracaoF, 'Conversoes', 1));
              // ('dist 0 e coor 0 e super 1');
            }
          } else {
            // ('dist 0 e coor 1');
            // filtrar a coordenação

            const celulaCoord = celulaSetor.filter(
              (val) => val.Coordenacao === coordenacoes.Coordenacao,
            );
            if (
              supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
              supervisoes.Supervisao === 0
            ) {
              // ('todos em  0');
              const celebracaoF = [];
              celebracao?.map((val) => {
                if (celulaCoord.length)
                  celulaCoord?.map((val2) => {
                    if (
                      val.Celula === val2.Celula &&
                      val.Distrito === val2.Distrito
                    )
                      celebracaoF.push(val);
                    return 0;
                  });
                return 0;
              });
              setAdultosCeleb(somatorio(celebracaoF, 'Adultos', qytSemanas));
              setCriancasCeleb(somatorio(celebracaoF, 'Criancas', qytSemanas));
              setVisACeleb(somatorio(celebracaoF, 'Visitantes', qytSemanas));
              setVisCCeleb(
                somatorio(celebracaoF, 'NomesVisitantes', qytSemanas),
              );
              setConvCeleb(somatorio(celebracaoF, 'Conversoes', 1));
            } else {
              const celebracaoF = [];
              celebracao?.map((val) => {
                if (celulaSetor.length)
                  celulaSetor?.map((val2) => {
                    if (
                      val.Celula === val2.Celula &&
                      val.Distrito === val2.Distrito
                    )
                      celebracaoF.push(val);
                    return 0;
                  });
                return 0;
              });

              setAdultosCeleb(somatorio(celebracaoF, 'Adultos', qytSemanas));
              setCriancasCeleb(somatorio(celebracaoF, 'Criancas', qytSemanas));
              setVisACeleb(somatorio(celebracaoF, 'Visitantes', qytSemanas));
              setVisCCeleb(
                somatorio(celebracaoF, 'NomesVisitantes', qytSemanas),
              );
              setConvCeleb(somatorio(celebracaoF, 'Conversoes', 1));
              // ('dist 0 e coor 0 e super 1');
            }
          }
        } else if (
          coordenacoes.Coordenacao_Nome === 'TODAS AS COORDENAÇÕES' &&
          coordenacoes.coordenacao === 0
        ) {
          if (
            supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
            supervisoes.Supervisao === 0
          ) {
            // ('todos em  0');
            setAdultosCeleb(somatorio(celebracao, 'Adultos', qytSemanas));
            setCriancasCeleb(somatorio(celebracao, 'Criancas', qytSemanas));
            setVisACeleb(somatorio(celebracao, 'Visitantes', qytSemanas));
            setVisCCeleb(somatorio(celebracao, 'NomesVisitantes', qytSemanas));
            setConvCeleb(somatorio(celebracao, 'Conversoes', 1));
          } else {
            const celebracaoF = [];
            celebracao?.map((val) => {
              if (celulaSetor.length)
                celulaSetor?.map((val2) => {
                  if (
                    val.Celula === val2.Celula &&
                    supervisoes.Supervisao &&
                    val.Distrito === val2.Distrito
                  )
                    celebracaoF.push(val);
                  return 0;
                });
              return 0;
            });

            setAdultosCeleb(somatorio(celebracaoF, 'Adultos', qytSemanas));
            setCriancasCeleb(somatorio(celebracaoF, 'Criancas', qytSemanas));
            setVisACeleb(somatorio(celebracaoF, 'Visitantes', qytSemanas));
            setVisCCeleb(somatorio(celebracaoF, 'NomesVisitantes', qytSemanas));
            setConvCeleb(somatorio(celebracaoF, 'Conversoes', 1));
            // ('dist 0 e coor 0 e super 1');
          }
          console.log('dist 1 e coor 0');
        } else {
          // ('dist 0 e coor 1');
          // filtrar a coordenação

          const celulaCoord = celulaSetor.filter(
            (val) => val.Coordenacao === coordenacoes.Coordenacao,
          );
          if (
            supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
            supervisoes.Supervisao === 0
          ) {
            // ('todos em  0');
            const celebracaoF = [];
            celebracao?.map((val) => {
              if (celulaCoord.length)
                celulaCoord?.map((val2) => {
                  if (
                    val.Celula === val2.Celula &&
                    val.Distrito === val2.Distrito
                  )
                    celebracaoF.push(val);
                  return 0;
                });
              return 0;
            });
            setAdultosCeleb(somatorio(celebracaoF, 'Adultos', qytSemanas));
            setCriancasCeleb(somatorio(celebracaoF, 'Criancas', qytSemanas));
            setVisACeleb(somatorio(celebracaoF, 'Visitantes', qytSemanas));
            setVisCCeleb(somatorio(celebracaoF, 'NomesVisitantes', qytSemanas));
            setConvCeleb(somatorio(celebracaoF, 'Conversoes', 1));
          } else {
            const celebracaoF = [];
            celebracao?.map((val) => {
              if (celulaSetor.length)
                celulaSetor?.map((val2) => {
                  if (
                    val.Celula === val2.Celula &&
                    val.Distrito === val2.Distrito
                  )
                    celebracaoF.push(val);
                  return 0;
                });
              return 0;
            });

            setAdultosCeleb(somatorio(celebracaoF, 'Adultos', qytSemanas));
            setCriancasCeleb(somatorio(celebracaoF, 'Criancas', qytSemanas));
            setVisACeleb(somatorio(celebracaoF, 'Visitantes', qytSemanas));
            setVisCCeleb(somatorio(celebracaoF, 'NomesVisitantes', qytSemanas));
            setConvCeleb(somatorio(celebracaoF, 'Conversoes', 1));
            // ('dist 0 e coor 0 e super 1');
          }
        }
      }
    }

    if (errorCelebracao) return <div>An error occured.</div>;

    if (!celebracao) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [
    celebracao,
    numeroCelula,
    distritos,
    coordenacoes,
    supervisoes,
    celulaSetor,
  ]);

  React.useEffect(() => {
    // pegar a quantidade de semanas do periodo selecionado
    const numberSuper = sem1?.map((itens) => itens.Semana);
    const uniqueArrSuper = [...new Set(numberSuper)];
    const qytSemanas = uniqueArrSuper.length;
    //= ==============================================

    if (discipulado && numeroCelula.length) {
      if (discipulado && discipulado[0]) {
        if (
          distritos.Distrito_Nome === 'TODOS OS DISTRITOS' &&
          distritos.Distrito === 0
        ) {
          if (
            coordenacoes.Coordenacao_Nome === 'TODAS AS COORDENAÇÕES' &&
            coordenacoes.coordenacao === 0
          ) {
            if (
              supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
              supervisoes.Supervisao === 0
            ) {
              // ('todos em  0');
              setDisc(somatorio(discipulado, 'Adultos', qytSemanas));
              setLeitura(somatorio(discipulado, 'LeituraBiblica', qytSemanas));
            } else {
              const discipuladoF = [];
              discipulado?.map((val) => {
                if (celulaSetor.length)
                  celulaSetor?.map((val2) => {
                    if (
                      val.Celula === val2.Celula &&
                      val.Distrito === val2.Distrito
                    )
                      discipuladoF.push(val);
                    return 0;
                  });
                return 0;
              });

              setDisc(somatorio(discipuladoF, 'Adultos', qytSemanas));
              setLeitura(somatorio(discipuladoF, 'LeituraBiblica', qytSemanas));
              // ('dist 0 e coor 0 e super 1');
            }
          } else {
            console.log('dist 0 e coor 1');

            if (
              supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
              supervisoes.Supervisao === 0
            ) {
              // ('todos em  0');
              setDisc(somatorio(discipulado, 'Adultos', qytSemanas));
              setLeitura(somatorio(discipulado, 'LeituraBiblica', qytSemanas));
            } else {
              const discipuladoF = [];
              discipulado?.map((val) => {
                if (celulaSetor.length)
                  celulaSetor?.map((val2) => {
                    if (
                      val.Celula === val2.Celula &&
                      val.Distrito === val2.Distrito
                    )
                      discipuladoF.push(val);
                    return 0;
                  });
                return 0;
              });

              setDisc(somatorio(discipuladoF, 'Adultos', qytSemanas));
              setLeitura(somatorio(discipuladoF, 'LeituraBiblica', qytSemanas));
              // ('dist 0 e coor 0 e super 1');
            }
          }
        } else if (
          coordenacoes.Coordenacao_Nome === 'TODAS AS COORDENAÇÕES' &&
          coordenacoes.coordenacao === 0
        ) {
          if (
            supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
            supervisoes.Supervisao === 0
          ) {
            // ('todos em  0');
            setDisc(somatorio(discipulado, 'Adultos', qytSemanas));
            setLeitura(somatorio(discipulado, 'LeituraBiblica', qytSemanas));
          } else {
            const discipuladoF = [];
            discipulado?.map((val) => {
              if (celulaSetor.length)
                celulaSetor?.map((val2) => {
                  if (
                    val.Celula === val2.Celula &&
                    supervisoes.Supervisao &&
                    val.Distrito === val2.Distrito
                  )
                    discipuladoF.push(val);
                  return 0;
                });
              return 0;
            });

            setDisc(somatorio(discipuladoF, 'Adultos', qytSemanas));
            setLeitura(somatorio(discipuladoF, 'LeituraBiblica', qytSemanas));
            // ('dist 0 e coor 0 e super 1');
          }
          console.log('dist 1 e coor 0');
        } else {
          if (
            supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
            supervisoes.Supervisao === 0
          ) {
            // ('todos em  0');
            setDisc(somatorio(discipulado, 'Adultos', qytSemanas));
            setLeitura(somatorio(discipulado, 'LeituraBiblica', qytSemanas));
          } else {
            const discipuladoF = [];
            discipulado?.map((val) => {
              if (celulaSetor.length)
                celulaSetor?.map((val2) => {
                  if (
                    val.Celula === val2.Celula &&
                    supervisoes.Supervisao &&
                    val.Distrito === val2.Distrito
                  )
                    discipuladoF.push(val);
                  return 0;
                });
              return 0;
            });

            setDisc(somatorio(discipuladoF, 'Adultos', qytSemanas));
            setLeitura(somatorio(discipuladoF, 'LeituraBiblica', qytSemanas));
            // ('dist 0 e coor 0 e super 1');
          }
          console.log('dist 1 e coor 1');
        }
      }
    }

    if (errorDiscipulado) return <div>An error occured.</div>;

    if (!discipulado) return <Espera descricao="Buscando os Dados" />;

    return 0;
  }, [
    discipulado,
    numeroCelula,
    distritos,
    coordenacoes,
    supervisoes,
    celulaSetor,
  ]);

  //= ==================================================================
  console.log('adultosCelSS', adultosCel, periodo, adultosCeleb);
  return (
    <Box height="100%">
      {adultosCel ? (
        <TabGrafico
          periodo={periodo}
          adultosCel={adultosCel}
          adultosCeleb={adultosCeleb}
        />
      ) : null}
    </Box>
  );
}
