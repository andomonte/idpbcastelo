import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import { green, yellow } from '@material-ui/core/colors';
import { Box, Avatar, Divider } from '@material-ui/core';
import Image from 'next/image';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { useSession, signOut } from 'next-auth/client';
import Typography from '@material-ui/core/Typography';

import EventoDesk from './eventoDesk';

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

function MostrarBusca({ Data, ministros }) {
  const classes = useStyles();

  const mes = String(Number(Data.slice(3, 5)));
  const [open, setOpen] = React.useState(false);

  const [fotos, setFotos] = React.useState(['']);

  const [session] = useSession();
  let Aniver = 'sem Aniver';
  if (ministros) {
    const ministrosMM = ministros.filter(
      (val) => val.JurisdicaoEstadual.indexOf('MM -') > -1,
    );

    Aniver = ministrosMM.filter(
      (val) => val.DataNascimento.indexOf(`/${mes}/`) > -1,
    );
  }
  const handleFotos = (items) => {
    setFotos(items.fotoPerfil);

    setOpen(true);
  };
  //---------------------------------------------------------------------------
  const dadosUser = Aniver;
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
            <Box width="100%">
              <Box className={classes.novoBox}>ola</Box>
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
                    <Box key={dadosUser}>
                      {dadosUser?.map((items) => (
                        <Box
                          key={items.id}
                          type="button"
                          justifyContent="flex-start"
                        >
                          <Box display="flex">
                            <Box mr={-2} ml={2} mt={2.2}>
                              <Avatar
                                onClick={() => {
                                  handleFotos(items);
                                }}
                                alt="User"
                                className={classes.avatar}
                              >
                                <Image
                                  src={items.fotoPerfil ?? items.fotoPerfil}
                                  alt="alt"
                                  layout="fill"
                                />
                              </Avatar>
                              <Box
                                onClick={() => {
                                  handleFotos(items);
                                }}
                                color="blue"
                                mt={2}
                              >
                                ver fotos
                              </Box>
                            </Box>

                            <Box m={1} ml={5}>
                              <Typography
                                variant="body1"
                                display="block"
                                gutterBottom
                                align="left"
                                className={classes.caption}
                              >
                                {items.igreja ?? items.igreja}
                              </Typography>
                              <Typography
                                display="block"
                                variant="body2"
                                color="textSecondary"
                                align="left"
                                //                  style={{ marginRight: 60 }}
                              >
                                <strong>Evento: </strong>
                                <strong style={{ color: '#64dd17' }}>
                                  {items.evento ?? items.evento}
                                </strong>
                              </Typography>
                              <Box display="flex" flexDirection="row">
                                <Grid item xs={6}>
                                  <Typography
                                    display="block"
                                    variant="body2"
                                    color="textSecondary"
                                    align="left"
                                  >
                                    <strong> Data: </strong>
                                    <small style={{ color: '#c51162' }}>
                                      {items.dataEvento &&
                                        `${items.dataEvento.substr(
                                          0,
                                          2,
                                        )}/${items.dataEvento.substr(
                                          2,
                                          2,
                                        )}/${items.dataEvento.substr(4, 4)} `}
                                    </small>
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography
                                    display="block"
                                    variant="body2"
                                    color="textSecondary"
                                    align="left"

                                    //                  style={{ marginRight: 60 }}
                                  >
                                    <strong>Adultos: </strong>
                                    <strong style={{ color: '#ff9800' }}>
                                      {items.adultos ?? items.adultos}
                                    </strong>
                                  </Typography>
                                </Grid>
                              </Box>
                              <Box display="flex" flexDirection="row">
                                <Grid item xs={6}>
                                  <Typography
                                    display="block"
                                    variant="body2"
                                    color="textSecondary"
                                    align="left"
                                    //                  style={{ marginRight: 60 }}
                                  >
                                    <strong>Adolecentes: </strong>
                                    <strong style={{ color: '#ff9800' }}>
                                      {items.adolecentes ?? items.adolecentes}
                                    </strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography
                                    display="block"
                                    variant="body2"
                                    color="textSecondary"
                                    align="left"
                                    //                  style={{ marginRight: 60 }}
                                  >
                                    <strong>Crianças: </strong>
                                    <strong style={{ color: '#ff9800' }}>
                                      {items.Crianças ?? items.criancas}
                                    </strong>
                                  </Typography>
                                </Grid>
                              </Box>
                              <Box display="flex" flexDirection="row">
                                <Grid item xs={6}>
                                  <Typography
                                    display="block"
                                    variant="body2"
                                    color="textSecondary"
                                    align="left"
                                    //                  style={{ marginRight: 60 }}
                                  >
                                    <strong>Converções: </strong>
                                    <strong style={{ color: '#ff9800' }}>
                                      {items.conversoes ?? items.conversoes}
                                    </strong>
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography
                                    display="block"
                                    variant="body2"
                                    color="textSecondary"
                                    align="left"
                                    //                  style={{ marginRight: 60 }}
                                  >
                                    <strong>Visitantes: </strong>
                                    <strong style={{ color: '#ff9800' }}>
                                      {items.visitantes ?? items.visitantes}
                                    </strong>
                                  </Typography>
                                </Grid>
                              </Box>
                            </Box>
                          </Box>
                          <Divider />
                        </Box>
                      ))}
                    </Box>
                    ,
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

export default MostrarBusca;
