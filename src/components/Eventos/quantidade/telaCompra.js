import React, { useRef } from 'react';
import { Box, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@mui/material/TableContainer';
import Select from 'react-select';
import horarioMask from 'src/components/mascaras/horario';
import CalculaIdade from 'src/utils/getIdade';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import '@fontsource/fugaz-one'; // Padrões para peso 400.
// import PagCC from './pagCC';
// import CheckoutPro from './checkouPro';
import dataMask from 'src/components/mascaras/datas';
import celularMask from 'src/components/mascaras/celular';
import * as moment from 'moment';
import validator from 'validator';
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
function createListaIgrejas(value, label) {
  return {
    value,
    label,
  };
}
function createListaJurisdicao(value, label) {
  return {
    value,
    label,
  };
}

function Home({ dados, nomesIgrejas }) {
  const classes = useStyles();

  // const router = useRouter();
  const [nome, setNome] = React.useState(dados.Nome);
  const [desabilitaGM, setDesabilitaGM] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [GM, setGM] = React.useState({ label: 'Selecione...', value: 0 });
  const [cpf] = React.useState(dados.qtyA);

  const [select, setSelect] = React.useState(false);
  const [ocultar, setOcultar] = React.useState(false);
  const [ocultarFp, setOcultarFp] = React.useState(false);
  const [fone, setFone] = React.useState('');
  const [horario, setHorario] = React.useState('');
  const [nascimento, setNascimento] = React.useState('');
  const [dataChegada, setDataChegada] = React.useState('');
  const [codigoSecretaria, setcodigoSecretaria] = React.useState('');
  const [fPagamento, setFPagamento] = React.useState({
    label: 'Qual a forma de pagamento',
    value: 0,
  });

  const codigoSecretariaRef = useRef();
  const nomeRef = useRef();
  const nascimentoRef = useRef();
  const dataChegadaRef = useRef();
  const emailRef = useRef();
  const GMRef = useRef();
  const foneRef = useRef();
  const fpRef = useRef();
  const sexoRef = useRef();
  const horarioRef = useRef();
  const hospedagemRef = useRef();
  const igrejaRef = React.useRef();
  const jurisdicaoRef = React.useRef();
  const botaoRef = React.useRef();
  const router = useRouter();
  const valorInicial = { label: 'Qual sua Igreja', value: 0 };
  const [sexo, setSexo] = React.useState({ label: 'Selecione...', value: 0 });
  const [hospedagem, setHospedagem] = React.useState({
    label: 'Selecione...',
    value: 0,
  });
  const [igreja, setIgreja] = React.useState(valorInicial);
  const [jurisdicao, setJurisdicao] = React.useState({
    label: 'Pertence a qual Jurisdição',
    value: 0,
  });
  const listaIgrejas = nomesIgrejas.map((rol, index) =>
    createListaIgrejas(index, rol.Nome),
  );
  const listaSexo = [
    { label: 'Masculino', value: 0 },
    { label: 'Feminino', value: 1 },
  ];
  const listaHospedagem = [
    { label: 'Escola Bíblica', value: 0 },
    { label: 'Outro Lugar', value: 1 },
  ];
  const listaGM = [
    // { label: 'DELEGADO', value: 4 },
    { label: 'MEMBRO AUTORIZADO', value: 5 },
  ];
  const jurisdicaoParcial = nomesIgrejas.map((itens) => itens.Jurisdicao);
  const jurParcial = [...new Set(jurisdicaoParcial)];

  const listaJurisdicao = jurParcial.map((rol, index) =>
    createListaJurisdicao(index, rol),
  );

  React.useEffect(async () => {
    try {
      const url = `${window.location.origin}/api/consultaMembros/${dados.qtyA}`;
      const res = await axios.get(url);
      if (res.data && res.data.length) {
        setNome(res.data[0].Nome);
        setGM({ label: res.data[0].GrauMinisterial, value: 0 });
        setDesabilitaGM(true);
        setNascimento(res.data[0].Nascimento);
        emailRef.current.focus();
        // setPosts(() => [...res.data]);
        // setArray
      } else {
        nomeRef.current.focus();
        //        handleComprar();
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  //= ======================================================================
  // validação dos dados
  //= ======================================================================
  // Nome

  const options = [
    { label: 'Cartão de Crédito', value: 0 },
    { label: 'Pix', value: 1 },
    { label: 'Boleto', value: 2 },
    { label: 'Dinheiro (apenas secretaria)', value: 2 },
  ];

  const handleValidarNome = () => {
    const valorNome = nome;
    let valNome = false;
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

  // Email
  const handlevalidarEmail = () => {
    const valEmail = validator.isEmail(email);
    if (!valEmail) {
      toast.error('Email Inválido !', {
        position: toast.POSITION.TOP_CENTER,
      });
      emailRef.current.focus();
    }
  };
  const voltar = () => {
    router.push({
      pathname: '/eventoIdpb',
      //   query: { dadosMesa2, numeroGame },
    });
    // setOpen(false);
    // window.location.reload();
  };

  const handleValidarFone = () => {
    const valorfone = fone;
    let valfone = false;
    //  if (!validacaofone) foneRef.current.focus();

    if (valorfone !== '') {
      //  const regName =0
      //        /\b([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))\b/gi;

      // const vaifone =  //regName.test(valorfone);

      if (fone.length < 14) {
        valfone = false;
      } else {
        valfone = true;
      }
    } else {
      valfone = false;
    }
    if (!valfone) {
      toast.error('Numero do Celular Incompleto!', {
        position: toast.POSITION.TOP_CENTER,
      });
      foneRef.current.focus();
    }
  };

  const handleChecarNascimento = () => {
    const result = moment(nascimento, 'DD/MM/YYYY', true).isValid();
    if (!result) {
      toast.error('Data Inválida !', {
        position: toast.POSITION.TOP_CENTER,
      });
      setSelect(false);
      nascimentoRef.current.focus();
    } else setSelect(true);
    const idade = CalculaIdade(nascimento);

    if (idade < 18) {
      toast.error(`${idade} anos é Menor, volte e escolha a opção Menor  !`, {
        position: toast.POSITION.TOP_CENTER,
      });
      nascimentoRef.current.focus();
    }
  };

  const handleFPDinhero = async () => {
    handleValidarNome();
    handlevalidarEmail();
    if (GM.label === 'Selecione...') {
      toast.error('Selecione seu Grau Ministerial!', {
        position: toast.POSITION.TOP_CENTER,
      });
      GMRef.current.focus();
    }
    if (igreja.label === 'Qual sua Igreja') {
      toast.error('Identifique sua Igreja!', {
        position: toast.POSITION.TOP_CENTER,
      });
      igrejaRef.current.focus();
    }

    if (jurisdicao.label === 'Pertence a qual Jurisdição') {
      toast.error('Identifique sua Jurisdição!', {
        position: toast.POSITION.TOP_CENTER,
      });
      jurisdicaoRef.current.focus();
    }
    handleChecarNascimento();
    if (sexo.label === 'Selecione...') {
      toast.error('Idique seu Sexo!', {
        position: toast.POSITION.TOP_CENTER,
      });
      sexoRef.current.focus();
    }
    handleValidarFone();

    if (hospedagem.label === 'Selecione...') {
      toast.error('Precisamos saber sua hospedagem!', {
        position: toast.POSITION.TOP_CENTER,
      });
      hospedagemRef.current.focus();
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
      codigoSecretaria !== 'COR259' &&
      codigoSecretaria !== 'PA8516'
    ) {
      toast.error(
        'Código Inválido, Somente a Secretaria pode escolar a opção Dinheiro, caso não seja, esolha outra forma de pagamento.',
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
      fpRef.current.focus();
    }

    if (
      nome !== '' &&
      email !== '' &&
      GM.label !== 'Selecione...' &&
      igreja.label !== 'Qual sua Igreja' &&
      jurisdicao.label !== 'Pertence a qual Jurisdição' &&
      nascimento !== '' &&
      sexo.label !== 'Selecione...' &&
      fone !== '' &&
      hospedagem.label !== 'Selecione...' &&
      fPagamento.label !== 'Qual a forma de pagamento' &&
      (codigoSecretaria === 'AM2256' ||
        codigoSecretaria === 'RR1614' ||
        codigoSecretaria === 'RO5196' ||
        codigoSecretaria === 'MG4286' ||
        codigoSecretaria === 'SP1976' ||
        codigoSecretaria === 'MM3459' ||
        codigoSecretaria === 'NC0283' ||
        codigoSecretaria === 'COR259' ||
        codigoSecretaria === 'PA8516')
    ) {
      const total = 1350; // valor Primeiro Lote
      const qtyA = 1;
      const qtyC = 0;
      const fpag = fPagamento.label;
      const grau = GM.label;
      const igrejas = igreja.label;
      const jEstadual = jurisdicao.label;
      const genero = sexo.label;
      const estadia = hospedagem.label;
      router.push({
        pathname: '/eventoIdpb/pagamento',
        query: {
          nome,
          cpf,
          email,
          total,
          qtyA,
          qtyC,
          fpag,
          fone,
          nascimento,
          grau,
          igrejas,
          jEstadual,
          genero,
          dataChegada,
          horario,
          estadia,
          Responsavel: 'Adulto',
          Secretaria: codigoSecretaria,
        },
      });
    }
  };

  const handleFazerPagamento = async () => {
    handleValidarNome();
    handlevalidarEmail();
    if (GM.label === 'Selecione...') {
      toast.error('Selecione seu Grau Ministerial!', {
        position: toast.POSITION.TOP_CENTER,
      });
      GMRef.current.focus();
    }
    if (igreja.label === 'Qual sua Igreja') {
      toast.error('Identifique sua Igreja!', {
        position: toast.POSITION.TOP_CENTER,
      });
      igrejaRef.current.focus();
    }

    if (jurisdicao.label === 'Pertence a qual Jurisdição') {
      toast.error('Identifique sua Jurisdição!', {
        position: toast.POSITION.TOP_CENTER,
      });
      jurisdicaoRef.current.focus();
    }
    handleChecarNascimento();
    if (sexo.label === 'Selecione...') {
      toast.error('Idique seu Sexo!', {
        position: toast.POSITION.TOP_CENTER,
      });
      sexoRef.current.focus();
    }
    handleValidarFone();

    if (hospedagem.label === 'Selecione...') {
      toast.error('Precisamos saber sua hospedagem!', {
        position: toast.POSITION.TOP_CENTER,
      });
      hospedagemRef.current.focus();
    }
    if (fPagamento.label === 'Qual a forma de pagamento') {
      toast.error('Escolha a forma de pagamento!', {
        position: toast.POSITION.TOP_CENTER,
      });
      fpRef.current.focus();
    }

    if (
      nome !== '' &&
      email !== '' &&
      GM.label !== 'Selecione...' &&
      igreja.label !== 'Qual sua Igreja' &&
      jurisdicao.label !== 'Pertence a qual Jurisdição' &&
      nascimento !== '' &&
      sexo.label !== 'Selecione...' &&
      fone !== '' &&
      hospedagem.label !== 'Selecione...' &&
      fPagamento.label !== 'Qual a forma de pagamento'
    ) {
      const total = 1350; // valor Primeiro Lote
      const qtyA = 1;
      const qtyC = 0;
      const fpag = fPagamento.label;
      const grau = GM.label;
      const igrejas = igreja.label;
      const jEstadual = jurisdicao.label;
      const genero = sexo.label;
      const estadia = hospedagem.label;
      router.push({
        pathname: '/eventoIdpb/pagamento',
        query: {
          nome,
          cpf,
          email,
          total,
          qtyA,
          qtyC,
          fpag,
          fone,
          nascimento,
          grau,
          igrejas,
          jEstadual,
          genero,
          dataChegada,
          horario,
          estadia,
          Responsavel: 'Adulto',
        },
      });
    }
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const form = event.target.id;
      if (form === 'Nome') emailRef.current.focus();
      if (form === 'Email') GMRef.current.focus();
      if (form === 'GM') igrejaRef.current.focus();
      if (form === 'Igreja') jurisdicaoRef.current.focus();
      if (form === 'Jurisdicao') nascimentoRef.current.focus();
      if (form === 'Nascimento') sexoRef.current.focus();
      if (form === 'Sexo') foneRef.current.focus();
      if (form === 'Fone') hospedagemRef.current.focus();
      if (form === 'Hospedagem') dataChegadaRef.current.focus();
      if (form === 'DataChegada') horarioRef.current.focus();
      if (form === 'Horario') fpRef.current.focus();
      if (form === 'CodigoSec') botaoRef.current.focus();
      if (form === 'FPagamento') botaoRef.current.focus();
    }
  };

  React.useEffect(async () => {
    if (hospedagem.label === 'Escola Bíblica') setOcultar(true);
    else setOcultar(false);
  }, [hospedagem]);

  React.useEffect(async () => {
    if (fPagamento.label === 'Dinheiro (apenas secretaria)') {
      setOcultarFp(true);
      codigoSecretariaRef.current.focus();
    } else {
      setOcultarFp(false);
      botaoRef.current.focus();
    }
  }, [fPagamento]);

  //= ====================================================================
  return (
    <Box height="100vh" style={{ backgroundColor: '#fafafa' }}>
      <Box
        width="100vw"
        display="flex"
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
        height="100%"
      >
        <Box height="100%">
          <Box
            width="100vw"
            display="flex"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
            height="100%"
          >
            <Box width="100%" height="100%" mb={0}>
              <Box>
                <Box
                  mt={0}
                  ml={0}
                  height="25vh"
                  width="100%"
                  style={{
                    backgroundImage: `url('/images/eventoIdpb/cabecalho1.png')`,
                    backgroundPosition: 'center', // centraliza imagem
                    backgroundSize: 'cover', // imagem cobre toda área do div
                  }}
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

              <Box
                mt={0}
                display="flex"
                justifyContent="center"
                flexDirection="row"
                alignItems="center"
                height="75%"
                style={{
                  border: '1px solid rgba(0,0,0,0.1)',
                  padding: 0,
                  borderColor: '#e0711a',
                  minHeight: 200,
                }}
              >
                <TableContainer sx={{ height: '100%' }}>
                  <Grid item xs={12} md={12}>
                    <Box mt={1} ml={4} color="black" sx={{ fontSize: 'bold' }}>
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
                        disabled={desabilitaGM}
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
                  <Grid item xs={12} md={12}>
                    <Box mt={1} ml={4} color="black" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Email
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
                        id="Email"
                        type="text"
                        InputLabelProps={{
                          style: {
                            textTransform: 'uppercase',
                          },
                          shrink: true,
                        }}
                        value={email}
                        variant="outlined"
                        placeholder="email para envio de comprovante"
                        size="small"
                        onChange={(e) => {
                          const novoEmail = e.target.value;
                          const emailSemEspaco = novoEmail.replace(/ /g, '');
                          setEmail(emailSemEspaco.toLowerCase());
                        }}
                        onBlur={handlevalidarEmail}
                        onFocus={(e) => setEmail(e.target.value)}
                        onKeyDown={handleEnter}
                        inputRef={emailRef}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Box mt={1} ml={4} color="black" sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Grau Ministerial
                      </Typography>
                    </Box>
                    <Box className={classes.novoBox} mt={-2}>
                      <Select
                        isSearchable={false}
                        isDisabled={desabilitaGM}
                        styles={customStyles}
                        id="GM"
                        ref={GMRef}
                        value={GM}
                        onChange={(e) => {
                          // setValues2(e);
                          setGM(e);
                          igrejaRef.current.focus();
                          //                          observacoesRef.current.focus();
                        }}
                        options={listaGM}
                      />
                    </Box>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={12} md={12}>
                      <Box
                        mt={1}
                        ml={2}
                        color="black"
                        sx={{ fontSize: 'bold' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Nome da Igreja
                        </Typography>
                      </Box>

                      <Box className={classes.novoBox} mt={-2}>
                        <Select
                          styles={customStyles}
                          id="Igreja"
                          ref={igrejaRef}
                          value={igreja}
                          onChange={(e) => {
                            // setValues2(e);
                            setIgreja(e);
                            //    igrejaRef.current.focus();
                            jurisdicaoRef.current.focus();

                            //                          observacoesRef.current.focus();
                          }}
                          options={listaIgrejas}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={12} md={12}>
                      <Box
                        mt={1}
                        ml={2}
                        color="black"
                        sx={{ fontSize: 'bold' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Jurisdiçao Estadual
                        </Typography>
                      </Box>

                      <Box className={classes.novoBox} mt={-2}>
                        <Select
                          menuPlacement="top"
                          id="Jurisdicao"
                          isSearchable={false}
                          styles={customStyles}
                          ref={jurisdicaoRef}
                          value={jurisdicao}
                          onChange={(e) => {
                            // setValues2(e);
                            setJurisdicao(e);
                            nascimentoRef.current.focus();
                          }}
                          options={listaJurisdicao}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={6} md={6}>
                      <Box
                        mt={1}
                        ml={4}
                        color="black"
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
                          onFocus={(e) => setNascimento(e.target.value)}
                          onKeyDown={handleEnter}
                          inputRef={nascimentoRef}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Box
                        mt={1}
                        ml={4}
                        color="black"
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
                            foneRef.current.focus();
                          }}
                          options={listaSexo}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={6} md={6}>
                      <Box
                        mt={1}
                        ml={4}
                        color="black"
                        sx={{ fontSize: 'bold' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Celular
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
                          id="Fone"
                          inputRef={foneRef}
                          //                      ref={cpfRef}
                          // // // label="CPF"
                          type="tel"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onBlur={handleValidarFone}
                          value={celularMask(fone)}
                          variant="outlined"
                          placeholder="(99) 9999-9999"
                          size="small"
                          onChange={(e) => {
                            setFone(e.target.value);
                          }}
                          onFocus={(e) => setFone(e.target.value)}
                          onKeyDown={handleEnter}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Box
                        mt={1}
                        ml={4}
                        color="black"
                        sx={{ fontSize: 'bold' }}
                      >
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Hospedagem
                        </Typography>
                      </Box>
                      <Box className={classes.novoBox} mt={-2}>
                        <Select
                          menuPlacement="top"
                          styles={customStyles}
                          isSearchable={false}
                          id="Hospedagem"
                          ref={hospedagemRef}
                          value={hospedagem}
                          onChange={(e) => {
                            // setValues2(e);
                            setHospedagem(e);
                            dataChegadaRef.current.focus();
                          }}
                          options={listaHospedagem}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Box display={ocultar ? '' : 'none'}>
                    <Grid item container xs={12}>
                      <Grid item xs={6} md={6}>
                        <Box
                          mt={1}
                          ml={4}
                          color="black"
                          sx={{ fontSize: 'bold' }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Data da Chegada
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
                            id="DataChegada"
                            type="tel"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={dataMask(dataChegada)}
                            variant="outlined"
                            placeholder="dd/mm/aaaa"
                            size="small"
                            onChange={(e) => {
                              setDataChegada(e.target.value);
                            }}
                            onFocus={(e) => setDataChegada(e.target.value)}
                            onKeyDown={handleEnter}
                            inputRef={dataChegadaRef}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <Box
                          mt={1}
                          ml={4}
                          color="black"
                          sx={{ fontSize: 'bold' }}
                        >
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Horario da Chegada
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
                            id="Horario"
                            // label="Matricula"
                            type="tel"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={horarioMask(
                              horario.replace(/(?<=^.{2})/, ':'),
                            )}
                            size="small"
                            variant="outlined"
                            placeholder="hh:mm"
                            onChange={(e) => {
                              setHorario(e.target.value);
                            }}
                            onFocus={(e) => {
                              setHorario(e.target.value);
                            }}
                            onKeyDown={handleEnter}
                            inputRef={horarioRef}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Grid item xs={12} md={12}>
                    <Box mt={1} ml={4} color="black" sx={{ fontSize: 'bold' }}>
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
                        options={options}
                      />
                    </Box>
                  </Grid>
                  <Box display={ocultarFp ? '' : 'none'}>
                    <Grid item container xs={12}>
                      <Grid item xs={12} md={12}>
                        <Box
                          mt={1}
                          ml={4}
                          color="black"
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
                            onFocus={(e) => setcodigoSecretaria(e.target.value)}
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
                        FAZER PAGAMENTO
                      </Button>
                    </Box>
                  </Grid>
                </TableContainer>
              </Box>
            </Box>
          </Box>
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
