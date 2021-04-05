import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { useSession } from 'next-auth/client';
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
    fontSize: '25px',
    fontWeight: 1000,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
  typography: {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '14px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '20px',
    },
  },
}));

const meuPerfil = ({ item }) => {
  const classes = useStyles();
  const [session] = useSession();

  const dadosUser = JSON.parse(
    JSON.stringify(item.filter((val) => val.email === session.user.name)),
  );
  console.log(dadosUser);
  return (
    <div>
      <Hidden smDown>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} lg={12}>
            {session && (
              <Box m={4}>
                <img src={session.user.image} alt="" width="200" />
                <Typography
                  className={classes.caption}
                  gutterBottom
                  variant="body1"
                  color="textPrimary"
                >
                  Nome: {session.user.name}
                </Typography>
                <Typography
                  display="block"
                  variant="body2"
                  color="textSecondary"
                  className={classes.typography}
                >
                  Grau Ministerial: {session.user.email}
                </Typography>
                <Typography
                  display="block"
                  variant="body2"
                  color="textSecondary"
                  className={classes.typography}
                >
                  {session.user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {session.user.account}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} lg={12}>
            {session && (
              <Box m={4}>
                <img src={session.user.image} alt="" width="200" />
                <Typography
                  className={classes.caption}
                  gutterBottom
                  variant="body1"
                  color="textPrimary"
                >
                  {session.user.name}
                </Typography>
                <Typography
                  display="block"
                  variant="body2"
                  color="textSecondary"
                  className={classes.typography}
                >
                  Grau Ministerial: {session.user.email}
                </Typography>
                <Typography
                  display="block"
                  variant="body2"
                  color="textSecondary"
                  className={classes.typography}
                >
                  {session.user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {session.user.account}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Hidden>
    </div>
  );
};

export default meuPerfil;
