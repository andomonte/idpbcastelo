import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { signOut } from 'next-auth/client';
import { Box, Typography, Divider } from '@material-ui/core';
import React from 'react';
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
}));
const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
};
function meuPerfil({ item, secao, ministros }) {
  const classes = useStyles();

  const dadosUser = item.filter((val) => val.email === secao.user.email);

  if (dadosUser.length === 0)
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  const dadosMinistro = ministros.filter(
    (val) =>
      val.Email === dadosUser[0].email &&
      val.Matricula === dadosUser[0].matricula,
  );
  // const dadosMinistro = getDados(item[0].email, item[0].nome);

  return (
    <Box>
      <Hidden smDown>
        <Box borderRadius={16} {...defaultProps}>
          {dadosMinistro[0] && (
            <Box>
              <Box m={2} flexDirection="row" display="flex">
                <Grid item xs={2}>
                  <Box className={classes.logo}>
                    <img src={secao.user.image} alt="" width="125" />
                  </Box>
                </Grid>

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
                      {dadosUser[0].NivelUser}
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
                      {dadosMinistro[0].Logradouro} - {dadosMinistro[0].Numero},{' '}
                      {dadosMinistro[0].Bairro}, {dadosMinistro[0].CEP},{' '}
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
                      {dadosMinistro[0].Cidade} - {dadosMinistro[0].UF}
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
        </Box>
      </Hidden>
      <Hidden mdUp>
        <Box borderRadius={16} {...defaultProps}>
          {dadosMinistro[0] && (
            <Box>
              <Box m={1} flexDirection="row" display="flex">
                <Grid item xs={3}>
                  <Box className={classes.logo}>
                    <img src={secao.user.image} alt="" width="50" />
                  </Box>
                </Grid>

                <Grid item xs={9}>
                  <Box mt={3}>
                    <Typography
                      className={classes.typography}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].Nome}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Divider />
              <Box m={1} flexDirection="row" display="flex">
                <Grid item xs={9}>
                  <Box mt={0}>
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
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      {dadosMinistro[0].Anuidade}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Box m={1} flexDirection="row" display="flex">
                <Grid item xs={12}>
                  <Box>
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
              <Box m={1} flexDirection="row" display="flex">
                <Grid item xs={6}>
                  <Box mt={0}>
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
                <Grid item xs={6}>
                  <Box>
                    <Typography
                      align="center"
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Celular:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].Celular}
                    </Typography>
                  </Box>
                </Grid>
              </Box>

              <Divider />
              <Box m={1} flexDirection="row" display="flex">
                <Grid item xs={12}>
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
                      {dadosMinistro[0].Logradouro} - {dadosMinistro[0].Numero},{' '}
                      {dadosMinistro[0].Bairro}, {dadosMinistro[0].CEP},{' '}
                      {dadosMinistro[0].Cidade}-{dadosMinistro[0].UF}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Divider />
              <Box m={1} flexDirection="row" display="flex">
                <Grid item xs={4}>
                  <Box>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      <small>Estado Civil:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].EstadoCivil}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Box>
                    <Typography
                      align="center"
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Nome do Cônjuge:</small>
                    </Typography>

                    <Typography
                      align="center"
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
              <Box m={1} flexDirection="row" display="flex">
                <Grid item xs={7}>
                  <Box>
                    <Typography
                      align="center"
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Email:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].Email}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  <Box>
                    <Typography
                      align="center"
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Nascimento:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].DataNascimento}
                    </Typography>
                  </Box>
                </Grid>
              </Box>

              <Divider />
              <Box m={1} flexDirection="row" display="flex">
                <Grid item xs={7}>
                  <Box>
                    <Typography
                      align="center"
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Formação Escolar:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].FormacaoEscolar}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  <Box>
                    <Typography
                      align="center"
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Natural de:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosMinistro[0].Cidade} - {dadosMinistro[0].UF}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
            </Box>
          )}
        </Box>
      </Hidden>
    </Box>
  );
}

export default meuPerfil;
