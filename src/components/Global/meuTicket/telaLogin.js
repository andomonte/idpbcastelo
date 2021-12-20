import React from 'react';
import { Box, Grid, Typography, TextField } from '@material-ui/core';
// import CardMedia from '@mui/material/CardMedia';
import Fab from '@mui/material/Fab';
import Avatar from '@mui/material/Avatar';
import useSWR from 'swr';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import cpfMask from 'src/components/mascaras/cpf';
import PesquisaCPF from './pesquisaCPF';

// import TamanhoJanela from 'src/utils/getSize';
const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: '100%',
  },
  tf_s: {
    backgroundColor: '#ffff',
    textAlign: 'center',
    width: '100%',
    height: '40px',
    fontSize: '16px',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderRadius: '10px',
    border: '2px solid #b91a30',
  },
}));

function LoginGame() {
  // const [newData, setNewData] = React.useState('');
  const classes = useStyles();
  const [cpf, setCPF] = React.useState('');
  const [validarCPF, setValidarCPF] = React.useState('sim');
  const [open, setOpen] = React.useState(false);
  const [numeroCPF, setNumeroCPF] = React.useState('0');

  // if (data) console.log(data);

  function entrarNoJogo() {
    setOpen(true);
  }
  //  const janela = TamanhoJanela();
  return (
    <Box>
      {open ? (
        <PesquisaCPF cpf={cpf} />
      ) : (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          height="100vh"
          width="100vw"
          bgcolor="#a7172b"
        >
          <Box align="center" width="100%" bgcolor="#a7172b">
            <Box mt={-27}>
              <img src="/images/global/global1.png" alt="" width="100%" />
            </Box>
            <Box display="flex" flexDirection="row" mt={10}>
              <Grid item xs={12} md={3}>
                <Box mt={0} display="flex" flexDirection="row">
                  <Grid item xs={12} md={9}>
                    <Box
                      mt={1}
                      ml={2}
                      sx={{ fontWeight: 'bold', fontSize: '10px' }}
                    >
                      <Typography
                        style={{
                          fontWeight: 'bold',
                          fontSize: '15px',
                          color: '#fff',
                        }}
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Digite seu CPF
                      </Typography>
                    </Box>
                    <Box mt={1} width="90%">
                      <input
                        id="CPF"
                        type="text"
                        className={classes.tf_s}
                        value={cpfMask(cpf)}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        onChange={(e) => setCPF(e.target.value)}
                        onFocus={(e) => setCPF(e.target.value)}
                      />
                    </Box>
                  </Grid>
                </Box>
                <Box mt={3}>
                  <Box sx={{ '& > :not(style)': { m: 1 } }} mt={3} mb={3}>
                    <Fab
                      onClick={() => {
                        entrarNoJogo();
                      }}
                      style={{
                        background: '#c5172b',
                        color: 'white',
                      }}
                      variant="extended"
                    >
                      Gerar Ticket
                    </Fab>
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default LoginGame;
