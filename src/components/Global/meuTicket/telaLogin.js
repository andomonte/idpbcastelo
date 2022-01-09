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
let ajAlturaMin = -(janela.height / 10) + 10;
if (ajAlturaMin < -48) ajAlturaMin = -48;
if (ajAlturaMin > -42) ajAlturaMin = -42;
let ajAlturaMax = -110 + janela.height / 10;
if (ajAlturaMax < -4) ajAlturaMax = -47;
if (ajAlturaMax > -35) ajAlturaMax = -35;
let altura;
if (janela.height < 500) altura = 500;
else altura = janela.height;
const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '400px',
    maxHeight: '700px',
    minWidth: '300px',
    minHeight: '500px',
    width: '100vw',
    height: '99vh',
  },
  paper: {
    // backgroundColor: '#b91a30', // theme.palette.background.paper,
    backgroundImage: `url('/images/global/fundo.png')`,
    //    border: '0px solid #000',
    //    boxShadow: theme.shadows[5],
    //  padding: theme.spacing(1, 1, 1),
    backgroundPosition: 'center', // centraliza imagem
    backgroundSize: 'cover', // imagem cobre toda área do div
    height: '100vh',
    width: '100vw',
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
    border: '2px solid #b91a30',
  },
  root: {
    height: '100vh',
    // overflow: 'hidden',
    width: '100vw',
    minHeight: 500,
    maxHeight: 700,
    padding: 0,
    margin: 0,
  },
}));
const ColorButton = withStyles((theme) => ({
  root: {
    color: '#fff',
    backgroundColor: '#780208',
    '&:hover': {
      backgroundColor: '#780208',
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
    if (event.key.toLowerCase() === 'enter') {
      const { form } = event.target;
      const formId = event.target.id;
      if (formId === 'CPF')
        if (cpf.length >= 13) {
          const valCPF = handleValida();
          if (valCPF) {
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
    <>
      {open ? (
        <PesquisaCPF cpf={cpf} setOpen={setOpen} />
      ) : (
        <Box className={classes.root}>
          <Box>
            <Box
              mt={0}
              height={janela.height}
              justifyContent="center"
              display="flex"
            >
              <Box>
                <Box mt={0} ml={0}>
                  <img
                    src="/images/global/fundo2.png"
                    alt=""
                    // width="100%"
                    className={classes.img}
                  />
                </Box>
                <form>
                  <Box
                    display="flex"
                    width="100%"
                    mt={
                      altura > 570
                        ? altura < 630
                          ? (-42 * altura) / 450
                          : (-44 * altura) / 450
                        : (-41 * altura) / 450
                    }
                    ml={2}
                  >
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
                  <Box
                    mt={altura > 570 ? (altura < 630 ? 15 : 18) : 10} // não mexer
                    ml={0}
                    sx={{ fontWeight: 'bold', fontSize: '10px' }}
                    display="flex"
                    justifyContent="center"
                  >
                    <Typography
                      style={{
                        fontWeight: 'bold',
                        fontSize: '15px',
                        fontFamily: 'arial black',
                        color: '#000',
                      }}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      GERE SEU TICKET
                    </Typography>
                  </Box>

                  <Box display="flex" justifyContent="center">
                    <Box mt={3} width="80%">
                      <Box mt={0}>
                        <Box
                          mt={2}
                          ml={0}
                          sx={{ fontWeight: 'bold', fontSize: '10px' }}
                          display="flex"
                          justifyContent="center"
                        >
                          <Typography
                            style={{
                              fontWeight: 'bold',
                              fontSize: '15px',
                              color: '#780208',
                            }}
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Digite seu CPF
                          </Typography>
                        </Box>
                        <Box mt={0} width="100%">
                          <TextField
                            id="CPF"
                            type="tel"
                            inputRef={cpfRef}
                            style={{ width: '100%' }}
                            className={classes.tf_s}
                            inputProps={{
                              style: {
                                textAlign: 'center',
                              },
                            }}
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
                      </Box>
                      <Box mt={0}>
                        <Box
                          mt={janela.height < 600 ? 6 : 8}
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
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default LoginGame;
