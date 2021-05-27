import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box } from '@material-ui/core';
import InserirImagem from './inseirImagem';

const useStyles = makeStyles(() => ({
  box: {
    display: 'flex',
    alignItems: 'justify',
    margin: 10,
  },
}));

const uploadFile = () => {
  const classes = useStyles();
  return (
    <Box className={classes.box}>
      <InserirImagem />
    </Box>
  );
};

export default uploadFile;
