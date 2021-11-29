import { makeStyles } from '@material-ui/core/styles';
// import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { signOut } from 'next-auth/client';
import TextField from '@material-ui/core/TextField';
import { Box, Tooltip, Button, capitalize } from '@mui/material';
import React from 'react';
// import Image from 'next/image';
import Typography from '@mui/material/Typography';
import api from 'src/components/services/api';
import axios from 'axios';
import Hidden from '@material-ui/core/Hidden';
import cpfMask from 'src/components/mascaras/cpf';
import dataMask from 'src/components/mascaras/datas';
import foneMask from 'src/components/mascaras/fone';
import celularMask from 'src/components/mascaras/celular';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from '@mui/material/Modal';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import TouchAppIcon from '@mui/icons-material/TouchApp';
// import { blobToURL, fromBlob } from 'image-resize-compress';
// import ImageResize from 'src/utils/compressImg';
import Resizer from 'react-image-file-resizer';
import ImageBlobReduce from 'image-blob-reduce';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

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
  boxImg: {
    flexGrow: 1,
    padding: 0.3,
    marginTop: 3,
    marginBottom: -4,
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
    backgroundColor: '#f0f4c3',

    margin: 10,
    [theme.breakpoints.down('md')]: {
      width: '20',
    },
  },
  tf_m: {
    backgroundColor: '#f0f4c3',

    width: '100%',
    fontSize: '5px',
  },

  tf_6: {
    //    marginRight: 8,
    backgroundColor: '#f0f4c3',

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
    backgroundColor: '#f0f4c3',
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
    backgroundColor: '#f0f4c3',
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
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
  },
}));

const currencies = [
  {
    value: 'SOLTEIRO (A)',
    label: 'SOLTEIRO (A)',
  },
  {
    value: 'CASADO (A)',
    label: 'CASADO (A)',
  },
  {
    value: 'VIÚVO (A)',
    label: 'VIÚVO (A)',
  },
  {
    value: 'DIVORCIADO (A)',
    label: 'DIVORCIADO (A)',
  },
];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function DadosPessoais({ item, secao, ministros, statusDrawer }) {
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
  const [fotoPerfil, setFotoPerfil] = React.useState('');
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
  const [estadoNascimento, setEstadoNascimento] = React.useState('');
  const [validarEstadoNascimento, setValidarEstadoNascimento] = React.useState(
    'sim',
  );
  const [loading, setLoading] = React.useState('esperando');

  const [nacionalidade, setNacionalidade] = React.useState('');
  const [validarNacionalidade, setValidarNacionalidade] = React.useState('sim');
  const [igreja, setIgreja] = React.useState('');
  const [validarIgreja, setValidarIgreja] = React.useState('sim');
  const [funcaoNaIgreja, setFuncaoNaIgreja] = React.useState('');
  const [validarFuncaoNaIgreja, setValidarFuncaoNaIgreja] = React.useState(
    'sim',
  );
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
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  //  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const [previews, setPreview] = React.useState([]);
  const [blobsImg, setBlobsImg] = React.useState('');
  //  -------------------------------------------------------------------
  // usado para recortar a imagem
  //  -------------------------------------------------------------------
  const [upImg, setUpImg] = React.useState();
  const imgRef = React.useRef(null);
  const [completedCrop, setCompletedCrop] = React.useState(null);
  const previewCanvasRef = React.useRef(null);
  const [crop, setCrop] = React.useState({
    unit: '%',
    width: 100,
    aspect: 3.5 / 3.2,
  });
  //  -------------------------------------------------------------------
  //  -------------------------------------------------------------------
  // usado para comprimir a imagem
  //  -------------------------------------------------------------------

  // const [imageToResize, setImageToResize] = React.useState(undefined);
  const [resizedImage, setResizedImage] = React.useState(undefined);
  const [sendImage, setSendImage] = React.useState([]);

  //  -------------------------------------------------------------------

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
    dadosMinistro[0].fotoPerfil
      ? `https://sistemaidpb.s3.amazonaws.com/${dadosMinistro[0].fotoPerfil}`
      : '',
  );

  const processUpload = (uploadedFile) => {
    console.log('up', uploadedFile[0].name);
    if (uploadedFile[0].name) {
      const nomeFoto = `${dadosMinistro[0].CPF}${uploadedFile[0].name.substring(
        uploadedFile[0].name.lastIndexOf('.'),
      )}`;
      setFotoPerfil(nomeFoto);
      const dataFile = new FormData();
      //      dataFile.append('file', uploadedFile[0], nomeFoto);
      dataFile.append('file', uploadedFile[0], nomeFoto);
      console.log(dataFile, uploadedFile[0], nomeFoto);
      api
        .post('/api/fotos', dataFile)
        .then((response) => {
          if (response) {
            console.log(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onSelectFile = (e) => {
    setPreview(e.target.files);

    const nomeF = e.target.files[0];
    if (nomeF && nomeF.name) {
      const nomeFoto = `${dadosMinistro[0].CPF}${nomeF.name.substring(
        nomeF.name.lastIndexOf('.'),
      )}`;
      //      const newFotoPerfil = `https://sistemaidpb.s3.amazonaws.com/${nomeFoto}`;
      setFotoPerfil(nomeFoto);
    } else {
      // setSelectedFile(undefined);
      return;
    }
    setSelectedFile(URL.createObjectURL(e.target.files[0]));

    //-----------------------------------------------------------------
    // para recorte da imagem
    //-----------------------------------------------------------------
    /* if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
    setOpen2(true); // abre o modal para recorte */

    //-----------------------------------------------------------------
  };

  //-----------------------------------------------------------------
  // para recorte da imagem
  //-----------------------------------------------------------------
  const onLoad = React.useCallback((img) => {
    imgRef.current = img;
  }, []);
  React.useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop2 = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop2.width * pixelRatio * scaleX;
    canvas.height = crop2.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop2.x * scaleX,
      crop2.y * scaleY,
      crop2.width * scaleX,
      crop2.height * scaleY,
      0,
      0,
      crop2.width * scaleX,
      crop2.height * scaleY,
    );
  }, [completedCrop]);

  const iniciarEnvio = async (blobs) => {
    const arrayFinal = [
      {
        name: '',
        type: '',
      },
    ];
    arrayFinal.name = previews.name;
    arrayFinal.type = previews.type;

    // console.log(arrayFinal, previews);
    const uploadedFiles = arrayFinal.map((file) => ({
      file,
      id: uniqueId(),
      name: fotoPerfil,
      readableSize: filesize(blobs.size),
      preview: URL.createObjectURL(blobs),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    setSendImage(uploadedFiles);
    setBlobsImg(blobs);
    //   pegarURL(uploadedFiles);
    // e.preventDefault();

    //    setLoading(true);
    // setFileObjects(arrayFinal);
  };
  async function handleResize(blob) {
    const resize = new ImageBlobReduce();

    await resize.toBlob(blob, { max: 100 }).then((blobs) => {
      const previewUrl = window.URL.createObjectURL(blobs);
      setSelectedFile(previewUrl);

      iniciarEnvio(blobs);
    });
  }
  //-----------------------------------------------------------------

  async function generateDownload(canvas, crops) {
    if (!crops || !canvas) {
      return;
    }
    await canvas.toBlob(
      (blob) => {
        // const previewUrl = window.URL.createObjectURL(blob);
        //
        // console.log('canvas:', previewUrl);
        handleResize(blob);
        //
        //        urlCanvas = blob;
      },
      'image/png',
      1,
    );
  }
  //-----------------------------------------------------------------

  const addTela = () => {
    const contPage = value + 1;

    if (contPage > 4) setValue(0);
    else setValue(contPage);
    //    if (contador === 3) setValue('dadosIDPB');
  };
  const subTela = () => {
    const contPage = value - 1;

    if (contPage < 0) setValue(4);
    else setValue(contPage);
  };
  // const customImgLoader = ({ src }) => `${src}`;
  const addTelaMobile = () => {
    const contPage = value + 1;

    if (contPage > 4) setValue(0);
    else setValue(contPage);
    //    if (contador === 3) setValue('dadosIDPB');
  };
  const subTelaMobile = () => {
    const contPage = value - 1;

    if (contPage < 0) setValue(4);
    else setValue(contPage);
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
  let FotoPerfil = '';
  let Igreja = '';
  let FuncaoNaIgreja = '';

  const EstadoCivil = {
    value: 'SOLTEIRO (A)',
    label: 'SOLTEIRO (A)',
  };
  let DataNascimento = '';
  let DataConversao = '';
  let DataConsagracao = '';
  let DataAscensao1 = '';
  let DataAscensao2 = '';
  let Naturalidade = '';
  let EstadoNascimento = '';
  let Nacionalidade = '';
  let Ids = '';
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
    EstadoCivil.value = dadosMinistro[0].EstadoCivil;
    DataNascimento = dadosMinistro[0].DataNascimento;
    DataConversao = dadosMinistro[0].DataConversao;
    DataConsagracao = dadosMinistro[0].DataConsagracao;
    DataAscensao1 = dadosMinistro[0].DataAscensao1;
    DataAscensao2 = dadosMinistro[0].DataAscensao2;
    Naturalidade = dadosMinistro[0].Naturalidade;
    EstadoNascimento = dadosMinistro[0].EstadoNascimento;
    Nacionalidade = dadosMinistro[0].Nacionalidade;
    Ids = dadosMinistro[0].id;
    FotoPerfil = dadosMinistro[0].fotoPerfil;
    Igreja = dadosMinistro[0].Igreja;
    FuncaoNaIgreja = dadosMinistro[0].FuncaoNaIgreja;
  }
  // const [values, setValues] = React.useState(dadosMinistro[0].EstadoCivil);
  const [values, setValues] = React.useState({
    currency: currencies[1],
  });
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
      setEstadoNascimento(EstadoNascimento);
      setNacionalidade(Nacionalidade);
      setFotoPerfil(FotoPerfil);
      setIgreja(Igreja);
      setFuncaoNaIgreja(FuncaoNaIgreja);
    }
  }, []);
  //--------------------------------------------------------------------------

  const valid = () => {
    if (
      !nome ||
      !grau ||
      !email ||
      !celular ||
      !fone ||
      !matricula ||
      !cpf ||
      !rg ||
      !dataNascimento ||
      !conversao ||
      !consagracao ||
      !ascensao1 ||
      !ascensao2 ||
      !naturalidade ||
      !estadoNascimento ||
      !nacionalidade ||
      !sexo ||
      !jurisdicaoEstadual ||
      !distrito ||
      !estadoCivil ||
      !conjuge ||
      !cpfConjuge ||
      !fotoPerfil ||
      !celularConjuge
    ) {
      return false;
    }
    return true;
  };
  //--------------------------------------------------------------------------

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });

    setEstadoCivil(event.target.value);
  };

  //--------------------------------------------------------------------------

  const submitData = async () => {
    // e.preventDefault();

    const valida = valid();
    setLoading('enviando');
    setOpen(true);
    if (valida) {
      try {
        const body = {
          fotoPerfil,
          Nome: nome,
          GrauMinisterial: grau,
          Email: email,
          Celular: celular,
          TelefoneResidencial: fone,
          Matricula: matricula,
          CPF: cpf,
          RG: rg,
          DataNascimento: dataNascimento,
          DataConversao: conversao,
          DataConsagracao: consagracao,
          DataAscensao1: ascensao1,
          DataAscensao2: ascensao2,
          Naturalidade: naturalidade,
          EstadoNascimento: estadoNascimento,
          Nacionalidade: nacionalidade,
          Sexo: sexo,
          JurisdicaoEstadual: jurisdicaoEstadual,
          Distrito: distrito,
          EstadoCivil: estadoCivil.value,
          Conjuge: conjuge,
          CPFConjuge: cpfConjuge,
          CelularConjuge: celularConjuge,
        };

        let urlCreate = '';
        if (dadosMinistro.length === 0) {
          urlCreate = `${window.location.origin}/api/criarEvento`;
        } else {
          urlCreate = `${window.location.origin}/api/updateMinistros/${Ids}`;
        }

        await fetch(urlCreate, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        setLoading('enviado');
      } catch (errors) {
        setLoading('falha');

        console.errors();
      }
    } else setLoading('naoPreenchido');
  };
  const defaultProps = {
    bgcolor: 'background.paper',
    ml: 0.9,
    border: 1,
    width: '96%',
  };
  const getInformacoes = () => {
    axios.get(`http://viacep.com.br/ws/${cep}/json/`).then((response) => {
      setInformacoes(response.data);
      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setCidade(response.data.localidade);
    });
  };
  const atualizar = () => {
    enviarFoto();
    submitData();
  };
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  let largImg;
  const largImgMobile = window.innerWidth;

  if (statusDrawer) largImg = 260;
  else largImg = 316;
  const altura = window.innerHeight;

  const imgExtra = '/images/idpb.ico';
  return (
    <Box>
      <Box height={altura - 120}>
        <Hidden smDown>
          {value === 0 && (
            <Box>
              <Box display="flex" flexDirection="row" mb={1} mt={1}>
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
                      <Box className={classes.boxImg}>
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={onSelectFile}
                        />
                        <label htmlFor="contained-button-file">
                          <img
                            src={selectedFile || imgExtra}
                            alt=""
                            width={largImg}
                            height={260}

                            //                            loader={myLoader}
                            //                           loading="lazy"
                            //                         placeholder="blur"
                            //                         blurDataURL={bannerBlurHash}
                            //                         objectFit="cover"
                          />
                        </label>
                      </Box>
                    </Tooltip>
                  </Box>
                </Grid>
                <Grid item md={9}>
                  <Box className={classes.alignBox} mt={1.8}>
                    <Box className={classes.page}>
                      <Grid item xs={12} md={9}>
                        <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
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
                        <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Grau Ministerial
                          </Typography>
                        </Box>
                        <Box className={classes.novoBox} mt={-2}>
                          <TextField
                            className={classes.tf_m}
                            id="Grau Ministerial"
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
                        <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
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
                            id="Email"
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
                        <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Telefone Celular
                          </Typography>
                        </Box>

                        <Box className={classes.novoBox} mt={-2}>
                          <TextField
                            className={classes.tf_m}
                            id="TelefoneCelular"
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
                        <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Telefone Residencial
                          </Typography>
                        </Box>

                        <Box className={classes.novoBox} mt={-2}>
                          <TextField
                            className={classes.tf_m}
                            id="TelefoneResidencial"
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
                        <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Matrícula
                          </Typography>
                        </Box>

                        <Box className={classes.novoBox} mt={-2}>
                          <TextField
                            className={classes.tf_m}
                            id="Matricula"
                            // label="Matricula"
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
                        <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            CPF
                          </Typography>
                        </Box>

                        <Box className={classes.novoBox} mt={-2}>
                          <TextField
                            className={classes.tf_m}
                            id="CPF"
                            // // // label="CPF"
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
                        <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            RG
                          </Typography>
                        </Box>

                        <Box className={classes.novoBox} mt={-2}>
                          <TextField
                            className={classes.tf_m}
                            id="RG"
                            // label="RG"
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
                        <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Data de Nascimento
                          </Typography>
                        </Box>

                        <Box className={classes.novoBox} mt={-2}>
                          <TextField
                            className={classes.tf_m}
                            id="DataNascimento"
                            // label="Data de Nascimento"
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
                            onChange={(e) => setDataNascimento(e.target.value)}
                            error={validarDataNascimento === 'nao'}
                            onFocus={(e) => setDataNascimento(e.target.value)}
                          />
                        </Box>
                      </Grid>
                    </Box>
                    <Box display="flex" flexDirection="row" mt={2}>
                      <Grid item xs={12} md={3}>
                        <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Data da Conversão
                          </Typography>
                        </Box>

                        <Box className={classes.novoBox} mt={-2}>
                          <TextField
                            className={classes.tf_m}
                            id="DataConversao"
                            // label="Data de Conversão"
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={dataMask(conversao)}
                            variant="outlined"
                            placeholder=""
                            size="small"
                            onBlur={
                              conversao === ''
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
                        <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Data da Consagração
                          </Typography>
                        </Box>

                        <Box className={classes.novoBox} mt={-2}>
                          <TextField
                            className={classes.tf_m}
                            id="DataConsagracao"
                            // label="Data de Consagração"
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            disabled
                            value={dataMask(consagracao)}
                            variant="outlined"
                            placeholder=""
                            size="small"
                            onBlur={
                              consagracao === ''
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
                        <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Ascenção p/ Licenciado
                          </Typography>
                        </Box>

                        <Box className={classes.novoBox} mt={-2}>
                          <TextField
                            className={classes.tf_m}
                            id="DataAscensao1"
                            // label="Data 1º Ascensão"
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            disabled
                            value={dataMask(ascensao1)}
                            variant="outlined"
                            placeholder=""
                            size="small"
                            onBlur={
                              ascensao1 === ''
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
                        <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Ascenção p/ Ordenado
                          </Typography>
                        </Box>

                        <Box className={classes.novoBox} mt={-2}>
                          <TextField
                            className={classes.tf_m}
                            id="DataAscensao2"
                            // label="Data 2º Ascensão"
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            disabled
                            value={dataMask(ascensao2)}
                            variant="outlined"
                            placeholder=""
                            size="small"
                            onBlur={
                              ascensao2 === ''
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
                  </Box>
                </Grid>
              </Box>
              <Divider variant="middle" />
              <Box mt={4}>
                <Box display="flex" flexDirection="row" mt={2}>
                  <Grid item xs={12} md={3}>
                    <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Cidade de Nascimento
                      </Typography>
                    </Box>
                    <Box className={classes.novoBox} mt={-2}>
                      <TextField
                        className={classes.tf_m}
                        id="Naturalidade"
                        // label="Naturalidade"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={naturalidade}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        onBlur={
                          naturalidade === ''
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
                    <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Estado de Nascimento
                      </Typography>
                    </Box>
                    <Box className={classes.novoBox} mt={-2}>
                      {' '}
                      <TextField
                        className={classes.tf_m}
                        id="EstadoNascimento"
                        // label="Estado do Nascimento"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={estadoNascimento}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        onBlur={
                          estadoNascimento === ''
                            ? () => setValidarEstadoNascimento('nao')
                            : () => setValidarEstadoNascimento('sim')
                        }
                        onChange={(e) => setEstadoNascimento(e.target.value)}
                        error={validarEstadoNascimento === 'nao'}
                        onFocus={(e) => setEstadoNascimento(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Nacionalidade
                      </Typography>
                    </Box>
                    <Box className={classes.novoBox} mt={-2}>
                      <TextField
                        className={classes.tf_m}
                        id="Nacionalidade"
                        // label="Nacionalidade"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={nacionalidade}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        onBlur={
                          nacionalidade === ''
                            ? () => setValidarNacionalidade('nao')
                            : () => setValidarNacionalidade('sim')
                        }
                        onChange={(e) => setNacionalidade(e.target.value)}
                        error={validarNacionalidade === 'nao'}
                        onFocus={(e) => setNacionalidade(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Sexo
                      </Typography>
                    </Box>
                    <Box className={classes.novoBox} mt={-2}>
                      <TextField
                        className={classes.tf_m}
                        id="Sexo"
                        // label="Sexo"
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
                    <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Jurisdição Estadual
                      </Typography>
                    </Box>
                    <Box className={classes.novoBox} mt={-2}>
                      <TextField
                        className={classes.tf_m}
                        id="JurisdicaoEstadual"
                        // label="Jurisdição Estadual"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={jurisdicaoEstadual}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        onBlur={
                          jurisdicaoEstadual === ''
                            ? () => setValidarJurisdicaoEstadual('nao')
                            : () => setValidarJurisdicaoEstadual('sim')
                        }
                        onChange={(e) => setJurisdicaoEstadual(e.target.value)}
                        error={validarJurisdicaoEstadual === 'nao'}
                        onFocus={(e) => setJurisdicaoEstadual(e.target.value)}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Distrito
                      </Typography>
                    </Box>
                    <Box className={classes.novoBox} mt={-2}>
                      <TextField
                        className={classes.tf_m}
                        id="Distrito"
                        // label="Distrito"
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={distrito}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        onBlur={
                          distrito === ''
                            ? () => setValidarDistrito('nao')
                            : () => setValidarDistrito('sim')
                        }
                        onChange={(e) => setDistrito(e.target.value)}
                        error={validarDistrito === 'nao'}
                        onFocus={(e) => setDistrito(e.target.value)}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                      <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        Estado Civil
                      </Typography>
                    </Box>
                    <Box width="100%" className={classes.novoBox} mt={-2}>
                      <TextField
                        className={classes.tf_m}
                        id="EstadoCivil"
                        select
                        type="text"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={
                          values.currency ? values.currency : 'SOLTEIRO (A)'
                        }
                        onChange={handleChange('currency')}
                        variant="outlined"
                        placeholder=""
                        size="small"
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                          renderValue: (option) => option.label,
                        }}
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option}>
                            ({option.value})
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  </Grid>
                </Box>
                {estadoCivil.value === 'CASADO (A)' && (
                  <Box display="flex" flexDirection="row" mt={2}>
                    <Grid item xs={12} md={6}>
                      <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Nome do Cônjuge
                        </Typography>
                      </Box>
                      <Box className={classes.novoBox} mt={-2}>
                        <TextField
                          className={classes.tf_m}
                          id="Conjuge"
                          // label="Cônjuge"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={conjuge}
                          variant="outlined"
                          placeholder=""
                          size="small"
                          onBlur={
                            conjuge === ''
                              ? () => setValidarConjuge('nao')
                              : () => setValidarConjuge('sim')
                          }
                          onChange={(e) => setConjuge(e.target.value)}
                          error={validarConjuge === 'nao'}
                          onFocus={(e) => setConjuge(e.target.value)}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          CPF do Cônjuge
                        </Typography>
                      </Box>
                      <Box className={classes.novoBox} mt={-2}>
                        <TextField
                          className={classes.tf_m}
                          id="CPFConjuge"
                          // label="CPF do Conjuge"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={cpfMask(cpfConjuge)}
                          variant="outlined"
                          placeholder=""
                          size="small"
                          onBlur={
                            cpfConjuge === ''
                              ? () => setValidarCPFConjuge('nao')
                              : () => setValidarCPFConjuge('sim')
                          }
                          onChange={(e) => setCPFConjuge(e.target.value)}
                          error={validarCPFConjuge === 'nao'}
                          onFocus={(e) => setCPFConjuge(e.target.value)}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Telefone do Cônjuge
                        </Typography>
                      </Box>
                      <Box className={classes.novoBox} mt={-2}>
                        {' '}
                        <TextField
                          className={classes.tf_m}
                          id="TelefoneConjuge"
                          // label="Telefone do Cônjuge"
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
                )}
              </Box>
            </Box>
          )}
        </Hidden>
        <Hidden smUp>
          {value === 0 && (
            <Box>
              <Box mt={2} display="flex" flexDirection="row">
                <Grid item xs={12} md={12}>
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
                      <Box
                        display="flex"
                        width={largImgMobile - 20}
                        height={altura - 301}
                        alignItems="center"
                        ml={0.2}
                        mt={0.4}
                      >
                        <input
                          accept="image/*"
                          className={classes.input}
                          id="contained-button-file"
                          multiple
                          type="file"
                          onChange={onSelectFile}
                        />

                        <label htmlFor="contained-button-file">
                          {resizedImage && (
                            <div>
                              <h2>Resized Image</h2>
                              <img alt="Resize Img" src={resizedImage} />
                            </div>
                          )}
                          <img
                            width={largImgMobile - 20}
                            height={altura - 302}
                            src={selectedFile || imgExtra}
                            alt="img01"
                          />
                        </label>
                      </Box>
                    </Tooltip>
                  </Box>
                </Grid>
              </Box>
              <Box mt={0} display="flex" flexDirection="row">
                <Grid item xs={12} md={9}>
                  <Box mt={1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Nome
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-1}>
                    <TextField
                      className={classes.tf_m}
                      id="Nome"
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
                      onChange={(e) => setNome(capitalize(e.target.value))}
                      error={validarNome === 'nao'}
                      onFocus={(e) => setNome(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
            </Box>
          )}
          {value === 1 && (
            <Box>
              <Box mt={2} display="flex" flexDirection="row">
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Grau Ministerial
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Grau Ministerial"
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
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Matrícula
                    </Typography>
                  </Box>

                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Matricula"
                      // label="Matricula"
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
              </Box>
              <Box mt={2} display="flex" flexDirection="row">
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      CPF
                    </Typography>
                  </Box>

                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="CPF"
                      // // // label="CPF"
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
                <Grid item xs={12}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      RG
                    </Typography>
                  </Box>

                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="RG"
                      // label="RG"
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
              </Box>
              <Box mt={2} display="flex" flexDirection="row">
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Data de Nascimento
                    </Typography>
                  </Box>

                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="DataNascimento"
                      // label="Data de Nascimento"
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
                      onChange={(e) => setDataNascimento(e.target.value)}
                      error={validarDataNascimento === 'nao'}
                      onFocus={(e) => setDataNascimento(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Telefone Celular
                    </Typography>
                  </Box>

                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="TelefoneCelular"
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
              </Box>
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Telefone Residencial
                    </Typography>
                  </Box>

                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="TelefoneResidencial"
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
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Data da Conversão
                    </Typography>
                  </Box>

                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="DataConversao"
                      // label="Data de Conversão"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={dataMask(conversao)}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        conversao === ''
                          ? () => setValidarConversao('nao')
                          : () => setValidarConversao('sim')
                      }
                      onChange={(e) => setConversao(e.target.value)}
                      error={validarConversao === 'nao'}
                      onFocus={(e) => setConversao(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Data da Consagração
                    </Typography>
                  </Box>

                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="DataConsagracao"
                      // label="Data de Consagração"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      disabled
                      value={dataMask(consagracao)}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        consagracao === ''
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
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Ascenção p/ Licenciado
                    </Typography>
                  </Box>

                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="DataAscensao1"
                      // label="Data 1º Ascensão"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      disabled
                      value={dataMask(ascensao1)}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        ascensao1 === ''
                          ? () => setValidarAscencao1('nao')
                          : () => setValidarAscencao1('sim')
                      }
                      onChange={(e) => setAscensao1(e.target.value)}
                      error={validarAscencao1 === 'nao'}
                      onFocus={(e) => setAscensao1(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box mt={2} display="flex" flexDirection="row">
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Ascenção p/ Ordenado
                    </Typography>
                  </Box>

                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="DataAscensao2"
                      // label="Data 2º Ascensão"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      disabled
                      value={dataMask(ascensao2)}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        ascensao2 === ''
                          ? () => setValidarAscencao2('nao')
                          : () => setValidarAscencao2('sim')
                      }
                      onChange={(e) => setAscensao2(e.target.value)}
                      error={validarAscencao2 === 'nao'}
                      onFocus={(e) => setAscensao2(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Sexo
                    </Typography>
                  </Box>

                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Sexo"
                      // label="Sexo"
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
            </Box>
          )}
          {value === 2 && (
            <Box>
              <Box mt={2} display="flex" flexDirection="row">
                <Grid item xs={12} md={6}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Email
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Email"
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
              </Box>
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Cidade de Nascimento
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Naturalidade"
                      // label="Naturalidade"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={naturalidade}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        naturalidade === ''
                          ? () => setValidarNaturalidade('nao')
                          : () => setValidarNaturalidade('sim')
                      }
                      onChange={(e) => setNaturalidade(e.target.value)}
                      error={validarNaturalidade === 'nao'}
                      onFocus={(e) => setNaturalidade(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Estado de Nascimento
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="EstadoNascimento"
                      // label="Estado do Nascimento"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={estadoNascimento}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        estadoNascimento === ''
                          ? () => setValidarEstadoNascimento('nao')
                          : () => setValidarEstadoNascimento('sim')
                      }
                      onChange={(e) => setEstadoNascimento(e.target.value)}
                      error={validarEstadoNascimento === 'nao'}
                      onFocus={(e) => setEstadoNascimento(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Nacionalidade
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Nacionalidade"
                      // label="Nacionalidade"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={nacionalidade}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        nacionalidade === ''
                          ? () => setValidarNacionalidade('nao')
                          : () => setValidarNacionalidade('sim')
                      }
                      onChange={(e) => setNacionalidade(e.target.value)}
                      error={validarNacionalidade === 'nao'}
                      onFocus={(e) => setNacionalidade(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Sexo
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Sexo"
                      // label="Sexo"
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
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Jurisdição Estadual
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="JurisdicaoEstadual"
                      // label="Jurisdição Estadual"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={jurisdicaoEstadual}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        jurisdicaoEstadual === ''
                          ? () => setValidarJurisdicaoEstadual('nao')
                          : () => setValidarJurisdicaoEstadual('sim')
                      }
                      onChange={(e) => setJurisdicaoEstadual(e.target.value)}
                      error={validarJurisdicaoEstadual === 'nao'}
                      onFocus={(e) => setJurisdicaoEstadual(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={6}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Distrito
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Distrito"
                      // label="Distrito"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={distrito}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        distrito === ''
                          ? () => setValidarDistrito('nao')
                          : () => setValidarDistrito('sim')
                      }
                      onChange={(e) => setDistrito(e.target.value)}
                      error={validarDistrito === 'nao'}
                      onFocus={(e) => setDistrito(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Estado Civil
                    </Typography>
                  </Box>
                  <Box width="100%" className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="EstadoCivil"
                      select
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={values.currency ? values.currency : 'SOLTEIRO (A)'}
                      onChange={handleChange('currency')}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                        renderValue: (option) => option.label,
                      }}
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option}>
                          ({option.value})
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Grid>
              </Box>
            </Box>
          )}
          {value === 3 && (
            <Box>
              {estadoCivil.value === 'CASADO (A)' && (
                <Box>
                  <Box display="flex" flexDirection="row" mt={2}>
                    <Grid item xs={12} md={6}>
                      <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Nome do Cônjuge
                        </Typography>
                      </Box>
                      <Box className={classes.novoBox} mt={-2}>
                        <TextField
                          className={classes.tf_m}
                          id="Conjuge"
                          // label="Cônjuge"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={conjuge}
                          variant="outlined"
                          placeholder=""
                          size="small"
                          onBlur={
                            conjuge === ''
                              ? () => setValidarConjuge('nao')
                              : () => setValidarConjuge('sim')
                          }
                          onChange={(e) => setConjuge(e.target.value)}
                          error={validarConjuge === 'nao'}
                          onFocus={(e) => setConjuge(e.target.value)}
                        />
                      </Box>
                    </Grid>
                  </Box>
                  <Box display="flex" flexDirection="row" mt={2}>
                    <Grid item xs={12} md={3}>
                      <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          CPF do Cônjuge
                        </Typography>
                      </Box>
                      <Box className={classes.novoBox} mt={-2}>
                        <TextField
                          className={classes.tf_m}
                          id="CPFConjuge"
                          // label="CPF do Conjuge"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={cpfMask(cpfConjuge)}
                          variant="outlined"
                          placeholder=""
                          size="small"
                          onBlur={
                            cpfConjuge === ''
                              ? () => setValidarCPFConjuge('nao')
                              : () => setValidarCPFConjuge('sim')
                          }
                          onChange={(e) => setCPFConjuge(e.target.value)}
                          error={validarCPFConjuge === 'nao'}
                          onFocus={(e) => setCPFConjuge(e.target.value)}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Telefone do Cônjuge
                        </Typography>
                      </Box>
                      <Box className={classes.novoBox} mt={-2}>
                        <TextField
                          className={classes.tf_m}
                          id="TelefoneConjuge"
                          // label="Telefone do Cônjuge"
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
              )}
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={2}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      CEP da Residência
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="CEP"
                      // label="CEP"
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
                <Grid item xs={12} md={2}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Número
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Numero"
                      // label="Número"
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
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={8}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Logradouro
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Logradouro"
                      // label="Logradouro"
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
              </Box>
              <Box mt={2} display="flex" flexDirection="row">
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Complemento do Endereço
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Complemento"
                      // label="Cidade"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={complemento}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        complemento === ''
                          ? () => setValidarComplemento('nao')
                          : () => setValidarComplemento('sim')
                      }
                      onChange={(e) => setComplemento(e.target.value)}
                      error={validarComplemento === 'nao'}
                      onFocus={(e) => setComplemento(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box mt={2} display="flex" flexDirection="row">
                <Grid item xs={12} md={6}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Bairro
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Bairro"
                      // label="Bairro"
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
              </Box>
            </Box>
          )}
          {value === 4 && (
            <Box>
              <Box mt={2} display="flex" flexDirection="row">
                <Grid item xs={9} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Cidade onde Reside
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Cidade"
                      // label="Cidade"
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
                <Grid item xs={3} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      UF
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="UF"
                      // label="Cidade"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={uf}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        uf === ''
                          ? () => setValidarUF('nao')
                          : () => setValidarUF('sim')
                      }
                      onChange={(e) => setUF(e.target.value)}
                      error={validarUF === 'nao'}
                      onFocus={(e) => setUF(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>

              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={12}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Formação Escolar
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="FormacaoEscolar"
                      // label="FormacaoEscolar"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={formacaoEscolar}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        formacaoEscolar === ''
                          ? () => setValidarFormacaoEscolar('nao')
                          : () => setValidarFormacaoEscolar('sim')
                      }
                      onChange={(e) => setFormacaoEscolar(e.target.value)}
                      error={validarFormacaoEscolar === 'nao'}
                      onFocus={(e) => setFormacaoEscolar(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={12}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Igreja
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="igreja"
                      // label="FormacaoEscolar"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={igreja}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        igreja === ''
                          ? () => setValidarIgreja('nao')
                          : () => setValidarIgreja('sim')
                      }
                      onChange={(e) => setIgreja(e.target.value)}
                      error={validarIgreja === 'nao'}
                      onFocus={(e) => setIgreja(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={12}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Funcao Na Igreja
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="FuncaoNaIgreja"
                      // label="FormacaoEscolar"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={funcaoNaIgreja}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        funcaoNaIgreja === ''
                          ? () => setValidarFuncaoNaIgreja('nao')
                          : () => setValidarFuncaoNaIgreja('sim')
                      }
                      onChange={(e) => setFuncaoNaIgreja(e.target.value)}
                      error={validarFuncaoNaIgreja === 'nao'}
                      onFocus={(e) => setFuncaoNaIgreja(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
            </Box>
          )}
        </Hidden>
        <Box>
          {secao ? (
            <form
              noValidate
              autoComplete="off"
              width="100%"
              className={classes.root}
            >
              {value === 13 ? (
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
                                  // label="CEP"
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
                                  // label="Logradouro"
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
                                  onChange={(e) =>
                                    setLogradouro(e.target.value)
                                  }
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
                                  // label="Número"
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
                                  // label="Bairro"
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
                                  // label="Cidade"
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
                                  // label="Telefone Residencial"
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
                          <Box display="flex" flexDirection="row" mt={2}>
                            <Grid item xs={12} md={12}>
                              <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                                <Typography
                                  variant="caption"
                                  display="block"
                                  gutterBottom
                                >
                                  Formação Escolar
                                </Typography>
                              </Box>
                              <Box className={classes.novoBox} mt={-2}>
                                <TextField
                                  className={classes.tf_m}
                                  id="FormacaoEscolar"
                                  // label="FormacaoEscolar"
                                  type="text"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  value={formacaoEscolar}
                                  variant="outlined"
                                  placeholder=""
                                  size="small"
                                  onBlur={
                                    formacaoEscolar === ''
                                      ? () => setValidarFormacaoEscolar('nao')
                                      : () => setValidarFormacaoEscolar('sim')
                                  }
                                  onChange={(e) =>
                                    setFormacaoEscolar(e.target.value)
                                  }
                                  error={validarFormacaoEscolar === 'nao'}
                                  onFocus={(e) =>
                                    setFormacaoEscolar(e.target.value)
                                  }
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
                                  // label="Matricula"
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
                                  // label="CPF"
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
                                  // label="RG"
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
                                  // label="Data de Nascimento"
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
                                  onFocus={(e) =>
                                    setDataNascimento(e.target.value)
                                  }
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
                                  // label="Data de Conversão"
                                  type="text"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  value={dataMask(conversao)}
                                  variant="outlined"
                                  placeholder=""
                                  size="small"
                                  onBlur={
                                    conversao === ''
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
                                  // label="Data de Consagração"
                                  type="text"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  disabled
                                  value={dataMask(consagracao)}
                                  variant="outlined"
                                  placeholder=""
                                  size="small"
                                  onBlur={
                                    consagracao === ''
                                      ? () => setValidarConsagracao('nao')
                                      : () => setValidarConsagracao('sim')
                                  }
                                  onChange={(e) =>
                                    setConsagracao(e.target.value)
                                  }
                                  error={validarConsagracao === 'nao'}
                                  onFocus={(e) =>
                                    setConsagracao(e.target.value)
                                  }
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Box className={classes.novoBox}>
                                <TextField
                                  className={classes.tf_m}
                                  id="DataAscensao1"
                                  // label="Data 1º Ascensão"
                                  type="text"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  disabled
                                  value={dataMask(ascensao1)}
                                  variant="outlined"
                                  placeholder=""
                                  size="small"
                                  onBlur={
                                    ascensao1 === ''
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
                                  // label="Data 2º Ascensão"
                                  type="text"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  disabled
                                  value={dataMask(ascensao2)}
                                  variant="outlined"
                                  placeholder=""
                                  size="small"
                                  onBlur={
                                    ascensao2 === ''
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
                    <Box display="flex" flexDirection="row" mt={2}>
                      <Grid item xs={12} md={12}>
                        <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                          <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                          >
                            Formação Escolar
                          </Typography>
                        </Box>
                        <Box className={classes.novoBox} mt={-2}>
                          <TextField
                            className={classes.tf_m}
                            id="FormacaoEscolar"
                            // label="FormacaoEscolar"
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            value={formacaoEscolar}
                            variant="outlined"
                            placeholder=""
                            size="small"
                            onBlur={
                              FormacaoEscolar === ''
                                ? () => setValidarFormacaoEscolar('nao')
                                : () => setValidarFormacaoEscolar('sim')
                            }
                            onChange={(e) => setFormacaoEscolar(e.target.value)}
                            error={validarFormacaoEscolar === 'nao'}
                            onFocus={(e) => setFormacaoEscolar(e.target.value)}
                          />
                        </Box>
                      </Grid>
                    </Box>
                    <Box display="flex" flexDirection="row">
                      <Grid item xs={12} md={12}>
                        <Box className={classes.novoBox}>
                          <TextField
                            className={classes.tf_m}
                            id="Logradouro"
                            // label="Logradouro"
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
                            // label="Matricula"
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
                          // label="Naturalidade"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={naturalidade}
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
                          // label="Estado do Nascimento"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={estadoNascimento}
                          variant="outlined"
                          placeholder=""
                          size="small"
                          onBlur={
                            estadoNascimento === ''
                              ? () => setValidarEstadoNascimento('nao')
                              : () => setValidarEstadoNascimento('sim')
                          }
                          onChange={(e) => setEstadoNascimento(e.target.value)}
                          error={validarEstadoNascimento === 'nao'}
                          onFocus={(e) => setEstadoNascimento(e.target.value)}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Box className={classes.novoBox}>
                        <TextField
                          className={classes.tf_m}
                          id="Nacionalidade"
                          // label="Nacionalidade"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={nacionalidade}
                          variant="outlined"
                          placeholder=""
                          size="small"
                          onBlur={
                            nacionalidade === ''
                              ? () => setValidarNacionalidade('nao')
                              : () => setValidarNacionalidade('sim')
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
                          // label="Sexo"
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
                          // label="Jurisdição Estadual"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={jurisdicaoEstadual}
                          variant="outlined"
                          placeholder=""
                          size="small"
                          onBlur={
                            JurisdicaoEstadual === ''
                              ? () => setValidarJurisdicaoEstadual('nao')
                              : () => setValidarJurisdicaoEstadual('sim')
                          }
                          onChange={(e) =>
                            setJurisdicaoEstadual(e.target.value)
                          }
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
                          // label="Distrito"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={distrito}
                          variant="outlined"
                          placeholder=""
                          size="small"
                          onBlur={
                            Distrito === ''
                              ? () => setValidarDistrito('nao')
                              : () => setValidarDistrito('sim')
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
                          // label="FormacaoEscolar"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={formacaoEscolar}
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
                          // label="Cônjuge"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={conjuge}
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
                          // label="Estado Civil"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={estadoCivil}
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
                          // label="CPF do Conjuge"
                          type="text"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={cpfMask(cpfConjuge)}
                          variant="outlined"
                          placeholder=""
                          size="small"
                          onBlur={
                            cpfConjuge === ''
                              ? () => setValidarCPFConjuge('nao')
                              : () => setValidarCPFConjuge('sim')
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
                          // label="Telefone do Cônjuge"
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
            </form>
          ) : null}
        </Box>
      </Box>
      <Box
        mt={0}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <Box mr={2} mb={0.3}>
          <Button color="secondary" variant="contained" onClick={atualizar}>
            Atualizar
          </Button>
        </Box>
        <Box
          bgcolor="#1e88e5"
          display="flex"
          alignItems="center"
          textAlign="center"
          width={200}
          height={40}
        >
          <Button onClick={subTelaMobile} variant="contained" color="info">
            <ChevronLeftIcon />
          </Button>
          <Box sx={{ color: '#fff', fontWeight: 'bold' }} width={100}>
            {value + 1}/5
          </Box>
          <Button onClick={addTelaMobile} variant="contained" color="info">
            <ChevronRightIcon />
          </Button>
        </Box>
      </Box>
      <Box>
        <Modal
          open={open2}
          //  onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            display="block"
            flexDirection="column"
            className={classes.paper}
            width="auto"
            height="100vh"
          >
            <Box height={altura - 100}>
              <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              />
            </Box>
            <Box display="none">
              <canvas
                ref={previewCanvasRef}
                // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                style={{
                  width: Math.round(completedCrop?.width ?? 0),
                  height: Math.round(completedCrop?.height ?? 0),
                }}
              />
            </Box>
            <Box bgcolor="#fff">
              <Box textAlign="center" mt={-2}>
                <Button
                  color="warning"
                  onClick={() => {
                    generateDownload(previewCanvasRef.current, completedCrop);

                    setOpen2(false);
                  }}
                  variant="contained"
                  severity="success"
                  endIcon={<TouchAppIcon />}
                >
                  Ajuste a Imagem e pressione qui para Conluir
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading === 'enviado' && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert
                action={
                  <Button
                    color="success"
                    onClick={() => {
                      setLoading('Esperando');
                      setOpen(false);
                    }}
                    size="small"
                    severity="success"
                  >
                    <CancelIcon />
                  </Button>
                }
                severity="success"
              >
                Dados atualizados
              </Alert>
            </Stack>
          )}
          {loading === 'naoPreenchido' && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert
                action={
                  <Button
                    onClick={() => {
                      setLoading('Esperando');
                      setOpen(false);
                    }}
                    color="warning"
                    size="small"
                    severity="success"
                  >
                    <CancelIcon />
                  </Button>
                }
                severity="warning"
              >
                Exitem campos não preenchidos!!!
              </Alert>
            </Stack>
          )}
          {loading === 'falha' && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert
                action={
                  <Button
                    onClick={() => {
                      setLoading('Esperando');
                      setOpen(false);
                    }}
                    color="error"
                    size="small"
                    severity="error"
                  >
                    <CancelIcon />
                  </Button>
                }
                severity="error"
              >
                ops!! Erro na transferencia de dados, tente novamente
              </Alert>
            </Stack>
          )}
          {loading === 'enviando' && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert
                action={
                  <Button
                    onClick={() => {
                      setLoading('Esperando');
                      setOpen(false);
                    }}
                    color="info"
                    size="small"
                    severity="info"
                  >
                    <CancelIcon />
                  </Button>
                }
                severity="info"
              >
                Enviando Dados...
              </Alert>
            </Stack>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default DadosPessoais;
