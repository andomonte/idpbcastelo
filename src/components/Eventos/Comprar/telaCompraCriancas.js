import React, { useRef } from 'react';
import { Box, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@mui/material/TableContainer';
import Select from 'react-select';
import CalculaIdade from 'src/utils/getIdade';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import corIgreja from 'src/utils/coresIgreja';
import { Oval } from 'react-loading-icons';
import '@fontsource/fugaz-one'; // Padrões para peso 400.
import AppBar from '@material-ui/core/AppBar';
// import PagCC from './pagCC';
// import CheckoutPro from './checkouPro';
import { TiArrowBack } from 'react-icons/ti';
import dataMask from 'src/components/mascaras/datas';
import * as moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import TamanhoJanela from 'src/utils/getSize';

const janela2 = TamanhoJanela();
let altura2;
let largura2;
if (janela2.height < 500) altura2 = 500;
else altura2 = janela2.height;
// const validateDate = require('validate-date');
if (janela2.width < 300) largura2 = 300;
else largura2 = janela2.width;
if (janela2.width > 410) largura2 = 410;
else largura2 = janela2.width;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
    padding: 0,
    margin: 0,
  },
  root2: {
    backgroundColor: '#9e9e9e',
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    height: '12vh',
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgBack: {
    //    width: '100%',
    height: altura2,
    backgroundImage: "url('/images/global/fundo.png')",
    //    backgroundImage: url(/images/global/ticket.png), //seleciona imagem
    backgroundPosition: 'center', // centraliza imagem
    backgroundSize: 'cover', // imagem cobre toda área do div
  },
  desktopDrawer: {
    width: largura2,
    left: janela2.width / 2 - largura2 / 2,
    borderRight: 'none',
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
    width: largura2 - 50,
    height: '40px',
    fontSize: '14px',
    '& .MuiFilledInput-root': {
      background: 'rgb(232, 241, 250)',
    },
    //  borderRadius: '10px',
    //   border: '0px solid #b91a30',
  },
}));
const customStyles = {
  backgroundColor: 'blue',
  control: (provided) => ({
    ...provided,
    backgroundColor: '#f0f4c3',
  }),
};

function Home({ iniCompra }) {
  const classes = useStyles();

  // const router = useRouter();
  const [ocultarFp, setOcultarFp] = React.useState(false);
  const [inscritosT, setInscritosT] = React.useState([]);
  const [codigoSecretaria, setcodigoSecretaria] = React.useState('');
  const [openInscricao, setOpenInscricao] = React.useState(false);
  const [nome, setNome] = React.useState('');
  const [cpf] = React.useState(iniCompra.cpf);
  const [nascimento, setNascimento] = React.useState('');
  const nomeRef = useRef();
  const codigoSecretariaRef = useRef();
  const nascimentoRef = useRef();
  const sexoRef = useRef();
  const botaoRef = React.useRef();
  const fpRef = useRef();
  const docMenorRef = useRef();
  const router = useRouter();
  const [sexo, setSexo] = React.useState({ label: 'Selecione...', value: 0 });
  const [nomeResp, setNomeResp] = React.useState('');
  const [dados, setDados] = React.useState('');
  const [menor, setMenor] = React.useState(false);
  const [docMenor, setDocMenor] = React.useState('');
  const [select, setSelect] = React.useState(false);
  const [fPagamento, setFPagamento] = React.useState({
    label: 'Qual a forma de pagamento',
    value: 0,
  });
  const listaSexo = [
    { label: 'Masculino', value: 0 },
    { label: 'Feminino', value: 1 },
  ];
  const options = [
    { label: 'Cartão de Crédito', value: 0 },
    { label: 'Pix', value: 1 },
    { label: 'Boleto', value: 2 },
    { label: 'Dinheiro (apenas secretaria)', value: 2 },
  ];

  const optionsMenor = [{ label: 'Isento de Pagamento', value: 0 }];

  const voltar = () => {
    router.push({
      pathname: './comprar',
      //   query: { dadosMesa2, numeroGame },
    });
    // setOpen(false);
    // window.location.reload();
  };
  React.useEffect(async () => {
    try {
      const url = `${window.location.origin}/api/consultaInscEventosAMTipo/convencao2023`;

      const res = await axios.get(url);

      if (res.data && res.data.length) {
        const inscritoAprovado = res.data.filter(
          (val) => val.status === 'approved',
        );
        setInscritosT(inscritoAprovado);
        const inscrito = res.data.filter(
          (val) =>
            val.CPF === iniCompra.cpf &&
            val.status === 'approved' &&
            val.Responsavel === 'Adulto',
        );

        if (inscrito.length) {
          setDados(inscrito[0]);
          setOpenInscricao(false);
          setNomeResp(inscrito[0].Nome);

          nomeRef.current.focus();
        } else {
          setOpenInscricao(true);
        }
        // setPosts(() => [...res.data]);
        // setArray
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  //= ======================================================================
  // validação dos dados
  //= ======================================================================

  let valNasc = false;
  let valDoc = false;
  let valNome = false;

  const handleValidarNome = () => {
    const valorNome = nome;
    valNome = false;

    const responsavel = inscritosT.filter(
      (val) =>
        val.Responsavel &&
        val.Responsavel.replace(/([^0-9])/g, '') ===
          cpf.replace(/([^0-9])/g, '') &&
        val.Nome === nome &&
        val.status === 'approved',
    );

    //  if (!validacaoNome) nomeRef.current.focus();
    if (responsavel.length > 0) {
      valDoc = false;
      toast.error(`Pessoa já foi Inscrita com esse Nome e esse responsavel!`, {
        position: toast.POSITION.TOP_CENTER,
      });
      nomeRef.current.focus();
    }
    //  if (!validacaoNome) nomeRef.current.focus();

    if (valorNome !== '') {
      const regName =
        /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
      const vaiNome = regName.test(valorNome);

      if (!vaiNome) {
        valNome = false;
      } else {
        valNome = true;
      }
    } else {
      valNome = false;
    }
    if (!valNome) {
      toast.error('Nome Inválido !', {
        position: toast.POSITION.TOP_CENTER,
      });
      nomeRef.current.focus();
    }
  };
  const handleValidarDocMenor = () => {
    const inscrito = inscritosT.filter(
      (val) =>
        val.CPF.replace(/([^0-9])/g, '') === docMenor.replace(/([^0-9])/g, ''),
    );
    //  if (!validacaoNome) nomeRef.current.focus();
    if (inscrito.length > 0) {
      valDoc = false;
      toast.error(`documento usado na inscrição de ${inscrito[0].Nome} !`, {
        position: toast.POSITION.TOP_CENTER,
      });
      docMenorRef.current.focus();
    }

    if (docMenor === '') {
      valDoc = false;
      toast.error('Preencha o Documento do Menor!', {
        position: toast.POSITION.TOP_CENTER,
      });
      docMenorRef.current.focus();
    }
  };
  // Email

  const handleChecarNascimento = () => {
    setFPagamento({
      label: 'Qual a forma de pagamento',
      value: 0,
    });
    const result = moment(nascimento, 'DD/MM/YYYY', true).isValid();
    if (!result) {
      toast.error('Data Inválida !', {
        position: toast.POSITION.TOP_CENTER,
      });
      setSelect(false);
      valNasc = false;
      nascimentoRef.current.focus();
    } else setSelect(true);
    const idade = CalculaIdade(nascimento);
    if (idade > 17) {
      valNasc = false;
      toast.error(`${idade} anos não é Menor, faça a inscrição como Adulto !`, {
        position: toast.POSITION.TOP_CENTER,
      });
      nascimentoRef.current.focus();
    }
    if (idade < 7) setMenor(true);
    else setMenor(false);
  };

  /* const HandleChecarChegada = () => {
    const result = moment(dataChegada, 'DD/MM/YYYY', true).isValid();
    if (!result) {
      toast.error('Data Inválida !', {
        position: toast.POSITION.TOP_CENTER,
      });
      dataChegadaRef.current.focus();
    }
  }; */

  //= =========================================================

  const handleFPDinhero = async () => {
    handleValidarNome();

    handleChecarNascimento();
    if (sexo.label === 'Selecione...') {
      toast.error('Idique seu Sexo!', {
        position: toast.POSITION.TOP_CENTER,
      });
      sexoRef.current.focus();
    }

    if (fPagamento.label === 'Qual a forma de pagamento') {
      toast.error('Escolha a forma de pagamento!', {
        position: toast.POSITION.TOP_CENTER,
      });
      fpRef.current.focus();
    }
    if (
      codigoSecretaria !== 'AM2256' &&
      codigoSecretaria !== 'RR1614' &&
      codigoSecretaria !== 'RO5196' &&
      codigoSecretaria !== 'MG4286' &&
      codigoSecretaria !== 'SP1976' &&
      codigoSecretaria !== 'MM3459' &&
      codigoSecretaria !== 'NC0283' &&
      codigoSecretaria !== 'PA8516'
    ) {
      toast.error(
        'Código inválido, somente a Secretaria pode escolher a opção Dinheiro, caso não seja, esolha outra forma de pagamento.',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
      fpRef.current.focus();
    }

    if (
      nome !== '' &&
      nascimento !== '' &&
      sexo.label !== 'Selecione...' &&
      fPagamento.label !== 'Qual a forma de pagamento' &&
      (codigoSecretaria === 'AM2256' ||
        codigoSecretaria === 'RR1614' ||
        codigoSecretaria === 'RO5196' ||
        codigoSecretaria === 'MG4286' ||
        codigoSecretaria === 'SP1976' ||
        codigoSecretaria === 'MM3459' ||
        codigoSecretaria === 'NC0283' ||
        codigoSecretaria === 'PA8516')
    ) {
      const total = 100; // valor Primeiro Lote
      const qtyA = !menor ? 1 : 0;
      const qtyC = menor ? 1 : 0;
      const fpag = fPagamento.label;
      const grau = 'Visitante';
      const igrejas = dados.Igreja;
      const jEstadual = dados.Jurisdicao;
      const genero = sexo.label;
      const estadia = dados.Estadia;
      router.push({
        pathname: './pagamento',
        query: {
          nome,
          cpf: docMenor,
          email: dados.Email,
          total,
          qtyA,
          qtyC,
          fpag,
          fone: dados.Celular,
          nascimento,
          grau,
          igrejas,
          jEstadual,
          genero,
          dataChegada: dados.DataChegada,
          horario: dados.DataChegada,
          estadia,
          Responsavel: cpf,
          Secretaria: codigoSecretaria,
        },
      });
    }
  };

  /// ---------enviar dados -------------------------------------
  const handleFazerPagamento = async () => {
    valNasc = true;
    valNome = true;
    valDoc = true;
    handleValidarNome();
    handleChecarNascimento();
    handleValidarDocMenor();
    if (sexo.label === 'Selecione...') {
      toast.error('Idique seu Sexo!', {
        position: toast.POSITION.TOP_CENTER,
      });
      sexoRef.current.focus();
    }
    if (fPagamento.label === 'Qual a forma de pagamento') {
      toast.error('Escolha a forma de pagamento!', {
        position: toast.POSITION.TOP_CENTER,
      });
      fpRef.current.focus();
    }

    if (
      valNome &&
      valDoc &&
      valNasc &&
      sexo.label !== 'Selecione...' &&
      fPagamento.label !== 'Qual a forma de pagamento'
    ) {
      const total = 100; // valor Primeiro Lote
      const qtyA = !menor ? 1 : 0;
      const qtyC = menor ? 1 : 0;
      const fpag = fPagamento.label;
      const grau = 'Visitante';
      const igrejas = dados.Igreja;
      const jEstadual = dados.Jurisdicao;
      const genero = sexo.label;
      const estadia = dados.Estadia;

      router.push({
        pathname: './pagamento',
        query: {
          nome,
          cpf: docMenor,
          email: dados.Email,
          total,
          qtyA,
          qtyC,
          fpag,
          fone: dados.Celular,
          nascimento,
          grau,
          igrejas,
          jEstadual,
          genero,
          dataChegada: dados.DataChegada,
          horario: dados.DataChegada,
          estadia,
          Responsavel: cpf,
        },
      });
    }
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const form = event.target.id;
      if (form === 'Nome') nascimentoRef.current.focus();
      if (form === 'Nascimento') sexoRef.current.focus();
      if (form === 'Sexo') fpRef.current.focus();
      if (form === 'CodigoSec') botaoRef.current.focus();
      if (form === 'FPagamento') botaoRef.current.focus();
    }
  };
  React.useEffect(async () => {
    if (menor)
      if (dados) {
        if (fPagamento.label === 'Dinheiro (apenas secretaria)') {
          setOcultarFp(true);
          codigoSecretariaRef.current.focus();
        } else {
          setOcultarFp(false);
          botaoRef.current.focus();
        }
      }
  }, [fPagamento]);
  //= ====================================================================
  return (
    <Box height="100vh" style={{ backgroundColor: '#9e9e9e' }}>
      <AppBar className={classes.root2}>
        <Box
          width="90%"
          // maxWidth={450}
          bgcolor={corIgreja.principal}
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt="2vh"
          style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
          ml={0}
        >
          <Box display="flex" justifyContent="flex-start" ml={2} width="10%">
            <TiArrowBack size={30} onClick={voltar} />
          </Box>
          <Box
            mb={2}
            mt={2}
            width="80%"
            display="flex"
            justifyContent="center"
            textAlign="center"
          >
            <img
              src={corIgreja.logo1}
              alt="Castelo"
              width="40vw"
              height="100%"
            />
          </Box>

          <Box width="10%" />
        </Box>
        <Box width="100%" textAlign="center" ml={2}>
          IDPB-AM
        </Box>
      </AppBar>
      <Box
        width="100vw"
        display="flex"
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
        height="calc(98vh)"
      >
        <Box
          height="100%"
          borderRadius={16}
          bgcolor={corIgreja.principal}
          width="90%"
          // maxWidth={450}
        >
          {!openInscricao ? (
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              flexDirection="row"
              alignItems="center"
              height="100%"
            >
              <Box width="100%" height="100%" mb={0}>
                <Box>
                  <Box mt={0} ml={0} height="25vh" width="100%">
                    <Box p={2}>
                      <ArrowBackIcon
                        sx={{
                          fontSize: 20,
                          color: '#fff',
                        }}
                        onClick={voltar}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box
                  mt={0}
                  display="flex"
                  justifyContent="center"
                  flexDirection="row"
                  alignItems="center"
                  height="75%"
                  width="100%"
                >
                  {dados.length ? (
                    <TableContainer sx={{ height: '100%' }}>
                      <Grid item xs={12} md={12}>
                        <Box
                          mt={1}
                          ml={4}
                          color="white"
                          sx={{ fontSize: 'bold' }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Nome
                          </Typography>
                        </Box>
                        <Box className={classes.novoBox} mt={-2}>
                          <TextField
                            className={classes.tf_m}
                            id="Nome"
                            inputRef={nomeRef}
                            placeholder="Nome de quem está se Inscrevendo"
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              style: {
                                textAlign: 'center',
                                fontSize: '14px',
                              },
                            }}
                            value={nome}
                            variant="outlined"
                            size="small"
                            onChange={(e) => setNome(e.target.value)}
                            onFocus={(e) => {
                              setNome(e.target.value);
                            }}
                            onBlur={(e) => {
                              setNome(e.target.value);
                              handleValidarNome();
                            }}
                            onKeyDown={handleEnter}
                          />
                        </Box>
                      </Grid>

                      <Grid item container xs={12}>
                        <Grid item xs={6} md={6}>
                          <Box
                            mt={1}
                            ml={4}
                            color="white"
                            sx={{ fontSize: 'bold' }}
                          >
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                            >
                              Data Nascimento
                            </Typography>
                          </Box>
                          <Box className={classes.novoBox} mt={-2}>
                            <TextField
                              className={classes.tf_m}
                              inputProps={{
                                style: {
                                  textAlign: 'center',
                                },
                              }}
                              id="Nascimento"
                              type="tel"
                              InputLabelProps={{
                                style: {
                                  textTransform: 'uppercase',
                                },
                                shrink: true,
                              }}
                              value={dataMask(nascimento)}
                              variant="outlined"
                              placeholder="dd/mm/aaaa"
                              size="small"
                              onChange={(e) => {
                                const novoNascimento = e.target.value;
                                setNascimento(novoNascimento);
                              }}
                              onBlur={handleChecarNascimento}
                              //   onFocus={(e) => setNascimento(e.target.value)}
                              onKeyDown={handleEnter}
                              inputRef={nascimentoRef}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <Box
                            mt={1}
                            ml={4}
                            color="white"
                            sx={{ fontSize: 'bold' }}
                          >
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                            >
                              Sexo
                            </Typography>
                          </Box>
                          <Box className={classes.novoBox} mt={-2}>
                            <Select
                              menuPlacement="top"
                              styles={customStyles}
                              isSearchable={false}
                              id="Sexo"
                              ref={sexoRef}
                              value={sexo}
                              onChange={(e) => {
                                setSexo(e);
                                docMenorRef.current.focus();
                              }}
                              options={listaSexo}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Box
                          mt={1}
                          ml={4}
                          color="white"
                          sx={{ fontSize: 'bold' }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Documento do Menor (somenteNumeros)
                          </Typography>
                        </Box>
                        <Box className={classes.novoBox} mt={-2}>
                          <TextField
                            id="CPF"
                            type="tel"
                            inputRef={docMenorRef}
                            style={{ width: '100%' }}
                            className={classes.tf_m}
                            inputProps={{
                              style: {
                                textAlign: 'center',
                              },
                            }}
                            value={docMenor.replace(/([^0-9])/g, '')}
                            variant="outlined"
                            placeholder="cpf, rg ou Certidão Nascimento"
                            size="small"
                            onKeyDown={handleEnter}
                            onChange={(e) => {
                              setDocMenor(e.target.value);
                            }}
                            onBlur={handleValidarDocMenor}
                            onFocus={(e) => setDocMenor(e.target.value)}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Box
                          mt={1}
                          ml={4}
                          color="white"
                          sx={{ fontSize: 'bold' }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Nome do Responsável
                          </Typography>
                        </Box>
                        <Box className={classes.novoBox} mt={-2}>
                          <TextField
                            className={classes.tf_m}
                            id="NomeResp"
                            disabled
                            placeholder="Nome de quem está se Inscrevendo"
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              style: {
                                textAlign: 'center',
                                fontSize: '14px',
                              },
                            }}
                            value={nomeResp}
                            variant="outlined"
                            size="small"
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <Box
                          mt={1}
                          ml={4}
                          color="white"
                          sx={{ fontSize: 'bold' }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Opção de Pagamento
                          </Typography>
                        </Box>
                        <Box className={classes.novoBox} mt={-2}>
                          <Select
                            isSearchable={false}
                            isDisabled={!select}
                            menuPlacement="top"
                            styles={customStyles}
                            id="FormaPagamento"
                            ref={fpRef}
                            value={fPagamento}
                            onChange={(e) => {
                              // setValues2(e);
                              setFPagamento(e);

                              botaoRef.current.focus();
                            }}
                            options={menor ? optionsMenor : options}
                          />
                        </Box>
                      </Grid>
                      <Box display={ocultarFp ? '' : 'none'}>
                        <Grid item container xs={12}>
                          <Grid item xs={12} md={12}>
                            <Box
                              mt={1}
                              ml={4}
                              color="white"
                              sx={{ fontSize: 'bold' }}
                            >
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Código da Secretaria
                              </Typography>
                            </Box>
                            <Box className={classes.novoBox} mt={-2}>
                              <TextField
                                className={classes.tf_m}
                                inputProps={{
                                  style: {
                                    textAlign: 'center',
                                  },
                                }}
                                id="CodigoSec"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                value={codigoSecretaria}
                                variant="outlined"
                                placeholder="digite seu código de acesso"
                                size="small"
                                onChange={(e) => {
                                  setcodigoSecretaria(e.target.value);
                                }}
                                onFocus={(e) =>
                                  setcodigoSecretaria(e.target.value)
                                }
                                onKeyDown={handleEnter}
                                inputRef={codigoSecretariaRef}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                      <Grid item xs={12} md={12}>
                        <Box className={classes.novoBox} mt={1} mb={2}>
                          <Button
                            onClick={
                              ocultarFp ? handleFPDinhero : handleFazerPagamento
                            }
                            ref={botaoRef}
                            style={{
                              width: '100%',
                              backgroundColor: '#e0711a',
                              fontSize: '16px',
                              height: 40,
                              color: 'white',
                              fontFamily: 'Fugaz One',
                            }}
                          >
                            {menor ? 'FAZER INSCRIÇÃO' : 'FAZER PAGAMENTO'}
                          </Button>
                        </Box>
                      </Grid>
                    </TableContainer>
                  ) : (
                    <Box
                      height="100%"
                      justifyContent="center"
                      alignItems="center"
                      display="flex"
                      flexDirection="column"
                    >
                      <Box
                        justifyContent="center"
                        alignItems="center"
                        display="flex"
                        color="white"
                        mb={2}
                        mt={-5}
                      >
                        Buscando dados{' '}
                      </Box>
                      <Oval stroke="white" width={60} height={60} />{' '}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              justifyContent="center"
              alignItems="center"
              display="flex"
              height="100vh"
              sx={{ minHeight: 500 }}
              flexDirection="column"
            >
              <Box display="flex" height="95vh" width="100vw">
                <Box
                  mt={0}
                  ml={0}
                  height="25vh"
                  sx={{ minHeight: 150 }}
                  width="100%"
                >
                  <Box p={2}>
                    <ArrowBackIcon
                      sx={{
                        fontSize: 20,
                        color: '#fff',
                      }}
                      onClick={voltar}
                    />
                  </Box>
                </Box>
              </Box>

              <Box color="white" height="75vh" mb={2} sx={{ minHeight: 250 }}>
                <Box>Responsável ainda não está inscrito.</Box>
                <Box className={classes.novoBox} mt="10vh" mb={2}>
                  <Button
                    onClick={voltar}
                    style={{
                      width: '100%',
                      backgroundColor: '#e0711a',
                      fontSize: '16px',
                      height: 40,
                      color: 'white',
                      fontFamily: 'Fugaz One',
                    }}
                  >
                    VOLTAR
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <ToastContainer
        position="top-center"
        autoClose={5000}
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

export default Home;
