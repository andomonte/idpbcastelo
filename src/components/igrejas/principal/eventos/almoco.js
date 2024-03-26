import React, { useRef } from 'react';
import { Box, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cpfMask from 'src/components/mascaras/cpf';
// import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ValidaCPF from 'src/utils/validarCPF';
import SvgIcon from '@mui/material/SvgIcon';
import api from 'src/components/services/api';
import TamanhoJanela from 'src/utils/getSize';
import { Oval } from 'react-loader-spinner';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

const janela = TamanhoJanela();
let altura;
if (janela.height < 500) altura = 500;
else altura = janela.height;
// const validateDate = require('validate-date');

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
    padding: 0,
    margin: 0,
  },
  imgBack: {
    //    width: '100%',
    height: altura,
    backgroundImage: "url('/images/global/fundo.png')",
    //    backgroundImage: url(/images/global/ticket.png), //seleciona imagem
    backgroundPosition: 'center', // centraliza imagem
    backgroundSize: 'cover', // imagem cobre toda área do div
  },
  img: {
    maxWidth: '400px',
    maxHeight: '700px',
    minWidth: '300px',
    minHeight: '500px',
    width: '100vw',
    height: '99vh',
    padding: 0,
    margin: 0,
  },
  img2: {
    maxWidth: '400px',
    maxHeight: '697px',
    minWidth: '300px',
    minHeight: '500px',
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
  },
  img1: {
    width: '20px',
    height: '20px',
    marginLeft: 40,
    marginRight: 8,
  },
  input1: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#780208',
    width: '90%',
    height: 0,
  },
  letras1: {
    display: 'flex',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fffd',
    marginBottom: 0,
  },
  letras2: {
    display: 'flex',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
  },
  letras3: {
    display: 'flex',
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
    padding: 2,
  },
  legenda1: {
    display: 'flex',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fffd',
  },

  fundoBranco: {
    display: 'flex',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fffa',
    justifyContent: 'center',
  },
  button1: {
    display: 'flex',
    height: 50,
    background: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#b91a30',
    justifyContent: 'center',
  },
  button2: {
    display: 'flex',
    background: '#b91a30',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },

  imgMobile: {
    maxWidth: '1110px',
    maxHeight: '500px',
    width: '100%',
    height: 'auto',
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
    marginLeft: '10px',
    marginRight: '10px',
  },
  tf_m: {
    backgroundColor: '#f0f4c3',

    width: '100%',
    fontSize: '5px',
  },
  tf_s: {
    backgroundColor: '#fafafa',
    textAlign: 'center',
    width: '90%',
    height: '40px',
    fontSize: '14px',
    [theme.breakpoints.down('md')]: {},
    //  borderRadius: '10px',
    //   border: '0px solid #b91a30',
  },
}));
/* const defaultProps = {
  bgcolor: 'background.paper',
  m: 0,
  // border: '2px solid #b91a30',
  width: janela.width,
  height: janela.height,
}; */

function Almoco({ ministrosAm, igrejasIdpb }) {
  const classes = useStyles();

  // const router = useRouter();
  const [nome, setNome] = React.useState('');
  const [id, setId] = React.useState('');
  const [cpf, setCPF] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [reservado, setReservado] = React.useState(false);
  const [validarCPF, setValidarCPF] = React.useState('sim');

  const [validacaoCPF, setValidacaoCPF] = React.useState('testar');

  const cpfRef = useRef();
  const confirmarRef = useRef();
  // const router = useRouter();

  React.useEffect(() => {
    cpfRef.current.focus();
  }, []);
  const handleSalvarInscritos = async () => {
    const dadosIgreja = igrejasIdpb.filter((val) => val.Codigo === id.Igreja);

    const urlCreate = `/api/salvarInscritosReuniao`;

    api
      .post(urlCreate, {
        cpf,
        Distrito: dadosIgreja[0].NomeDistrito,
        GrauMinisterial: id.GrauMinisterial,
        Igreja: dadosIgreja[0].Nome,
        Jurisdicao: dadosIgreja[0].NomeJurisdicao,
        Nome: id.Nome,
        Evento: 'Reunião Pastoral 28-11-2023',
        Nascimento: id.Nascimento,
      })
      .then((response) => {
        if (response) {
          setLoading(false);
          setReservado(true);
          setValidarCPF('');
          setCPF('');
          setNome('');
          cpfRef.current.focus();
        }
      })
      .catch((error) => {
        console.log('error:', error);
        setNome('Ocooreu um Erro tente mais tarde');
        //  updateFile(uploadedFile.id, { error: true });
      });
  };
  const handleEnviar = async () => {
    let libera = true;
    if (id.almoco === 'nao') {
      toast.error(
        'Em virturde do não registro da sua entrada na ultima Reunião, não poderemos fazer a reserva do seu almoço nessa reunião, apenas na próxima !',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
      libera = false;
    }
    if (id.almoco === 'sim') {
      toast.info(
        'Sua reserva já foi feita, estamos aguardando a sua presença!',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
      libera = false;
    }
    if (libera) {
      const urlCreate = `/api/updateAlmoco/${id.id}`;

      setReservado(false);
      if (validarCPF === 'sim') {
        setLoading(true);
        api
          .post(urlCreate, { cpf })
          .then((response) => {
            if (response) {
              handleSalvarInscritos();
            }
          })
          .catch((error) => {
            console.log('error:', error);
            setNome('Nome não encontrado');
            //  updateFile(uploadedFile.id, { error: true });
          });
      } else setLoading(false);
    }
  };

  // CPF
  const handleValidarCPF = (e) => {
    const campoCPF = e.target.value;
    const valorCPF = e.target.value.replace(/\D/g, '');
    if (validacaoCPF !== 'next' && validacaoCPF !== 'testar') {
      cpfRef.current.focus();
    }

    if (campoCPF !== '' && valorCPF.length > 10) {
      const vCPF = ValidaCPF(valorCPF);

      if (vCPF) {
        const getCPF = ministrosAm.filter(
          (val) => val.CPF === cpf || val.CPF === valorCPF,
        );

        if (getCPF && getCPF.length) {
          setValidacaoCPF('next');
          setNome(getCPF[0].Nome);
          setId(getCPF[0]);
          setValidarCPF('sim');
          confirmarRef.current.focus();
        } else {
          setValidarCPF('nao');
          setNome('');
          setValidacaoCPF('CPF não encontrado');
          cpfRef.current.focus();
        }
      } else {
        setValidarCPF('nao');
        setNome('');
        setValidacaoCPF('CPF inválido');
        cpfRef.current.focus();
      }
      // setValidacaoCPF(vCPF);
    } else {
      setValidarCPF('nao');
      setNome('');
      setValidacaoCPF('preencha o campo CPF');
      cpfRef.current.focus();
    }
  };

  // Email

  /* const voltar = () => {
    router.back();

    // setOpen(false);
    // window.location.reload();
  }; */

  //= ====================================================================
  const handleEnter = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      const form = e.target.id;

      if (form === 'CPF') {
        const campoCPF = e.target.value;
        const valorCPF = e.target.value.replace(/\D/g, '');
        if (validacaoCPF !== 'next' && validacaoCPF !== 'testar') {
          cpfRef.current.focus();
        }

        if (campoCPF !== '' && valorCPF.length > 10) {
          const vCPF = ValidaCPF(valorCPF);

          if (vCPF) {
            const getCPF = ministrosAm.filter(
              (val) => val.CPF === cpf || val.CPF === valorCPF,
            );
            if (getCPF && getCPF.length) {
              setValidacaoCPF('next');
              setNome(getCPF[0].Nome);
              setId(getCPF[0].id);
              setValidarCPF('sim');
              confirmarRef.current.focus();
            } else {
              setValidarCPF('nao');
              setNome('');
              setValidacaoCPF('CPF não encontrado');
              cpfRef.current.focus();
            }
          } else {
            setValidarCPF('nao');
            setNome('');
            setValidacaoCPF('CPF inválido');
            cpfRef.current.focus();
          }
          // setValidacaoCPF(vCPF);
        } else {
          setValidarCPF('nao');
          setNome('');
          setValidacaoCPF('preencha o campo CPF');
          cpfRef.current.focus();
        }
      }
    }
  };
  return (
    <Box height="100vh" style={{ backgroundColor: '#11237e' }}>
      <Box p={2} ml={1} mr={0}>
        <Box sx={{ color: '#fff' }} mt={5}>
          <Box display="flex" width="100%" justifyContent="center">
            <img src="/images/idpb.ico" alt="logo" width={50} />
          </Box>
          <Box
            mt={2}
            ml={0}
            textAlign="center"
            fontFamily="Fugaz One"
            sx={{ corlor: '#faff', fontSize: '20px' }}
          >
            IDPB AM
          </Box>
          <Box
            mt={2}
            ml={0}
            textAlign="center"
            fontFamily="Fugaz One"
            sx={{ corlor: '#faff', fontSize: '20px' }}
          >
            REUNIÃO PASTORAL
          </Box>
          <Box
            mt={1}
            ml={0}
            textAlign="center"
            fontFamily="Fugaz One"
            sx={{ corlor: '#faff', fontSize: '16px' }}
          >
            27/02/2024 - a partir das 8:30
          </Box>
          <Box
            color="yellow"
            mt={3}
            ml={0}
            textAlign="center"
            fontFamily="Fugaz One"
            sx={{ corlor: '#faff', fontSize: '16px' }}
          >
            Local:
          </Box>
          <Box
            mt={1}
            ml={0}
            textAlign="center"
            fontFamily="Fugaz One"
            sx={{ corlor: '#faff', fontSize: '16px' }}
          >
            IDPB MANAUS MODERNA
          </Box>
          <Box
            mt={2}
            ml={0}
            color="yellow"
            textAlign="center"
            sx={{ corlor: '#faff', fontSize: '20px' }}
          >
            <h4>RESERVE SEU ALMOÇO</h4>
          </Box>

          <Box display="flex" justifyContent="flex-start">
            <Box mt={0} height="100%" width="100%" ml={0}>
              <Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                >
                  <Box
                    border={1}
                    borderColor={
                      validacaoCPF === 'next' || validacaoCPF === 'testar'
                        ? 'green'
                        : 'red'
                    }
                    mt={2}
                    mr={2}
                    display="flex"
                    flexDirection="column"
                    bgcolor="#fafafa"
                    borderRadius="16px"
                    height={120}
                    width="100%"
                  >
                    <Grid item xs={12} md={12}>
                      <Box
                        mt={1}
                        mb={1}
                        ml={3}
                        sx={{ fontSize: 'bold', color: '#000' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          CPF
                        </Typography>
                      </Box>

                      <Box className={classes.novoBox} mt={-1.5}>
                        <TextField
                          autoComplete="off"
                          className={classes.tf_s}
                          autoFocus
                          inputProps={{
                            style: {
                              textAlign: 'center',
                              WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                            },
                          }}
                          id="CPF"
                          inputRef={cpfRef}
                          //                      ref={cpfRef}
                          // // // label="CPF"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={cpfMask(cpf)}
                          variant="standard"
                          placeholder="digite seu CPF"
                          size="small"
                          error={validarCPF === 'nao'}
                          onChange={(e) => {
                            setValidacaoCPF('testar');
                            setNome('');
                            setCPF(e.target.value);
                            setReservado(false);
                          }}
                          onKeyDown={handleEnter}
                          onBlur={(e) => {
                            if (validacaoCPF === 'testar') handleValidarCPF(e);
                          }}
                        />
                      </Box>
                      {validacaoCPF !== 'next' && validacaoCPF !== 'testar' && (
                        <Box display="flex" ml={5} mt={0} color="#000">
                          <SvgIcon sx={{ color: 'red' }}>
                            <ErrorOutlineIcon />{' '}
                          </SvgIcon>
                          <Box mt={0.3} ml={2} color="red">
                            {validacaoCPF}
                          </Box>
                        </Box>
                      )}
                    </Grid>
                  </Box>
                  <Box
                    mt={1}
                    height={30}
                    display="flex"
                    justifyContent="center"
                    borderRadius="16px"
                    width="100%"
                    fontSize="16px"
                    fontFamily="Fugaz One"
                  >
                    {nome}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display={reservado ? 'flex' : 'none'}>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success" style={{ textAlign: 'center' }}>
              Almoço Reservado com sucesso!!!
            </Alert>
          </Stack>
        </Box>
        <Box
          bgcolor="red"
          width="100%"
          color="white"
          height={50}
          fontSize="16px"
          mt={-5}
          alignItems="center"
          borderRadius={10}
          justifyContent="center"
          display={validacaoCPF === 'CPF não encontrado' ? 'flex' : 'none'}
        >
          <Box textAlign="center">
            <Box sx={{ width: '100%' }}>Para atualizar seu cadastro</Box>
            <Box sx={{ width: '100%' }}>Ligue para o telefone 991344368</Box>
          </Box>
        </Box>
        <Box mt={2} align="center" display="flex" justifyContent="center">
          {!loading ? (
            <Box mt={0}>
              <Button
                //   onClick={handleEnviar}
                ref={confirmarRef}
                style={{
                  fontFamily: 'Fugaz One',
                  fontSize: '16px',
                  backgroundColor: 'orange',
                  height: 40,
                  width: 200,
                  borderRadius: 10,
                  color: 'black',
                }}
              >
                FAZER RESERVAS
              </Button>
            </Box>
          ) : (
            <Box mt={0}>
              <Button
                ref={confirmarRef}
                style={{
                  fontFamily: 'Fugaz One',
                  backgroundColor: '#afb42b',
                  height: 40,
                  width: 200,
                  borderRadius: 10,
                  color: 'white',
                }}
              >
                <Oval color="blue" width={30} height={30} />
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={8000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
}

export default Almoco;
