import * as React from 'react';
import { Box } from '@material-ui/core';
// import PegaSemana from 'src/utils/getSemana';
import Espera from 'src/utils/espera';
import useSWR from 'swr';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';

import 'react-toastify/dist/ReactToastify.css';

import { createTheme } from '@mui/material/styles';
import TabGrafico from './tabGrafico';
import TabGrafico2 from './tabGrafico2';

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
    dados = presDisc?.filter((val2) => val2.Semana === val);
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
  semanaI,
  semanaF,
  numeroCelula,
  anoIni,
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
  const [eventos, setEventos] = React.useState(0);
  const [visitas, setVisitas] = React.useState(0);
  const [disc, setDisc] = React.useState(0);
  const [leitura, setLeitura] = React.useState(0);
  const [convCel, setConvCel] = React.useState(0);
  const [convCeleb, setConvCeleb] = React.useState(0);
  const [periodo, setPeriodo] = React.useState(0);
  const [openAdulto, setOpenAdulto] = React.useState(false);
  const [openCriancas, setOpenCriancas] = React.useState(false);
  const [openVisA, setOpenVisA] = React.useState(false);
  const [openVisC, setOpenVisC] = React.useState(false);
  const [openDisc, setOpenDisc] = React.useState(false);
  const [openLeitura, setOpenLeitura] = React.useState(false);
  const [openConv, setOpenConv] = React.useState(false);
  const [openEvento, setOpenEvento] = React.useState(false);
  const [openTotal, setOpenTotal] = React.useState(false);
  const [openVisitas, setOpenVisitas] = React.useState(false);
  // para usar semanas

  const anoI = anoIni.substring(6, 10);

  const url1 = `/api/consultaRelatorioCelulasPeriodo/${anoI}`;
  const url3 = `/api/consultaRelatorioCelebracaoPeriodo/${anoI}`;
  const url4 = `/api/consultaRelatorioDiscipuladoPeriodo/$${anoI}`;
  const { data: sem1I, errorSem1 } = useSWR(url1, fetcher);
  const { data: celebracaoI, errorCelebracao } = useSWR(url3, fetcher);
  const { data: discipuladoI, errorDiscipulado } = useSWR(url4, fetcher);

  React.useEffect(() => {
    const newTCel = [];
    for (let i = 0; i < adultosCel.length; i += 1) {
      newTCel.push(
        Number(adultosCel[i]) +
          Number(criancasCel[i]) +
          Number(visACel[i]) +
          Number(visCCel[i]),
      );
    }

    setTotalCel(newTCel);
  }, [adultosCel, criancasCel, visACel, visCCel]);
  React.useEffect(() => {
    const newTCeleb = [];
    for (let i = 0; i < adultosCeleb.length; i += 1) {
      newTCeleb.push(
        Number(adultosCeleb[i]) +
          Number(criancasCeleb[i]) +
          Number(visACeleb[i]) +
          Number(visCCeleb[i]),
      );
    }
    setTotalCeleb(newTCeleb);
  }, [adultosCeleb, criancasCeleb, visACeleb, visCCeleb]);
  React.useEffect(() => {
    // pegar a quantidade de semanas do periodo selecionado
    const numberSuper = sem1I?.map((itens) => itens.Semana);
    const uniqueArrSuper = [...new Set(numberSuper)];
    const qytSemanas = uniqueArrSuper.length;
    //= ==============================================

    if (sem1I && numeroCelula.length) {
      const sem1 = sem1I?.filter(
        (val) => val.Semana >= semanaI && val.Semana <= semanaF,
      );
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
              // ('todos em  0', sem1);
              const setPerson = new Set();
              const newSem1 = sem1?.map((val) => val.Semana);
              const tiposSemana = newSem1?.filter((person) => {
                const duplicatedPerson = setPerson.has(person);
                setPerson.add(person);
                return !duplicatedPerson;
              });
              tiposSemana?.sort(ordenaArray);

              setPeriodo(tiposSemana);

              setAdultosCel(
                somatorio(sem1, 'Adultos', qytSemanas, tiposSemana),
              );
              setCriancasCel(
                somatorio(sem1, 'Criancas', qytSemanas, tiposSemana),
              );
              setVisACel(
                somatorio(sem1, 'Visitantes', qytSemanas, tiposSemana),
              );
              setVisCCel(
                somatorio(sem1, 'NomesVisitantes', qytSemanas, tiposSemana),
              );
              console.log('sem1', sem1);
              setConvCel(somatorio(sem1, 'Conversoes', 1, tiposSemana));
              setEventos(
                somatorio(sem1, 'PresentesEventos', qytSemanas, tiposSemana),
              );
              setVisitas(somatorio(sem1, 'Visitas', qytSemanas, tiposSemana));
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
                somatorio(sem1F, 'Criancas', qytSemanas, tiposSemana),
              );
              setVisACel(
                somatorio(sem1F, 'Visitantes', qytSemanas, tiposSemana),
              );
              setVisCCel(
                somatorio(sem1F, 'NomesVisitantes', qytSemanas, tiposSemana),
              );

              setConvCel(somatorio(sem1F, 'Conversoes', 1, tiposSemana));
              // ('dist 0 e coor 0 e super 1');
            }
          } else {
            // filtrar a coordenação

            const celulaCoord = celulaSetor?.filter(
              (val) => val.Coordenacao === coordenacoes.Coordenacao,
            );

            if (
              supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
              supervisoes.Supervisao === 0
            ) {
              // ('distrito=0 coord=1 super=0');
              const sem1F = [];
              sem1?.map((val) => {
                if (celulaCoord.length)
                  celulaCoord?.map((val2) => {
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
                somatorio(sem1F, 'Criancas', qytSemanas, tiposSemana),
              );
              setVisACel(
                somatorio(sem1F, 'Visitantes', qytSemanas, tiposSemana),
              );
              setVisCCel(
                somatorio(sem1F, 'NomesVisitantes', qytSemanas, tiposSemana),
              );

              setConvCel(somatorio(sem1F, 'Conversoes', 1, tiposSemana));
              // ('dist 0 e coor 0 e super 1');
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
                somatorio(sem1F, 'Criancas', qytSemanas, tiposSemana),
              );
              setVisACel(
                somatorio(sem1F, 'Visitantes', qytSemanas, tiposSemana),
              );
              setVisCCel(
                somatorio(sem1F, 'NomesVisitantes', qytSemanas, tiposSemana),
              );

              setConvCel(somatorio(sem1F, 'Conversoes', 1, tiposSemana));
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
            // ('dist e coord em 1 e super em 0');
            const sem1F = sem1?.filter(
              (val) => val.Distrito === distritos.Distrito,
            );
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
              somatorio(sem1F, 'Criancas', qytSemanas, tiposSemana),
            );
            setVisACel(somatorio(sem1F, 'Visitantes', qytSemanas, tiposSemana));
            setVisCCel(
              somatorio(sem1F, 'NomesVisitantes', qytSemanas, tiposSemana),
            );

            setVisCCel(setConvCel(sem1F, 'Conversoes', 1, tiposSemana));
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
              somatorio(sem1F, 'Criancas', qytSemanas, tiposSemana),
            );
            setVisACel(somatorio(sem1F, 'Visitantes', qytSemanas, tiposSemana));
            setVisCCel(
              somatorio(sem1F, 'NomesVisitantes', qytSemanas, tiposSemana),
            );

            setVisCCel(setConvCel(sem1F, 'Conversoes', 1, tiposSemana));
            // ('dist 0 e coor 0 e super 1');
          }
        } else {
          // filtrar a coordenação

          const celulaCoord = celulaSetor?.filter(
            (val) => val.Coordenacao === coordenacoes.Coordenacao,
          );

          if (
            supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
            supervisoes.Supervisao === 0
          ) {
            // ('distrito=1 coord=1 super=0');
            const sem1F = [];
            sem1?.map((val) => {
              if (celulaCoord.length)
                celulaCoord?.map((val2) => {
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
              somatorio(sem1F, 'Criancas', qytSemanas, tiposSemana),
            );
            setVisACel(somatorio(sem1F, 'Visitantes', qytSemanas, tiposSemana));
            setVisCCel(
              somatorio(sem1F, 'NomesVisitantes', qytSemanas, tiposSemana),
            );

            setVisCCel(setConvCel(sem1F, 'Conversoes', 1, tiposSemana));
          } else {
            const sem1F = [];
            sem1?.map((val) => {
              if (celulaCoord.length)
                celulaCoord?.map((val2) => {
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
              somatorio(sem1F, 'Criancas', qytSemanas, tiposSemana),
            );
            setVisACel(somatorio(sem1F, 'Visitantes', qytSemanas, tiposSemana));
            setVisCCel(
              somatorio(sem1F, 'NomesVisitantes', qytSemanas, tiposSemana),
            );

            setVisCCel(setConvCel(sem1F, 'Conversoes', 1, tiposSemana));
            // ('dist 1 e coor 1 e super 1');
          }
        }
      }
    }

    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1I) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1I, numeroCelula, distritos, coordenacoes, supervisoes, celulaSetor]);

  React.useEffect(() => {
    // pegar a quantidade de semanas do periodo selecionado
    const numberSuper = celebracaoI?.map((itens) => itens.Semana);
    const uniqueArrSuper = [...new Set(numberSuper)];
    const qytSemanas = uniqueArrSuper.length;
    //= ==============================================
    const celebracao = celebracaoI?.filter(
      (val) => val.Semana >= semanaI && val.Semana <= semanaF,
    );

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
              // ('todos em  0', celebracao);
              const setPerson = new Set();
              const newSem1 = celebracao?.map((val) => val.Semana);
              const tiposSemana = newSem1?.filter((person) => {
                const duplicatedPerson = setPerson.has(person);
                setPerson.add(person);
                return !duplicatedPerson;
              });

              setAdultosCeleb(
                somatorio(celebracao, 'Adultos', qytSemanas, tiposSemana),
              );

              setCriancasCeleb(
                somatorio(celebracao, 'Criancas', qytSemanas, tiposSemana),
              );
              setVisACeleb(
                somatorio(celebracao, 'Visitantes', qytSemanas, tiposSemana),
              );
              setVisCCeleb(
                somatorio(
                  celebracao,
                  'NomesVisitantes',
                  qytSemanas,
                  tiposSemana,
                ),
              );

              setConvCeleb(somatorio(celebracao, 'Conversoes', 1, tiposSemana));
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

              const setPerson = new Set();
              const newSem1 = celebracaoF?.map((val) => val.Semana);
              const tiposSemana = newSem1?.filter((person) => {
                const duplicatedPerson = setPerson.has(person);
                setPerson.add(person);
                return !duplicatedPerson;
              });

              setAdultosCeleb(
                somatorio(celebracaoF, 'Adultos', qytSemanas, tiposSemana),
              );
              setCriancasCeleb(
                somatorio(celebracaoF, 'Criancas', qytSemanas, tiposSemana),
              );
              setVisACeleb(
                somatorio(celebracaoF, 'Visitantes', qytSemanas, tiposSemana),
              );
              setVisCCeleb(
                somatorio(
                  celebracaoF,
                  'NomesVisitantes',
                  qytSemanas,
                  tiposSemana,
                ),
              );

              setConvCeleb(
                somatorio(celebracaoF, 'Conversoes', 1, tiposSemana),
              );
              // ('dist 0 e coor 0 e super 1');
            }
          } else {
            // filtrar a coordenação

            const celulaCoord = celulaSetor?.filter(
              (val) => val.Coordenacao === coordenacoes.Coordenacao,
            );

            if (
              supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
              supervisoes.Supervisao === 0
            ) {
              // ('distrito=0 coord=1 super=0');
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

              const setPerson = new Set();
              const newSem1 = celebracaoF?.map((val) => val.Semana);
              const tiposSemana = newSem1?.filter((person) => {
                const duplicatedPerson = setPerson.has(person);
                setPerson.add(person);
                return !duplicatedPerson;
              });

              setAdultosCeleb(
                somatorio(celebracaoF, 'Adultos', qytSemanas, tiposSemana),
              );
              setCriancasCeleb(
                somatorio(celebracaoF, 'Criancas', qytSemanas, tiposSemana),
              );
              setVisACeleb(
                somatorio(celebracaoF, 'Visitantes', qytSemanas, tiposSemana),
              );
              setVisCCeleb(
                somatorio(
                  celebracaoF,
                  'NomesVisitantes',
                  qytSemanas,
                  tiposSemana,
                ),
              );

              setConvCeleb(
                somatorio(celebracaoF, 'Conversoes', 1, tiposSemana),
              );
              // ('dist 0 e coor 0 e super 1');
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

              const setPerson = new Set();
              const newSem1 = celebracaoF?.map((val) => val.Semana);
              const tiposSemana = newSem1?.filter((person) => {
                const duplicatedPerson = setPerson.has(person);
                setPerson.add(person);
                return !duplicatedPerson;
              });

              setAdultosCeleb(
                somatorio(celebracaoF, 'Adultos', qytSemanas, tiposSemana),
              );
              setCriancasCeleb(
                somatorio(celebracaoF, 'Criancas', qytSemanas, tiposSemana),
              );
              setVisACeleb(
                somatorio(celebracaoF, 'Visitantes', qytSemanas, tiposSemana),
              );
              setVisCCeleb(
                somatorio(
                  celebracaoF,
                  'NomesVisitantes',
                  qytSemanas,
                  tiposSemana,
                ),
              );

              setConvCeleb(
                somatorio(celebracaoF, 'Conversoes', 1, tiposSemana),
              );
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
            // ('dist e coord em 1 e super em 0');
            const celebracaoF = celebracao?.filter(
              (val) => val.Distrito === distritos.Distrito,
            );
            const setPerson = new Set();
            const newSem1 = celebracaoF?.map((val) => val.Semana);
            const tiposSemana = newSem1?.filter((person) => {
              const duplicatedPerson = setPerson.has(person);
              setPerson.add(person);
              return !duplicatedPerson;
            });

            setAdultosCeleb(
              somatorio(celebracaoF, 'Adultos', qytSemanas, tiposSemana),
            );
            setCriancasCeleb(
              somatorio(celebracaoF, 'Criancas', qytSemanas, tiposSemana),
            );
            setVisACeleb(
              somatorio(celebracaoF, 'Visitantes', qytSemanas, tiposSemana),
            );
            setVisCCeleb(
              somatorio(
                celebracaoF,
                'NomesVisitantes',
                qytSemanas,
                tiposSemana,
              ),
            );

            setVisCCeleb(
              setConvCeleb(celebracaoF, 'Conversoes', 1, tiposSemana),
            );
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

            const setPerson = new Set();
            const newSem1 = celebracaoF?.map((val) => val.Semana);
            const tiposSemana = newSem1?.filter((person) => {
              const duplicatedPerson = setPerson.has(person);
              setPerson.add(person);
              return !duplicatedPerson;
            });

            setAdultosCeleb(
              somatorio(celebracaoF, 'Adultos', qytSemanas, tiposSemana),
            );
            setCriancasCeleb(
              somatorio(celebracaoF, 'Criancas', qytSemanas, tiposSemana),
            );
            setVisACeleb(
              somatorio(celebracaoF, 'Visitantes', qytSemanas, tiposSemana),
            );
            setVisCCeleb(
              somatorio(
                celebracaoF,
                'NomesVisitantes',
                qytSemanas,
                tiposSemana,
              ),
            );

            setVisCCeleb(
              setConvCeleb(celebracaoF, 'Conversoes', 1, tiposSemana),
            );
            // ('dist 0 e coor 0 e super 1');
          }
        } else {
          // filtrar a coordenação

          const celulaCoord = celulaSetor?.filter(
            (val) => val.Coordenacao === coordenacoes.Coordenacao,
          );

          if (
            supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
            supervisoes.Supervisao === 0
          ) {
            // ('distrito=1 coord=1 super=0');
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

            const setPerson = new Set();
            const newSem1 = celebracaoF?.map((val) => val.Semana);
            const tiposSemana = newSem1?.filter((person) => {
              const duplicatedPerson = setPerson.has(person);
              setPerson.add(person);
              return !duplicatedPerson;
            });

            setAdultosCeleb(
              somatorio(celebracaoF, 'Adultos', qytSemanas, tiposSemana),
            );
            setCriancasCeleb(
              somatorio(celebracaoF, 'Criancas', qytSemanas, tiposSemana),
            );
            setVisACeleb(
              somatorio(celebracaoF, 'Visitantes', qytSemanas, tiposSemana),
            );
            setVisCCeleb(
              somatorio(
                celebracaoF,
                'NomesVisitantes',
                qytSemanas,
                tiposSemana,
              ),
            );

            setVisCCeleb(
              setConvCeleb(celebracaoF, 'Conversoes', 1, tiposSemana),
            );
          } else {
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

            const setPerson = new Set();
            const newSem1 = celebracaoF?.map((val) => val.Semana);
            const tiposSemana = newSem1?.filter((person) => {
              const duplicatedPerson = setPerson.has(person);
              setPerson.add(person);
              return !duplicatedPerson;
            });

            setAdultosCeleb(
              somatorio(celebracaoF, 'Adultos', qytSemanas, tiposSemana),
            );
            setCriancasCeleb(
              somatorio(celebracaoF, 'Criancas', qytSemanas, tiposSemana),
            );
            setVisACeleb(
              somatorio(celebracaoF, 'Visitantes', qytSemanas, tiposSemana),
            );
            setVisCCeleb(
              somatorio(
                celebracaoF,
                'NomesVisitantes',
                qytSemanas,
                tiposSemana,
              ),
            );

            setVisCCeleb(
              setConvCeleb(celebracaoF, 'Conversoes', 1, tiposSemana),
            );
            // ('dist 1 e coor 1 e super 1');
          }
        }
      }
    }

    if (errorCelebracao) return <div>An error occured.</div>;

    if (!celebracao) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [
    celebracaoI,
    numeroCelula,
    distritos,
    coordenacoes,
    supervisoes,
    celulaSetor,
  ]);

  React.useEffect(() => {
    // pegar a quantidade de semanas do periodo selecionado
    const numberSuper = sem1I?.map((itens) => itens.Semana);
    const uniqueArrSuper = [...new Set(numberSuper)];
    const qytSemanas = uniqueArrSuper.length;
    //= ==============================================
    const discipulado = discipuladoI?.filter(
      (val) => val.Semana >= semanaI && val.Semana <= semanaF,
    );

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
              const setPerson = new Set();
              const newSem1 = discipulado?.map((val) => val.Semana);
              const tiposSemana = newSem1?.filter((person) => {
                const duplicatedPerson = setPerson.has(person);
                setPerson.add(person);
                return !duplicatedPerson;
              });
              tiposSemana?.sort(ordenaArray);
              setDisc(
                somatorio(discipulado, 'Adultos', qytSemanas, tiposSemana),
              );
              setLeitura(
                somatorio(
                  discipulado,
                  'LeituraBiblica',
                  qytSemanas,
                  tiposSemana,
                ),
              );
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
              const setPerson = new Set();
              const newSem1 = discipuladoF?.map((val) => val.Semana);
              const tiposSemana = newSem1?.filter((person) => {
                const duplicatedPerson = setPerson.has(person);
                setPerson.add(person);
                return !duplicatedPerson;
              });
              tiposSemana?.sort(ordenaArray);
              setDisc(
                somatorio(discipuladoF, 'Adultos', qytSemanas, tiposSemana),
              );
              setLeitura(
                somatorio(
                  discipuladoF,
                  'LeituraBiblica',
                  qytSemanas,
                  tiposSemana,
                ),
              );
              // ('dist 0 e coor 0 e super 1');
            }
          } else {
            // filtrar a coordenação

            const celulaCoord = celulaSetor?.filter(
              (val) => val.Coordenacao === coordenacoes.Coordenacao,
            );

            if (
              supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
              supervisoes.Supervisao === 0
            ) {
              // ('distrito=0 coord=1 super=0');
              const discipuladoF = [];
              discipulado?.map((val) => {
                if (celulaCoord.length)
                  celulaCoord?.map((val2) => {
                    if (
                      val.Celula === val2.Celula &&
                      val.Distrito === val2.Distrito
                    )
                      discipuladoF.push(val);
                    return 0;
                  });
                return 0;
              });
              const setPerson = new Set();
              const newSem1 = discipuladoF?.map((val) => val.Semana);
              const tiposSemana = newSem1?.filter((person) => {
                const duplicatedPerson = setPerson.has(person);
                setPerson.add(person);
                return !duplicatedPerson;
              });
              tiposSemana?.sort(ordenaArray);
              setDisc(
                somatorio(discipuladoF, 'Adultos', qytSemanas, tiposSemana),
              );
              setLeitura(
                somatorio(
                  discipuladoF,
                  'LeituraBiblica',
                  qytSemanas,
                  tiposSemana,
                ),
              );
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
              const setPerson = new Set();
              const newSem1 = discipuladoF?.map((val) => val.Semana);
              const tiposSemana = newSem1?.filter((person) => {
                const duplicatedPerson = setPerson.has(person);
                setPerson.add(person);
                return !duplicatedPerson;
              });
              tiposSemana?.sort(ordenaArray);
              setDisc(
                somatorio(discipuladoF, 'Adultos', qytSemanas, tiposSemana),
              );
              setLeitura(
                somatorio(
                  discipuladoF,
                  'LeituraBiblica',
                  qytSemanas,
                  tiposSemana,
                ),
              );
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
            const discipuladoF = discipulado?.filter(
              (val) => val.Distrito === distritos.Distrito,
            );
            const setPerson = new Set();
            const newSem1 = discipuladoF?.map((val) => val.Semana);
            const tiposSemana = newSem1?.filter((person) => {
              const duplicatedPerson = setPerson.has(person);
              setPerson.add(person);
              return !duplicatedPerson;
            });
            tiposSemana?.sort(ordenaArray);
            setDisc(
              somatorio(discipuladoF, 'Adultos', qytSemanas, tiposSemana),
            );
            setLeitura(
              somatorio(
                discipuladoF,
                'LeituraBiblica',
                qytSemanas,
                tiposSemana,
              ),
            );
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
            const setPerson = new Set();
            const newSem1 = discipuladoF?.map((val) => val.Semana);
            const tiposSemana = newSem1?.filter((person) => {
              const duplicatedPerson = setPerson.has(person);
              setPerson.add(person);
              return !duplicatedPerson;
            });
            tiposSemana?.sort(ordenaArray);
            setDisc(
              somatorio(discipuladoF, 'Adultos', qytSemanas, tiposSemana),
            );
            setLeitura(
              somatorio(
                discipuladoF,
                'LeituraBiblica',
                qytSemanas,
                tiposSemana,
              ),
            );
            // ('dist 0 e coor 0 e super 1');
          }
        } else {
          // filtrar a coordenação

          const celulaCoord = celulaSetor?.filter(
            (val) => val.Coordenacao === coordenacoes.Coordenacao,
          );

          if (
            supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
            supervisoes.Supervisao === 0
          ) {
            // ('distrito=0 coord=1 super=0');
            const discipuladoF = [];
            discipulado?.map((val) => {
              if (celulaCoord.length)
                celulaCoord?.map((val2) => {
                  if (
                    val.Celula === val2.Celula &&
                    val.Distrito === val2.Distrito
                  )
                    discipuladoF.push(val);
                  return 0;
                });
              return 0;
            });
            const setPerson = new Set();
            const newSem1 = discipuladoF?.map((val) => val.Semana);
            const tiposSemana = newSem1?.filter((person) => {
              const duplicatedPerson = setPerson.has(person);
              setPerson.add(person);
              return !duplicatedPerson;
            });
            tiposSemana?.sort(ordenaArray);
            setDisc(
              somatorio(discipuladoF, 'Adultos', qytSemanas, tiposSemana),
            );
            setLeitura(
              somatorio(
                discipuladoF,
                'LeituraBiblica',
                qytSemanas,
                tiposSemana,
              ),
            );
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
            const setPerson = new Set();
            const newSem1 = discipuladoF?.map((val) => val.Semana);
            const tiposSemana = newSem1?.filter((person) => {
              const duplicatedPerson = setPerson.has(person);
              setPerson.add(person);
              return !duplicatedPerson;
            });
            tiposSemana?.sort(ordenaArray);
            setDisc(
              somatorio(discipuladoF, 'Adultos', qytSemanas, tiposSemana),
            );
            setLeitura(
              somatorio(
                discipuladoF,
                'LeituraBiblica',
                qytSemanas,
                tiposSemana,
              ),
            );
            // ('dist 0 e coor 0 e super 1');
          }
        }
      }
    }

    if (errorDiscipulado) return <div>An error occured.</div>;

    if (!discipulado) return <Espera descricao="Buscando os Dados" />;

    return 0;
  }, [
    discipuladoI,
    numeroCelula,
    distritos,
    coordenacoes,
    supervisoes,
    celulaSetor,
  ]);

  //= ==================================================================

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {periodo.length > 1 ? (
        <Box width="100%">
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Box
              sx={{ cursor: 'pointer' }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="#795548"
              color="white"
              borderRadius={6}
              fontFamily="Fugaz One"
              height={45}
              width="40%"
              onClick={() => {
                setOpenAdulto(true);
              }}
            >
              ADULTOS
            </Box>
            <Box
              ml={2}
              sx={{ cursor: 'pointer' }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="#795AAA"
              color="white"
              borderRadius={6}
              fontFamily="Fugaz One"
              height={45}
              width="40%"
              onClick={() => {
                setOpenCriancas(true);
              }}
            >
              CRIANÇAS
            </Box>
          </Box>
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Box
              sx={{ cursor: 'pointer' }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="#43a047"
              color="white"
              borderRadius={6}
              fontFamily="Fugaz One"
              height={45}
              width="40%"
              onClick={() => {
                setOpenVisA(true);
              }}
            >
              <Box textAlign="center">VISITANTES ADULTOS</Box>
            </Box>
            <Box
              ml={2}
              sx={{ cursor: 'pointer' }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="#00796b"
              color="white"
              borderRadius={6}
              fontFamily="Fugaz One"
              height={45}
              width="40%"
              onClick={() => {
                setOpenVisC(true);
              }}
            >
              <Box textAlign="center">VISITANTES CRIANÇAS</Box>
            </Box>
          </Box>
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Box
              sx={{ cursor: 'pointer' }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="#f4511e"
              color="white"
              borderRadius={6}
              fontFamily="Fugaz One"
              height={45}
              width="40%"
              onClick={() => {
                setOpenDisc(true);
              }}
            >
              DISCIPULADO
            </Box>
            <Box
              ml={2}
              sx={{ cursor: 'pointer' }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="#827717"
              color="white"
              borderRadius={6}
              fontFamily="Fugaz One"
              height={45}
              width="40%"
              onClick={() => {
                setOpenLeitura(true);
              }}
            >
              DEVOCIONAL
            </Box>
          </Box>
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Box
              sx={{ cursor: 'pointer' }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="#880e4f"
              color="white"
              borderRadius={6}
              fontFamily="Fugaz One"
              height={45}
              width="40%"
              onClick={() => {
                setOpenEvento(true);
              }}
            >
              EVENTOS
            </Box>
            <Box
              ml={2}
              sx={{ cursor: 'pointer' }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="#3f51b5"
              color="white"
              borderRadius={6}
              fontFamily="Fugaz One"
              height={45}
              width="40%"
              onClick={() => {
                setOpenConv(true);
              }}
            >
              CONVERSÕES
            </Box>
          </Box>
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Box
              sx={{ cursor: 'pointer' }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="#b71c1c"
              color="white"
              borderRadius={6}
              fontFamily="Fugaz One"
              height={45}
              width="40%"
              onClick={() => {
                setOpenVisitas(true);
              }}
            >
              VISITAS LÍDER
            </Box>
            <Box
              ml={2}
              sx={{ cursor: 'pointer' }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="#9c27b0"
              color="white"
              borderRadius={6}
              fontFamily="Fugaz One"
              height={45}
              width="40%"
              onClick={() => {
                setOpenTotal(true);
              }}
            >
              TOTAL
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          fontFamily="Fugaz One"
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Box
              fontFamily="Fugaz One"
              height="100%"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              PERÍODO INFERIOR A 7 DIAS
            </Box>
            <Box
              mt={2}
              fontFamily="Fugaz One"
              height="100%"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              ESCOLHA UM PERÍODO VÁLIDO
            </Box>
          </Box>
        </Box>
      )}
      {console.log('periodo', periodo, totalCel, totalCeleb)}

      <Dialog fullScreen open={openAdulto}>
        <TabGrafico
          periodo={periodo}
          pessoasCel={adultosCel}
          pessoasCeleb={adultosCeleb}
          setOpenAdulto={setOpenAdulto}
          setOpenCriancas={setOpenCriancas}
          setOpenVisA={setOpenVisA}
          setOpenVisC={setOpenVisC}
          setOpenConv={setOpenConv}
          setOpenTotal={setOpenTotal}
          tipo="Adultos"
          corCel1="#795548"
          corCel2="#a1887f"
          corCeleb1="#795AAA"
          corCeleb2="#ba68c8"
        />
      </Dialog>
      <Dialog fullScreen open={openCriancas}>
        <TabGrafico
          periodo={periodo}
          pessoasCel={criancasCel}
          pessoasCeleb={criancasCeleb}
          setOpenAdulto={setOpenAdulto}
          setOpenCriancas={setOpenCriancas}
          setOpenVisA={setOpenVisA}
          setOpenVisC={setOpenVisC}
          setOpenConv={setOpenConv}
          setOpenTotal={setOpenTotal}
          tipo="Criancas"
          corCel1="#795AAA"
          corCel2="#ba68c8"
          corCeleb1="#00c853"
          corCeleb2="#f4ff81"
        />
      </Dialog>
      <Dialog fullScreen open={openVisA}>
        <TabGrafico
          periodo={periodo}
          pessoasCel={visACel}
          pessoasCeleb={visACeleb}
          setOpenAdulto={setOpenAdulto}
          setOpenCriancas={setOpenCriancas}
          setOpenVisA={setOpenVisA}
          setOpenVisC={setOpenVisC}
          setOpenConv={setOpenConv}
          setOpenTotal={setOpenTotal}
          tipo="Visitantes Adultos"
          corCel1="#43a047"
          corCel2="#81c784"
          corCeleb1="#ffa726"
          corCeleb2="#ffcc80"
        />
      </Dialog>
      <Dialog fullScreen open={openVisC}>
        <TabGrafico
          periodo={periodo}
          pessoasCel={visCCel}
          pessoasCeleb={visCCeleb}
          setOpenAdulto={setOpenAdulto}
          setOpenCriancas={setOpenCriancas}
          setOpenVisA={setOpenVisA}
          setOpenVisC={setOpenVisC}
          setOpenConv={setOpenConv}
          setOpenTotal={setOpenTotal}
          tipo="Visitantes Criancas"
          corCel1="#00897b"
          corCel2="#80cbc4"
          corCeleb1="#ffa726"
          corCeleb2="#ffcc80"
        />
      </Dialog>
      <Dialog fullScreen open={openLeitura}>
        <TabGrafico2
          periodo={periodo}
          pessoas={leitura}
          setOpenLeitura={setOpenLeitura}
          setOpenDisc={setOpenDisc}
          setOpenEvento={setOpenEvento}
          setOpenVisitas={setOpenVisitas}
          tipo="Devocional Diário"
          cor1="#827717"
          cor2="#afb42b"
        />
      </Dialog>
      <Dialog fullScreen open={openDisc}>
        <TabGrafico2
          periodo={periodo}
          pessoas={disc}
          setOpenLeitura={setOpenLeitura}
          setOpenDisc={setOpenDisc}
          setOpenEvento={setOpenEvento}
          setOpenVisitas={setOpenVisitas}
          tipo="Discipulado"
          cor1="#f4511e"
          cor2="#ffab91"
        />
      </Dialog>
      <Dialog fullScreen open={openConv}>
        <TabGrafico
          periodo={periodo}
          pessoasCel={convCel}
          pessoasCeleb={convCeleb}
          setOpenAdulto={setOpenAdulto}
          setOpenCriancas={setOpenCriancas}
          setOpenVisA={setOpenVisA}
          setOpenVisC={setOpenVisC}
          setOpenConv={setOpenConv}
          setOpenTotal={setOpenTotal}
          tipo="Conversões"
          corCel1="#3f51b5"
          corCel2="#80cbc4"
          corCeleb1="#ffa726"
          corCeleb2="#ffcc80"
        />
      </Dialog>
      <Dialog fullScreen open={openEvento}>
        <TabGrafico2
          periodo={periodo}
          pessoas={eventos}
          setOpenLeitura={setOpenLeitura}
          setOpenDisc={setOpenDisc}
          setOpenEvento={setOpenEvento}
          setOpenVisitas={setOpenVisitas}
          tipo="Eventos"
          cor1="#880e4f"
          cor2="#e91e63"
        />
      </Dialog>
      <Dialog fullScreen open={openVisitas}>
        <TabGrafico2
          periodo={periodo}
          pessoas={visitas}
          setOpenLeitura={setOpenLeitura}
          setOpenDisc={setOpenDisc}
          setOpenEvento={setOpenEvento}
          setOpenVisitas={setOpenVisitas}
          tipo=" VISITAS DO LÍDER"
          cor1="#b71c1c"
          cor2="#ffab91"
        />
      </Dialog>
      <Dialog fullScreen open={openTotal}>
        <TabGrafico
          periodo={periodo}
          pessoasCel={totalCel}
          pessoasCeleb={totalCeleb}
          setOpenAdulto={setOpenAdulto}
          setOpenCriancas={setOpenCriancas}
          setOpenVisA={setOpenVisA}
          setOpenVisC={setOpenVisC}
          setOpenConv={setOpenConv}
          setOpenTotal={setOpenTotal}
          tipo="Total de Presentes"
          corCel1="#9c27b0"
          corCel2="#ce93d8"
          corCeleb1="#ffa726"
          corCeleb2="#ffcc80"
        />
      </Dialog>
    </Box>
  );
}
