import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

/* <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="100%" height="10vh">
        Tela em Desenvolvimento
      </Box>
    </Box> */

function FormRow() {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={4}>
        <Paper className={classes.paper}>item</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>item</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>item</Paper>
      </Grid>
    </>
  );
}
export default function NestedGrid() {
  //  const classes = useStyles();

  return (
    <Box width="100vw" justifyContent="center" display="flex">
      <Box mt={1} width="100%" ml={1}>
        <Grid container spacing={0}>
          <Grid container item xs={12} spacing={1}>
            <FormRow />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
