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

const theme = createTheme();
theme.typography.hs4 = {
  fontWeight: 'normal',
  fontSize: '9px',
  '@media (min-width:350px)': {
    fontSize: '10px',
  },
  '@media (min-width:400px)': {
    fontSize: '11px',
  },
  '@media (min-width:460px)': {
    fontSize: '12px',
  },
  '@media (min-width:520px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '12px',
  },
};
theme.typography.hs3 = {
  fontWeight: 'normal',
  fontSize: '10px',
  '@media (min-width:350px)': {
    fontSize: '13px',
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

const somatorio = (presDisc, valor, divisor) => {
  const soma = presDisc
    ?.map((item) => {
      if (Number(item[valor]) !== undefined) return Number(item[valor]);
      return 0;
    })
    .reduce((prev, curr) => prev + curr, 0);

  return Number(soma / divisor).toFixed(0);
};

export default function TabCelula({
  supervisoes,
  coordenacoes,
  distritos,

  numeroCelula,
  anoIni,
  semanaI,
  semanaF,
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
  //  const [openRelatorio, setOpenRelatorio] = React.useState(false);

  // para usar semanas

  const anoI = anoIni.substring(6, 10);

  const url1 = `/api/consultaRelatorioCelulasPeriodo/${anoI}`;
  const url3 = `/api/consultaRelatorioCelebracaoPeriodo/${anoI}`;
  const url4 = `/api/consultaRelatorioDiscipuladoPeriodo/${anoI}`;
  const { data: sem1I, errorSem1 } = useSWR(url1, fetcher);
  const { data: celebracaoI, errorCelebracao } = useSWR(url3, fetcher);
  const { data: discipuladoI, errorDiscipulado } = useSWR(url4, fetcher);

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
    const sem1 = sem1I?.filter(
      (val) => val.Semana >= semanaI && val.Semana <= semanaF,
    );

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
              // ('todos em  0', sem1);
              setAdultosCel(somatorio(sem1, 'Adultos', qytSemanas));
              setCriancasCel(somatorio(sem1, 'Criancas', qytSemanas));
              setVisACel(somatorio(sem1, 'Visitantes', qytSemanas));
              setVisCCel(somatorio(sem1, 'NomesVisitantes', qytSemanas));
              setConvCel(somatorio(sem1, 'Conversoes', 1));
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

              setAdultosCel(somatorio(sem1F, 'Adultos', qytSemanas));
              setCriancasCel(somatorio(sem1F, 'Criancas', qytSemanas));
              setVisACel(somatorio(sem1F, 'Visitantes', qytSemanas));
              setVisCCel(somatorio(sem1F, 'NomesVisitantes', qytSemanas));
              setConvCel(somatorio(sem1F, 'Conversoes', 1));
              // ('dist 0 e coor 0 e super 1');
            }
          } else {
            // filtrar a coordenação

            const celulaCoord = celulaSetor.filter(
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
              setAdultosCel(somatorio(sem1F, 'Adultos', qytSemanas));
              setCriancasCel(somatorio(sem1F, 'Criancas', qytSemanas));
              setVisACel(somatorio(sem1F, 'Visitantes', qytSemanas));
              setVisCCel(somatorio(sem1F, 'NomesVisitantes', qytSemanas));
              setConvCel(somatorio(sem1F, 'Conversoes', 1));
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

              setAdultosCel(somatorio(sem1F, 'Adultos', qytSemanas));
              setCriancasCel(somatorio(sem1F, 'Criancas', qytSemanas));
              setVisACel(somatorio(sem1F, 'Visitantes', qytSemanas));
              setVisCCel(somatorio(sem1F, 'NomesVisitantes', qytSemanas));
              setConvCel(somatorio(sem1F, 'Conversoes', 1));
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
            const sem1F = sem1?.filter(
              (val) => val.Distrito === distritos.Distrito,
            );

            setAdultosCel(somatorio(sem1F, 'Adultos', qytSemanas));
            setCriancasCel(somatorio(sem1F, 'Criancas', qytSemanas));
            setVisACel(somatorio(sem1F, 'Visitantes', qytSemanas));
            setVisCCel(somatorio(sem1F, 'NomesVisitantes', qytSemanas));
            setConvCel(somatorio(sem1F, 'Conversoes', 1));
            // ('dist=1 coord=0 super=0');
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

            setAdultosCel(somatorio(sem1F, 'Adultos', qytSemanas));
            setCriancasCel(somatorio(sem1F, 'Criancas', qytSemanas));
            setVisACel(somatorio(sem1F, 'Visitantes', qytSemanas));
            setVisCCel(somatorio(sem1F, 'NomesVisitantes', qytSemanas));
            setConvCel(somatorio(sem1F, 'Conversoes', 1));
            // ('dist 0 e coor 0 e super 1');
          }
        } else {
          // filtrar a coordenação
          const celulaCoord = celulaSetor.filter(
            (val) => val.Coordenacao === coordenacoes.Coordenacao,
          );
          if (
            supervisoes.Supervisao_Nome === 'TODAS AS SUPERVISÕES' &&
            supervisoes.Supervisao === 0
          ) {
            // ('todos em  0');
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
            setAdultosCel(somatorio(sem1F, 'Adultos', qytSemanas));
            setCriancasCel(somatorio(sem1F, 'Criancas', qytSemanas));
            setVisACel(somatorio(sem1F, 'Visitantes', qytSemanas));
            setVisCCel(somatorio(sem1F, 'NomesVisitantes', qytSemanas));
            setConvCel(somatorio(sem1F, 'Conversoes', 1));
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

            setAdultosCel(somatorio(sem1F, 'Adultos', qytSemanas));
            setCriancasCel(somatorio(sem1F, 'Criancas', qytSemanas));
            setVisACel(somatorio(sem1F, 'Visitantes', qytSemanas));
            setVisCCel(somatorio(sem1F, 'NomesVisitantes', qytSemanas));
            setConvCel(somatorio(sem1F, 'Conversoes', 1));
            // ('dist 0 e coor 0 e super 1');
          }
        }
      }
    }

    if (errorSem1) return <div>An error occured.</div>;

    if (!sem1) return <Espera descricao="Buscando os Dados" />;
    return 0;
  }, [sem1I, numeroCelula, distritos, coordenacoes, supervisoes, celulaSetor]);

  React.useEffect(() => {
    // pegar a quantidade de semanas do periodo selecionado
    const celebracao = celebracaoI?.filter(
      (val) => val.Semana >= semanaI && val.Semana <= semanaF,
    );

    const numberSuper = celebracao?.map((itens) => itens.Semana);
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
              setAdultosCeleb(somatorio(celebracao, 'Adultos', qytSemanas));
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
            // filtrar a coordenação

            const celulaCoord = celulaSetor.filter(
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
            const celebracaoF = celebracao?.filter(
              (val) => val.Distrito === distritos.Distrito,
            );
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
        } else {
          // ('filtrar a coordenação');
          const celulaCoord = celulaSetor.filter(
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

    const discipulado = discipuladoI?.filter(
      (val) => val.Semana >= semanaI && val.Semana <= semanaF,
    );

    const numberSuper = discipulado?.map((itens) => itens.Semana);
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
            // filtrar a coordenação

            const celulaCoord = celulaSetor.filter(
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
              setDisc(somatorio(discipuladoF, 'Adultos', qytSemanas));
              setLeitura(somatorio(discipuladoF, 'LeituraBiblica', qytSemanas));
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
            const discipuladoF = discipulado?.filter(
              (val) => val.Distrito === distritos.Distrito,
            );
            setDisc(somatorio(discipuladoF, 'Adultos', qytSemanas));
            setLeitura(somatorio(discipuladoF, 'LeituraBiblica', qytSemanas));
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
        } else {
          // filtrar a coordenação

          const celulaCoord = celulaSetor.filter(
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
            setDisc(somatorio(discipuladoF, 'Adultos', qytSemanas));
            setLeitura(somatorio(discipuladoF, 'LeituraBiblica', qytSemanas));
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
    <Box height="100%">
      <Box
        bgcolor="#80cbc4"
        sx={{
          fontFamily: 'arial black',
          fontSize: '11px',
          borderBottom: '1px solid #000',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
        }}
        height="30%"
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
          width="40%"
          sx={{
            borderRight: '1px solid #000',
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography variant="hs4">TIPO</Typography>
          </ThemeProvider>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="20%"
          height="100%"
          sx={{
            borderRight: '1px solid #000',
            textOrientation: 'mixed',
            writingMode: 'vertical-rl',
          }}
        >
          {' '}
          <ThemeProvider theme={theme}>
            <Typography variant="hs4">CÉLULA</Typography>
          </ThemeProvider>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="20%"
          sx={{
            borderRight: '1px solid #000',
            textOrientation: 'mixed',
            writingMode: 'vertical-rl',
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography variant="hs4"> CELEBRAÇÃO</Typography>
          </ThemeProvider>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="20%"
          sx={{
            borderRight: '1px solid #000',
            textOrientation: 'mixed',
            writingMode: 'vertical-rl',
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography variant="hs4">DISCIPULADO</Typography>
          </ThemeProvider>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          width="20%"
          sx={{
            borderRight: '1px solid #000',
            textOrientation: 'mixed',
            writingMode: 'vertical-rl',
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography variant="hs4">DEVOCIONAL</Typography>
          </ThemeProvider>
        </Box>
      </Box>

      <Box height="70%">
        {sem1I ? (
          <TableContainer sx={{ minHeight: 115, height: '100%' }}>
            <Box>
              <Box
                mt={0}
                display="flex"
                alignItems="center"
                height="6vh"
                minHeight={35}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="40%"
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                    fontFamily="Fugaz One"
                    sx={{
                      borderRight: '1px solid #000',
                      borderBottom: '1px solid #000',
                    }}
                  >
                    {' '}
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs3">ADULTOS</Typography>
                    </ThemeProvider>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    {adultosCel}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    {adultosCeleb}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    -
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    -
                  </Box>
                </Box>
              </Box>
              <Box
                mt={0}
                display="flex"
                alignItems="center"
                height="6vh"
                minHeight={35}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="40%"
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                    fontFamily="Fugaz One"
                    sx={{
                      borderRight: '1px solid #000',
                      borderBottom: '1px solid #000',
                    }}
                  >
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs3"> CRIANÇAS</Typography>
                    </ThemeProvider>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    {criancasCel}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    {criancasCeleb}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    -
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    -
                  </Box>
                </Box>
              </Box>
              <Box
                mt={0}
                display="flex"
                alignItems="center"
                height="6vh"
                minHeight={35}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="40%"
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                    fontFamily="Fugaz One"
                    sx={{
                      borderRight: '1px solid #000',
                      borderBottom: '1px solid #000',
                    }}
                  >
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs3"> VISIT. ADULTOS</Typography>
                    </ThemeProvider>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    {visACel}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    {visACeleb}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    -
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    -
                  </Box>
                </Box>
              </Box>
              <Box
                mt={0}
                display="flex"
                alignItems="center"
                height="6vh"
                minHeight={35}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="40%"
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                    fontFamily="Fugaz One"
                    sx={{
                      borderRight: '1px solid #000',
                      borderBottom: '1px solid #000',
                    }}
                  >
                    {' '}
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs3"> VISIT. CRIANÇAS</Typography>
                    </ThemeProvider>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    {visCCel}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    {visCCeleb}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    -
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    -
                  </Box>
                </Box>
              </Box>
              <Box
                mt={0}
                display="flex"
                alignItems="center"
                height="6vh"
                minHeight={35}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="40%"
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    fontFamily="Fugaz One"
                    width="100%"
                    sx={{
                      borderRight: '1px solid #000',
                      borderBottom: '1px solid #000',
                    }}
                  >
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs3"> TOTAL</Typography>
                    </ThemeProvider>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    {totalCel}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    {totalCeleb}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    {disc}
                  </Box>
                </Box>

                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    {leitura}
                  </Box>
                </Box>
              </Box>
              <Box
                mt={0}
                display="flex"
                alignItems="center"
                height="6.8vh"
                minHeight={35}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="40%"
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                    fontFamily="Fugaz One"
                    sx={{
                      borderRight: '1px solid #000',
                      borderBottom: '1px solid #000',
                    }}
                  >
                    <ThemeProvider theme={theme}>
                      <Typography variant="hs3">CONVERSÕES</Typography>
                    </ThemeProvider>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    {convCel}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    {convCeleb}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    -
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  textAlign="center"
                  width="20%"
                  sx={{
                    borderRight: '1px solid #000',
                    borderBottom: '1px solid #000',
                  }}
                >
                  <Box
                    height="100%"
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    alignItems="center"
                    width="100%"
                  >
                    -
                  </Box>
                </Box>
              </Box>
            </Box>
          </TableContainer>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
            width="100%"
          >
            {!adultosCel ? (
              <Box>
                <Box
                  fontSize="16px"
                  fontFamily="arial black"
                  mb={5}
                  mt={-2}
                  textAlign="center"
                >
                  SEM RELATÓRIOS
                </Box>
              </Box>
            ) : (
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
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
