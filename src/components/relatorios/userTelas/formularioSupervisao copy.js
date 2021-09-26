import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import Loading from 'src/utils/loading';
import TabelaMobile from './tabelaMobile';

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
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
];
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

function formulario({ item, Data }) {
  const classes = useStyles();

  // const [editar, setEditar] = React.useState(true);

  const mes = String(Number(Data.slice(3, 5)));
  const ano = Data.slice(6, 10);
  const [session] = useSession();
  const [editar, setEditar] = React.useState();

  const url = `${window.location.origin}/api/consultaRegiao/${item[0].RegiaoIDPB}/${mes}/${ano}`;
  const { data, error } = useSWR(url, fetcher);
  // const supervisao = item[0].RegiaoIDPB;
  // const url2 = `${window.location.origin}/api/consultaRegiao/${supervisao}`;
  // const { data2, error2 } = useSWR(url2, fetcher);
  // useSWR('/api/user', (id = 4) => fetcher(id));
  // useSWR('/api/consultaDados', fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );
  //---------------------------------------------------------------------------
  const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1,
  };
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
            <form
              noValidate
              autoComplete="off"
              width="100%"
              className={classes.root}
            >
              <TextField
                id="Regiao"
                label="Região"
                variant="outlined"
                value={item[0].RegiaoIDPB}
                disabled
                size="small"
                className={classes.tf_12}
              />

              <br />
              <br />
              {editar ? (
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="caption table">
                    <caption>
                      Relatório semanal das Bases Missionárioas IDPB
                    </caption>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Igrejas</TableCell>
                        <TableCell align="center">Adultos</TableCell>
                        <TableCell align="center">Adolecentes</TableCell>
                        <TableCell align="center">Crianças</TableCell>
                        <TableCell align="center">Visitantes</TableCell>
                        <TableCell align="center">Conversões</TableCell>
                        <TableCell align="center">Ofertas</TableCell>
                        <TableCell align="center">Dízimos</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody />
                  </Table>
                </TableContainer>
              ) : (
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="caption table">
                    <caption>
                      Relatório semanal das Bases Missionárioas IDPB
                    </caption>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Igrejas</TableCell>
                        <TableCell align="center">Adultos</TableCell>
                        <TableCell align="center">Adolecentes</TableCell>
                        <TableCell align="center">Crianças</TableCell>
                        <TableCell align="center">Visitantes</TableCell>
                        <TableCell align="center">Conversões</TableCell>
                        <TableCell align="center">Ofertas</TableCell>
                        <TableCell align="center">Dízimos</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody />
                  </Table>
                </TableContainer>
              )}

              <br />
              <br />
            </form>
          </Hidden>
          <Hidden mdUp>
            <form
              noValidate
              autoComplete="off"
              width="100%"
              className={classes.root}
            >
              <Divider />
              <Grid item xs={12}>
                <Box
                  className={classes.novoBox}
                  mt={-4}
                  style={{ color: '#ffaa11' }}
                >
                  Supervisão:{' '}
                  <strong style={{ color: '#000' }}>
                    {item[0].RegiaoIDPB}{' '}
                  </strong>
                </Box>
              </Grid>
              <Box display="flex" flexDirection="row">
                <Grid item xs={12}>
                  <Box className={classes.novoBox}>
                    {editar ? (
                      <TableContainer component={Paper}>
                        <Table
                          className={classes.table}
                          aria-label="caption table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Igrejas</TableCell>
                              <TableCell align="center">Adultos</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell align="center">
                                  {row.calories}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      <TabelaMobile dadosRel={data} item={item} />
                      // <ResponsiveTable columns={columns} data={dataValue} />
                    )}
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
