import * as React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { Oval } from 'react-loading-icons';
import { Button, capitalize } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import Typography from '@mui/material/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import 'react-image-crop/dist/ReactCrop.css';
import { ToastContainer, toast } from 'react-toastify';
import corIgreja from 'src/utils/coresIgreja';
import 'react-toastify/dist/ReactToastify.css';

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
    backgroundColor: '#ffff',

    margin: 10,
    [theme.breakpoints.down('md')]: {
      width: '20',
    },
  },
  tf_m: {
    backgroundColor: '#ffff',

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
function createListaMembros(value, label) {
  return {
    value,
    label,
  };
}
export default function TabDiscipuado({
  perfilUser,
  setRelCelula,
  rolMembros,
  podeEditar,
}) {
  // const dados = nomesCelulas.map((row) => createData(row.Nome, true));
  const classes = useStyles();

  const dadosUser = rolMembros.filter(
    (val) => val.RolMembro === Number(perfilUser.RolMembro),
  );
  const nomesCelulas = rolMembros.filter(
    (val) =>
      val.Celula === Number(perfilUser.Celula) &&
      val.Distrito === Number(perfilUser.Distrito),
  );
  const nomesCelulaParcial = nomesCelulas.map((rol) =>
    createListaMembros(rol.id, rol.Nome),
  );

  const celularRef = React.useRef();
  const foneRef = React.useRef();
  const cpfRef = React.useRef();
  const rgRef = React.useRef();
  const sexoRef = React.useRef();
  const nascimentoRef = React.useRef();
  const naturalidadeRef = React.useRef();
  const ExaltacaoRef = React.useRef();
  const EvangelismoRef = React.useRef();
  const EdificacaoRef = React.useRef();
  const EncontroRef = React.useRef();
  const LancheRef = React.useRef();
  //--------------------------------------------------------------------------
  const valorInicial = { label: 'Escolha um Responsável', value: 0 };
  const [values, setValues] = React.useState({
    currency: valorInicial,
  });

  const [values2, setValues2] = React.useState({
    currency: valorInicial,
  });
  const [values3, setValues3] = React.useState({
    currency: valorInicial,
  });
  const [values4, setValues4] = React.useState({
    currency: valorInicial,
  });
  const [values5, setValues5] = React.useState({
    currency: valorInicial,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });

    setEncontro(event.target.value);
  };
  const handleChange2 = (name) => (event) => {
    setValues2({ ...values2, [name]: event.target.value });

    setExaltacao(event.target.value);
  };
  const handleChange3 = (name) => (event) => {
    setValues3({ ...values3, [name]: event.target.value });

    setEdificacao(event.target.value);
  };

  const handleChange4 = (name) => (event) => {
    setValues4({ ...values4, [name]: event.target.value });

    setEvangelismo(event.target.value);
  };

  const handleChange5 = (name) => (event) => {
    setValues5({ ...values5, [name]: event.target.value });

    setLanche(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      const formId = event.target.id;

      if (formId === 'Nome') celularRef.current.focus();
      if (formId === 'TelefoneCelular') foneRef.current.focus();
      if (formId === 'TelefoneResidencial') cpfRef.current.focus();
      if (formId === 'CPF') rgRef.current.focus();
      if (formId === 'RG') sexoRef.current.focus();
      if (formId === 'Sexo') nascimentoRef.current.focus();
      if (formId === 'DataNascimento') naturalidadeRef.current.focus();
      if (formId === 'Naturalidade') EncontroRef.current.focus();
    }
  };

  //= ===================================================================
  return (
    <Paper
      sx={{
        background: '#fff9',
        width: '98%',
        height: '95%',
        marginLeft: 0.5,
        marginTop: 1,
        overflow: 'hidden',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width="93vw"
        height="50vh"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={1}
          width="96%"
          height="90vh"
          bgcolor={corIgreja.principal}
        >
          <Box width="96%">
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Box mt={1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    E1 (ENCONTRO)
                  </Typography>
                </Box>
                <Box className={classes.novoBox} mt={-2}>
                  <TextField
                    className={classes.tf_m}
                    id="Encontro"
                    inputRef={EncontroRef}
                    select
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={
                      values.currency ? values.currency : 'Nome do Responsável'
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
                    {nomesCelulaParcial.map((option) => (
                      <MenuItem key={option.value} value={option}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box mt={-1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    E2 (EXALTAÇÃO)
                  </Typography>
                </Box>
                <Box className={classes.novoBox} mt={-2}>
                  <TextField
                    className={classes.tf_m}
                    id="Exaltacao"
                    inputRef={ExaltacaoRef}
                    select
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={
                      values2.currency
                        ? values2.currency
                        : 'Nome do Responsável'
                    }
                    onChange={handleChange2('currency')}
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
                    {nomesCelulaParcial.map((option) => (
                      <MenuItem key={option.value} value={option}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Grid>

              <Grid item xs={12} md={12}>
                <Box mt={-1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    E3 (EDIFICAÇÃO)
                  </Typography>
                </Box>
                <Box className={classes.novoBox} mt={-2}>
                  <TextField
                    className={classes.tf_m}
                    id="Edificacao"
                    inputRef={ExaltacaoRef}
                    select
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={
                      values3.currency
                        ? values3.currency
                        : 'Nome do Responsável'
                    }
                    onChange={handleChange3('currency')}
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
                    {nomesCelulaParcial.map((option) => (
                      <MenuItem key={option.value} value={option}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box mt={-1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    E4 (EVANGELISMO)
                  </Typography>
                </Box>
                <Box className={classes.novoBox} mt={-2}>
                  <TextField
                    className={classes.tf_m}
                    id="Evangelismo"
                    inputRef={ExaltacaoRef}
                    select
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={
                      values4.currency
                        ? values4.currency
                        : 'Nome do Responsável'
                    }
                    onChange={handleChange4('currency')}
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
                    {nomesCelulaParcial.map((option) => (
                      <MenuItem key={option.value} value={option}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box mt={-1} ml={2} color="white" sx={{ fontSize: 'bold' }}>
                  <Typography variant="caption" display="block" gutterBottom>
                    E5 (LANCHE)
                  </Typography>
                </Box>
                <Box className={classes.novoBox} mt={-2}>
                  <TextField
                    className={classes.tf_m}
                    id="Lanche"
                    inputRef={ExaltacaoRef}
                    select
                    type="text"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={
                      values5.currency
                        ? values5.currency
                        : 'Nome do Responsável'
                    }
                    onChange={handleChange5('currency')}
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
                    {nomesCelulaParcial.map((option) => (
                      <MenuItem key={option.value} value={option}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Box>
    </Paper>
  );
}
