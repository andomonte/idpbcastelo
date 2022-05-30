import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

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

export default function NestedGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box
        fontFamily="arial Black"
        mt={25}
        display="flex"
        justifyContent="center"
      >
        Tela em Desenvolvimento (Ativa em Maio)
      </Box>
    </div>
  );
}
