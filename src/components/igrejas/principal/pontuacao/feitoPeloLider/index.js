import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';

import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import TamanhoJanela from 'src/utils/getSize';
import TabCelula from './tabRelCelulas';

const theme = createTheme();
theme.typography.hs4 = {
  fontWeight: 'normal',
  fontSize: '12px',
  '@media (min-width:350px)': {
    fontSize: '13px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '14px',
  },
};
theme.typography.hs3 = {
  fontWeight: 'normal',
  fontSize: '11px',
  '@media (min-width:350px)': {
    fontSize: '12px',
  },
  '@media (min-width:400px)': {
    fontSize: '13px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '14px',
  },
};
theme.typography.hs2 = {
  fontWeight: 'normal',
  fontSize: '10px',
  '@media (min-width:350px)': {
    fontSize: '11px',
  },
  '@media (min-width:400px)': {
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '13px',
  },
};
//------------------------------------------
const janela = TamanhoJanela();

const OrdenarCoordenacoes = (coordenacoesF) => {
  if (coordenacoesF.length && coordenacoesF !== 'inicio') {
    coordenacoesF.sort((a, b) => {
      if (a.Distrito > b.Distrito) {
        return 1;
      }
      if (a.Distrito < b.Distrito) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  return coordenacoesF;
};
const OrdenarSupervisoes = (supervisoesF) => {
  if (supervisoesF && supervisoesF !== 'inicio') {
    supervisoesF.sort((a, b) => {
      if (a.Celula > b.Celula) {
        return 1;
      }
      if (a.Celula < b.Celula) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    supervisoesF.sort((a, b) => {
      if (a.Distrito > b.Distrito) {
        return 1;
      }
      if (a.Distrito < b.Distrito) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  return supervisoesF;
};
const OrdenarCelulas = (celulasF) => {
  if (celulasF && celulasF !== 'inicio') {
    celulasF.sort((a, b) => {
      if (a.Celula > b.Celula) {
        return 1;
      }
      if (a.Celula < b.Celula) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    celulasF.sort((a, b) => {
      if (a.Distrito > b.Distrito) {
        return 1;
      }
      if (a.Distrito < b.Distrito) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }
  return celulasF;
};
function getPreviousMonday(date) {
  const previousMonday = date;

  previousMonday.setDate(date.getDate() - ((date.getDay() + 6) % 7));

  return previousMonday;
}
function RelCelula({
  distritos,
  celulas,
  coordenacoes,
  perfilUser,
  lideranca,
  parametros,
  supervisoes,
}) {
  //= ================================================================

  const novaCoord = OrdenarCoordenacoes(coordenacoes);

  // const mesSemana = PegaMes(semanaAtual, anoAtual);

  const [open, setIsPickerOpen] = React.useState(false);
  const [open2, setIsPickerOpen2] = React.useState(false);

  const [celulaSetor, setCelulaSetor] = React.useState(0);
  const [setor, setSetor] = React.useState(0);

  const timeElapsed2 = Date.now();
  const dataAtual2 = new Date(timeElapsed2);
  moment(getPreviousMonday(dataAtual2)).format('DD/MM/YYYY');
  const [selectedDate, setSelectedDate] = React.useState(dataAtual2);
  const [inputValue, setInputValue] = React.useState(
    moment(dataAtual2).format('DD/MM/YYYY'),
  );
  const [selectedDate2, setSelectedDate2] = React.useState(dataAtual2);
  const [inputValue2, setInputValue2] = React.useState(
    moment(dataAtual2).format('DD/MM/YYYY'),
  );
  const [dataI, setDataI] = React.useState(inputValue);
  const [dataF, setDataF] = React.useState(inputValue2);
  //= ========================================================
  let newContDistrito = 0;
  let newContCoord = 0;
  let newContSuper = 0;
  let newContCelula = 0;
  const newCoord = novaCoord.filter(
    (val) => val.Distrito === Number(perfilUser.Distrito),
  );
  if (perfilUser.Funcao === 'PastorDistrito') {
    distritos.map((val, index) => {
      if (
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        distritos.length > 1
      ) {
        newContDistrito = index + 1;
      }
      return 0;
    });
  }

  if (perfilUser.Funcao === 'Coordenador') {
    distritos.map((val, index) => {
      if (
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        distritos.length > 1
      ) {
        newContDistrito = index + 1;
      }
      return 0;
    });
    if (newCoord.length > 1)
      novaCoord.map((val, index) => {
        if (
          Number(val.Distrito) === Number(perfilUser.Distrito) &&
          Number(val.Coordenacao) === Number(perfilUser.Coordenacao)
        ) {
          newContCoord = index + 1;
        }
        return 0;
      });
  }

  if (perfilUser.Funcao === 'Supervisor') {
    distritos.map((val, index) => {
      if (
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        distritos.length > 1
      ) {
        newContDistrito = index + 1;
      }
      return 0;
    });
    if (newCoord.length > 1)
      novaCoord.map((val, index) => {
        if (
          Number(val.Distrito) === Number(perfilUser.Distrito) &&
          Number(val.Coordenacao) === Number(perfilUser.Coordenacao)
        ) {
          newContCoord = index + 1;
        }
        return 0;
      });

    const newSuper = supervisoes.filter(
      (val) =>
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao),
    );

    newSuper.map((val, index) => {
      if (
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        Number(val.Supervisao) === Number(perfilUser.Supervisao) &&
        newSuper.length > 1
      ) {
        newContSuper = index + 1;
      }
      return 0;
    });
  }

  if (
    perfilUser.Funcao === 'Lider' ||
    perfilUser.Funcao === 'Membro' ||
    perfilUser.Funcao === 'Professor'
  ) {
    distritos.map((val, index) => {
      if (Number(val.Distrito) === Number(perfilUser.Distrito)) {
        newContDistrito = index + 1;
      }
      return 0;
    });
    if (newCoord.length > 1)
      novaCoord.map((val, index) => {
        if (
          Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
          Number(val.Distrito) === Number(perfilUser.Distrito)
        ) {
          newContCoord = index + 1;
        }
        return 0;
      });
    const newSuper = supervisoes.filter(
      (val) =>
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao),
    );
    newSuper.map((val, index) => {
      if (
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        Number(val.Supervisao) === Number(perfilUser.Supervisao) &&
        newSuper.length > 1
      ) {
        newContSuper = index + 1;
      }
      return 0;
    });
    const newCelulas = celulas.filter(
      (val) =>
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        val.Coordenacao === Number(perfilUser.Coordenacao) &&
        Number(val.Supervisao) === Number(perfilUser.Supervisao),
    );

    newCelulas.map((val, index) => {
      if (
        Number(val.Celula) === Number(perfilUser.Celula) &&
        Number(val.Coordenacao) === Number(perfilUser.Coordenacao) &&
        Number(val.Distrito) === Number(perfilUser.Distrito) &&
        Number(val.Supervisao) === Number(perfilUser.Supervisao) &&
        newCelulas.length > 1
      ) {
        newContCelula = index + 1;
      }
      return 0;
    });
  }

  const handleDateChange = (date, value) => {
    setInputValue(value);
    setSelectedDate(date);
    setIsPickerOpen(false);
  };
  const handleDateClick = () => {
    //   setSelectedDate();
    setIsPickerOpen(true);
  };
  const handleDateChange2 = (date, value) => {
    setInputValue2(value);
    setSelectedDate2(date);
    setIsPickerOpen2(false);

    // setSemana(semanaExata(dataAtual));
  };

  const handleDateClick2 = () => {
    //   setSelectedDate();
    setIsPickerOpen2(true);
  };

  const [contNumeroDistrito, setContNumeroDistrito] =
    React.useState(newContDistrito);

  const [contNumeroCoord, setContNumeroCoord] = React.useState(newContCoord);
  const [contNumeroSuper, setContNumeroSuper] = React.useState(newContSuper);
  const [contNumeroCelula, setContNumeroCelula] = React.useState(newContCelula);

  const [coordF, setCoordF] = React.useState('inicio');
  const [semanaI, setSemanaI] = React.useState(0);
  const [semanaF, setSemanaF] = React.useState(0);
  const distritosT = distritos.filter((val) => val.Status);
  const distritoF = [{ Distrito: 0, Distrito_Nome: 'TODOS OS DISTRITOS' }];
  distritosT.map((val) => distritoF.push(val));

  const semanaExata = (dataEnviada) => {
    const Ano = dataEnviada.getFullYear();
    const Mes = dataEnviada.getMonth();
    const Dia = dataEnviada.getDate();
    const firstSun = new Date(2021, 0, 1);
    const lastSun = new Date(Ano, Mes, Dia);

    while (firstSun.getDay() !== 2) {
      firstSun.setDate(firstSun.getDate() + 1);
    }
    while (lastSun.getDay() !== 2) {
      lastSun.setDate(lastSun.getDate() + 1);
    }

    let result = 0;
    for (let i = result + 1; lastSun - firstSun > 0; i += 1) {
      lastSun.setDate(lastSun.getDate() - 7);
      if (i > 52) i = 1;
      result = i;
    }

    return result;
  };
  React.useEffect(() => {
    if (selectedDate) {
      setSemanaI(semanaExata(selectedDate));

      const sunday = new Date(
        selectedDate.getFullYear(),
        0,
        1 + semanaExata(selectedDate) * 7,
      );
      while (sunday.getDay() !== 3) {
        sunday.setDate(sunday.getDate() - 1);
      }
      const newData = moment(sunday).format('DD/MM/YYYY');

      setDataI(newData);
    }
    if (selectedDate2) {
      setSemanaF(semanaExata(selectedDate2));

      const sunday = new Date(
        selectedDate.getFullYear(),
        0,
        1 + (semanaExata(selectedDate2) + 1) * 7,
      );
      while (sunday.getDay() !== 2) {
        sunday.setDate(sunday.getDate() - 1);
      }
      const newData = moment(sunday).format('DD/MM/YYYY');

      setDataF(newData);
    }
  }, [selectedDate2, selectedDate]);
  React.useEffect(() => {
    const coordT = coordenacoes.filter(
      (val) =>
        val.Status &&
        Number(val.Distrito) ===
          Number(distritoF[contNumeroDistrito].Distrito) &&
        val.Status,
    );
    const coordInicial = [
      { coordenacao: 0, Coordenacao_Nome: 'TODAS AS COORDENAÇÕES' },
    ];
    if (contNumeroDistrito !== 0) coordT.map((val) => coordInicial.push(val));
    else coordenacoes.map((val) => coordInicial.push(val));
    if (coordT.length > 1 || !coordT.length)
      setCoordF(OrdenarCoordenacoes(coordInicial));
    else setCoordF(OrdenarCoordenacoes(coordT));
  }, [contNumeroDistrito]);

  React.useEffect(() => {
    if (coordF !== 'inicio' && coordF[contNumeroCoord]) {
      let nSuper;

      if (contNumeroCoord !== 0) {
        const superInicial = [
          { Supervisao: 0, Supervisao_Nome: 'TODAS AS SUPERVISÕES' },
        ];

        if (contNumeroDistrito !== 0) {
          nSuper = supervisoes.filter(
            (val) =>
              Number(val.Distrito) ===
                Number(distritoF[contNumeroDistrito].Distrito) &&
              Number(val.Coordenacao) ===
                Number(coordF[contNumeroCoord].Coordenacao),
          );
          if (nSuper) {
            nSuper.map((val) => superInicial.push(val));
          }
          if (nSuper.length > 1 || !nSuper.length) setSetor(superInicial);
          else setSetor(nSuper);
        } else {
          nSuper = supervisoes.filter(
            (val) =>
              Number(val.Distrito) ===
                Number(coordF[contNumeroCoord].Distrito) &&
              Number(val.Coordenacao) ===
                Number(coordF[contNumeroCoord].Coordenacao),
          );
          if (nSuper) {
            nSuper.map((val) => superInicial.push(val));
          }

          if (nSuper.length > 1 || !nSuper.length) {
            setSetor(superInicial);
          } else {
            setSetor(nSuper);
          }
        }
      } else if (contNumeroDistrito !== 0) {
        const superInicial = [
          { Supervisao: 0, Supervisao_Nome: 'TODAS AS SUPERVISÕES' },
        ];

        nSuper = supervisoes.filter(
          (val) =>
            Number(val.Distrito) ===
            Number(distritoF[contNumeroDistrito].Distrito),
        );
        nSuper.map((val) => superInicial.push(val));

        if (nSuper.length > 1 || !nSuper.length) setSetor(superInicial);
        else setSetor(nSuper);
      } else {
        const superInicial = [
          { Supervisao: 0, Supervisao_Nome: 'TODAS AS SUPERVISÕES' },
        ];
        nSuper = supervisoes;
        nSuper = OrdenarSupervisoes(nSuper);
        nSuper.map((val) => superInicial.push(val));

        if (nSuper.length > 1 || !nSuper.length) setSetor(superInicial);
        else setSetor(nSuper);
      }
    }
  }, [coordF, contNumeroCoord]);

  React.useEffect(() => {
    if (setor !== 'inicio' && setor.length) {
      let nCelula;

      if (contNumeroDistrito !== 0) {
        if (contNumeroCoord !== 0) {
          if (contNumeroSuper !== 0) {
            // ('os 3 em 1');

            const celulaInicial = [{ Celula: 0, Nome: 'TODAS AS CÉLULAS' }];
            nCelula = OrdenarCelulas(
              celulas.filter(
                (val) =>
                  Number(val.Distrito) ===
                    Number(distritoF[contNumeroDistrito].Distrito) &&
                  Number(val.Coordenacao) ===
                    Number(coordF[contNumeroCoord].Coordenacao) &&
                  Number(val.Supervisao) ===
                    Number(setor[contNumeroSuper].Supervisao),
              ),
            );
            if (nCelula.length > 0) {
              nCelula.map((val) => celulaInicial.push(val));
              setCelulaSetor(celulaInicial);
            } else {
              setCelulaSetor(nCelula);
            }
          } else {
            // ('distrito e coord em 1 ');

            const celulaInicial = [{ Celula: 0, Nome: 'TODAS AS CÉLULAS' }];
            nCelula = OrdenarCelulas(
              celulas.filter(
                (val) =>
                  Number(val.Distrito) ===
                    Number(distritoF[contNumeroDistrito].Distrito) &&
                  Number(val.Coordenacao) ===
                    Number(coordF[contNumeroCoord].Coordenacao),
              ),
            );
            if (nCelula.length > 0) {
              nCelula.map((val) => celulaInicial.push(val));
              setCelulaSetor(celulaInicial);
            } else {
              setCelulaSetor(nCelula);
            }
          }
        } else if (contNumeroSuper !== 0) {
          // ('só Coord  em 0');

          const celulaInicial = [{ Celula: 0, Nome: 'TODAS AS CÉLULAS' }];
          nCelula = OrdenarCelulas(
            celulas.filter(
              (val) =>
                Number(val.Distrito) ===
                  Number(distritoF[contNumeroDistrito].Distrito) &&
                Number(val.Supervisao) ===
                  Number(setor[contNumeroSuper].Supervisao),
            ),
          );
          if (nCelula.length > 0) {
            nCelula.map((val) => celulaInicial.push(val));
            setCelulaSetor(celulaInicial);
          } else {
            setCelulaSetor(nCelula);
          }
        } else {
          // ('so distr em 1 - feito');

          const celulaInicial = [{ Celula: 0, Nome: 'TODAS AS CÉLULAS' }];
          nCelula = OrdenarCelulas(
            celulas.filter(
              (val) =>
                Number(val.Distrito) ===
                Number(distritoF[contNumeroDistrito].Distrito),
            ),
          );
          if (nCelula.length > 0) {
            nCelula.map((val) => celulaInicial.push(val));
            setCelulaSetor(celulaInicial);
          } else {
            setCelulaSetor(nCelula);
          }
        }
      } else if (contNumeroCoord !== 0) {
        if (contNumeroSuper !== 0) {
          const celulaInicial = [{ Celula: 0, Nome: 'TODAS AS CÉLULAS' }];
          nCelula = OrdenarCelulas(
            celulas.filter(
              (val) =>
                Number(val.Distrito) ===
                  Number(coordF[contNumeroCoord].Distrito) &&
                Number(val.Coordenacao) ===
                  Number(coordF[contNumeroCoord].Coordenacao) &&
                Number(val.Supervisao) ===
                  Number(setor[contNumeroSuper].Supervisao),
            ),
          );
          if (nCelula.length > 0) {
            nCelula.map((val) => celulaInicial.push(val));
            setCelulaSetor(celulaInicial);
          } else {
            setCelulaSetor(nCelula);
          }
        } else {
          const celulaInicial = [{ Celula: 0, Nome: 'TODAS AS CÉLULAS' }];
          if (setor.length > 1) {
            nCelula = OrdenarCelulas(
              celulas.filter(
                (val) =>
                  Number(val.Distrito) ===
                    Number(coordF[contNumeroCoord].Distrito) &&
                  Number(val.Coordenacao) ===
                    Number(coordF[contNumeroCoord].Coordenacao),
              ),
            );
          } else {
            nCelula = OrdenarCelulas(
              celulas.filter(
                (val) =>
                  Number(val.Distrito) ===
                    Number(coordF[contNumeroCoord].Distrito) &&
                  Number(val.Coordenacao) ===
                    Number(coordF[contNumeroCoord].Coordenacao) &&
                  Number(val.Supervisao) ===
                    Number(setor[contNumeroSuper].Supervisao),
              ),
            );
          }

          if (nCelula.length > 0) {
            nCelula.map((val) => celulaInicial.push(val));
            setCelulaSetor(celulaInicial);
          } else {
            setCelulaSetor(nCelula);
          }
        }
      } else if (contNumeroSuper !== 0) {
        // ('só super em 1');

        const celulaInicial = [{ Celula: 0, Nome: 'TODAS AS CÉLULAS' }];
        nCelula = OrdenarCelulas(
          celulas.filter(
            (val) =>
              Number(val.Distrito) ===
                Number(setor[contNumeroSuper].Distrito) &&
              Number(val.Coordenacao) ===
                Number(setor[contNumeroSuper].Coordenacao) &&
              Number(val.Supervisao) ===
                Number(setor[contNumeroSuper].Supervisao),
          ),
        );
        if (nCelula.length > 0) {
          nCelula.map((val) => celulaInicial.push(val));
          setCelulaSetor(celulaInicial);
        } else {
          setCelulaSetor(nCelula);
        }
      } else {
        const celulaInicial = [{ Celula: 0, Nome: 'TODAS AS CÉLULAS' }];
        nCelula = OrdenarCelulas(celulas);
        nCelula.map((val) => celulaInicial.push(val));

        if (nCelula.length > 0 || !nCelula.length)
          setCelulaSetor(celulaInicial);
        else setCelulaSetor(nCelula);
      }
    }
  }, [setor, contNumeroSuper]);

  const handleIncDistrito = () => {
    let contDistritoAtual = contNumeroDistrito + 1;

    if (contDistritoAtual > distritoF.length - 1) contDistritoAtual = 0;
    setContNumeroDistrito(contDistritoAtual);
    setContNumeroCoord(0);
    setContNumeroSuper(0);
    setContNumeroCelula(0);
  };
  const handleDecDistrito = () => {
    let contDistritoAtual = contNumeroDistrito - 1;

    if (contDistritoAtual < 0) contDistritoAtual = distritoF.length - 1;
    setContNumeroDistrito(contDistritoAtual);
    setContNumeroCoord(0);
    setContNumeroSuper(0);
    setContNumeroCelula(0);
  };

  const handleIncCoord = () => {
    let contCoordAtual = contNumeroCoord + 1;

    if (contCoordAtual > coordF.length - 1) contCoordAtual = 0;
    setContNumeroCoord(contCoordAtual);
    setContNumeroSuper(0);
    setContNumeroCelula(0);
  };

  const handleDecCoord = () => {
    let contCoordAtual = contNumeroCoord - 1;

    if (contCoordAtual < 0) contCoordAtual = coordF.length - 1;
    setContNumeroCoord(contCoordAtual);
    setContNumeroSuper(0);
    setContNumeroCelula(0);
  };
  const handleIncSuper = () => {
    let contSuperAtual = contNumeroSuper + 1;

    if (contSuperAtual > setor.length - 1) contSuperAtual = 0;
    setContNumeroSuper(contSuperAtual);
    setContNumeroCelula(0);
  };

  const handleDecSuper = () => {
    let contSuperAtual = contNumeroSuper - 1;

    if (contSuperAtual < 0) contSuperAtual = setor.length - 1;
    setContNumeroSuper(contSuperAtual);
    setContNumeroCelula(0);
  };
  //= ========================================================
  const handleIncCelula = () => {
    let contCelulaAtual = contNumeroCelula + 1;

    if (contCelulaAtual > celulaSetor.length - 1) contCelulaAtual = 0;
    setContNumeroCelula(contCelulaAtual);
  };

  const handleDecCelula = () => {
    let contCelulaAtual = contNumeroCelula - 1;

    if (contCelulaAtual < 0) contCelulaAtual = celulaSetor.length - 1;
    setContNumeroCelula(contCelulaAtual);
  };
  const lideresSetor = lideranca?.sort((a, b) => {
    if (Number(a.Celula) > Number(b.Celula)) return 1;
    if (Number(b.Celula) > Number(a.Celula)) return -1;
    return 0;
  });

  const listaSetor = lideresSetor.sort((a, b) => {
    if (Number(a.Coordenacao) > Number(b.Coordenacao)) return 1;
    if (Number(b.Coordenacao) > Number(a.Coordenacao)) return -1;
    return 0;
  });

  const numberSuper = listaSetor.map((itens) => itens.Coordenacao);
  const uniqueArrSuper = [...new Set(numberSuper)];
  const numeroSupervisao = uniqueArrSuper;

  const numeroSetorIni = numeroSupervisao.map((val) => val);
  numeroSetorIni.unshift('TODAS AS COORDENAÇÕES');

  //  const tipo = ['Relatório das Células', 'Relatório Geral'];
  const [contTipo] = React.useState(false);

  React.useEffect(() => {}, []);

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
        height="94%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
        bgcolor={corIgreja.principal}
      >
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
              <Box
                display={
                  perfilUser.Funcao === 'Presidente' ||
                  perfilUser.Funcao === 'PastorDistrito'
                    ? ''
                    : 'none'
                }
                mt={1}
                width="96%"
                ml={1}
              >
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Box
                      borderRadius={16}
                      height={40}
                      bgcolor="#f3e5f5"
                      width="100%"
                      display="flex"
                    >
                      <Box
                        width="10%"
                        display={
                          perfilUser.Funcao === 'Presidente' ? 'flex' : 'none'
                        }
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            handleDecDistrito();
                          }}
                        >
                          <BiCaretLeft size={35} color={corIgreja.principal2} />
                        </IconButton>
                      </Box>
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ fontSize: '14px', fontFamily: 'arial black' }}
                      >
                        {perfilUser.Funcao === 'Supervisor' ? (
                          <ThemeProvider theme={theme}>
                            <Typography variant="hs4">
                              {setor.length &&
                                setor[0] &&
                                setor[0].Supervisao_Nome.toLocaleUpperCase()}
                            </Typography>
                          </ThemeProvider>
                        ) : (
                          <ThemeProvider theme={theme}>
                            <Typography variant="hs4">
                              {distritoF.length &&
                                distritoF[contNumeroDistrito] &&
                                distritoF[contNumeroDistrito].Distrito_Nome}
                            </Typography>
                          </ThemeProvider>
                        )}
                      </Box>
                      <Box
                        width="10%"
                        display={
                          perfilUser.Funcao === 'Presidente' ? 'flex' : 'none'
                        }
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            handleIncDistrito();
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
              <Box mt={1} width="96%" ml={1}>
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Box
                      borderRadius={16}
                      height={40}
                      bgcolor="#c5cae9"
                      width="100%"
                      display={
                        perfilUser.Funcao !== 'Supervisor' ? 'flex' : 'none'
                      }
                    >
                      <Box
                        width="10%"
                        display={
                          perfilUser.Funcao === 'Presidente' ||
                          perfilUser.Funcao === 'PastorDistrito'
                            ? 'flex'
                            : 'none'
                        }
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            handleDecCoord();
                          }}
                        >
                          <BiCaretLeft size={35} color={corIgreja.principal2} />
                        </IconButton>
                      </Box>
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ fontSize: '14px', fontFamily: 'arial black' }}
                      >
                        <ThemeProvider theme={theme}>
                          <Typography variant="hs4">
                            {coordF !== 'inicio' &&
                              coordF.length &&
                              coordF[contNumeroCoord] &&
                              coordF[
                                contNumeroCoord
                              ].Coordenacao_Nome.toLocaleUpperCase()}
                          </Typography>
                        </ThemeProvider>
                      </Box>
                      <Box
                        width="10%"
                        display={
                          perfilUser.Funcao === 'Presidente' ||
                          perfilUser.Funcao === 'PastorDistrito'
                            ? 'flex'
                            : 'none'
                        }
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            handleIncCoord();
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
              <Box mt={1} width="96%" ml={1}>
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Box
                      borderRadius={16}
                      height={40}
                      bgcolor="#f9fbe7"
                      width="100%"
                      display="flex"
                    >
                      <Box
                        width="10%"
                        display={
                          perfilUser.Funcao === 'Presidente' ||
                          perfilUser.Funcao === 'PastorDistrito' ||
                          perfilUser.Funcao === 'Coordenador'
                            ? 'flex'
                            : 'none'
                        }
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            handleDecSuper();
                          }}
                        >
                          <BiCaretLeft size={35} color={corIgreja.principal2} />
                        </IconButton>
                      </Box>
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ fontSize: '14px', fontFamily: 'arial black' }}
                      >
                        <ThemeProvider theme={theme}>
                          <Typography variant="hs4">
                            {setor.length &&
                              setor[contNumeroSuper] &&
                              setor[
                                contNumeroSuper
                              ].Supervisao_Nome.toLocaleUpperCase()}
                          </Typography>
                        </ThemeProvider>
                      </Box>
                      <Box
                        width="10%"
                        display={
                          perfilUser.Funcao === 'Presidente' ||
                          perfilUser.Funcao === 'PastorDistrito' ||
                          perfilUser.Funcao === 'Coordenador'
                            ? 'flex'
                            : 'none'
                        }
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            handleIncSuper();
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
                mt={1}
                width="96%"
                ml={1}
                display={
                  perfilUser.Funcao !== 'Presidente' &&
                  perfilUser.Funcao !== 'PastorDistrito'
                    ? ''
                    : 'none'
                }
              >
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Box
                      borderRadius={16}
                      height={40}
                      bgcolor="#efebe9"
                      width="100%"
                      display="flex"
                    >
                      <Box
                        width="10%"
                        display={
                          perfilUser.Funcao === 'Supervisor' ||
                          perfilUser.Funcao === 'Coordenador'
                            ? 'flex'
                            : 'none'
                        }
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            handleDecCelula();
                          }}
                        >
                          <BiCaretLeft size={35} color={corIgreja.principal2} />
                        </IconButton>
                      </Box>
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ fontSize: '14px', fontFamily: 'arial black' }}
                      >
                        <ThemeProvider theme={theme}>
                          <Typography variant="hs4">
                            {celulaSetor.length &&
                              celulaSetor[contNumeroCelula] &&
                              celulaSetor[
                                contNumeroCelula
                              ].Nome.toLocaleUpperCase()}
                          </Typography>
                        </ThemeProvider>
                      </Box>
                      <Box
                        width="10%"
                        display={
                          perfilUser.Funcao === 'Supervisor' ||
                          perfilUser.Funcao === 'Coordenador'
                            ? 'flex'
                            : 'none'
                        }
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            handleIncCelula();
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
                width="100%"
                height="10%"
                justifyContent="center"
                display="flex"
                alignItems="center"
              >
                <Paper
                  style={{ marginLeft: 10, background: '#fafafa', height: 40 }}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justifyContent="center">
                      <KeyboardDatePicker
                        open={open}
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        id="date-picker-inline"
                        value={selectedDate}
                        inputValue={inputValue}
                        onClick={handleDateClick}
                        onChange={handleDateChange}
                        style={{
                          marginLeft: 10,
                          marginRight: 10,
                          marginTop: 5,
                          height: 30,
                          background: '#fafafa',
                        }}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Paper>
                <Box ml={2} />
                <Paper
                  style={{ marginRight: 10, background: '#fafafa', height: 40 }}
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justifyContent="center">
                      <KeyboardDatePicker
                        open={open2}
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        id="date-picker-inline"
                        value={selectedDate2}
                        inputValue={inputValue2}
                        onClick={handleDateClick2}
                        onChange={handleDateChange2}
                        style={{
                          marginLeft: 10,
                          marginRight: 10,
                          marginTop: 5,
                          height: 30,
                          background: '#fafafa',
                        }}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Paper>
              </Box>
              <Box
                mt={1}
                width="96%"
                ml={1}
                display={
                  perfilUser.Funcao !== 'Presidente' &&
                  perfilUser.Funcao !== 'PastorDistrito'
                    ? ''
                    : 'none'
                }
              >
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Box
                      borderRadius={16}
                      height={40}
                      bgcolor="#efebe9"
                      width="100%"
                      display="flex"
                    >
                      <Box
                        width="10%"
                        display={
                          perfilUser.Funcao === 'Supervisor' ||
                          perfilUser.Funcao === 'Coordenador'
                            ? 'flex'
                            : 'none'
                        }
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            handleDecCelula();
                          }}
                        >
                          <BiCaretLeft size={35} color={corIgreja.principal2} />
                        </IconButton>
                      </Box>
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ fontSize: '14px', fontFamily: 'arial black' }}
                      >
                        <ThemeProvider theme={theme}>
                          <Typography variant="hs4">
                            {celulaSetor.length &&
                              celulaSetor[contNumeroCelula] &&
                              celulaSetor[
                                contNumeroCelula
                              ].Nome.toLocaleUpperCase()}
                          </Typography>
                        </ThemeProvider>
                      </Box>
                      <Box
                        width="10%"
                        display={
                          perfilUser.Funcao === 'Supervisor' ||
                          perfilUser.Funcao === 'Coordenador'
                            ? 'flex'
                            : 'none'
                        }
                        justifyContent="flex-end"
                        alignItems="center"
                      >
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => {
                            handleIncCelula();
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
                mt={0}
                style={{
                  borderBottomLeftRadius: '16px',
                  borderBottomRightRadius: '16px',
                }}
                height={janela.height > 570 ? '64%' : '60%'}
                minWidth={300}
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={250}
                width="95%"
              >
                <Box
                  height="96%"
                  minHeight={225}
                  bgcolor="#fafafa"
                  width="100%"
                  borderRadius={16}
                >
                  {!contTipo && celulaSetor.length ? (
                    <TabCelula
                      numeroCelula={celulaSetor}
                      parametros={parametros}
                      supervisoes={setor[contNumeroSuper]}
                      coordenacoes={coordF[contNumeroCoord]}
                      distritos={distritoF[contNumeroDistrito]}
                      anoFim={dataF}
                      anoIni={dataI}
                      semanaI={semanaI}
                      semanaF={semanaF}
                      celulaSetor={
                        celulaSetor[contNumeroCelula] &&
                        celulaSetor[contNumeroCelula].Nome !==
                          'TODAS AS CÉLULAS'
                          ? celulaSetor[contNumeroCelula]
                          : celulaSetor
                      }
                    />
                  ) : null}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RelCelula;
