// Display posts in frontend (in /pages/index.tsx)
import React from 'react';
import { Box, Grid } from '@material-ui/core';
import List from '@mui/material/List';
import corIgreja from 'src/utils/coresIgreja';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import { BiCaretRight, BiCaretLeft } from 'react-icons/bi';
import SearchListMes from './searchListMes';

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
  if (converteData(a.Nascimento) < converteData(b.Nascimento)) return -1;
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
function BuscarAniversariantes({ rolMembros }) {
  // const mes = Meses();

  //= ========================================================================
  // data de inicio
  //= ========================================================================
  const [contSemana, setContSemana] = React.useState(0);
  const semanaAtual2 = getPreviousMonday2(contSemana);
  const semanaAtual = moment(getPreviousMonday(semanaAtual2)).format(
    'DD/MM/YYYY',
  );
  const semanaSegunte = moment(nextSunday(semanaAtual2)).format('DD/MM/YYYY');

  const dataInicial = converteData(semanaAtual);
  const dataFinal = converteData(semanaSegunte);

  const niverGeral = rolMembros.filter(
    (results) =>
      converteData(results.Nascimento) >= dataInicial &&
      converteData(results.Nascimento) <= dataFinal,
  );

  const handleIncSemana = () => {
    const contSemanaAtual = contSemana + 7;

    setContSemana(contSemanaAtual);
  };
  const handleDecSemana = () => {
    const contSemanaAtual = contSemana - 7;

    setContSemana(contSemanaAtual);
  };
  const niverSetorOrdenado = niverGeral.sort(compare);

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
        bgcolor={corIgreja.secundaria}
        height="97%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
      >
        <Box width="100%" height="100%">
          <Box
            height="16%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor={corIgreja.principal}
            style={{
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundImage: `url('/images/filadelfia/aniversariantes.png')`,
              backgroundSize: '100% 100%',
            }}
          >
            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              fontSize="20px"
              color="white"
              sx={{ fontFamily: 'Fugaz One' }}
            >
              <Box>ANIVERSARIANTES</Box> <Box> DA SEMANA (IGREJA)</Box>
            </Box>
          </Box>
          <Box
            height="8%"
            minHeight={40}
            width="100%"
            display="flex"
            justifyContent="center"
          >
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              bgcolor="#fafafa"
            >
              <Box
                width="20%"
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={() => {
                    handleIncSemana();
                  }}
                >
                  <BiCaretLeft size={30} />
                </IconButton>
              </Box>

              <Box
                width="60%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="16px"
                sx={{ fontFamily: 'Fugaz One' }}
              >
                <Box>INÍCIO:</Box> <Box ml={2}> {semanaAtual}</Box>
              </Box>
              <Box
                width="20%"
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={() => {
                    handleDecSemana();
                  }}
                >
                  <BiCaretRight size={30} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box
            width="100%"
            height="76%"
            minHeight={200}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {Object.keys(niverSetorOrdenado).length ? (
              <Box width="100%" height="100%">
                <List
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',

                    '& ul': { padding: 0 },
                  }}
                  subheader={<li />}
                >
                  {niverSetorOrdenado.map((itens) => (
                    <Box width="100%" ml={0} key={itens.id}>
                      <Box width="100%">
                        <SearchListMes
                          semanaAtual={semanaAtual}
                          rolMembros={itens}
                        />
                      </Box>
                    </Box>
                  ))}
                </List>
              </Box>
            ) : (
              <Box
                bgcolor="background.paper"
                height="66vh"
                width="90%"
                border={1}
              >
                <Box mt={20} textAlign="center">
                  {' '}
                  Não temos aniversariantes registrados nesse Periodo
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default BuscarAniversariantes;
