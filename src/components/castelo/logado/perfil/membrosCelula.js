import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';
import corIgreja from 'src/utils/coresIgreja';
import { makeStyles } from '@material-ui/core/styles';
import BuscarNome from '../relatorios/supervisor/buscarNome';
import TabMembros from './abas/tabMembros';

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
  button1: {
    display: 'flex',
    background: 'red',
    '&:hover': {
      backgroundColor: 'red',
    },
    borderRadius: 30,
    fontSize: '14px',
    width: 'auto',
    minWidth: 100,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },
}));

function Celula({ perfilUser, rolMembros }) {
  const classes = useStyles();

  const [buscarNome, setBuscarNome] = React.useState([]);
  const [openBuscar, setOpenBuscar] = React.useState(false);

  // limitar nomes até 30 caracteres ou ultimo espaço antes de 30
  //= ===================================================================

  const membroCelula = rolMembros.filter(
    (val) =>
      Number(val.Distrito) === Number(perfilUser.Distrito) &&
      val.Celula === Number(perfilUser.Celula),
  );

  //= ===================================================================

  return (
    <Box height="90vh" minHeight={500} minWidth={300}>
      {!openBuscar ? (
        <Box
          height="100%"
          width="100vw"
          minWidth={300}
          mt={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            minWidth={300}
            height="100%"
            width="100vw"
            maxWidth={600}
            border="4px solid #fff"
          >
            <Box height="100%">
              <Box
                style={{
                  borderRadius: '16px',
                }}
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight={350}
                minWidth={300}
                width="100%"
                bgcolor={corIgreja.principal}
                borderTop="2px solid #fff"
              >
                <Box width="95%" height="100%">
                  <Box
                    height="10%"
                    mt={1}
                    minHeight={50}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      bgcolor: corIgreja.principal,
                      color: '#F1F1F1',
                      fontFamily: 'Geneva',
                      fontWeight: 'bold',
                      fontSize: '20px',
                    }}
                  >
                    <Grid item container xs={12} spacing={2}>
                      <Grid item xs={12}>
                        <Box mt={2} ml={1} fontSize="12px">
                          Total de Membros
                        </Box>
                        <Paper width="100%" className={classes.paper}>
                          <Box
                            height={30}
                            alignItems="center"
                            justifyContent="center"
                            fontSize="18px"
                            sx={{ fontFamily: 'arial black' }}
                            width="100%"
                            display="flex"
                          >
                            {membroCelula.length}
                          </Box>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    height="80%"
                    minHeight={315}
                    display="flex"
                    bgcolor="#fafafa"
                    width="100%"
                    borderRadius={16}
                    mt={4}
                  >
                    <TabMembros
                      setBuscarNome={setBuscarNome}
                      membroCelula={membroCelula}
                      setOpenBuscar={setOpenBuscar}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <BuscarNome perfilUser={buscarNome} setOpenBuscar={setOpenBuscar} />
      )}
    </Box>
  );
}

export default Celula;
