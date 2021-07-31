import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { green, yellow } from '@material-ui/core/colors';
import { Box } from '@material-ui/core';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
// import InputAdornment from '@material-ui/core/InputAdornment';
import SaveIcon from '@material-ui/icons/Save';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
// import ResponsiveTable from 'material-ui-next-responsive-table';
// import ResponsiveTable from 'material-ui-next-responsive-table';
import AddIcon from '@material-ui/icons/Add';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { useSession, signOut } from 'next-auth/client';
import useSWR, { mutate } from 'swr';
import CircularProgress from '@material-ui/core/CircularProgress';
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

function formulario({ item, Data, Semana, qtSemana }) {
  const classes = useStyles();

  // const [editar, setEditar] = React.useState(true);

  const mes = String(Number(Data.slice(3, 5)));
  const ano = Data.slice(6, 10);
  const [session] = useSession();
  const [editar, setEditar] = React.useState();
  const [igreja] = React.useState(item[0].igreja);
  const [codigoIgreja] = React.useState(item[0].codigoIgreja);
  const [semana] = React.useState(Semana);
  const [dataRelatorio, setDataRelatorio] = React.useState(Data);
  const [adultos, setAdultos] = React.useState('');
  const [adolecentes, setAdolecentes] = React.useState('');
  const [criancas, setCriancas] = React.useState('');
  const [visitantes, setVisitantes] = React.useState('');
  const [conversoes, setConversoes] = React.useState('');
  const [ofertas, setOfertas] = React.useState('');
  const [dizimos, setDizimos] = React.useState('');
  /* const [validarAdultos, setValidarAdultos] = React.useState('sim');
  const [validarAdolecentes, setValidarAdolecentes] = React.useState('sim');
  const [validarCriancas, setValidarCriancas] = React.useState('sim');
  const [validarVisitantes, setValidarVisitantes] = React.useState('sim');
  const [validarConversoes, setValidarConversoes] = React.useState('sim');
  const [validarOfertas, setValidarOfertas] = React.useState('sim');
  const [validarDizimos, setValidarDizimos] = React.useState('sim');
  const [contador, setContador] = React.useState(0); */
  const [loading, setLoading] = React.useState(false);
  //---------------------------------------------------------------------
  // console.log('Semana', Data, d);
  // <Number locale="de-DE">{ofertas}</Number>;
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

  const dadosRel = data.filter((val) => val.semana === Semana);
  //  const nomeIgrejas = data.filter((el, i) => data.indexOf(el) === i);
  let DataRelatorio = 'dd/mm/aaaa';
  let sem = Semana;
  let Adultos = '';
  let Adolecentes = '';
  let Crianças = '';
  let Visitantes = '';
  let Conversoes = '';
  let Ofertas = 0;
  let Dizimos = 0;
  let ids = '';
  if (dadosRel.length !== 0) {
    DataRelatorio = dadosRel[0].dataRelatorio;
    Adultos = dadosRel[0].adultos;
    Adolecentes = dadosRel[0].adolecentes;
    Crianças = dadosRel[0].criancas;
    Visitantes = dadosRel[0].visitantes;
    sem = dadosRel[0].semana;
    Conversoes = dadosRel[0].conversoes;
    Ofertas = String(formatarMoeda(dadosRel[0].ofertas));
    Dizimos = String(formatarMoeda(dadosRel[0].dizimos));
    ids = dadosRel[0].id;
  }

  //--------------------------------------------------------------------------
  // console.log(ofertas, Ofertas);
  //--------------------------------------------------------------------------
  const valid = () => {
    if (
      !adultos ||
      !adolecentes ||
      !criancas ||
      !visitantes ||
      !conversoes ||
      !ofertas ||
      !dizimos
    ) {
      return false;
    }
    return true;
  };
  //--------------------------------------------------------------------------
  const handleClick = () => {
    setAdultos(Adultos);
    setAdolecentes(Adolecentes);
    setCriancas(Crianças);
    setVisitantes(Visitantes);
    setConversoes(Conversoes);
    setOfertas(String(formatarMoeda(Ofertas)));
    setDizimos(String(formatarMoeda(Dizimos)));
    setDataRelatorio(Data);

    if (!editar) {
      setEditar(true);
      //  setContador('0');
    } else {
      setEditar(false);
    }
  };
  //--------------------------------------------------------------------------
  const atualizarData = () => {
    setDataRelatorio(Data);
    DataRelatorio = dataRelatorio;
  };
  //--------------------------------------------------------------------------

  const submitData = async (e) => {
    e.preventDefault();
    const valida = valid();
    setLoading(true);
    // const dataRelatorio = DataRelatorio;

    if (valida) {
      try {
        const body = {
          igreja,
          codigoIgreja,
          semana,
          mes,
          ano,
          adultos,
          adolecentes,
          criancas,
          visitantes,
          conversoes,
          dataRelatorio,
          ofertas: String(formatarMoeda(ofertas)),
          dizimos: String(formatarMoeda(dizimos)),
        };

        let urlCreate = '';
        if (dadosRel.length === 0) {
          urlCreate = `${window.location.origin}/api/criarRelatorio`;
        } else {
          urlCreate = `${window.location.origin}/api/updateRelatorio/${ids}`;
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

  // console.log(dataValues);

  return (
    <>
      {session ? (
        <Box
          mt={3}
          className={classes.box}
          width="100%"
          //            maxWidth={1200}
          height="auto"
          borderRadius={16}
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

              <TextField
                id="codigoIgreja"
                label="Código da Igreja"
                variant="outlined"
                value={item[0].codigoIgreja}
                disabled
                className={classes.tf_4}
                size="small"
              />
              {dadosRel.length !== 0 ? (
                <TextField
                  id="data"
                  label="Data do Relatório"
                  variant="outlined"
                  value={DataRelatorio}
                  disabled
                  className={classes.tf_4}
                  size="small"
                />
              ) : (
                <TextField
                  id="data"
                  label="Data do Relatório"
                  variant="outlined"
                  value={dataRelatorio}
                  disabled
                  className={classes.tf_4}
                  size="small"
                  inputRef={atualizarData}
                />
              )}

              <TextField
                id="Semana"
                label="Semana Nº:"
                variant="outlined"
                value={sem}
                disabled
                className={classes.tf_3}
                size="small"
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
                    <TableBody>
                      {dadosRel.map((row) => (
                        <TableRow key={row.igreja}>
                          <TableCell component="th" scope="row">
                            {row.igreja}
                          </TableCell>
                          <TableCell align="center">{row.adultos}</TableCell>
                          <TableCell align="center">
                            {row.adolecentes}
                          </TableCell>
                          <TableCell align="center">{row.criancas}</TableCell>
                          <TableCell align="center">{row.visitantes}</TableCell>
                          <TableCell align="center">{row.conversoes}</TableCell>
                          <TableCell align="center">{row.ofertas}</TableCell>
                          <TableCell align="center">{row.dizimos}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
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
                    <TableBody>
                      {dadosRel.map((row) => (
                        <TableRow key={row.igreja}>
                          <TableCell component="th" scope="row">
                            {row.igreja}
                          </TableCell>
                          <TableCell align="center">{row.adultos}</TableCell>
                          <TableCell align="center">
                            {row.adolecentes}
                          </TableCell>
                          <TableCell align="center">{row.criancas}</TableCell>
                          <TableCell align="center">{row.visitantes}</TableCell>
                          <TableCell align="center">{row.conversoes}</TableCell>
                          <TableCell align="center">{row.ofertas}</TableCell>
                          <TableCell align="center">{row.dizimos}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              <br />
              <br />
              {dadosRel.length === 0 ? (
                <Box className={classes.box}>
                  {!editar ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<AddIcon />}
                      onClick={handleClick}
                      mt={3}
                      //  startIcon={<SaveIcon />}
                    >
                      Novo
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className={classes.buttonCancel}
                      startIcon={<ReplyRoundedIcon />}
                      onClick={handleClick}
                      mt={3}
                      //  startIcon={<SaveIcon />}
                    >
                      Voltar
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={submitData}
                    mt={3}
                    disabled={!!(!editar || !valid())}
                    //  startIcon={<SaveIcon />}
                  >
                    Salvar
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Box>
              ) : (
                <Box className={classes.box}>
                  {!editar ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<EditIcon />}
                      onClick={handleClick}
                      mt={3}
                      //  startIcon={<SaveIcon />}
                    >
                      Editar
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className={classes.buttonCancel}
                      startIcon={<ReplyRoundedIcon />}
                      onClick={handleClick}
                      mt={3}
                      //  startIcon={<SaveIcon />}
                    >
                      Voltar
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={submitData}
                    mt={3}
                    disabled={!!(!editar || !valid())}
                    //  startIcon={<SaveIcon />}
                  >
                    Salvar
                  </Button>
                </Box>
              )}
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </form>
          </Hidden>
          <Hidden mdUp>
            <form
              noValidate
              autoComplete="off"
              width="100%"
              className={classes.root}
            >
              <Grid item xs={12}>
                <Box className={classes.novoBox}>
                  <TextField
                    id="igreja"
                    label="Supervisão"
                    variant="outlined"
                    value={item[0].RegiaoIDPB}
                    disabled
                    size="small"
                    className={classes.tf_m}
                  />
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
                      <TabelaMobile
                        dadosRel={data}
                        item={item}
                        qtSemana={qtSemana}
                      />
                      // <ResponsiveTable columns={columns} data={dataValue} />
                    )}
                  </Box>
                </Grid>
              </Box>

              {dadosRel.length === 0 ? (
                <Box className={classes.box}>
                  {!editar ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<AddIcon />}
                      onClick={handleClick}
                      mt={2}
                      //  startIcon={<SaveIcon />}
                    >
                      Novo
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className={classes.buttonCancel}
                      startIcon={<ReplyRoundedIcon />}
                      onClick={handleClick}
                      mt={3}
                      //  startIcon={<SaveIcon />}
                    >
                      Voltar
                    </Button>
                  )}
                  {!editar || !valid() ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      onClick={submitData}
                      mt={3}
                      disabled
                      //  startIcon={<SaveIcon />}
                    >
                      Salvar
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      onClick={submitData}
                      mt={3}

                      //  startIcon={<SaveIcon />}
                    >
                      Salvar
                    </Button>
                  )}
                </Box>
              ) : (
                <Box className={classes.box}>
                  {!editar ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<EditIcon />}
                      onClick={handleClick}
                      mt={3}
                      //  startIcon={<SaveIcon />}
                    >
                      Editar
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      className={classes.buttonCancel}
                      startIcon={<ReplyRoundedIcon />}
                      onClick={handleClick}
                      mt={3}
                      //  startIcon={<SaveIcon />}
                    >
                      Voltar
                    </Button>
                  )}
                  {!editar || !valid() ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      onClick={submitData}
                      mt={3}
                      disabled
                      //  startIcon={<SaveIcon />}
                    >
                      Salvar
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<SaveIcon />}
                      onClick={submitData}
                      mt={3}

                      //  startIcon={<SaveIcon />}
                    >
                      Salvar
                    </Button>
                  )}
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Box>
              )}
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
