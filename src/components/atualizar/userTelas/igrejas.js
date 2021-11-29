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
// import cpfMask from 'src/components/mascaras/cpf';
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
function Igrejas2({ item, secao, igrejas, statusDrawer }) {
  const classes = useStyles();
  const dadosUser = item.filter((val) => val.email === secao.user.email);
  const [igreja, setIgreja] = React.useState('');
  const [validarIgreja, setValidarIgreja] = React.useState('sim');
  const [logo, setLogo] = React.useState('');
  const [validarLogo, setValidarLogo] = React.useState('sim');
  const [codigoIgreja, setCodigoIgreja] = React.useState('');
  const [validarCodigoIgreja, setValidarCodigoIgreja] = React.useState('sim');
  const [latitude, setLatitude] = React.useState('');
  const [validarLatitude, setValidarLatitude] = React.useState('sim');

  const [longitude, setLongitude] = React.useState('');
  const [validarLongitude, setValidarLongitude] = React.useState('sim');

  const [pastorPresidente, setPastorPresidente] = React.useState('');
  const [validarPastorPresidente, setValidarPastorPresidente] = React.useState(
    'sim',
  );
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
  const [tipo, setTipo] = React.useState('');
  const [validarTipo, setValidarTipo] = React.useState('sim');
  const [telefone, settelefone] = React.useState('');
  const [validarTelefone, setValidarTelefone] = React.useState('sim');
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
  const [vinculado, setVinculado] = React.useState('');
  const [validarVinculado, setValidarVinculado] = React.useState('sim');
  const [supervisão, setSupervisão] = React.useState('');
  const [validarSupervisão, setValidarSupervisão] = React.useState('sim');
  const [loading, setLoading] = React.useState('esperando');

  const [nacionalidade, setNacionalidade] = React.useState('');
  const [validarNacionalidade, setValidarNacionalidade] = React.useState('sim');
  //  const [igreja, setIgreja] = React.useState('');
  //  const [validarIgreja, setValidarIgreja] = React.useState('sim');
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
  const dadosIgrejas = igrejas.filter(
    (val) => val.codigoIgreja === dadosUser[0].codigoIgreja,
  );
  //  console.log(dadosIgrejas);

  if (dadosUser.length === 0)
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  const [selectedFile, setSelectedFile] = React.useState(
    dadosIgrejas[0].logo ? dadosIgrejas[0].logo : '',
  );

  /*   const processUpload = (uploadedFile) => {
    console.log('up', uploadedFile[0].name);
    if (uploadedFile[0].name) {
      setFotoPerfil('nomeFoto');
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
 */
  /* const onSelectFile = (e) => {
    setPreview(e.target.files);

    const nomeF = e.target.files[0];
    if (nomeF && nomeF.name) {
      const nomeFoto = `${dadosMinistro[0].codigoIgreja}${nomeF.name.substring(
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
  }; */

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

    //   pegarURL(uploadedFiles);
    // e.preventDefault();

    //    setLoading(true);
    // setFileObjects(arrayFinal);
  };

  //-----------------------------------------------------------------

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

  // const enviarFoto = () => processUpload(previews);
  // const url = `${window.location.origin}/api/consultaEventos/${item[0].codigoIgreja}`;
  // const { data, erroros } = useSWR(url, fetcher);
  // useSWR('/api/user', (id = 4) => fetcher(id));
  // useSWR('/api/consultaDados', fetcher);

  //---------------------------------------------------------------------------
  // const dadosMinistro = data.filter((val) => val.dataEvento === dataEvento);
  let Igreja = '';
  let Logo = '';
  let CodigoIgreja = '';
  let PastorPresidente = '';
  let Tipo = '';
  let Vinculado = '';
  let Supervisão = '';
  let Telefone = '';
  let Email = '';
  let Logradouro = '';
  let Latitude = '';
  let Longitude = '';
  let CEP = '';
  let Numero = '';
  let Complemento = '';
  let Bairro = '';
  let Localidade = '';
  let UF = '';
  let Facebook = '';
  let Instagram = '';
  let Youtube = '';
  let StatusPredio = '';
  let ValorAluguel = '';
  let Locatário = '';
  let VencimentoAluguel = '';
  let Atualizador = '';
  let Capacidade = '';
  let Guitarra = '';
  let Bateria = '';
  let Violao = '';
  let ContraBaixo = '';
  let Teclado = '';
  let Cadeiras = '';
  let Bancos = '';
  let Som = '';
  let MicSemFio = '';
  let MicComFio = '';
  let Salas = '';
  let Terreno = '';
  let STerrreno = '';
  let QytParcelas = '';
  let ParcelasTerreno = '';
  let Consumo = '';
  let OConsumo = '';
  let Membros = '';
  let pCultos = '';
  let dizimistas = '';
  let dizimos = '';
  let ofertas = '';

  //  {dadosMinistro[0].FuncaoNaIgreja}
  if (dadosIgrejas.length !== 0) {
    Igreja = dadosIgrejas[0].igreja;
    Logo = dadosIgrejas[0].logo;
    CodigoIgreja = dadosIgrejas[0].codigoIgreja;
    PastorPresidente = dadosIgrejas[0].pastorPresidente;
    Tipo = dadosIgrejas[0].tipo;
    Vinculado = dadosIgrejas[0].vinculado;
    Supervisão = dadosIgrejas[0].supervisao;
    Telefone = dadosIgrejas[0].telefone;
    Email = dadosIgrejas[0].email;
    Logradouro = dadosIgrejas[0].logradouro;
    Latitude = dadosIgrejas[0].latitude;
    Longitude = dadosIgrejas[0].longitude;
    CEP = dadosIgrejas[0].cep;
    Numero = dadosIgrejas[0].numero;
    Complemento = dadosIgrejas[0].complemento;
    Bairro = dadosIgrejas[0].bairro;
    Localidade = dadosIgrejas[0].localidade;
    UF = dadosIgrejas[0].estado;
    Facebook = dadosIgrejas[0].facebook;
    Instagram = dadosIgrejas[0].instagram;
    Youtube = dadosIgrejas[0].youtube;
    StatusPredio = dadosIgrejas[0].statusPredio;
    ValorAluguel = dadosIgrejas[0].valorAluguel;
    Locatário = '';
    VencimentoAluguel = '';
    Atualizador = '';
    Capacidade = '';
    Guitarra = '';
    Bateria = '';
    Violao = '';
    ContraBaixo = '';
    Teclado = '';
    Cadeiras = '';
    Bancos = '';
    Som = '';
    MicSemFio = '';
    MicComFio = '';
    Salas = '';
    Terreno = '';
    STerrreno = '';
    QytParcelas = '';
    ParcelasTerreno = '';
    Consumo = '';
    OConsumo = '';
    Membros = '';
    pCultos = '';
    dizimistas = '';
    dizimos = '';
    ofertas = '';
  }
  // const [values, setValues] = React.useState(dadosMinistro[0].EstadoCivil);
  const [values, setValues] = React.useState({
    currency: currencies[1],
  }); //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  React.useEffect(() => {
    if (dadosIgrejas.length !== 0) {
      setIgreja(Igreja);
      setCodigoIgreja(CodigoIgreja);
      setTipo(Tipo);
      setPastorPresidente(PastorPresidente);
      setVinculado(Vinculado);
      setSupervisão(Supervisão);
      setEmail(Email);
      settelefone(Telefone);
      setCEP(CEP);
      setNumero(Numero);
      setUF(UF);
      setLatitude(Latitude);
      setLogradouro(Logradouro);
      setComplemento(Complemento);
      setBairro(Bairro);
      setCidade(Localidade);

      /*  setJurisdicaoEstadual(JurisdicaoEstadual);
      setDistrito(Distrito);
      setGrau(GrauMinisterial);
      setFormacaoEscolar(FormacaoEscolar);
      setConjuge(Conjuge);
      setCPFConjuge(CPFConjuge);
      settelefone(Telefone);
     
      setFone(TelefoneResidencial);
      setCelular(Celular);
      setEstadoCivil(EstadoCivil);
      setDataNascimento(DataNascimento);
      setConversao(DataConversao);
      setConsagracao(DataConsagracao);
      setAscensao1(DataAscensao1);
      setAscensao2(DataAscensao2);
      setVinculado(Vinculado);
      
      setNacionalidade(Nacionalidade);
      setFotoPerfil(FotoPerfil);
      setIgreja(Igreja);
      setFuncaoNaIgreja(FuncaoNaIgreja); */
    }
  }, []);

  /* const valid = () => {
    if (
      !nome ||
      !grau ||
      !email ||
      !celular ||
      !fone ||
      !tipo ||
      !codigoIgreja ||
      !rg ||
      !dataNascimento ||
      !conversao ||
      !consagracao ||
      !ascensao1 ||
      !ascensao2 ||
      !vinculado ||
      !supervisão ||
      !nacionalidade ||
      !sexo ||
      !jurisdicaoEstadual ||
      !distrito ||
      !estadoCivil ||
      !conjuge ||
      !cpfConjuge ||
      !fotoPerfil ||
      !telefone
    ) {
      return false;
    }
    return true;
  }; */
  //--------------------------------------------------------------------------
  const getInformacoes = () => {
    axios.get(`http://viacep.com.br/ws/${cep}/json/`).then((response) => {
      setInformacoes(response.data);
      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setCidade(response.data.localidade);
      setLongitude(response.data.longitude);
      setLatitude(response.data.latitude);
      console.log(response);
    });
  };
  const defaultProps = {
    bgcolor: 'background.paper',
    ml: 0.9,
    border: 1,
    width: '96%',
  };

  /*  const atualizar = () => {
    enviarFoto();
    submitData();
  }; */
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
                          // onChange={onSelectFile}
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
                            disabled
                          >
                            Igreja
                          </Typography>
                        </Box>
                      </Grid>
                    </Box>
                  </Box>
                </Grid>
              </Box>
              <Divider variant="middle" />
              {}
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
                          //  onChange={onSelectFile}
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
                      Igreja
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-1}>
                    <TextField
                      className={classes.tf_m}
                      id="Igreja"
                      type="text"
                      InputLabelProps={{
                        style: { textTransform: 'uppercase' },
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
                      onChange={(e) => setIgreja(capitalize(e.target.value))}
                      error={validarIgreja === 'nao'}
                      onFocus={(e) => setIgreja(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
            </Box>
          )}
          {value === 1 && (
            <Box>
              <Box mt={0} display="flex" flexDirection="row">
                <Grid item xs={12} md={9}>
                  <Box mt={1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Pastor Presidente
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="PastorPresidente"
                      type="text"
                      disabled
                      InputLabelProps={{
                        style: { textTransform: 'uppercase' },
                        shrink: true,
                      }}
                      value={pastorPresidente}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        pastorPresidente === ''
                          ? () => setValidarPastorPresidente('nao')
                          : () => setValidarPastorPresidente('sim')
                      }
                      onChange={(e) => setIgreja(capitalize(e.target.value))}
                      error={validarPastorPresidente === 'nao'}
                      onFocus={(e) => setPastorPresidente(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box mt={2} display="flex" flexDirection="row">
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Código da Igreja
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="CódigoIgreja"
                      type="text"
                      disabled
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={codigoIgreja || CodigoIgreja}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        codigoIgreja === ''
                          ? () => setValidarCodigoIgreja('nao')
                          : () => setValidarCodigoIgreja('sim')
                      }
                      onChange={(e) => setCodigoIgreja(e.target.value)}
                      error={validarCodigoIgreja === 'nao'}
                      onFocus={(e) => setCodigoIgreja(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Tipo de Igreja
                    </Typography>
                  </Box>

                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Tipo"
                      // label="Tipo"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={tipo}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      disabled
                      onBlur={
                        tipo === ''
                          ? () => setValidarTipo('nao')
                          : () => setValidarTipo('sim')
                      }
                      onChange={(e) => setTipo(e.target.value)}
                      error={validarTipo === 'nao'}
                      onFocus={(e) => setTipo(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box display="flex" flexDirection="row" mt={2}>
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Vinculado a:
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Vinculado"
                      // label="Vinculado"
                      type="text"
                      disabled
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={vinculado}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        vinculado === ''
                          ? () => setValidarVinculado('nao')
                          : () => setValidarVinculado('sim')
                      }
                      onChange={(e) => setVinculado(e.target.value)}
                      error={validarVinculado === 'nao'}
                      onFocus={(e) => setVinculado(e.target.value)}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Celular para Contato
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Telefone"
                      // label="Telefone do Cônjuge"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={celularMask(telefone)}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        telefone === ''
                          ? () => setValidarTelefone('nao')
                          : () => setValidarTelefone('sim')
                      }
                      onChange={(e) => settelefone(e.target.value)}
                      error={validarTelefone === 'nao'}
                      onFocus={(e) => settelefone(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box mt={2} display="flex" flexDirection="row">
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Supervisão
                    </Typography>
                  </Box>
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Supervisão"
                      // label="Estado do Nascimento"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={supervisão}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      disabled
                      onBlur={
                        supervisão === ''
                          ? () => setValidarSupervisão('nao')
                          : () => setValidarSupervisão('sim')
                      }
                      onChange={(e) => setSupervisão(e.target.value)}
                      error={validarSupervisão === 'nao'}
                      onFocus={(e) => setSupervisão(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
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
                <Grid item xs={12} md={2}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      CEP da Igreja
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
            </Box>
          )}
          {value === 2 && (
            <Box>
              <Box mt={0} display="flex" flexDirection="row">
                <Grid item xs={12} md={9}>
                  <Box mt={1} ml={2} sx={{ fontSize: 'bold' }}>
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
              <Box mt={2} display="flex" flexDirection="row">
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Latitude
                    </Typography>
                  </Box>
                  {console.log(latitude, Latitude)}
                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Latitude"
                      type="text"
                      disabled
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={latitude || Latitude}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      onBlur={
                        latitude === ''
                          ? () => setValidarLatitude('nao')
                          : () => setValidarLatitude('sim')
                      }
                      onChange={(e) => setLatitude(e.target.value)}
                      error={validarLatitude === 'nao'}
                      onFocus={(e) => setLatitude(e.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box mt={-1} ml={2} sx={{ fontSize: 'bold' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Tipo de Igreja
                    </Typography>
                  </Box>

                  <Box className={classes.novoBox} mt={-2}>
                    <TextField
                      className={classes.tf_m}
                      id="Tipo"
                      // label="Tipo"
                      type="text"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={tipo}
                      variant="outlined"
                      placeholder=""
                      size="small"
                      disabled
                      onBlur={
                        tipo === ''
                          ? () => setValidarTipo('nao')
                          : () => setValidarTipo('sim')
                      }
                      onChange={(e) => setTipo(e.target.value)}
                      error={validarTipo === 'nao'}
                      onFocus={(e) => setTipo(e.target.value)}
                    />
                  </Box>
                </Grid>
              </Box>
            </Box>
          )}
        </Hidden>
      </Box>
      <Box
        mt={0}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
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
    </Box>
  );
}

export default Igrejas2;
