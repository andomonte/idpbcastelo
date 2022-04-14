import * as React from 'react';
import Meses from 'src/utils/meses';
import { Box, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import corIgreja from 'src/utils/coresIgreja';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { BiCaretUp, BiCaretDown } from 'react-icons/bi';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function TabDiscipuado({ rolMembros, perfilUser }) {
  const classes = useStyles();

  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));
  const mes = Meses();
  const d = new Date();
  const mesAtual = Number(d.getMonth());
  const [contMes, setContMes] = React.useState(mesAtual);
  const [respostas, setRespostas] = React.useState({});
  const dados = rolMembros.filter(
    (val) => Number(val.Celula) === Number(perfilUser.Celula),
  );

  const handleIncMes = () => {
    let contMesAtual = contMes + 1;

    if (contMesAtual > 11) contMesAtual = 0;
    setContMes(contMesAtual);
  };
  const handleDecMes = () => {
    let contMesAtual = contMes - 1;

    if (contMesAtual < 0) contMesAtual = 11;
    setContMes(contMesAtual);
  };

  console.log(dados, perfilUser.Celula);
  return (
    <Paper
      sx={{
        background: '#fff9',
        width: '98%',
        height: '95%',
        marginLeft: 0.5,
        marginTop: 1,
        overflow: 'hidden',
      }}
    >
      <Box width="100%" ml={1} minWidth={370}>
        <Grid container spacing={0}>
          <Grid container item xs={12} spacing={1}>
            <Label lab1="Selecine o Mês" />
            <Grid item xs={6}>
              <Paper width="100%" className={classes.paper}>
                <Box width="100%" display="flex">
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
                        handleIncMes();
                      }}
                    >
                      <SvgIcon sx={{ color: corIgreja.iconeOn }} />{' '}
                      <BiCaretUp />
                    </IconButton>
                  </Box>
                  <Box
                    width="60%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ fontFamily: 'arial black' }}
                  >
                    {mes[contMes].descricao}
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
                        handleDecMes();
                      }}
                    >
                      <SvgIcon sx={{ color: corIgreja.iconeOn }} />
                      <BiCaretDown />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper width="100%" className={classes.paper}>
                <Box width="100%" display="flex">
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
                        handleIncAno();
                      }}
                    >
                      <SvgIcon sx={{ color: corIgreja.iconeOn }} />{' '}
                      <BiCaretUp />
                    </IconButton>
                  </Box>
                  <Box
                    width="60%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ fontFamily: 'arial black' }}
                  >
                    {contAno}
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
                        handleDecAno();
                      }}
                    >
                      <SvgIcon sx={{ color: corIgreja.iconeOn }} />
                      <BiCaretDown />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {dados.map((row, index) => (
        <Box
          mt={0}
          bgcolor={Object.keys(respostas).length && respostas[index]}
          display="flex"
          alignItems="center"
          key={row.Nome}
          height={40}
          sx={{ borderBottom: '2px solid #00a' }}
        >
          <Box display="flex" width="100%">
            <Box width="100%" display="flex" alignItems="center" ml={1}>
              {row.Nome}
            </Box>
            <Box width="10%" display="flex" alignItems="center" ml={1}>
              {dados[index].Nascimento}
            </Box>
          </Box>
        </Box>
      ))}
    </Paper>
  );
}
