import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { signOut } from 'next-auth/client';
import { Box, Typography, Divider } from '@material-ui/core';
import React from 'react';
/* import useSWR from 'swr';

function getDados(caminho) {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const url = `${window.location.origin}/api/consultaIgrejas/${caminho}`;

  const { data, error } = useSWR(url, fetcher);

 

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
      fontSize: '14px',
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
function Igreja({ item, secao, igrejas }) {
  const classes = useStyles();

  const dadosUser = item.filter((val) => val.email === secao.user.email);

  if (dadosUser.length === 0)
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  // const dadosIgreja = getDados(item[0].codigoIgreja);
  const dadosIgreja = igrejas.filter(
    (val) => val.codigoIgreja === dadosUser[0].codigoIgreja,
  );
  // console.log(dadosIgreja, dadosUser[0].codigoIgreja);
  return (
    <Box>
      <Hidden smDown>
        <Box borderRadius={16} {...defaultProps}>
          {dadosIgreja[0] && (
            <Box>
              <Box m={2} flexDirection="row" display="flex">
                <Grid item xs={2}>
                  <Box className={classes.logo}>
                    <img src={dadosIgreja[0].logo} alt="" width="125" />
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
                      <small>Igreja:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].igreja}
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Tipo:</small>
                    </Typography>
                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].tipo}
                    </Typography>
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
                      <small>Pastor Presidente:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].pastorPresidente}
                    </Typography>
                  </Box>
                  <Box mt={2}>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Jurisdição:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].vinculado} -{dadosIgreja[0].supervisao}
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
                      align="center"
                    >
                      <small>Codigo da Igreja:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      {dadosIgreja[0].codigoIgreja}
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
                      <small>Endereço:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].logradouro} -{dadosIgreja[0].numero},{' '}
                      {dadosIgreja[0].bairro},{dadosIgreja[0].cep},{' '}
                      {dadosIgreja[0].localidade}-{dadosIgreja[0].estado}
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
                      <small>Prédio:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      {dadosIgreja[0].statusPredio}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Divider />
              <Box m={2} flexDirection="row" display="flex">
                <Grid item xs={2}>
                  <Box>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      <small>Capacidade:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      {dadosIgreja[0].capacidade}
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
                      <small>Membros:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      {dadosIgreja[0].membros}
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
                      <small>Cultos:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      {dadosIgreja[0].pCultos}
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
                      <small>Dizimistas:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      {dadosIgreja[0].dizimistas}
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
                      <small>Dízimo Mensal:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      {dadosIgreja[0].dizimos}
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
                      <small>Oferta Mensal:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      {dadosIgreja[0].ofertas}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Divider />
              <Box m={2} flexDirection="row" display="flex">
                <Grid item xs={2}>
                  <Box>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      <small>Guitarra:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      {dadosIgreja[0].guitarra}
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
                      <small>Violão:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      {dadosIgreja[0].violao}
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
                      <small>Bateria:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      {dadosIgreja[0].bateria}
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
                      <small>Contra Baixo:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      {dadosIgreja[0].contrabaixo}
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
                      <small>Caixa Som:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      {dadosIgreja[0].som}
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
                      <small>Mic SemFio:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      {dadosIgreja[0].micSemFio}
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
                      <small>Mic ComFio:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      align="center"
                    >
                      {dadosIgreja[0].micComFio}
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
          {dadosIgreja[0] && (
            <Box>
              <Box m={1} flexDirection="row" display="flex">
                <Grid item xs={3}>
                  <Box className={classes.logo}>
                    <img src={dadosIgreja[0].logo} alt="" width="50" />
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
                      {dadosIgreja[0].igreja}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Divider />
              <Box m={1} flexDirection="row" display="flex">
                <Box mt={0}>
                  <Typography
                    className={classes.rotulo}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    <small>Pastor Presidente:</small>
                  </Typography>

                  <Typography
                    className={classes.caption}
                    gutterBottom
                    variant="body1"
                    color="textPrimary"
                  >
                    {dadosIgreja[0].pastorPresidente}
                  </Typography>
                </Box>
              </Box>
              <Box m={1} flexDirection="row" display="flex">
                <Grid item xs={8}>
                  <Box>
                    <Typography
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Jurisdição:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].vinculado} -{dadosIgreja[0].supervisao}
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
                      <small>Prédio:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].statusPredio}
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
                      <small>Endereço:</small>
                    </Typography>

                    <Typography
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].logradouro} -{dadosIgreja[0].numero},{' '}
                      {dadosIgreja[0].bairro},{dadosIgreja[0].cep},{' '}
                      {dadosIgreja[0].localidade}-{dadosIgreja[0].estado}
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
                      <small>Capacidade:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].capacidade}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Typography
                      align="center"
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Membros:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].membros}
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
                      <small>Pessoas no Cultos:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].pCultos}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
              <Box m={1} flexDirection="row" display="flex">
                <Grid item xs={4}>
                  <Box>
                    <Typography
                      align="center"
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Dizimistas:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].dizimistas}
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
                      align="center"
                    >
                      <small>Dízimo Mensal:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].dizimos}
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
                      <small>Oferta Mensal:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].ofertas}
                    </Typography>
                  </Box>
                </Grid>
              </Box>

              <Divider />
              <Box m={1} flexDirection="row" display="flex">
                <Grid item xs={3}>
                  <Box>
                    <Typography
                      align="center"
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Guitarra:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].guitarra}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                    <Typography
                      align="center"
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Violão:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].violao}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box>
                    <Typography
                      align="center"
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Bateria:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].bateria}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={3}>
                  <Box>
                    <Typography
                      align="center"
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Contra Baixo:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].contrabaixo}
                    </Typography>
                  </Box>
                </Grid>
              </Box>

              <Divider />
              <Box m={2} flexDirection="row" display="flex">
                <Grid item xs={4}>
                  <Box>
                    <Typography
                      align="center"
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Mic SemFio:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].micSemFio}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Typography
                      align="center"
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Mic ComFio:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].micComFio}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box>
                    <Typography
                      align="center"
                      className={classes.rotulo}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      <small>Caixa Som:</small>
                    </Typography>

                    <Typography
                      align="center"
                      className={classes.caption}
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                    >
                      {dadosIgreja[0].som}
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

export default Igreja;
