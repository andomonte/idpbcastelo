// Display posts in frontend (in /pages/index.tsx)
import React from 'react';
import { Box, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@mui/material/List';
import Meses from 'src/utils/meses';
import corIgreja from 'src/utils/coresIgreja';

import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import { BiCaretRight, BiCaretLeft } from 'react-icons/bi';
import SearchList from './searchList';

const useStyles = makeStyles((theme) => ({
  input_Box: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 4,
    [theme.breakpoints.down('md')]: {
      marginLeft: 4,
      marginRight: 4,
      marginTop: 4,
    },
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  search: {
    background: '#fafafa',
    padding: '0px 0px',
    display: 'flex',
    // alignCelulass: 'center',
    height: 55,
    width: '100%',
    borderRadius: 0,
    //  maxWidth: 900,
    marginBottom: 0,

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 4,
      marginBottom: 5,
    },
  },
  search2: {
    width: '90%',
    marginTop: 10,

    [theme.breakpoints.down('md')]: {
      marginTop: 4,
    },
  },
  tf_s: {
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '10px',
    border: '2px solid #fff',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 16,
  },
  imgSearch: {
    display: 'flex',
    alignCelulass: 'center',
    height: '40%',
    width: '50%',
    marginLeft: '40%',
    marginBottom: 20,
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '20%',
      marginLeft: '40%',
      marginTop: 4,
    },
  },
}));

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

function BuscarAniversariantes({ rolMembros, perfilUser }) {
  const classes = useStyles();

  // const mes = Meses();

  //= ========================================================================
  // data de inicio
  //= ========================================================================

  //= ========================================================================
  //= ================================================================
  const mes = Meses();
  const d = new Date();
  const mesAtual = Number(d.getMonth());
  const [contMes, setContMes] = React.useState(mesAtual);

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

  //= ========================================================================
  // data de Final
  //= ========================================================================
  //= ========================================================================

  const niverGeral = rolMembros.filter(
    (results) => converteData(results.Nascimento).getMonth() === contMes,
  );

  const niverSetor = niverGeral.filter((results) => {
    if (
      Number(results.Celula) === Number(perfilUser.Celula) &&
      Number(results.Distrito) === Number(perfilUser.Distrito)
    ) {
      return results;
    }
    return 0;
  });
  const niverSetorOrdenado = niverSetor.sort(compare);

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Box className={classes.search2}>
          <Box
            height="25%"
            minHeight={150}
            minWidth={370}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor={corIgreja.principal}
            style={{
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
          >
            <Box width="100%" ml={1} minWidth={370}>
              <Box mb={2} textAlign="center" color="yellow">
                ANIVERSARIANTES DA CÉLULA
              </Box>
              <Grid container item xs={12} spacing={1}>
                <Grid item xs={12}>
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
                            handleDecMes();
                          }}
                        >
                          <SvgIcon sx={{ color: corIgreja.iconeOn }} />{' '}
                          <BiCaretLeft />
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
                            handleIncMes();
                          }}
                        >
                          <SvgIcon sx={{ color: corIgreja.iconeOn }} />
                          <BiCaretRight />
                        </IconButton>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <TextField
            InputProps={{
              endAdornment: (
                <Tooltip title="Pesquisar Igreja">
                  <Box onClick={handleClick} style={{ cursor: 'pointer' }}>
                    <SearchIcon />
                  </Box>
                </Tooltip>
              ),
            }}
            className={classes.search}
            id="field1"
            name="password"
            autoComplete="off"
            type="text"
            value={valor}
            variant="outlined"
            placeholder="Nome ou Número da Celula, Nome do Lider"
            onChange={handleChange}
            // onKeyPress={handlePress}
            onKeyPress={handlePress}
          /> */}
        </Box>
      </Box>
      <Box
        width="100%"
        minWidth={370}
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {Object.keys(niverSetorOrdenado).length ? (
          <Box height="65vh" width="90%" border={1}>
            <List
              sx={{
                width: '100%',
                height: '60vh',

                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 480,
                '& ul': { padding: 0 },
              }}
              subheader={<li />}
            >
              {niverSetorOrdenado.map((itens) => (
                <Box ml={0} key={itens.id}>
                  <Box>
                    <Grid>
                      <SearchList rolMembros={itens} />
                    </Grid>
                  </Box>
                </Box>
              ))}
            </List>
          </Box>
        ) : (
          <Box height="65vh" width="90%" border={1}>
            <Box mt={20} textAlign="center">
              {' '}
              Não temos aniversariantes registrados nesse Periodo
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BuscarAniversariantes;
