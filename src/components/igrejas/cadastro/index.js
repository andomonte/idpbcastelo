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
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Espera from 'src/utils/espera';
import Autocomplete from '@mui/material/Autocomplete';

const fetcher = (url) => axios.get(url).then((res) => res.data);

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
  const [inputValor, setInputValor] = React.useState('');
  const [usuarioMembro, setUsuarioMembro] = React.useState('');
  const [validacaoNascimento, setValidacaoNascimento] =
    React.useState('testar');
  const nascimentoRef = useRef();
  const [nascimento, setNascimento] = React.useState('');
  const [cadastroConcluido, setCadastroConcluido] = React.useState(false);
  const [carregar, setCarregar] = React.useState(false);
  const [contId, setContId] = React.useState(0);
  const [usuarioLider, setUsuarioLider] = React.useState(false);
  const [openErro, setOpenErro] = React.useState(false);
  const [openEspera, setOpenEspera] = React.useState(false);
  const [openSelect, setOpenSelect] = React.useState(false);
  const [contagem, setContagem] = React.useState(false);
  const [perfilSelect] = React.useState('0');
  const [perfilUserFinal, setPerfilUserFinal] = React.useState('');
  const [perfilUser, setPerfilUser] = React.useState('');
  //= =========================================================================
  const handleValidacaoClose = () => {
    if (validacaoNome !== 'testar' && validacaoNome !== true) {
      setValidacaoNome('testar');
      nomeRef.current.focus();
    }
  };
  const listaNomes = rolMembros.map((nomes) => nomes.Nome);

  const [novoMembro, setNovoMembro] = React.useState('');
  // const [, setListaNomlistaNomee] = React.useState(listaParcial);
  const [novoLider, setNovoLider] = React.useState('');

  const url = `/api/consultaMembros`;
  const url2 = `/api/consultaLideranca`;

  const { data: members, error: errorMembers } = useSWR(url, fetcher);
  const { data: lideres, error: errorLideres } = useSWR(url2, fetcher);
  React.useEffect(() => {
    if (members) {
      const dadosMembros = members.filter(
        (val) =>
          val.Email === session.user.email && val.Nascimento === nascimento,
      );

      setNovoMembro(dadosMembros);
    }
    if (errorMembers) return <div>An error occured.</div>;
    if (!members) return <div>Loading ...</div>;

    return 0;
  }, [members]);

  React.useEffect(() => {
    if (lideres) {
      const dadosLider = lideres.filter(
        (val) =>
          val.Email === session.user.email && val.Nascimento === nascimento,
      );
      setNovoLider(dadosLider);
    }
    if (errorLideres) return <div>An error occured.</div>;
    if (!lideres) return <div>Loading ...</div>;

    return 0;
  }, [lideres]);
  let valorPerfil = {};
  let userMembro = {};
  let secao = '';

  const handleChange = (event) => {
    setContagem(true);
    const indexPerfil = Number(event.target.value - 1);
    setPerfilUser(() => [perfilUserFinal[indexPerfil]]);
    router.push(
      {
        pathname: '/meuPerfil',
        query: perfilUser[0],
      },
      '/meuPerfil',
    );
  };
  React.useEffect(() => {
    /* //console.log(
      'valor nm,nl,ul,um',
      novoMembro.length,
      novoLider.length,
      usuarioLider.length,
      usuarioMembro.length,
    ); */

    if (cadastroConcluido) {
      if (lideranca.length && members.length) {
        secao = lideres.filter((val) => val.Email === session.user.email);

        valorPerfil = secao.map((items, index) => {
          if (items.Funcao === 'Secretaria')
            return {
              Funcao: items.Funcao,
              Descricao: `Secretaria da Igreja`,
              id: index + 1,
              numero: items.Distrito,
              Celula: items.Celula,
              Coordenacao: items.Coordenacao,
              Distrito: items.Distrito,
              Email: items.Email,
              Igreja: items.Igreja,
              Nascimento: items.Nascimento,
              Nome: items.Nome,
              RolMembro: items.RolMembro,
              supervisao: items.supervisao,
            };
          if (items.Funcao === 'Presidente')
            return {
              Funcao: items.Funcao,
              Descricao: `Pastor Presidente`,
              id: index + 1,
              numero: items.Igreja,
              Celula: items.Celula,
              Coordenacao: items.Coordenacao,
              Distrito: items.Distrito,
              Email: items.Email,
              Igreja: items.Igreja,
              Nascimento: items.Nascimento,
              Nome: items.Nome,
              RolMembro: items.RolMembro,
              supervisao: items.supervisao,
            };
          if (items.Funcao === 'PastorDistrito')
            return {
              Funcao: items.Funcao,
              Descricao: `Pastor (Distrito ${items.Distrito})`,
              id: index + 1,
              numero: items.Distrito,
              Celula: items.Celula,
              Coordenacao: items.Coordenacao,
              Distrito: items.Distrito,
              Email: items.Email,
              Igreja: items.Igreja,
              Nascimento: items.Nascimento,
              Nome: items.Nome,
              RolMembro: items.RolMembro,
              supervisao: items.supervisao,
            };

          if (items.Funcao === 'Coordenador')
            return {
              Funcao: items.Funcao,
              Descricao: `Coordenador (Coordenação ${items.Coordenacao})`,
              id: index + 1,
              numero: items.Coordenacao,
              Celula: items.Celula,
              Coordenacao: items.Coordenacao,
              Distrito: items.Distrito,
              Email: items.Email,
              Igreja: items.Igreja,
              Nascimento: items.Nascimento,
              Nome: items.Nome,
              RolMembro: items.RolMembro,
              supervisao: items.supervisao,
            };
          if (items.Funcao === 'Supervisor')
            return {
              Funcao: items.Funcao,
              Descricao: `Supervisor (Supervisao ${items.supervisao})`,
              id: index + 1,
              numero: items.supervisao,
              Celula: items.Celula,
              Coordenacao: items.Coordenacao,
              Distrito: items.Distrito,
              Email: items.Email,
              Igreja: items.Igreja,
              Nascimento: items.Nascimento,
              Nome: items.Nome,
              RolMembro: items.RolMembro,
              supervisao: items.supervisao,
            };

          if (items.Funcao === 'Lider')
            return {
              Funcao: items.Funcao,
              Descricao: `Líder (Celula ${items.Celula})`,
              id: index + 1,
              numero: items.Celula,
              Celula: items.Celula,
              Coordenacao: items.Coordenacao,
              Distrito: items.Distrito,
              Email: items.Email,
              Igreja: items.Igreja,
              Nascimento: items.Nascimento,
              Nome: items.Nome,
              RolMembro: items.RolMembro,
              supervisao: items.supervisao,
            };

          return 0;
        });
      }
      const membro = members.filter((val) => val.Email === session.user.email);

      if (membro.length > 0) {
        userMembro = {
          Celula: membro[0].Celula,
          Coordenacao: membro[0].Coordenacao,
          Descricao: `Membro (Célula ${membro[0].Celula})`,
          Distrito: membro[0].Distrito,
          Email: membro[0].Email,
          Funcao: `Membro`,
          Igreja: membro[0].Igreja,
          Nascimento: membro[0].Nascimento,
          Nome: membro[0].Nome,
          RolMembro: membro[0].RolMembro,
          id: secao.length + 1,
          supervisao: membro[0].Supervisao,
          numero: membro[0].Celula,
        };
      }

      valorPerfil.push(userMembro); // para objeto -> Object.assign(secao, userMembro);
      // expected output: Object { a: 1, b: 4, c: 5 }

      // expected output: Object { a: 1, b: 4, c: 5 }

      setPerfilUserFinal(valorPerfil);
      setOpenSelect(true);
    }
    return 0;
  }, [novoLider, novoMembro]);

  const cadastrarEmailLider = () => {
    if (usuarioLider.length > 0) {
      if (contId - 1 < usuarioLider.length) {
        api
          .post(`/api/castelo/cadastrarEmailLideranca`, {
            Email: session.user.email,
            id: usuarioLider[contId - 1].id,
          })
          .then((response) => {
            if (response) {
              setCadastroConcluido(false);
              if (contId < usuarioLider.length) setContId(contId + 1);
              else {
                setContId(0);
                setOpenEspera(true);
                setCadastroConcluido(true);
                mutate(url2);
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
        // setCadastroConcluido(true);
      }
    }
  }, [contId]);
  // const [progress, setProgress] = React.useState(60);

  React.useEffect(() => {
    let timer;
    if (openEspera) {
      let prevProgress = 60;
      timer = setInterval(() => {
        prevProgress -= 1;

        if (prevProgress < 0) {
          prevProgress = 0;
          //   router.reload(window.location.pathname);
          /*  router.push({
            pathname: '/Perfil',
            //      query: { idCompra, qrCode, qrCodeCopy },
          }); */
        }
        //   setProgress(prevProgress);
      }, 800);
    }
    return () => {
      clearInterval(timer);
    };
  }, [openEspera]);

  //= ========================================================================

  const handleCheckDadosLideranca = () => {
    if (usuarioMembro.length > 0) {
      const checarLideranca = lideranca.filter(
        (val) => val.RolMembro === usuarioMembro[0].RolMembro,
      );

      if (checarLideranca.length > 0) {
        setUsuarioLider(checarLideranca);
        setContId(1); // duvida sobre qual deveria ser se não
      } else {
        setCarregar(true);
        setCadastroConcluido(true);
        setOpenEspera(true);
      }
    } else {
      setCarregar(true);
      setOpenEspera(true);
    }
  };
  const cadastrarEmailMembro = () => {
    if (usuarioMembro.length > 0) {
      setCarregar(true);

      api
        .post(`/api/castelo/cadastrarEmailMembro`, {
          Email: session.user.email,
          id: usuarioMembro[0].id,
        })

        .then((response) => {
          if (response) {
            mutate(url);
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

        const searcher = new FuzzySearch(rolMembros, ['Nome'], {
          caseSensitive: false,
        });

        const checarNome = searcher.search(nome);
        let valNasc = 'testar';
        //  //console.log('searcher,checarNome', searcher, checarNome, nome);

        if (checarNome.length === 1) {
          setValidacaoNome(true);

          if (checarNome[0].Nascimento === nascimento) {
            setValidacaoNascimento(true);
            valNasc = true;
          } else {
            valNasc = false;
            setValidacaoNascimento(false);
          }
          setValidacaoNascimento(valNasc);
          if (valNasc) {
            setUsuarioMembro(checarNome);
            cadastrarEmailMembro();
            // verificar se é da liderança
          } else setValidacaoNascimento(false);
        } else setValidacaoNome('Procure a Secretaria da Igreja');
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
      {openErro && (
        <Erros
          descricao="banco"
          setOpenErro={(openErros) => setOpenErro(openErros)}
        />
      )}
      {/*  {//console.log(
        'valores de openSelect e perfilUserFinal.length',
        openSelect,
        perfilUserFinal.length,
      )} */}
      {openSelect && perfilUserFinal.length ? (
        <Box width="100vw">
          <Box
            height="100vh"
            width="100%"
            minWidth={300}
            minHeight={500}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor={corIgreja.principal}
          >
            <Box width="100%">
              <Box textAlign="center" mt={-3} mb={2}>
                <img src="/images/castelo.png" alt="Castelo" width={80} />
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Box
                  width="90%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minWidth={280}
                  borderRadius={16}
                  height="auto"
                  bgcolor="#fafafa"
                >
                  <Box>
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
                            style={{
                              fontSize: '18px',
                              fontFamily: 'arial black',
                            }}
                          >
                            VOCÊ TEM {perfilUserFinal.length} Pefis
                          </Box>
                        </Grid>
                        <Grid item container direction="column" xs={12}>
                          <Box
                            textAlign="center"
                            mt={1}
                            color="#000"
                            style={{ fontSize: '16px', fontFamily: 'arial' }}
                          >
                            <strong style={{ color: '' }}>
                              Escolha qual deseja acessar{' '}
                            </strong>{' '}
                          </Box>
                        </Grid>
                      </Box>
                      <Box mt={5} mb={3} width="100%" textAlign="center">
                        <Grid item xs={12} md={12}>
                          <Box>
                            <TextField
                              value={perfilSelect}
                              select
                              onChange={handleChange}
                              variant="outlined"
                              placeholder="Escolha seu Perfil"
                              className={classes.tf_s}
                              style={{
                                textAlign: 'start',
                                WebkitBoxShadow: '0 0 0 1000px #fafafa  inset',
                              }}
                            >
                              <MenuItem value={perfilSelect}>
                                <em>Escolha seu Perfil</em>
                              </MenuItem>
                              {perfilUserFinal?.map((items) => (
                                <MenuItem key={items.id} value={items.id}>
                                  {items.Descricao ?? items.Descricao}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Box>
                        </Grid>
                      </Box>

                      {contagem && (
                        <Espera descricao="Atualizando Seu Perfil" />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
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
                        validacaoNome === true || validacaoNome === 'testar'
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
                          <Box width="92%" ml={2}>
                            <Autocomplete
                              sx={{
                                width: '100%',
                                textAlign: 'center',
                              }}
                              id="Nome"
                              freeSolo
                              value={nome}
                              onChange={(_, newValue) => {
                                setValidacaoNome('testar');
                                if (inputValor && newValue) setNome(newValue);
                                else setNome('');
                              }}
                              onBlur={() => {
                                if (inputValor.length > 0) {
                                  setNome(inputValor);
                                  setValidacaoNome('testar');
                                }
                              }}
                              selectOnFocus
                              inputValue={inputValor}
                              onInputChange={(_, newInputValue) => {
                                if (newInputValue !== '')
                                  setInputValor(newInputValue.toUpperCase());
                                else setInputValor('');
                              }}
                              options={listaNomes}
                              renderInput={(params) => (
                                <TextField
                                  className={classes.textField}
                                  {...params}
                                  inputRef={nomeRef}
                                  onKeyDown={handleEnter}
                                  placeholder="Digite seu Nome"
                                />
                              )}
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
                        {validacaoNome === true && (
                          <Box display="flex" ml={2} mt={0} color="#000">
                            <SvgIcon sx={{ color: 'green' }}>
                              <ErrorOutlineIcon />{' '}
                            </SvgIcon>
                            <Box
                              mt={0.5}
                              ml={2}
                              color="green"
                              style={{ fontSize: '12px' }}
                            >
                              Nome Encontrado
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
                              {!openEspera ? (
                                'Cadastrando...'
                              ) : (
                                <Box>Finalizando, espere... </Box>
                              )}
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
                                  WebkitBoxShadow:
                                    '0 0 0 1000px #fafafa  inset',
                                },
                              }}
                              id="Nascimento"
                              // label="Matricula"
                              type="tel"
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
                                usuarioLider[contId - 1].Funcao ===
                                  'Secretaria' && (
                                  <Box>
                                    {usuarioLider[contId - 1].Funcao} da Igreja{' '}
                                  </Box>
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
                                    {usuarioLider[contId - 1].Funcao} do
                                    Distrito {usuarioLider[contId - 1].Distrito}
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
      )}
    </Box>
  );
}

export default Cadastro;
