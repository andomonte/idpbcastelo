import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';

import { Box, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '1410px',
    maxHeight: '600px',
    width: '100%',
    height: '100%',
  },
  imgMobile: {
    maxWidth: '1110px',
    maxHeight: '500px',
    width: '100%',
    height: 'auto',
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
      fontSize: '18px',
    },
  },
  typography: {
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

function meuPerfil({ item, secao }) {
  const classes = useStyles();

  const dadosUser = item.filter(
    (val) =>
      val.Email === secao.user.email && val.GrauMinisterial !== 'CÔNJUGE',
  );

  return (
    <div>
      <Hidden smDown>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={8} lg={8}>
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
                  {dadosUser[0].Nome}
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
                  {dadosUser[0].FuncaoNaIgreja} da {dadosUser[0].Igreja}
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
                  {dadosUser[0].Matricula}
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
                  {dadosUser[0].GrauMinisterial}
                </Typography>
                <Typography
                  className={classes.rotulo}
                  gutterBottom
                  variant="body1"
                  color="textPrimary"
                >
                  <small>Mora em:</small>
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.typography}
                >
                  {dadosUser[0].Cidade}-{dadosUser[0].UF}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} lg={12}>
            {dadosUser && (
              <Box m={4}>
                <img src={secao.user.image} alt="" width="100" />
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
                  {dadosUser[0].Nome}
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
                  color="textPrimary"
                  className={classes.caption}
                >
                  {dadosUser[0].FuncaoNaIgreja} da {dadosUser[0].Igreja}
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
                  color="textPrimary"
                  className={classes.typography}
                >
                  {dadosUser[0].Matricula}
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
                  color="textPrimary"
                  className={classes.typography}
                >
                  {dadosUser[0].GrauMinisterial}
                </Typography>
                <Typography
                  className={classes.rotulo}
                  gutterBottom
                  variant="body1"
                  color="textPrimary"
                >
                  <small>Mora em:</small>
                </Typography>

                <Typography
                  variant="body1"
                  color="textPrimary"
                  className={classes.typography}
                >
                  {dadosUser[0].Cidade}-{dadosUser[0].UF}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Hidden>
    </div>
  );
}

export default meuPerfil;
