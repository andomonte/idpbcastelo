import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { signOut } from 'next-auth/client';
import { Box, Typography, Avatar } from '@material-ui/core';
import React from 'react';
import QRCode from 'react-qr-code';

/* import useSWR from 'swr';

function getDados(email, nome) {
  const Nome = nome;
  const Email = email;
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const url = `${window.location.origin}/api/consultaMinistros/${Email}/${Nome}`;

  const { data, error } = useSWR(url, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return data;
} */

const useStyles = makeStyles((theme) => ({
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
  avatar: {
    [theme.breakpoints.down('md')]: {
      marginLeft: 2,
    },
  },
  logo: {
    [theme.breakpoints.down('md')]: {
      marginLeft: 2,
    },
  },
  page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    marginTop: -5,
    marginLeft: 5,
    // textTransform: 'capitalize',
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
    color: '#546e7a',
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
      fontSize: '14px',
    },
  },
  root: {
    // backgroundColor: theme.palette.background.dark,
    height: '100%',
    display: 'flex',
    width: 300,
    flexDirection: 'column',
    backgroundColor: '#ffff8d',
  },
}));
const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  color: '#546e7a',
};
function meuPerfil({ item, secao, ministros, perfilUser }) {
  const classes = useStyles();

  const pegarUsuario = item.filter((val) => val.email === secao.user.email);
  const dadosUser = pegarUsuario.filter((val) => val.NivelUser === perfilUser);
  if (dadosUser.length === 0)
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  const dadosMinistro = ministros.filter(
    (val) => val.Email === dadosUser[0].email,
  );
  // const dadosMinistro = getDados(item[0].email, item[0].nome);
  const altura = window.innerHeight;
  const alturaPerc = Number((altura * 85) / 100);
  console.log(altura, alturaPerc);

  return (
    <Box align="center" height={alturaPerc}>
      <Hidden smDown>
        <Box
          borderRadius={16}
          {...defaultProps}
          className={classes.root}
          mt={1}
        >
          <Grid item xs={12}>
            <Box align="center" mt={5}>
              <Avatar
                style={{ width: 150, height: 150 }}
                alt="Remy Sharp"
                src={secao.user.image}
              />
            </Box>
            <Box mt={4}>
              <Typography
                className={classes.caption}
                gutterBottom
                variant="body1"
                color="textPrimary"
              >
                {dadosUser[0].nome}
              </Typography>
            </Box>
            <Box mt={1} style={{ textTransform: 'capitalize' }}>
              <Typography gutterBottom variant="body1" color="textPrimary">
                {dadosUser[0].igreja}
              </Typography>
            </Box>
            <Box mt={1} flexDirection="row" display="flex">
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" ml={1}>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    mr={1}
                    mt={0.2}
                    className={classes.rotulo}
                  >
                    <small>Grau Ministerial: </small>
                  </Box>
                  <Typography gutterBottom variant="body1" color="textPrimary">
                    {dadosMinistro.length > 0 ? (
                      <strong>{dadosMinistro[0].GrauMinisterial}</strong>
                    ) : (
                      <strong>{dadosUser[0].GrauMinisterial}</strong>
                    )}
                  </Typography>
                </Box>
              </Grid>
            </Box>
            <Box flexDirection="row" display="flex">
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" ml={1}>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    mr={1}
                    mt={0.2}
                    className={classes.rotulo}
                  >
                    <small>Perfil de Usuário:</small>
                  </Box>
                  <Typography gutterBottom variant="body1" color="textPrimary">
                    <strong>{dadosUser[0].NivelUser}</strong>
                  </Typography>
                </Box>
              </Grid>
            </Box>
            <Box flexDirection="row" display="flex">
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" ml={1}>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    mr={1}
                    mt={0.2}
                    className={classes.rotulo}
                  >
                    <small>Região-IDPB:</small>
                  </Box>
                  <Typography gutterBottom variant="body1" color="textPrimary">
                    <strong>{dadosUser[0].RegiaoIDPB}</strong>
                  </Typography>
                </Box>
              </Grid>
            </Box>

            <Box mt={3}>
              {dadosMinistro.length > 0 ? (
                <QRCode size={180} value={dadosMinistro[0].CPF} />
              ) : (
                <QRCode value={dadosUser[0].email} />
              )}
            </Box>
          </Grid>
        </Box>
      </Hidden>

      <Hidden mdUp>
        <Box
          textAlign="center"
          width="100%"
          height={alturaPerc}
          style={{ backgroundColor: '#ffff8d' }}
        >
          <Box>
            <Grid item xs={12}>
              <Box align="center" mt={1}>
                <Avatar
                  style={{ width: 150, height: 150 }}
                  alt="Remy Sharp"
                  src={secao.user.image}
                />
              </Box>
              <Box mt={alturaPerc > 550 ? 3 : 1}>
                <Typography gutterBottom variant="body1" color="textPrimary">
                  {dadosUser[0].nome}
                </Typography>
              </Box>
              <Box
                mt={1}
                style={{ textTransform: 'capitalize', fontSize: '12px' }}
              >
                <strong> {dadosUser[0].igreja} </strong>
              </Box>
              <Box mt={1} flexDirection="row" display="flex">
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="center" ml={1}>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      mr={1}
                      mt={0.2}
                      className={classes.rotulo}
                    >
                      <small>Grau Ministerial: </small>
                    </Box>
                    <Typography
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro.length > 0 ? (
                        <strong>{dadosMinistro[0].GrauMinisterial}</strong>
                      ) : (
                        <strong>{dadosUser[0].GrauMinisterial}</strong>
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Box flexDirection="row" display="flex">
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="center" ml={1}>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      mr={1}
                      mt={0.2}
                      className={classes.rotulo}
                    >
                      <small>Perfil de Usuário:</small>
                    </Box>
                    <Typography
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <strong>{dadosUser[0].NivelUser}</strong>
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Box flexDirection="row" display="flex">
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="center" ml={1}>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      mr={1}
                      mt={0.2}
                      className={classes.rotulo}
                    >
                      <small>Região-IDPB:</small>
                    </Box>
                    <Typography
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <strong>{dadosUser[0].RegiaoIDPB}</strong>
                    </Typography>
                  </Box>
                </Grid>
              </Box>

              <Box mt={alturaPerc > 550 ? 2 : 1}>
                {dadosMinistro.length > 0 ? (
                  <QRCode size={180} value={dadosMinistro[0].CPF} />
                ) : (
                  <QRCode value={dadosUser[0].email} />
                )}
              </Box>
            </Grid>
          </Box>
          <br />
        </Box>
      </Hidden>
    </Box>
  );
}

export default meuPerfil;
