import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { green, yellow } from '@material-ui/core/colors';
import { Box, Divider } from '@material-ui/core';
import axios from 'axios';
// import Button from '@material-ui/core/Button';
// import EditIcon from '@material-ui/icons/Edit';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import SaveIcon from '@material-ui/icons/Save';
// import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
// import ResponsiveTable from 'material-ui-next-responsive-table';
// import ResponsiveTable from 'material-ui-next-responsive-table';
// import AddIcon from '@material-ui/icons/Add';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { useSession, signOut } from 'next-auth/client';
import useSWR from 'swr';
// import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Accordion from '@material-ui/core/Accordion';
// import moment from 'moment';
// import CalcularData from 'src/utils/calcularData';
import TabelaMobile from './tabelaMobile';
import TabelaDesk from './tabelaDesk';

const fetcher = (url) => axios.get(url).then((res) => res.data);
// const fetcher = (url) => fetch(url).then((r) => r.json());

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    flexGrow: 1,
    alignContent: 'center',
  },
  buttonCancel: {
    alignContent: 'center',
    // color: theme.palette.background.primary,
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
    '&:hover': {
      backgroundColor: yellow[700],
    },
  },
  button: {
    alignContent: 'center',
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
    '& > *': {
      margin: theme.spacing(2),
      // width: '50ch',
    },
  },
  novoBox: {
    flexGrow: 1,

    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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
    width: '150px',
    // alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      marginLeft: 10,
      width: '110px',
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

function formatarMoeda(props) {
  // const elemento = document.getElementById('Ofertas');
  let valor = props;
  valor += '';
  valor = Number(valor.replace(/[\D]+/g, ''));
  valor += '';
  valor = valor.replace(/([0-9]{2})$/g, ',$1');

  if (valor.length > 6) {
    valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');
  }
  return String(valor);
  // elemento.value = valor;
}
function createData(descricao, sem1, sem2, sem3, sem4, sem5, total) {
  return { descricao, sem1, sem2, sem3, sem4, sem5, total };
}

const StyledTableCell = withStyles(() => ({
  root: {
    padding: '0px 0px',
    '&:hover': {
      backgroundColor: 'red',
    },
  },
}))(TableCell);
function formulario({ item, Data }) {
  const classes = useStyles();

  const mes = String(Number(Data.slice(3, 5)));
  const ano = Data.slice(6, 10);
  const [session] = useSession();
  const windowWidth = window.innerWidth;
  const largRotulo = windowWidth / 7 + 20;
  const larg = (windowWidth - largRotulo) / 7;
  const [igrejaSelecionada, setIgrejaSelecionada] = React.useState([]);
  const CabeçalhoTabela = [
    { item: 'adultos', total: '', media: '' },
    { item: 'adolecentes', total: '', media: '' },
    { item: 'criancas', total: '', media: '' },
    { item: 'visitantes', total: '', media: '' },
    { item: 'conversoes', total: '', media: '' },
  ];
  const url = `${window.location.origin}/api/consultaRegiao/${item[0].RegiaoIDPB}/${mes}/${ano}`;
  const { data, error } = useSWR(url, fetcher);
  // const supervisao = item[0].RegiaoIDPB;
  // const url2 = `${window.location.origin}/api/consultaRegiao/${supervisao}`;
  // const { data2, error2 } = useSWR(url2, fetcher);
  // useSWR('/api/user', (id = 4) => fetcher(id));
  // useSWR('/api/consultaDados', fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  //---------------------------------------------------------------------------
  const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1,
  };
  let rows = [];
  rows = [
    createData(
      'Adultos',
      igrejaSelecionada[0] ? igrejaSelecionada[0].adultos : '--',
      igrejaSelecionada[1] ? igrejaSelecionada[1].adultos : '--',
      igrejaSelecionada[2] ? igrejaSelecionada[2].adultos : '--',
      igrejaSelecionada[3] ? igrejaSelecionada[3].adultos : '--',
      igrejaSelecionada[4] ? igrejaSelecionada[4].adultos : '--',
      CabeçalhoTabela[0].media && CabeçalhoTabela[0].media,
    ),
    createData(
      'Adolecentes',
      igrejaSelecionada[0] ? igrejaSelecionada[0].adolecentes : '--',
      igrejaSelecionada[1] ? igrejaSelecionada[1].adolecentes : '--',
      igrejaSelecionada[2] ? igrejaSelecionada[2].adolecentes : '--',
      igrejaSelecionada[3] ? igrejaSelecionada[3].adolecentes : '--',
      igrejaSelecionada[4] ? igrejaSelecionada[4].adolecentes : '--',
      CabeçalhoTabela[1].media && CabeçalhoTabela[1].media,
    ),
    createData(
      'Crianças',
      igrejaSelecionada[0] ? igrejaSelecionada[0].criancas : '--',
      igrejaSelecionada[1] ? igrejaSelecionada[1].criancas : '--',
      igrejaSelecionada[2] ? igrejaSelecionada[2].criancas : '--',
      igrejaSelecionada[3] ? igrejaSelecionada[3].criancas : '--',
      igrejaSelecionada[4] ? igrejaSelecionada[4].criancas : '--',
      CabeçalhoTabela[2].media && CabeçalhoTabela[2].media,
    ),
    createData(
      'Visitantes',
      igrejaSelecionada[0] ? igrejaSelecionada[0].visitantes : '--',
      igrejaSelecionada[1] ? igrejaSelecionada[1].visitantes : '--',
      igrejaSelecionada[2] ? igrejaSelecionada[2].visitantes : '--',
      igrejaSelecionada[3] ? igrejaSelecionada[3].visitantes : '--',
      igrejaSelecionada[4] ? igrejaSelecionada[4].visitantes : '--',
      CabeçalhoTabela[3].media && CabeçalhoTabela[3].media,
    ),
    createData(
      'Conversões',
      igrejaSelecionada[0] ? igrejaSelecionada[0].conversoes : '--',
      igrejaSelecionada[1] ? igrejaSelecionada[1].conversoes : '--',
      igrejaSelecionada[2] ? igrejaSelecionada[2].conversoes : '--',
      igrejaSelecionada[3] ? igrejaSelecionada[3].conversoes : '--',
      igrejaSelecionada[4] ? igrejaSelecionada[4].conversoes : '--',
      CabeçalhoTabela[4].media && CabeçalhoTabela[4].media,
    ),
  ];
  return (
    <>
      {session ? (
        <Box
          mt={3}
          className={classes.box}
          width="100%"
          //            maxWidth={1200}
          height="auto"
        >
          <Hidden smDown>
            <Box>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Box className={classes.novoBox}>
                  <TabelaDesk dadosRel={data} item={item} mes={mes} />
                </Box>
              </Grid>
            </Box>
          </Hidden>
          <Hidden mdUp>
            <form
              noValidate
              autoComplete="off"
              width="100%"
              className={classes.root}
            >
              <Grid item xs={12}>
                <Box
                  className={classes.novoBox}
                  mt={-4}
                  style={{ color: '#000' }}
                >
                  <br />
                  Supervisão:{' '}
                  <strong style={{ color: '#000' }}>
                    {item[0].RegiaoIDPB}{' '}
                  </strong>
                </Box>
              </Grid>
              <Box display="flex" flexDirection="row">
                <Grid item xs={12}>
                  <Box className={classes.novoBox}>
                    <TabelaMobile dadosRel={data} item={item} mes={mes} />
                  </Box>
                </Grid>
              </Box>
            </form>
          </Hidden>
        </Box>
      ) : (
        signOut({
          callbackUrl: `${window.location.origin}`,
        })
      )}
    </>
  );
}

export default formulario;
