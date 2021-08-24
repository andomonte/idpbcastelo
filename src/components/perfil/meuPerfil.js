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
    contentMain: {
      flex: '1 1 auto',
      height: '100%',
      overflow: 'auto',
      flexGrow: 1,
      padding: theme.spacing(0),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      // backgroundColor: '#e3f2fd',

      marginLeft: 0,
    },
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
  return (
    <Box align="center">
      <Hidden smDown>
        <Box
          textAlign="center"
          borderRadius={16}
          {...defaultProps}
          width={300}
          height={altura}
          maxHeight={620}
          style={{ backgroundColor: '#ffff8d' }}
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
            <Box mt={3}>
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
                    {dadosMinistro[0].GrauMinisterial ? (
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

            <Box mt={2}>
              {dadosMinistro[0].CPF ? (
                <QRCode size={180} value={dadosMinistro[0].CPF} />
              ) : (
                <QRCode value={dadosUser[0].email} />
              )}
            </Box>
          </Grid>
        </Box>
        {/* <Box borderRadius={16} {...defaultProps}>
          {dadosMinistro[0] && (
            <Box>
              <Box m={2} flexDirection="row" display="flex">
                <Grid item xs={6}>
                  <Box mt={2}>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Nome:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].Nome}
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Função na Igreja:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].FuncaoNaIgreja}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box mt={2}>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Grau Ministerial:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].GrauMinisterial}
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Igreja:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].Igreja}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Divider />

              <Box m={2} flexDirection="row" display="flex">
                <Grid item xs={2}>
                  <Box mt={0}>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Perfil de Usuário:</small>
                    </Typography>
                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {perfilUser}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={8}>
                  <Box>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Endereço:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].Logradouro}-{dadosMinistro[0].Numero},{' '}
                      {dadosMinistro[0].Bairro},{dadosMinistro[0].CEP},{' '}
                      {dadosMinistro[0].Cidade}-{dadosMinistro[0].UF}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Matrícula:</small>
                    </Typography>

                    <Typography
                      display="block"
                      variant="body2"
                      color="textSecondary"
                      className={classes.typography}
                    >
                      {dadosMinistro[0].Matricula}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Divider />
              <Box m={2} flexDirection="row" display="flex">
                <Grid item xs={3}>
                  <Box>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Estado Civil:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].EstadoCivil}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Data de Nascimento:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].DataNascimento}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Celular:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].Celular}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Nome do Cônjuge:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].Conjuge}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Divider />
              <Box m={2} flexDirection="row" display="flex">
                <Grid item xs={5}>
                  <Box>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Email:</small>
                    </Typography>

                    <Typography
                      display="block"
                      variant="body2"
                      color="textSecondary"
                      className={classes.typography}
                    >
                      {dadosMinistro[0].Email}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Natural de:</small>
                    </Typography>

                    <Typography
                      display="block"
                      variant="body2"
                      color="textSecondary"
                      className={classes.typography}
                    >
                      {dadosMinistro[0].Cidade} -{dadosMinistro[0].UF}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={7}>
                  <Box>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Formação Escolar:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].FormacaoEscolar}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={2}>
                  <Box>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      <small>Anuidade:</small>
                    </Typography>

                    <Typography
                      display="block"
                      variant="body2"
                      color="textSecondary"
                      className={classes.typography}
                      align="center"
                    >
                      {dadosMinistro[0].Anuidade}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
            </Box>
          )}
        </Box> */}
      </Hidden>
      <Hidden mdUp>
        <Box
          textAlign="center"
          width="100%"
          style={{ backgroundColor: '#ffff8d' }}
        >
          <Grid item xs={12}>
            <Box align="center">
              <Avatar
                style={{ width: 150, height: 150 }}
                alt="Remy Sharp"
                src={secao.user.image}
              />
            </Box>
            <Box mt={2}>
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
                  <Typography gutterBottom variant="body1" color="textPrimary">
                    {dadosMinistro[0].GrauMinisterial ? (
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

            <Box>
              {dadosMinistro[0].CPF ? (
                <QRCode size={180} value={dadosMinistro[0].CPF} />
              ) : (
                <QRCode value={dadosUser[0].email} />
              )}
            </Box>
          </Grid>
          <br />
        </Box>
      </Hidden>
    </Box>
  );
}

export default meuPerfil;
