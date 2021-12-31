import React, { useRef } from 'react';
import { Box, Grid, Typography, Button } from '@material-ui/core';
// import CardMedia from '@mui/material/CardMedia';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import cpfMask from 'src/components/mascaras/cpf';
import TamanhoJanela from 'src/utils/getSize';
import { TextField } from '@mui/material';
import ValidaCPF from 'src/utils/validarCPF';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PesquisaCPF from './pesquisaCPF';
import 'react-toastify/dist/ReactToastify.css';

const janela = TamanhoJanela();
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
const ColorButton = withStyles((theme) => ({
  root: {
    color: '#fff',
    backgroundColor: 'blue',
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
}))(Button);
function LoginGame() {
  // const [newData, setNewData] = React.useState('');
  const classes = useStyles();
  const [cpf, setCPF] = React.useState('');
  const [validarCPF, setValidarCPF] = React.useState('sim');
  const [open, setOpen] = React.useState(false);
  const [numeroCPF, setNumeroCPF] = React.useState('0');
  const cpfRef = React.useRef();
  const router = useRouter();

  // if (data) console.log(data);
  function entrarNoJogo() {
    setOpen(true);
  }

  const handleValida = () => {
    console.log(cpf);
    let valCPF = false;
    const valorCPF = cpf.replace(/\D/g, '');
    if (cpf.length > 0) {
      valCPF = ValidaCPF(valorCPF);

      if (valCPF) entrarNoJogo();
      else {
        toast.info('ESSE CPF NÃO EXISTE !', {
          position: toast.POSITION.TOP_CENTER,
        });
        cpfRef.current.focus();
      }
    } else {
      toast.info('PREENCHA O CAMPO CPF !', {
        position: toast.POSITION.TOP_CENTER,
      });
      cpfRef.current.focus();
    }

    return valCPF;
  };
  const voltar = () => {
    router.push({
      pathname: '/global',
      //   query: { dadosMesa2, numeroGame },
    });
    // setOpen(false);
    // window.location.reload();
  };
  const handleEnter = (event) => {
    console.log(event.target.value.length);
    if (event.key.toLowerCase() === 'enter') {
      const { form } = event.target;
      const formId = event.target.id;
      if (formId === 'CPF')
        if (cpf.length >= 13) {
          const valCPF = handleValida();
          if (valCPF) {
            console.log(cpf.length);
            const index = [...form].indexOf(event.target);
            form.elements[index + 2].focus();
            event.preventDefault();
          } else {
            const index = [...form].indexOf(event.target);
            form.elements[index].focus();
            event.preventDefault();
          }
        } else {
          const index = [...form].indexOf(event.target);
          form.elements[index].focus();
          event.preventDefault();
        }
    }
  };

  //  const janela = TamanhoJanela();
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        height="100vh"
        width="100vw"
        bgcolor="#a7172b"
      >
        <form>
          <Box align="center" width="100%" bgcolor="#a7172b">
            <Box mt={-30} ml={5}>
              <img src="/images/global/global1.png" alt="" width="100%" />
            </Box>
            <Box>
              <Box display="flex" width="100%" mt={0} ml={1}>
                <Grid item xs={2} md={3}>
                  <Box
                    height={10}
                    p={1}
                    ml={0}
                    mr={0}
                    mt={-14}
                    display="flex"
                    alignItems="center"
                  >
                    <ArrowBackIcon
                      sx={{
                        fontSize: 20,
                        color: '#fff',
                      }}
                      onClick={voltar}
                    />
                  </Box>
                </Grid>
                <Grid item xs={1} md={3} />

                <Grid item xs={9} md={3} />
              </Box>
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
                      <TextField
                        id="CPF"
                        type="tel"
                        inputRef={cpfRef}
                        className={classes.tf_s}
                        value={cpf}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        onKeyDown={handleEnter}
                        onChange={(e) => {
                          setCPF(cpfMask(e.target.value));
                        }}
                        onFocus={(e) => setCPF(cpfMask(e.target.value))}
                      />
                    </Box>
                  </Grid>
                </Box>
                <Box mt={3}>
                  <Box
                    mt={janela.height < 600 ? 8 : 10}
                    display="flex"
                    width="100%"
                    justifyContent="center"
                  >
                    <Box>
                      <ColorButton
                        style={{ borderRadius: 16 }}
                        variant="contained"
                        value="value"
                        onClick={handleValida}
                      >
                        Gerar Ticket
                      </ColorButton>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Box>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Box>
      {open && <PesquisaCPF cpf={cpf} setOpen={setOpen} />}
    </Box>
  );
}

export default LoginGame;
