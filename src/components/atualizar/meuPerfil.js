import { makeStyles } from '@material-ui/core/styles';
// import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { signOut } from 'next-auth/client';
import TextField from '@material-ui/core/TextField';
import { Box, Tooltip, Button, capitalize } from '@material-ui/core';
import React from 'react';
import Image from 'material-ui-image';
// import { uniqueId } from 'lodash';
// import filesize from 'filesize';
import api from 'src/components/services/api';
import axios from 'axios';
import Hidden from '@material-ui/core/Hidden';
import cpfMask from 'src/components/mascaras/cpf';
import dataMask from 'src/components/mascaras/datas';
import foneMask from 'src/components/mascaras/fone';
import celularMask from 'src/components/mascaras/celular';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  novoBox: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
  },
  alignBox: {
    padding: theme.spacing(0),
    // display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'blue',
    // height: '330px',
    marginTop: 20,
  },
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: 'auto',
  },
  imgMobile: {
    maxWidth: '1110px',
    maxHeight: '500px',
    width: '100%',
    height: 'auto',
  },
  logo: {
    height: '100%',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      marginLeft: 2,
    },
  },
  page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'blue',
  },
  caption: {
    marginTop: -5,
    marginLeft: 5,
    textTransform: 'capitalize',
    fontWeight: 1000,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    fontSize: '40px',
    '@media (min-width:600px)': {
      fontSize: '20px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  typography: {
    color: 'black',
    fontWeight: 1000,
    marginTop: -10,
    marginLeft: 5,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    fontSize: '30px',
    '@media (min-width:600px)': {
      fontSize: '20px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  rotulo: {
    color: 'blue',
    textTransform: 'capitalize',
    fontWeight: 500,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    fontSize: '30px',
    '@media (min-width:600px)': {
      fontSize: '16px',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  tf_12: {
    // marginLeft: theme.spacing(1),
    //  marginRight: theme.spacing(1),
    width: '500px',

    margin: 10,
    [theme.breakpoints.down('md')]: {
      width: '20',
    },
  },
  tf_m: {
    width: '100%',
    fontSize: '5px',
  },

  tf_6: {
    //    marginRight: 8,
    margin: 10,
    width: '240px',
    textAlign: 'center',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      margin: 10,
      width: '205px',
    },
  },
  tf_4: {
    margin: 10,
    // marginRight: 8,
    width: '155px',
    textAlign: 'center', // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      width: '130px',
    },
  },
  tf_3: {
    margin: 10,
    textAlign: 'center',
    // marginRight: 8,
    width: '120px',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      width: '110px',
    },
  },
  root: {
    // position: 'absolute',
    width: '100%',
    // marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
}));

function meuPerfil({ item, secao, ministros }) {
  const classes = useStyles();
  const dadosUser = item.filter((val) => val.email === secao.user.email);
  const [nome, setNome] = React.useState('');
  const [validarNome, setValidarNome] = React.useState('sim');
  const [matricula, setMatricula] = React.useState('');
  const [validarMatricula, setValidarMatricula] = React.useState('sim');
  const [cpf, setCPF] = React.useState('');
  const [validarCPF, setValidarCPF] = React.useState('sim');
  const [rg, setRG] = React.useState('');
  const [validarRG, setValidarRG] = React.useState('sim');
  const [sexo, setSexo] = React.useState('');
  const [validarSexo, setValidarSexo] = React.useState('sim');
  const [jurisdicaoEstadual, setJurisdicaoEstadual] = React.useState('');
  const [
    validarJurisdicaoEstadual,
    setValidarJurisdicaoEstadual,
  ] = React.useState('sim');
  const [distrito, setDistrito] = React.useState('');
  const [validarDistrito, setValidarDistrito] = React.useState('sim');
  const [grau, setGrau] = React.useState('');
  const [validarGrau, setValidarGrau] = React.useState('sim');
  const [formacaoEscolar, setFormacaoEscolar] = React.useState('');
  const [validarFormacaoEscolar, setValidarFormacaoEscolar] = React.useState(
    'sim',
  );
  const [conjuge, setConjuge] = React.useState('');
  const [validarConjuge, setValidarConjuge] = React.useState('sim');
  const [cpfConjuge, setCPFConjuge] = React.useState('');
  const [validarCPFConjuge, setValidarCPFConjuge] = React.useState('sim');
  const [celularConjuge, setcelularConjuge] = React.useState('');
  const [validarCelularConjuge, setValidarCelularConjuge] = React.useState(
    'sim',
  );
  const [logradouro, setLogradouro] = React.useState('');
  const [validarLogradouro, setValidarLogradouro] = React.useState('sim');
  const [numero, setNumero] = React.useState('');
  const [validarNumero, setValidarNumero] = React.useState('sim');
  const [complemento, setComplemento] = React.useState('');
  const [validarComplemento, setValidarComplemento] = React.useState('sim');
  const [bairro, setBairro] = React.useState('');
  const [validarBairro, setValidarBairro] = React.useState('sim');
  const [fone, setFone] = React.useState('');
  const [validarFone, setValidarFone] = React.useState('sim');
  const [celular, setCelular] = React.useState('');
  const [validarCelular, setValidarCelular] = React.useState('sim');
  const [email, setEmail] = React.useState('');
  const [validarEmail, setValidarEmail] = React.useState('sim');
  const [cidade, setCidade] = React.useState('');
  const [validarCidade, setValidarCidade] = React.useState('sim');
  const [cep, setCEP] = React.useState('');
  const [validarCEP, setValidarCEP] = React.useState('sim');
  const [uf, setUF] = React.useState('');
  const [validarUF, setValidarUF] = React.useState('sim');
  const [estadoCivil, setEstadoCivil] = React.useState('');
  const [validarEstadoCivil, setValidarEstadoCivil] = React.useState('sim');
  const [dataNascimento, setDataNascimento] = React.useState('');
  const [validarDataNascimento, setValidarDataNascimento] = React.useState(
    'sim',
  );
  const [conversao, setConversao] = React.useState('');
  const [validarConversao, setValidarConversao] = React.useState('sim');
  const [consagracao, setConsagracao] = React.useState('');
  const [validarConsagracao, setValidarConsagracao] = React.useState('sim');
  const [ascensao1, setAscensao1] = React.useState('');
  const [validarAscencao1, setValidarAscencao1] = React.useState('sim');
  const [ascensao2, setAscensao2] = React.useState('');
  const [validarAscencao2, setValidarAscencao2] = React.useState('sim');
  const [naturalidade, setNaturalidade] = React.useState('');
  const [validarNaturalidade, setValidarNaturalidade] = React.useState('sim');
  const [estadoNacimento, setEstadoNascimento] = React.useState('');
  const [validarEstadoNascimento, setValidarEstadoNascimento] = React.useState(
    'sim',
  );
  const [nacionalidade, setNacionalidade] = React.useState('');
  const [validarNacionalidade, setValidarNacionalidade] = React.useState('sim');
  const [informacoes, setInformacoes] = React.useState({
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
    ibge: '',
    gia: '',
  });
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  if (dadosUser.length === 0)
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  const dadosMinistro = ministros.filter(
    (val) => val.Email === dadosUser[0].email,
  );

  if (dadosUser.length === 0)
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  const [selectedFile, setSelectedFile] = React.useState(
    dadosMinistro[0].fotoPerfil ? dadosMinistro[0].fotoPerfil : '',
  );

  const [previews, setPreview] = React.useState([]);

  const processUpload = (uploadedFile) => {
    const nomeFoto = `${dadosMinistro[0].CPF}${uploadedFile.name.substring(
      uploadedFile.name.lastIndexOf('.'),
    )}`;
    const dataFile = new FormData();
    dataFile.append('file', uploadedFile, nomeFoto);

    api
      .post('api/fotos', dataFile)
      .then((response) => {
        if (response) console.log(response);
      })
      .catch(() => {});
  };

  const onSelectFile = (e) => {
    setPreview(e.target.files[0]);
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(URL.createObjectURL(e.target.files[0]));
  };
  const [value, setValue] = React.useState('dPessoais');

  const addTela = () => {
    //  console.log(value);
    if (value === 'dPessoais') setValue('endereço');
    if (value === 'endereço') setValue('dadosIDPB');
    //    if (contador === 3) setValue('dadosIDPB');
  };
  const subTela = () => {
    if (value === 'endereço') setValue('dPessoais');
    if (value === 'dadosIDPB') setValue('endereço');
  };

  const enviarFoto = () => processUpload(previews);
  // const url = `${window.location.origin}/api/consultaEventos/${item[0].codigoIgreja}`;
  // const { data, erroros } = useSWR(url, fetcher);
  // useSWR('/api/user', (id = 4) => fetcher(id));
  // useSWR('/api/consultaDados', fetcher);

  //---------------------------------------------------------------------------
  // const dadosMinistro = data.filter((val) => val.dataEvento === dataEvento);
  let Nome = '';
  let Matricula = '';
  let CPF = '';
  let RG = '';
  let Sexo = '';
  let JurisdicaoEstadual = '';
  let Distrito = '';
  let GrauMinisterial = '';
  let FormacaoEscolar = '';
  let Conjuge = '';
  let CPFConjuge = '';
  let CelularConjuge = '';
  let Logradouro = '';
  let Numero = '';
  let Complemento = '';
  let Bairro = '';
  let TelefoneResidencial = '';
  let Celular = '';
  let Email = '';
  let Cidade = '';
  let CEP = '';
  let UF = '';
  let EstadoCivil = '';
  let DataNascimento = '';
  let DataConversao = '';
  let DataConsagracao = '';
  let DataAscensao1 = '';
  let DataAscensao2 = '';
  let Naturalidade = '';
  let EstadoNascimento = '';
  let Nacionalidade = '';

  //  {dadosMinistro[0].FuncaoNaIgreja}
  if (dadosMinistro.length !== 0) {
    Nome = dadosMinistro[0].Nome;
    Matricula = dadosMinistro[0].Matricula;
    CPF = dadosMinistro[0].CPF;
    RG = dadosMinistro[0].RG;
    Sexo = dadosMinistro[0].Sexo;
    JurisdicaoEstadual = dadosMinistro[0].JurisdicaoEstadual;
    Distrito = dadosMinistro[0].Distrito;
    GrauMinisterial = dadosMinistro[0].GrauMinisterial;
    FormacaoEscolar = dadosMinistro[0].FormacaoEscolar;
    Conjuge = dadosMinistro[0].Conjuge;
    CPFConjuge = dadosMinistro[0].CPFConjuge;
    CelularConjuge = dadosMinistro[0].CelularConjuge;
    Logradouro = dadosMinistro[0].Logradouro;
    Numero = dadosMinistro[0].Numero;
    Complemento = dadosMinistro[0].Complemento;
    Bairro = dadosMinistro[0].Bairro;
    TelefoneResidencial = dadosMinistro[0].TelefoneResidencial;
    Celular = dadosMinistro[0].Celular;
    Email = dadosMinistro[0].Email;
    Cidade = dadosMinistro[0].Cidade;
    CEP = dadosMinistro[0].CEP;
    UF = dadosMinistro[0].UF;
    EstadoCivil = dadosMinistro[0].EstadoCivil;
    DataNascimento = dadosMinistro[0].DataNascimento;
    DataConversao = dadosMinistro[0].DataConversao;
    DataConsagracao = dadosMinistro[0].DataConsagracao;
    DataAscensao1 = dadosMinistro[0].DataAscensao1;
    DataAscensao2 = dadosMinistro[0].DataAscensao2;
    Naturalidade = dadosMinistro[0].Naturalidade;
    EstadoNascimento = dadosMinistro[0].EstadoNascimento;
    Nacionalidade = dadosMinistro[0].Nacionalidade;
  }

  //--------------------------------------------------------------------------
  React.useEffect(() => {
    if (dadosMinistro.length !== 0) {
      setNome(Nome);
      setCPF(CPF);
      setMatricula(Matricula);
      setRG(RG);
      setSexo(Sexo);
      setJurisdicaoEstadual(JurisdicaoEstadual);
      setDistrito(Distrito);
      setGrau(GrauMinisterial);
      setFormacaoEscolar(FormacaoEscolar);
      setConjuge(Conjuge);
      setCPFConjuge(CPFConjuge);
      setcelularConjuge(CelularConjuge);
      setLogradouro(Logradouro);
      setNumero(Numero);
      setComplemento(Complemento);
      setBairro(Bairro);
      setFone(TelefoneResidencial);
      setCelular(Celular);
      setEmail(Email);
      setCidade(Cidade);
      setCEP(CEP);
      setUF(UF);
      setEstadoCivil(EstadoCivil);
      setDataNascimento(DataNascimento);
      setConversao(DataConversao);
      setConsagracao(DataConsagracao);
      setAscensao1(DataAscensao1);
      setAscensao2(DataAscensao2);
      setNaturalidade(Naturalidade);
      setEstadoCivil(EstadoNascimento);
      setNacionalidade(Nacionalidade);
    }
  }, []);
  //--------------------------------------------------------------------------
  const valid = () => {
    if (
      !nome ||
      !matricula ||
      !cpf ||
      !rg ||
      !jurisdicaoEstadual ||
      !distrito ||
      !grau
    ) {
      return false;
    }
    return true;
  };
  //--------------------------------------------------------------------------

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //--------------------------------------------------------------------------

  const submitData = async (e) => {
    e.preventDefault();
    const valida = valid();
    setLoading(true);

    if (valida) {
      try {
        const body = {
          Nome,
          Matricula,
          CPF,
          RG,
          Sexo,
          JurisdicaoEstadual,
          Distrito,
          GrauMinisterial,
        };

        let urlCreate = '';
        if (dadosMinistro.length === 0) {
          urlCreate = `${window.location.origin}/api/criarEvento`;
        } else {
          urlCreate = `${window.location.origin}/api/updateEvento/${ids}`;
        }

        await fetch(urlCreate, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        setLoading(false);
        setEditar(false);
        mutate(url);
      } catch (errors) {
        console.errors();
      }
    }
  };
  const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1,
    width: '95%',
  };
  const getInformacoes = () => {
    axios.get(`http://viacep.com.br/ws/${cep}/json/`).then((response) => {
      setInformacoes(response.data);
      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setCidade(response.data.localidade);
    });
  };
  const handleDados = () => {
    setNome(Nome);
  };
  return (
    <>
      {secao ? (
        <form
          noValidate
          autoComplete="off"
          width="100%"
          className={classes.root}
        >
          <Box
            display="flex"
            justifyContent="center"
            bgcolor="#2fff8d"
            maxHeight="50px"
            mb={5}
          >
            <Box mb={1}>
              <h2>Dados Pessoais</h2>
            </Box>
          </Box>
          {value === 'dPessoais' ? (
            <Box>
              <Box display="flex" flexDirection="row">
                <Grid item xs={12} md={3}>
                  <Box
                    mt={1}
                    className={classes.box}
                    width="100%"
                    //            maxWidth={1200}
                    height="auto"
                    // borderRadius={16}
                    {...defaultProps}
                  >
                    <Tooltip title="Click para Mudar" aria-label="foto">
                      <Box className={classes.novoBox}>
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={onSelectFile}
                        />
                        <label htmlFor="contained-button-file">
                          <Image
                            src={selectedFile}
                            alt=""
                            width="100%"
                            height="100%"
                          />
                        </label>
                      </Box>
                    </Tooltip>
                  </Box>
                </Grid>

                <Grid item xs={12} md={9}>
                  <Box className={classes.alignBox}>
                    <Hidden smDown>
                      <Box className={classes.page}>
                        <Grid item xs={12} md={9}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="Nome"
                              label="Nome"
                              type="text"
                              InputLabelProps={{
                                style: { textTransform: 'uppercase' },
                                shrink: true,
                              }}
                              value={nome}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                nome === ''
                                  ? () => setValidarNome('nao')
                                  : () => setValidarNome('sim')
                              }
                              onChange={(e) =>
                                setNome(capitalize(e.target.value))
                              }
                              error={validarNome === 'nao'}
                              onFocus={(e) => setNome(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="Grau Ministerial"
                              label="Grau Ministerial"
                              type="text"
                              disabled
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={grau || GrauMinisterial}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                grau === ''
                                  ? () => setValidarGrau('nao')
                                  : () => setValidarGrau('sim')
                              }
                              onChange={(e) => setGrau(e.target.value)}
                              error={validarGrau === 'nao'}
                              onFocus={(e) => setGrau(e.target.value)}
                            />
                          </Box>
                        </Grid>
                      </Box>
                      <Box mt={2} display="flex" flexDirection="row">
                        <Grid item xs={12} md={6}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="Email"
                              label="Email"
                              type="text"
                              InputLabelProps={{
                                style: { textTransform: 'uppercase' },
                                shrink: true,
                              }}
                              value={email}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                email === ''
                                  ? () => setValidarEmail('nao')
                                  : () => setValidarEmail('sim')
                              }
                              onChange={(e) => setEmail(e.target.value)}
                              error={validarEmail === 'nao'}
                              onFocus={(e) => setEmail(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="TelefoneCelular"
                              label="Telefone Celular"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={celularMask(celular)}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                celular === ''
                                  ? () => setValidarCelular('nao')
                                  : () => setValidarCelular('sim')
                              }
                              onChange={(e) => setCelular(e.target.value)}
                              error={validarCelular === 'nao'}
                              onFocus={(e) => setCelular(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="TelefoneResidencial"
                              label="Telefone Residencial"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={foneMask(fone)}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                fone === ''
                                  ? () => setValidarFone('nao')
                                  : () => setValidarFone('sim')
                              }
                              onChange={(e) => setFone(e.target.value)}
                              error={validarFone === 'nao'}
                              onFocus={(e) => setFone(e.target.value)}
                            />
                          </Box>
                        </Grid>
                      </Box>
                      <Box mt={2} display="flex" flexDirection="row">
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="Matricula"
                              label="Matricula"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={matricula}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              disabled
                              onBlur={
                                matricula === ''
                                  ? () => setValidarMatricula('nao')
                                  : () => setValidarMatricula('sim')
                              }
                              onChange={(e) => setMatricula(e.target.value)}
                              error={validarMatricula === 'nao'}
                              onFocus={(e) => setMatricula(e.target.value)}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="CPF"
                              label="CPF"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={cpfMask(cpf)}
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
                        <Grid item xs={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="RG"
                              label="RG"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={rg || RG}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                rg === ''
                                  ? () => setValidarRG('nao')
                                  : () => setValidarRG('sim')
                              }
                              onChange={(e) => setRG(e.target.value)}
                              error={validarRG === 'nao'}
                              onFocus={(e) => setRG(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="DataNascimento"
                              label="Data de Nascimento"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={dataMask(dataNascimento)}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                dataNascimento === ''
                                  ? () => setValidarDataNascimento('nao')
                                  : () => setValidarDataNascimento('sim')
                              }
                              onChange={(e) =>
                                setDataNascimento(e.target.value)
                              }
                              error={validarDataNascimento === 'nao'}
                              onFocus={(e) => setDataNascimento(e.target.value)}
                            />
                          </Box>
                        </Grid>
                      </Box>
                      <Box display="flex" flexDirection="row" mt={2}>
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="DataConversao"
                              label="Data de Conversão"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={dataMask(DataConversao)}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                DataConversao === ''
                                  ? () => setValidarConversao('nao')
                                  : () => setValidarConversao('sim')
                              }
                              onChange={(e) => setConversao(e.target.value)}
                              error={validarConversao === 'nao'}
                              onFocus={(e) => setConversao(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="DataConsagracao"
                              label="Data de Consagração"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              disabled
                              value={dataMask(DataConsagracao)}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                DataConsagracao === ''
                                  ? () => setValidarConsagracao('nao')
                                  : () => setValidarConsagracao('sim')
                              }
                              onChange={(e) => setConsagracao(e.target.value)}
                              error={validarConsagracao === 'nao'}
                              onFocus={(e) => setConsagracao(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="DataAscensao1"
                              label="Data 1º Ascensão"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              disabled
                              value={dataMask(DataAscensao1)}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                DataAscensao1 === ''
                                  ? () => setValidarAscencao1('nao')
                                  : () => setValidarAscencao1('sim')
                              }
                              onChange={(e) => setAscensao1(e.target.value)}
                              error={validarAscencao1 === 'nao'}
                              onFocus={(e) => setAscensao1(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="DataAscensao2"
                              label="Data 2º Ascensão"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              disabled
                              value={dataMask(DataAscensao2)}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                DataAscensao2 === ''
                                  ? () => setValidarAscencao2('nao')
                                  : () => setValidarAscencao2('sim')
                              }
                              onChange={(e) => setAscensao2(e.target.value)}
                              error={validarAscencao2 === 'nao'}
                              onFocus={(e) => setAscensao2(e.target.value)}
                            />
                          </Box>
                        </Grid>
                      </Box>
                    </Hidden>
                  </Box>
                </Grid>
              </Box>
              <Hidden smUp>
                <Box display="flex" flexDirection="row">
                  <Grid item xs={12} md={12}>
                    <Box className={classes.novoBox}>
                      <TextField
                        className={classes.tf_m}
                        id="Nome"
                        label="Nome"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={Nome || nome}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        onBlur={
                          nome === ''
                            ? () => setValidarNome('nao')
                            : () => setValidarNome('sim')
                        }
                        onChange={(e) => setNome(e.target.value)}
                        error={validarNome === 'nao'}
                        onFocus={(e) => setNome(e.target.value)}
                      />
                    </Box>
                  </Grid>
                </Box>
                <Box display="flex" flexDirection="row">
                  <Grid item xs={6}>
                    <Box className={classes.novoBox}>
                      <TextField
                        className={classes.tf_m}
                        id="Matricula"
                        label="Matricula"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={Matricula || matricula}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        onBlur={
                          matricula === ''
                            ? () => setValidarMatricula('nao')
                            : () => setValidarMatricula('sim')
                        }
                        onChange={(e) => setMatricula(e.target.value)}
                        error={validarMatricula === 'nao'}
                        onFocus={(e) => setMatricula(e.target.value)}
                      />
                    </Box>
                  </Grid>
                </Box>
              </Hidden>
              <Divider variant="middle" />
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={3}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="Naturalidade"
                      label="Naturalidade"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={Naturalidade}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        Naturalidade === ''
                          ? () => setValidarNaturalidade('nao')
                          : () => setValidarNaturalidade('sim')
                      }
                      onChange={(e) => setNaturalidade(e.target.value)}
                      error={validarNaturalidade === 'nao'}
                      onFocus={(e) => setNaturalidade(e.target.value)}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="EstadoNascimento"
                      label="Estado do Nascimento"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={EstadoNascimento}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        Nacionalidade === ''
                          ? () => setEstadoNascimento('nao')
                          : () => setEstadoNascimento('sim')
                      }
                      onChange={(e) => setNacionalidade(e.target.value)}
                      error={validarNacionalidade === 'nao'}
                      onFocus={(e) => setNacionalidade(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="Nacionalidade"
                      label="Nacionalidade"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={Nacionalidade}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        Nacionalidade === ''
                          ? () => setNacionalidade('nao')
                          : () => setNacionalidade('sim')
                      }
                      onChange={(e) => setNacionalidade(e.target.value)}
                      error={validarNacionalidade === 'nao'}
                      onFocus={(e) => setNacionalidade(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="Sexo"
                      label="Sexo"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={sexo}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        sexo === ''
                          ? () => setValidarSexo('nao')
                          : () => setValidarSexo('sim')
                      }
                      onChange={(e) => setSexo(e.target.value)}
                      error={validarSexo === 'nao'}
                      onFocus={(e) => setSexo(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={3}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="JurisdicaoEstadual"
                      label="Jurisdição Estadual"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={JurisdicaoEstadual}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        JurisdicaoEstadual === ''
                          ? () => setValidarJurisdicaoEstadual('nao')
                          : () => setValidarJurisdicaoEstadual('sim')
                      }
                      onChange={(e) => setJurisdicaoEstadual(e.target.value)}
                      error={validarJurisdicaoEstadual === 'nao'}
                      onFocus={(e) => setJurisdicaoEstadual(e.target.value)}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="Distrito"
                      label="Distrito"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={Distrito}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        Distrito === ''
                          ? () => setDistrito('nao')
                          : () => setDistrito('sim')
                      }
                      onChange={(e) => setDistrito(e.target.value)}
                      error={validarDistrito === 'nao'}
                      onFocus={(e) => setDistrito(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="FormacaoEscolar"
                      label="FormacaoEscolar"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={FormacaoEscolar}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        FormacaoEscolar === ''
                          ? () => setFormacaoEscolar('nao')
                          : () => setFormacaoEscolar('sim')
                      }
                      onChange={(e) => setFormacaoEscolar(e.target.value)}
                      error={validarFormacaoEscolar === 'nao'}
                      onFocus={(e) => setFormacaoEscolar(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={6}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="Conjuge"
                      label="Cônjuge"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={Conjuge}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        Conjuge === ''
                          ? () => setValidarConjuge('nao')
                          : () => setValidarConjuge('sim')
                      }
                      onChange={(e) => setConjuge(e.target.value)}
                      error={validarConjuge === 'nao'}
                      onFocus={(e) => setConjuge(e.target.value)}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={2}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="EstadoCivil"
                      label="Estado Civil"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={EstadoCivil}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        EstadoCivil === ''
                          ? () => setEstadoCivil('nao')
                          : () => setEstadoCivil('sim')
                      }
                      onChange={(e) => setEstadoCivil(e.target.value)}
                      error={validarEstadoCivil === 'nao'}
                      onFocus={(e) => setEstadoCivil(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="CPFConjuge"
                      label="CPF do Conjuge"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={CPFConjuge}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        CPFConjuge === ''
                          ? () => setCPFConjuge('nao')
                          : () => setCPFConjuge('sim')
                      }
                      onChange={(e) => setCPFConjuge(e.target.value)}
                      error={validarCPFConjuge === 'nao'}
                      onFocus={(e) => setCPFConjuge(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="TelefoneConjuge"
                      label="Telefone do Cônjuge"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={celularMask(celularConjuge)}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        celularConjuge === ''
                          ? () => setValidarCelularConjuge('nao')
                          : () => setValidarCelularConjuge('sim')
                      }
                      onChange={(e) => setcelularConjuge(e.target.value)}
                      error={validarCelularConjuge === 'nao'}
                      onFocus={(e) => setcelularConjuge(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
            </Box>
          ) : null}

          {value === 'endereço' ? (
            <Box>
              <Box display="flex" flexDirection="row">
                <Grid item xs={12} md={12}>
                  <Box className={classes.alignBox}>
                    <Hidden smDown>
                      <Box className={classes.page}>
                        <Grid item xs={12} md={2}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="CEP"
                              label="CEP"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={cep || CEP}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                getInformacoes
                              } /* {
                                cep === ''
                                  ? () => setValidarCEP('nao')
                                  : () => setValidarCEP('sim')
                              } */
                              onChange={(e) => setCEP(e.target.value)}
                              error={validarCEP === 'nao'}
                              onFocus={(e) => setCEP(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="Logradouro"
                              label="Logradouro"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={logradouro}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                logradouro === ''
                                  ? () => setValidarLogradouro('nao')
                                  : () => setValidarLogradouro('sim')
                              }
                              onChange={(e) => setLogradouro(e.target.value)}
                              error={validarLogradouro === 'nao'}
                              onFocus={(e) => setLogradouro(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="Numero"
                              label="Número"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={numero || Numero}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                numero === ''
                                  ? () => setValidarNumero('nao')
                                  : () => setValidarNumero('sim')
                              }
                              onChange={(e) => setNumero(e.target.value)}
                              error={validarNumero === 'nao'}
                              onFocus={(e) => setNumero(e.target.value)}
                            />
                          </Box>
                        </Grid>
                      </Box>
                      <Box mt={2} display="flex" flexDirection="row">
                        <Grid item xs={12} md={6}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="Bairro"
                              label="Bairro"
                              type="text"
                              InputLabelProps={{
                                style: { textTransform: 'uppercase' },
                                shrink: true,
                              }}
                              value={bairro}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                bairro === ''
                                  ? () => setValidarBairro('nao')
                                  : () => setValidarBairro('sim')
                              }
                              onChange={(e) => setBairro(e.target.value)}
                              error={validarBairro === 'nao'}
                              onFocus={(e) => setBairro(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="Cidade"
                              label="Cidade"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={cidade}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                cidade === ''
                                  ? () => setValidarCidade('nao')
                                  : () => setValidarCidade('sim')
                              }
                              onChange={(e) => setCidade(e.target.value)}
                              error={validarCidade === 'nao'}
                              onFocus={(e) => setCidade(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="TelefoneResidencial"
                              label="Telefone Residencial"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={foneMask(fone)}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                fone === ''
                                  ? () => setValidarFone('nao')
                                  : () => setValidarFone('sim')
                              }
                              onChange={(e) => setFone(e.target.value)}
                              error={validarFone === 'nao'}
                              onFocus={(e) => setFone(e.target.value)}
                            />
                          </Box>
                        </Grid>
                      </Box>
                      <Box mt={2} display="flex" flexDirection="row">
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="Matricula"
                              label="Matricula"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={matricula}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              disabled
                              onBlur={
                                matricula === ''
                                  ? () => setValidarMatricula('nao')
                                  : () => setValidarMatricula('sim')
                              }
                              onChange={(e) => setMatricula(e.target.value)}
                              error={validarMatricula === 'nao'}
                              onFocus={(e) => setMatricula(e.target.value)}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="CPF"
                              label="CPF"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={cpfMask(cpf)}
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
                        <Grid item xs={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="RG"
                              label="RG"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={rg || RG}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                rg === ''
                                  ? () => setValidarRG('nao')
                                  : () => setValidarRG('sim')
                              }
                              onChange={(e) => setRG(e.target.value)}
                              error={validarRG === 'nao'}
                              onFocus={(e) => setRG(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="DataNascimento"
                              label="Data de Nascimento"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={dataMask(dataNascimento)}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                dataNascimento === ''
                                  ? () => setValidarDataNascimento('nao')
                                  : () => setValidarDataNascimento('sim')
                              }
                              onChange={(e) =>
                                setDataNascimento(e.target.value)
                              }
                              error={validarDataNascimento === 'nao'}
                              onFocus={(e) => setDataNascimento(e.target.value)}
                            />
                          </Box>
                        </Grid>
                      </Box>
                      <Box display="flex" flexDirection="row" mt={2}>
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="DataConversao"
                              label="Data de Conversão"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={dataMask(DataConversao)}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                DataConversao === ''
                                  ? () => setValidarConversao('nao')
                                  : () => setValidarConversao('sim')
                              }
                              onChange={(e) => setConversao(e.target.value)}
                              error={validarConversao === 'nao'}
                              onFocus={(e) => setConversao(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="DataConsagracao"
                              label="Data de Consagração"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              disabled
                              value={dataMask(DataConsagracao)}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                DataConsagracao === ''
                                  ? () => setValidarConsagracao('nao')
                                  : () => setValidarConsagracao('sim')
                              }
                              onChange={(e) => setConsagracao(e.target.value)}
                              error={validarConsagracao === 'nao'}
                              onFocus={(e) => setConsagracao(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="DataAscensao1"
                              label="Data 1º Ascensão"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              disabled
                              value={dataMask(DataAscensao1)}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                DataAscensao1 === ''
                                  ? () => setValidarAscencao1('nao')
                                  : () => setValidarAscencao1('sim')
                              }
                              onChange={(e) => setAscensao1(e.target.value)}
                              error={validarAscencao1 === 'nao'}
                              onFocus={(e) => setAscensao1(e.target.value)}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Box className={classes.novoBox}>
                            <TextField
                              className={classes.tf_m}
                              id="DataAscensao2"
                              label="Data 2º Ascensão"
                              type="text"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              disabled
                              value={dataMask(DataAscensao2)}
                              variant="outlined"
                              placeholder=""
                              size="small"
                              onBlur={
                                DataAscensao2 === ''
                                  ? () => setValidarAscencao2('nao')
                                  : () => setValidarAscencao2('sim')
                              }
                              onChange={(e) => setAscensao2(e.target.value)}
                              error={validarAscencao2 === 'nao'}
                              onFocus={(e) => setAscensao2(e.target.value)}
                            />
                          </Box>
                        </Grid>
                      </Box>
                    </Hidden>
                  </Box>
                </Grid>
              </Box>
              <Hidden smUp>
                <Box display="flex" flexDirection="row">
                  <Grid item xs={12} md={12}>
                    <Box className={classes.novoBox}>
                      <TextField
                        className={classes.tf_m}
                        id="Logradouro"
                        label="Logradouro"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={Logradouro || logradouro}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        onBlur={
                          logradouro === ''
                            ? () => setValidarLogradouro('nao')
                            : () => setValidarLogradouro('sim')
                        }
                        onChange={(e) => setLogradouro(e.target.value)}
                        error={validarLogradouro === 'nao'}
                        onFocus={(e) => setLogradouro(e.target.value)}
                      />
                    </Box>
                  </Grid>
                </Box>
                <Box display="flex" flexDirection="row">
                  <Grid item xs={6}>
                    <Box className={classes.novoBox}>
                      <TextField
                        className={classes.tf_m}
                        id="Matricula"
                        label="Matricula"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={Matricula || matricula}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        onBlur={
                          matricula === ''
                            ? () => setValidarMatricula('nao')
                            : () => setValidarMatricula('sim')
                        }
                        onChange={(e) => setMatricula(e.target.value)}
                        error={validarMatricula === 'nao'}
                        onFocus={(e) => setMatricula(e.target.value)}
                      />
                    </Box>
                  </Grid>
                </Box>
              </Hidden>
              <Divider variant="middle" />
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={3}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="Naturalidade"
                      label="Naturalidade"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={Naturalidade}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        Naturalidade === ''
                          ? () => setValidarNaturalidade('nao')
                          : () => setValidarNaturalidade('sim')
                      }
                      onChange={(e) => setNaturalidade(e.target.value)}
                      error={validarNaturalidade === 'nao'}
                      onFocus={(e) => setNaturalidade(e.target.value)}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="EstadoNascimento"
                      label="Estado do Nascimento"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={EstadoNascimento}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        Nacionalidade === ''
                          ? () => setEstadoNascimento('nao')
                          : () => setEstadoNascimento('sim')
                      }
                      onChange={(e) => setNacionalidade(e.target.value)}
                      error={validarNacionalidade === 'nao'}
                      onFocus={(e) => setNacionalidade(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="Nacionalidade"
                      label="Nacionalidade"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={Nacionalidade}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        Nacionalidade === ''
                          ? () => setNacionalidade('nao')
                          : () => setNacionalidade('sim')
                      }
                      onChange={(e) => setNacionalidade(e.target.value)}
                      error={validarNacionalidade === 'nao'}
                      onFocus={(e) => setNacionalidade(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="Sexo"
                      label="Sexo"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={sexo}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        sexo === ''
                          ? () => setValidarSexo('nao')
                          : () => setValidarSexo('sim')
                      }
                      onChange={(e) => setSexo(e.target.value)}
                      error={validarSexo === 'nao'}
                      onFocus={(e) => setSexo(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={3}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="JurisdicaoEstadual"
                      label="Jurisdição Estadual"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={JurisdicaoEstadual}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        JurisdicaoEstadual === ''
                          ? () => setValidarJurisdicaoEstadual('nao')
                          : () => setValidarJurisdicaoEstadual('sim')
                      }
                      onChange={(e) => setJurisdicaoEstadual(e.target.value)}
                      error={validarJurisdicaoEstadual === 'nao'}
                      onFocus={(e) => setJurisdicaoEstadual(e.target.value)}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="Distrito"
                      label="Distrito"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={Distrito}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        Distrito === ''
                          ? () => setDistrito('nao')
                          : () => setDistrito('sim')
                      }
                      onChange={(e) => setDistrito(e.target.value)}
                      error={validarDistrito === 'nao'}
                      onFocus={(e) => setDistrito(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="FormacaoEscolar"
                      label="FormacaoEscolar"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={FormacaoEscolar}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        FormacaoEscolar === ''
                          ? () => setFormacaoEscolar('nao')
                          : () => setFormacaoEscolar('sim')
                      }
                      onChange={(e) => setFormacaoEscolar(e.target.value)}
                      error={validarFormacaoEscolar === 'nao'}
                      onFocus={(e) => setFormacaoEscolar(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={6}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="Conjuge"
                      label="Cônjuge"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={Conjuge}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        Conjuge === ''
                          ? () => setValidarConjuge('nao')
                          : () => setValidarConjuge('sim')
                      }
                      onChange={(e) => setConjuge(e.target.value)}
                      error={validarConjuge === 'nao'}
                      onFocus={(e) => setConjuge(e.target.value)}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={2}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="EstadoCivil"
                      label="Estado Civil"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={EstadoCivil}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        EstadoCivil === ''
                          ? () => setEstadoCivil('nao')
                          : () => setEstadoCivil('sim')
                      }
                      onChange={(e) => setEstadoCivil(e.target.value)}
                      error={validarEstadoCivil === 'nao'}
                      onFocus={(e) => setEstadoCivil(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="CPFConjuge"
                      label="CPF do Conjuge"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={CPFConjuge}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        CPFConjuge === ''
                          ? () => setCPFConjuge('nao')
                          : () => setCPFConjuge('sim')
                      }
                      onChange={(e) => setCPFConjuge(e.target.value)}
                      error={validarCPFConjuge === 'nao'}
                      onFocus={(e) => setCPFConjuge(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Box className={classes.novoBox}>
                    <TextField
                      className={classes.tf_m}
                      id="TelefoneConjuge"
                      label="Telefone do Cônjuge"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={celularMask(celularConjuge)}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        celularConjuge === ''
                          ? () => setValidarCelularConjuge('nao')
                          : () => setValidarCelularConjuge('sim')
                      }
                      onChange={(e) => setcelularConjuge(e.target.value)}
                      error={validarCelularConjuge === 'nao'}
                      onFocus={(e) => setcelularConjuge(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
            </Box>
          ) : null}
          <Button onClick={enviarFoto}>Send</Button>
          {value === 'dPessoais' ? (
            <Button onClick={subTela} disabled>
              Anterior
            </Button>
          ) : (
            <Button onClick={subTela}>Anterior</Button>
          )}
          {value !== 'dadosIDPB' && <Button onClick={addTela}>Próxima</Button>}
          {value === 'dadosIDPB' && <Button onClick={addTela}>Salvar</Button>}
        </form>
      ) : null}
    </>
  );
}

export default meuPerfil;
