import React from 'react';
import { Box, Grid, Typography, TextField } from '@material-ui/core';
// import CardMedia from '@mui/material/CardMedia';
import Fab from '@mui/material/Fab';
import Avatar from '@mui/material/Avatar';
import useSWR from 'swr';
import axios from 'axios';
import TamanhoJanela from 'src/utils/getSize';

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: '100%',
  },
}));

const fetcher = (url) => axios.get(url).then((res) => res.data);
const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  width: '95%',
};

function LoginGame() {
  // const [newData, setNewData] = React.useState('');
  const [cpf, setCPF] = React.useState('');
  const [validarCPF, setValidarCPF] = React.useState('sim');
  const [open, setOpen] = React.useState(false);
  const [numeroCPF, setNumeroCPF] = React.useState('0');
  // const url = `${window.location.origin}/api/consultaGame/${cpf}`;

  const { data, error } = useSWR('/api/consultaGames', fetcher);

  // if (data) console.log(data);
  if (error) return <div>An error occured.</div>;
  if (!data) return <div>Loading ...</div>;
  const entrarNoJogo = async () => {
    if (cpf) {
      const dadosUser = data.filter(
        (val) => String(val.codigo) === String(cpf),
      );

      if (dadosUser.length) {
        setNumeroCPF(dadosUser);
        try {
          const body = {
            status: 'ON',
          };

          let urlCreate = '';
          if (cpf.length === 0) {
            urlCreate = `${window.location.origin}/api/criarEvento`;
          } else {
            urlCreate = `${window.location.origin}/api/updateGames/${dadosUser[0].codigo}`;
          }

          await fetch(urlCreate, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          //    setLoading('enviado');
        } catch (errors) {
          //  setLoading('falha');

          console.errors();
        }
        setOpen(true);
      }
    }
  };
  const janela = TamanhoJanela();
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        height={janela.height - 58}
        bgcolor="#b91a30"
      >
        <Box align="center" width="99%" bgcolor="#b91a30">
          <Box display="flex" flexDirection="row" mt={2}>
            <Grid item xs={12} md={3}>
              <Box borderRadius={16} {...defaultProps} bgcolor="#ffff">
                <Box mt={0} display="flex" flexDirection="row">
                  <Grid item xs={12} md={9}>
                    <Box mt={1} ml={2} sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Digite seu CPF
                      </Typography>
                    </Box>
                    <Box mt={1}>
                      <TextField
                        id="CPF"
                        type="number"
                        InputLabelProps={{
                          style: { textTransform: 'uppercase' },
                          shrink: true,
                        }}
                        value={cpf}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        onBlur={
                          cpf === ''
                            ? () => setValidarCPF('nao')
                            : () => setValidarCPF('sim')
                        }
                        onChange={(e) => setCPF(e.target.value)}
                        error={validarCPF === 'nao'}
                        onFocus={(e) => setCPF(e.target.value)}
                      />
                    </Box>
                  </Grid>
                </Box>
                <Box mt={3}>
                  <Box sx={{ '& > :not(style)': { m: 1 } }} mt={3} mb={3}>
                    <Fab
                      onClick={entrarNoJogo}
                      style={{
                        background: '#b91a30',
                        color: 'white',
                      }}
                      variant="extended"
                    >
                      Gerar Ticket
                    </Fab>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginGame;
