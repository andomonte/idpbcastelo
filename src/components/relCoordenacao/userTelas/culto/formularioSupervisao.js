import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import { green, yellow } from '@material-ui/core/colors';
import { Box } from '@material-ui/core';
import axios from 'axios';
import Loading from 'src/utils/loading';
import MesageErro from 'src/utils/mesageErro';
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

function formulario({ item, Data, statusDrawer, regiaoSelect }) {
  const classes = useStyles();

  const mes = String(Number(Data.slice(3, 5)));
  const ano = Data.slice(6, 10);
  const [session] = useSession();

  const url = `${window.location.origin}/api/consultaRegiao/${regiaoSelect}/${mes}/${ano}`;
  const { data, error } = useSWR(url, fetcher);
  // const supervisao = item[0].RegiaoIDPB;
  // const url2 = `${window.location.origin}/api/consultaRegiao/${supervisao}`;
  // const { data2, error2 } = useSWR(url2, fetcher);
  // useSWR('/api/user', (id = 4) => fetcher(id));
  // useSWR('/api/consultaDados', fetcher);
  if (error)
    return (
      <div>
        <MesageErro statusDrawer={statusDrawer} />
      </div>
    );
  if (!data)
    return (
      <div>
        <Loading statusDrawer={statusDrawer} />
      </div>
    );
  //---------------------------------------------------------------------------

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
                  <TabelaDesk
                    dadosRel={data}
                    item={item}
                    mes={mes}
                    statusDrawer={statusDrawer}
                    regiaoSelect={regiaoSelect}
                  />
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
              <Grid item xs={12} />
              <Box display="flex" flexDirection="row">
                <Grid item xs={12}>
                  <Box className={classes.novoBox}>
                    <TabelaMobile
                      dadosRel={data}
                      item={item}
                      mes={mes}
                      statusDrawer={statusDrawer}
                      regiaoSelect={regiaoSelect}
                    />
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
