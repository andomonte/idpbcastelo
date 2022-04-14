import React, { useRef } from 'react';
import { signOut, useSession } from 'next-auth/client';
import dataMask from 'src/components/mascaras/datas';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, TextField, Typography, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import SvgIcon from '@mui/material/SvgIcon';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FuzzySearch from 'fuzzy-search';
import api from 'src/components/services/api';
import { Oval } from 'react-loading-icons';
import Erros from 'src/utils/erros';
import corIgreja from 'src/utils/coresIgreja';

const useStyles = makeStyles((theme) => ({
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
  button2: {
    display: 'flex',
    background: corIgreja.principal,
    '&:hover': {
      backgroundColor: corIgreja.principal,
    },
    borderRadius: 30,
    fontSize: '14px',
    width: 'auto',
    minWidth: 100,
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
function Cadastro({ lideranca, rolMembros }) {
  const classes = useStyles();

  const [session] = useSession();

  const router = useRouter();

  //= ==========================================================================
  //= = DADOS DO CPF
  //= =========================================================================

  const [validacaoNome, setValidacaoNome] = React.useState('testar');
  const nomeRef = useRef();
  const [nome, setNome] = React.useState('');
  const [usuarioMembro, setUsuarioMembro] = React.useState('');
  const [validacaoNascimento, setValidacaoNascimento] =
    React.useState('testar');
  const nascimentoRef = useRef();
  const [nascimento, setNascimento] = React.useState('');
  const [querys, updateQuery] = React.useState(null);
  const [carregar, setCarregar] = React.useState(false);
  const [contId, setContId] = React.useState(0);
  const [usuarioLider, setUsuarioLider] = React.useState(false);
  const [openErro, setOpenErro] = React.useState(false);
  const [openEspera, setOpenEspera] = React.useState(false);
  //= =========================================================================
  const handleValidacaoClose = () => {
    if (validacaoNome !== 'testar' && validacaoNome) {
      setValidacaoNome('testar');
      nomeRef.current.focus();
    }
  };

  const cadastrarEmailLider = () => {
    if (usuarioLider.length > 0) {
      if (contId - 1 < usuarioLider.length) {
        api
          .post(`/api/filadelfia/cadastrarEmailLideranca`, {
            Email: session.user.email,
            id: usuarioLider[contId - 1].id,
          })
          .then((response) => {
            if (response) {
              console.log('contId', contId, usuarioLider.length);
              if (contId < usuarioLider.length) setContId(contId + 1);
              else {
                console.log('ja era para ter ido agora');
                router.push({
                  pathname: '/selectPerfil',
                  //      query: { idCompra, qrCode, qrCodeCopy },
                });
                setContId(0);
                setOpenEspera(true);
              }
            }
          })
          .catch(() => {
            setCarregar(false);
            setOpenErro(true);
            return 0;
            //  updateFile(uploadedFile.id, { error: true });
          });
      }

      return true;
    }
    return true;
  };
  React.useEffect(() => {
    if (contId !== 0) {
      if (contId - 1 < usuarioLider.length) {
        cadastrarEmailLider();
      } else {
        setContId(0);
        setCarregar(false);
      }
    }
  }, [contId]);
  const handleCheckDadosLideranca = () => {
    if (usuarioMembro.length > 0) {
      const checarLideranca = lideranca.filter(
        (val) => val.RolMembro === usuarioMembro[0].RolMembro,
      );

      if (checarLideranca.length > 0) {
        setUsuarioLider(checarLideranca);
        setContId(1);
      } else {
        setCarregar(true);
        router.push({
          pathname: '/selectPerfil',
          //      query: { idCompra, qrCode, qrCodeCopy },
        });
      }
    } else {
      setCarregar(true);
      router.push({
        pathname: '/selectPerfil',
        //      query: { idCompra, qrCode, qrCodeCopy },
      });
    }
  };

  const cadastrarEmailMembro = () => {
    if (usuarioMembro.length > 0) {
      setCarregar(true);

      api
        .post(`/api/filadelfia/cadastrarEmailMembro`, {
          Email: session.user.email,
          id: usuarioMembro[0].id,
        })

        .then((response) => {
          if (response) {
            console.log('Cadastro de Membro OK');
            handleCheckDadosLideranca();
          }
        })
        .catch(() => {
          setCarregar(false);
          setOpenErro(true);
          return 0;
          //  updateFile(uploadedFile.id, { error: true });
        });
    }
    return true;
  };

  const handleCheckDadosMembro = () => {
    if (nome !== '') {
      const regName =
        /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
      const vaiNome = regName.test(nome);

      if (!vaiNome) {
        setValidacaoNome('Digite um Sobrenome');
      } else {
        //= para procurar os dados  ==========================================

        updateQuery(nome);

        const searcher = new FuzzySearch(rolMembros, ['Nome'], {
          caseSensitive: false,
        });

        const checarNome = searcher.search(querys);

        if (checarNome.length > 0) {
          const checarNascimento = rolMembros.filter(
            (val) => val.Nascimento === nascimento,
          );
          if (checarNascimento.length > 0) {
            setUsuarioMembro(checarNascimento);
            setValidacaoNascimento(true);
            cadastrarEmailMembro();
            // verificar se é da liderança
          } else setValidacaoNascimento(false);
        } else setValidacaoNome('Nome não Encontrado');
      }
    } else {
      setValidacaoNome('Digite um Nome');
    }
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const form = event.target.id;

      if (form === 'Nascimento') handleCheckDadosMembro();
    }
  };

  const handleCancelar = () => {
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  };

  return (
    <Box
      height="100vh"
      width="100%"
      minWidth={300}
      minHeight={500}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="corIgreja.principal"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="90%"
        minWidth={280}
        maxWidth={500}
        borderRadius={16}
        height="auto"
        bgcolor="#fafafa"
      >
        <Box
          mt={3}
          mb={3}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          width="100%"
          minWidth={300}
        >
          <Box
            color="#000"
            style={{ fontSize: '22px', fontFamily: 'arial black' }}
          >
            <Grid item container direction="column" xs={12}>
              <Box
                textAlign="center"
                color="#000"
                style={{ fontSize: '18px', fontFamily: 'arial black' }}
              >
                ATENÇÃO!!!
              </Box>
            </Grid>
            <Grid item container direction="column" xs={12}>
              <Box
                textAlign="center"
                mt={1}
                color="#000"
                style={{ fontSize: '16px', fontFamily: 'arial' }}
              >
                o email:
                <strong style={{ color: '' }}>
                  {' '}
                  {session.user.email}
                </strong>{' '}
              </Box>
            </Grid>
            <Grid item container direction="column" xs={12}>
              <Box
                textAlign="center"
                color="red"
                style={{ fontSize: '16px', fontFamily: 'arial black' }}
              >
                Não foi cadastrado
              </Box>
            </Grid>

            <Grid container direction="column">
              <Grid item container direction="column" xs={12}>
                <Box
                  mt={3}
                  textAlign="center"
                  color="#000"
                  style={{ fontSize: '16px', fontFamily: 'arial black' }}
                  width="100%"
                  minWidth={300}
                >
                  FAZER CADASTRO
                </Box>
                <Box
                  mt={-2}
                  width="100%"
                  minWidth={250}
                  display="flex"
                  justifyContent="center"
                >
                  <Box
                    border={1}
                    borderColor={
                      validacaoNome === 'true' || validacaoNome === 'testar'
                        ? 'green'
                        : 'red'
                    }
                    mt={2}
                    mr={0}
                    display="flex"
                    flexDirection="row"
                    bgcolor="#fafafa"
                    borderRadius="16px"
                    height={120}
                    width="90%"
                  >
                    <Grid item xs={12} md={12}>
                      <Box
                        mt={2}
                        mb={1}
                        ml={3}
                        sx={{ fontSize: 'bold', color: '#000' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Nome
                        </Typography>
                      </Box>
                      <Box mt={0} textAlign="center">
                        <Box>
                          <TextField
                            className={classes.tf_s}
                            inputProps={{
                              style: {
                                textAlign: 'center',
                                WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                              },
                            }}
                            id="Nome"
                            // label="Matricula"
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={nome}
                            variant="standard"
                            placeholder="Nome completo"
                            onChange={(e) => {
                              setNome(e.target.value);
                              handleValidacaoClose();
                            }}
                            onFocus={(e) => {
                              setNome(e.target.value);
                            }}
                            onKeyDown={handleEnter}
                            inputRef={nomeRef}
                          />
                        </Box>
                      </Box>
                      {validacaoNome !== true && validacaoNome !== 'testar' && (
                        <Box display="flex" ml={2} mt={0} color="#000">
                          <SvgIcon sx={{ color: 'red' }}>
                            <ErrorOutlineIcon />{' '}
                          </SvgIcon>
                          <Box
                            mt={0.5}
                            ml={2}
                            color="red"
                            style={{ fontSize: '12px' }}
                          >
                            {validacaoNome}
                          </Box>
                        </Box>
                      )}
                      {carregar && (
                        <Box display="flex" ml={2} mt={0} color="#000">
                          <Box
                            mt={0.5}
                            ml={0}
                            color="blue"
                            style={{ fontSize: '12px' }}
                          >
                            {console.log('penEspera', openEspera)}
                            {!openEspera ? 'Cadastrando...' : 'Finalizando...'}
                          </Box>
                        </Box>
                      )}
                    </Grid>
                  </Box>
                </Box>
                <Box
                  mt={-1}
                  width="100%"
                  minWidth={300}
                  display="flex"
                  justifyContent="center"
                >
                  <Box
                    border={1}
                    borderColor={validacaoNascimento ? 'green' : 'red'}
                    mt={2}
                    mr={0}
                    display="flex"
                    flexDirection="row"
                    bgcolor="#fafafa"
                    borderRadius="16px"
                    height={120}
                    width="90%"
                  >
                    <Grid item xs={12} md={12}>
                      <Box
                        mt={2}
                        mb={1}
                        ml={3}
                        sx={{ fontSize: 'bold', color: '#000' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Data de Nascimento
                        </Typography>
                      </Box>
                      <Box mt={0} textAlign="center">
                        <Box>
                          <TextField
                            className={classes.tf_s}
                            inputProps={{
                              style: {
                                textAlign: 'center',
                                WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                              },
                            }}
                            id="Nascimento"
                            // label="Matricula"
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={dataMask(nascimento)}
                            variant="standard"
                            placeholder="dd/mm/aaaa"
                            onChange={(e) => {
                              setNascimento(e.target.value);
                              handleValidacaoClose();
                            }}
                            onFocus={(e) => {
                              setNascimento(e.target.value);
                            }}
                            onBlur={handleCheckDadosMembro}
                            onKeyDown={handleEnter}
                            inputRef={nascimentoRef}
                          />
                        </Box>
                      </Box>
                      {!validacaoNascimento && (
                        <Box display="flex" ml={5} mt={0} color="#000">
                          <SvgIcon sx={{ color: 'red' }}>
                            <ErrorOutlineIcon />{' '}
                          </SvgIcon>
                          <Box
                            mt={0.3}
                            ml={2}
                            color="red"
                            style={{ fontSize: '12px' }}
                          >
                            Data não Confere com o Nome
                          </Box>
                        </Box>
                      )}
                      {carregar && (
                        <Box display="flex" ml={2} mt={0} color="#000">
                          <Box
                            mt={0.3}
                            ml={0}
                            color="blue"
                            style={{ fontSize: '12px' }}
                          >
                            {usuarioMembro.length > 0 &&
                              !openEspera &&
                              contId === 0 && (
                                <Box>Cadastrando Email - Rol de Membro </Box>
                              )}
                            {contId !== 0 &&
                              usuarioLider.length &&
                              usuarioLider[contId - 1].Funcao === 'Lider' && (
                                <Box>
                                  {usuarioLider[contId - 1].Funcao} da Célula{' '}
                                  {usuarioLider[contId - 1].Celula}{' '}
                                </Box>
                              )}
                            {contId !== 0 &&
                              usuarioLider.length &&
                              usuarioLider[contId - 1].Funcao ===
                                'Supervisor' && (
                                <Box>
                                  {usuarioLider[contId - 1].Funcao} da
                                  Supervisão{' '}
                                  {usuarioLider[contId - 1].supervisao &&
                                    usuarioLider[contId - 1].supervisao}
                                </Box>
                              )}
                            {contId !== 0 &&
                              usuarioLider.length &&
                              usuarioLider[contId - 1].Funcao ===
                                'Coordenador' && (
                                <Box>
                                  {usuarioLider[contId - 1].Funcao} da
                                  Coordenação{' '}
                                  {usuarioLider[contId - 1].Coordenacao}
                                </Box>
                              )}
                            {contId !== 0 &&
                              usuarioLider.length &&
                              usuarioLider[contId - 1].Funcao ===
                                'PastorArea' && (
                                <Box>
                                  {usuarioLider[contId - 1].Funcao} do Distrito{' '}
                                  {usuarioLider[contId - 1].Distrito}
                                </Box>
                              )}
                            {contId !== 0 &&
                              usuarioLider.length &&
                              usuarioLider[contId - 1].Funcao ===
                                'Presidente' && (
                                <Box>
                                  {usuarioLider[contId - 1].Funcao} da IDPB{' '}
                                  {usuarioLider[contId - 1].Igreja}
                                </Box>
                              )}
                          </Box>
                        </Box>
                      )}
                    </Grid>
                  </Box>
                </Box>
                <Box
                  mt={4}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    className={classes.button2}
                    variant="contained"
                    id="reload"
                    onClick={handleCheckDadosMembro}
                  >
                    <Box>
                      {!carregar ? (
                        <Box>CADASTRAR</Box>
                      ) : (
                        <Box display="flex">
                          <Oval width={120} height={25} />{' '}
                        </Box>
                      )}
                    </Box>
                  </Button>
                  <Box ml={2} />
                  <Button
                    className={classes.button1}
                    variant="contained"
                    id="reload"
                    onClick={handleCancelar}
                  >
                    CANCELAR
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      {openErro && (
        <Erros
          descricao="banco"
          setOpenErro={(openErros) => setOpenErro(openErros)}
        />
      )}
    </Box>
  );
}

export default Cadastro;
