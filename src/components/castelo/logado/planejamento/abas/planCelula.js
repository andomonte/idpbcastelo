import { Box, Grid, Paper, Button } from '@material-ui/core';
import React from 'react';

import useSWR from 'swr';
// import { useRouter } from 'next/router';
import TabCelula from 'src/components/castelo/logado/planejamento/planejamentoCelulaMembro';
// import horarioMask from 'src/components/mascaras/horario';
import corIgreja from 'src/utils/coresIgreja';
import DateFnsUtils from '@date-io/date-fns';
import Select from 'react-select';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { IoIosSave } from 'react-icons/io';

import axios from 'axios';
import Espera from 'src/utils/espera';
import Erros from 'src/utils/erros';
import { IoArrowUndoSharp, IoArrowRedoSharp } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Typography from '@mui/material/Typography';
import 'react-image-crop/dist/ReactCrop.css';

const fetcher = (url) => axios.get(url).then((res) => res.data);
// const fetcher2 = (url2) => axios.get(url2).then((res) => res.dataVisitante);
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
  novoBox2: {
    flexGrow: 1,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
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
  textField: {
    textAlign: 'center',
    fontSize: '12px',
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
    backgroundColor: '#ffff',

    margin: 10,
    [theme.breakpoints.down('md')]: {
      width: '20',
    },
  },
  tf_m: {
    backgroundColor: '#f5f5f5',

    width: '96%',
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
  tf_s2: {
    textAlign: 'center',
    display: 'flex',
    marginLeft: 28,
    width: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
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
function createListaMembros(value, label) {
  return {
    value,
    label,
  };
}

function RelatorioCelebracao({ planCelula }) {
  const classes = useStyles();

  const dadosUser = [];
  dadosUser[0] = planCelula;

  const [Encontro, setEncontro] = React.useState(dadosUser[0].Encontro);
  const [Exaltacao, setExaltacao] = React.useState(dadosUser[0].Exaltacao);
  const [Evangelismo, setEvangelismo] = React.useState(
    dadosUser[0].Evangelismo,
  );
  const [Lanche, setLanche] = React.useState(dadosUser[0].Lanche);
  const [Edificacao, setEdificacao] = React.useState(dadosUser[0].Edificacao);

  //--------------------------------------------------------------------------

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={corIgreja.principal}
      height="90vh"
      width="100vw"
      minWidth={370}
      minHeight={500}
    >
      ola
    </Box>
  );
}

export default RelatorioCelebracao;
