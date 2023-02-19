import React from 'react';
import { Box } from '@material-ui/core';
import corIgreja from 'src/utils/coresIgreja';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requer um carregador
import moment from 'moment';
import IconButton from '@mui/material/IconButton';

import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';
import TableContainer from '@mui/material/TableContainer';

function converteData(DataDDMMYY) {
  const dataSplit = DataDDMMYY.split('/');

  const novaData = new Date(
    parseInt(2000, 10),
    parseInt(dataSplit[1], 10) - 1,
    parseInt(dataSplit[0], 10),
  );

  return novaData;
}

function compare(a, b) {
  if (
    converteData(
      moment(a.Date.substring(0, 10)).format('DD/MM/YYYY hh:mm:ss'),
    ) <
    converteData(moment(b.Date.substring(0, 10)).format('DD/MM/YYYY hh:mm:ss'))
  )
    return -1;
  return true;
}

function getPreviousMonday(date) {
  const previousMonday = date;

  previousMonday.setDate(date.getDate() - ((date.getDay() + 6) % 7));

  return previousMonday;
}

function getPreviousMonday2(date) {
  const previousMonday = new Date();

  previousMonday.setDate(previousMonday.getDate() - date);

  return previousMonday;
}
function nextSunday(date) {
  // const today = new Date();
  const nextweek = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 6,
  );
  return nextweek;
}

function Mensagem({ dadosAvisos, perfilUser }) {
  console.log('GERAL');
  const [boletim, setBoletim] = React.useState('');
  const [dataBr, setDataBr] = React.useState('');
  // const d = new Date();
  // const anoAtual = Number(d.getFullYear());
  const [contFonte, setContFonte] = React.useState(16);
  const [contSemana, setContSemana] = React.useState(dadosAvisos.length);
  // const [contSemanaFix] = React.useState(dadosAvisos.length);
  // const [contAno, setContAno] = React.useState(anoAtual);

  //= ========================================================================
  // data de inicio
  //= ========================================================================
  //  const [contSemana, setContSemana] = React.useState(0);
  const semanaAtual2 = getPreviousMonday2(contSemana + 7);
  const semanaAtual = moment(getPreviousMonday(semanaAtual2)).format(
    'DD/MM/YYYY 00:00:00',
  );
  const semanaSegunte = moment(nextSunday(semanaAtual2)).format('DD/MM/YYYY');

  const dataInicial = converteData(semanaAtual);
  const dataFinal = converteData(semanaSegunte);

  const niverGeralValido = dadosAvisos.filter(
    (results) => results.Data !== null && results.Data.length > 8,
  );

  const niverGeral = niverGeralValido.filter(
    (results) =>
      converteData(
        moment(results.Data.substring(0, 10)).format('DD/MM/YYYY 00:00:00'),
      ) >= dataInicial &&
      converteData(
        moment(results.Data.substring(0, 10)).format('DD/MM/YYYY 00:00:00'),
      ) <= dataFinal,
  );
  console.log('GERAL', niverGeral);
  const handleIncSemana = () => {
    const contSemanaAtual = contSemana - 7;

    setContSemana(contSemanaAtual);
  };
  const handleDecSemana = () => {
    const contSemanaAtual = contSemana + 7;

    setContSemana(contSemanaAtual);
  };

  // const diaBr = Number(d.getDate());
  // const mesBr = Number(d.getMonth());
  // const anoBr = Number(d.getFullYear());
  // const dataBr = `${diaBr}/${mesBr}/${anoBr}`;

  /* const handleIncSemana = () => {
    let contSemanaAtual = contSemana + 1;
    if (contSemanaAtual > contSemanaFix) {
      contSemanaAtual = contSemanaFix;
    }
    setContSemana(contSemanaAtual);
  };
  const handleDecSemana = () => {
    let contSemanaAtual = contSemana - 1;
    if (contSemanaAtual < 1) {
      contSemanaAtual = 1;
      setContAno(contAno - 1);
    }
    setContSemana(contSemanaAtual);
  }; */

  const handleIncFonte = () => {
    let contFonteAtual = contFonte + 1;
    if (contFonteAtual > 24) contFonteAtual = 24;
    setContFonte(contFonteAtual);
  };

  const handleDecFonte = () => {
    let contFonteAtual = contFonte - 1;

    if (contFonteAtual < 8) contFonteAtual = 8;
    setContFonte(contFonteAtual);
  };

  React.useEffect(() => {
    const dataMens = niverGeral.sort(compare);
    let dataMens2 = dataMens.filter(
      (val) => Number(val.Distrito) === Number(perfilUser.Distrito),
    );
    if (!dataMens2.length)
      dataMens2 = dataMens.filter((val) => Number(val.Distrito) === 0);

    setBoletim(dataMens[0]);

    const diaSemana = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ];
    // console.log('diaMensagem', niverGeral.sort(compare));

    /* if (dataMens[contSemana].length) {
      const diaMensagem = new Date(dataMens[contSemana].Data);
      console.log('oi dia', diaMensagem);
      diaMensagem.setHours(diaMensagem.getHours() + 6);
      console.log('diaMensagem', diaMensagem);
      const diaSm = Number(diaMensagem.getDay());
      const diaBr = Number(diaMensagem.getDate());
      let mesBr = Number(diaMensagem.getMonth() + 1);
      if (mesBr < 10) mesBr = `0${mesBr}`;
      const anoBr = Number(diaMensagem.getFullYear());
      const dataBrTemp = `${diaSemana[diaSm]}  ${diaBr}/${mesBr}/${anoBr}`; 
      
      setDataBr(dataBrTemp);
    } */
    if (dataMens.length) {
      const novaData1 = dataMens[0].Data; // nextSunday(semanaAtual2);

      const ano = novaData1.substring(0, 4);
      const mes = novaData1.substring(5, 7);
      const dia = novaData1.substring(8, 10);
      const diaSemana2 = new Date(`${mes}/${dia}/${ano}`);

      const showData = ` ${
        diaSemana[diaSemana2.getDay()]
      } ${dia}/${mes}/${ano}`;

      setDataBr(showData);
    } else {
      const novaData11 = nextSunday(semanaAtual2);
      const dia =
        novaData11.getDate() > 9
          ? novaData11.getDate()
          : `0${novaData11.getDate()}`;
      const mes =
        novaData11.getMonth() + 1 > 9
          ? novaData11.getMonth() + 1
          : `0${novaData11.getMonth() + 1}`;
      const ano = novaData11.getFullYear();
      const diaSemana2 = new Date(`${mes}/${dia}/${ano}`);

      const showData = ` ${
        diaSemana[diaSemana2.getDay()]
      } ${dia}/${mes}/${ano}`;

      setDataBr(showData);
    }
  }, [contSemana]);

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
        // maxWidth={450}

        bgcolor={corIgreja.secundaria}
        height="97%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
      >
        <Box
          style={{
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundImage: `url('/images/avisos.png')`,
            backgroundPosition: 'center', // centraliza imagem
            backgroundSize: 'cover',
          }}
          display="flex"
          flexDirection="column"
          height="15vh"
          minHeight={120}
          width="100%"
        >
          <Box
            height="30%"
            mt={5}
            width="98%"
            display="flex"
            justifyContent="flex-end"
          >
            <IconButton onClick={() => handleIncFonte()}>
              <Box
                style={{
                  color: 'white',
                  fontFamily: 'arial black',
                  fontSize: '16px',
                }}
                display="flex"
                justifyContent="flex-end"
                width="100%"
              >
                A+
              </Box>
            </IconButton>
          </Box>
          <Box
            mt={0}
            height="100%"
            flexDirection="column"
            width="100%"
            display="flex"
            justifyContent="flex-end"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="98%"
              height="100%"
            >
              <Box
                height="100%"
                style={{
                  color: 'white',
                  fontFamily: 'arial black',
                  fontSize: '12px',
                }}
                width="80%"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  ml={2}
                  height="100%"
                >
                  <Box
                    width="10%"
                    display="flex"
                    justifyContent="flex-end"
                    height="100%"
                  >
                    <IconButton onClick={() => handleDecSemana()}>
                      <Box
                        mt={-1}
                        style={{
                          color: 'white',
                          fontFamily: 'arial black',
                          fontSize: '16px',
                        }}
                        display="flex"
                        width="100%"
                      >
                        <MdOutlineArrowLeft size={55} color="white" />
                      </Box>
                    </IconButton>
                  </Box>
                  <Box
                    width="80%"
                    fontFamily="Fugaz One"
                    color="white"
                    mt={-0.3}
                    ml={-3}
                    display="flex"
                    justifyContent="center"
                  >
                    {dataBr ? `${dataBr}` : 'Não encontrado'}
                  </Box>
                  <Box
                    width="10%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton onClick={() => handleIncSemana()}>
                      <Box
                        mt={-1}
                        style={{
                          color: 'white',
                          fontFamily: 'arial black',
                          fontSize: '14px',
                        }}
                        display="flex"
                        justifyContent="flex-end"
                        width="100%"
                      >
                        <MdOutlineArrowRight size={55} color="white" />
                      </Box>
                    </IconButton>
                  </Box>
                </Box>{' '}
              </Box>
              <Box width="7%" />
              <Box
                width="12%"
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <IconButton onClick={() => handleDecFonte()}>
                  <Box
                    style={{
                      color: 'white',
                      fontFamily: 'arial black',
                      fontSize: '16px',
                    }}
                    display="flex"
                    justifyContent="flex-end"
                  >
                    A-
                  </Box>
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <TableContainer
          style={{
            minWidth: 280,
            width: '96vw',
            height: '98vh',
            minHeight: 400,
          }}
        >
          <Box height="100%" width="100%">
            <Box height="100%">
              <Box height="100%" mt={0} width="100%">
                <Box
                  height="100%"
                  display="flex"
                  width="100%"
                  mb={1}
                  justifyContent="center"
                  fontFamily="Fugaz One"
                  sx={{ textAlign: 'justify' }}
                >
                  {boletim ? (
                    <Box width="90%" color="black">
                      <Box width="100%">
                        <Box
                          mb={3}
                          fontFamily="Rubik"
                          fontSize={contFonte}
                          sx={{ textAlign: 'justify', textIndent: '30px' }}
                        >
                          <section
                            className="not-found-controller"
                            dangerouslySetInnerHTML={{
                              __html: boletim.conteudo,
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      height="75vh"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      SEM AVISOS REGISTRADO NESSA SEMANA
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Mensagem;
