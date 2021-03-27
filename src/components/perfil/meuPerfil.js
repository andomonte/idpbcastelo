import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Avatar, Box, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
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
    fontWeight: 500,
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
}));

const meuPerfil = () => {
  const classes = useStyles();
  const [session] = useSession();
  return (
    <div>
      <Hidden smDown>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} lg={4}>
            {session && (
              <Box m={4}>
                <img src={session.user.image} alt="" width="300" />
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
        <img
          src="images/home/telaHome.png"
          alt="img01"
          className={classes.imgMobile}
        />
      </Hidden>
    </div>
  );
};

export default meuPerfil;
