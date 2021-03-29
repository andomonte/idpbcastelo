import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { signOut } from 'next-auth/client';
import { Box, Typography } from '@material-ui/core';
import React from 'react';

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
  page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    marginTop: -10,
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
      fontSize: '14px',
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
  },
}));
const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
};
function meuPerfil({ item, secao }) {
  const classes = useStyles();

  const dadosUser = item.filter((val) => val.email === secao.user.email);
  console.log(dadosUser[0]);
  if (dadosUser.length === 0)
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  return (
    <Box display="flex" justifyContent="center">
      <Hidden smDown borderColor="primary.main" {...defaultProps}>
        <Grid container className={classes.root} spacing={0}>
          <Grid item xs={12} md={12} lg={6} xl={6}>
            <Box borderRadius={16} {...defaultProps}>
              {dadosUser && (
                <Box m={4}>
                  <img src={secao.user.image} alt="" width="130" />
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
                    {dadosUser[0].nome}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Fução:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].funcaoNaIgreja}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Credencial:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].matricula}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Grau Ministerial:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].grauMinisterial}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Tipo de Usuario:</small>
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].NivelUser}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={12} lg={6} xl={6}>
            <Box borderRadius={16} {...defaultProps}>
              {dadosUser && (
                <Box m={4}>
                  <img src={dadosUser[0].imgIgreja} alt="" width="125" />
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
                    {dadosUser[0].igreja}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Pastor Presidente:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].pastorPresidente}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Quantidade de Membros:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].membros}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Vínculada a:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].vinculadaA}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Data da Fundação:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].dataFundacao}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid container className={classes.root} spacing={0}>
          <Grid item xs={12} md={12} lg={6} xl={6}>
            <Box borderRadius={16} {...defaultProps}>
              {dadosUser && (
                <Box m={4}>
                  <img src={secao.user.image} alt="" width="130" />
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
                    {dadosUser[0].nome}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Fução:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].funcaoNaIgreja}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Credencial:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].matricula}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Grau Ministerial:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].grauMinisterial}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Tipo de Usuario:</small>
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].NivelUser}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={12} lg={6} xl={6}>
            <Box borderRadius={16} {...defaultProps}>
              {dadosUser && (
                <Box m={4}>
                  <img src={dadosUser[0].imgIgreja} alt="" width="125" />
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
                    {dadosUser[0].igreja}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Pastor Presidente:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].pastorPresidente}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Quantidade de Membros:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].membros}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Vínculada a:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].vinculadaA}
                  </Typography>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Data da Fundação:</small>
                  </Typography>

                  <Typography
                    display="block"
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {dadosUser[0].dataFundacao}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Hidden>
    </Box>
  );
}

export default meuPerfil;
