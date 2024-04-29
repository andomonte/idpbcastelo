import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';

import Box from '@material-ui/core/Box';

import corIgreja from 'src/utils/coresIgreja';

import Tela0 from './tela0';
// import GoogleMaps from './googleMap';
// import Pesquisar from './pesquisar';

const useStyles = makeStyles((theme) => ({
  rootTopbarIcon: {
    justifyContent: 'space-around',
    backgroundColor: corIgreja.principal,
    width: '80vw',
    minWidth: 80,
  },
  data: {
    background: '#fafafa',
  },
  root: {
    backgroundColor: corIgreja.principal,
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
  },
  root2: {
    background: corIgreja.principal,
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    height: 76,
  },
}));

function Portaria({ eventos }) {
  const classes = useStyles();
  // const [pageURL, setPageURL] = React.useState('');
  const [isNativeShare, setNativeShare] = React.useState(false);
  React.useEffect(() => {
    //  setPageURL(window.location.href);
    if (navigator.share) {
      setNativeShare(true);
    }
  }, []);
  return (
    <div>
      <AppBar className={classes.root2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          width="100%"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
            width="100%"
            fontFamily="Fugaz One"
            fontSize="16px"
            color="white"
          >
            REGISTRO DE CREDENCIAL
          </Box>
        </Box>
      </AppBar>
      <main>{isNativeShare ? <Tela0 eventos={eventos} /> : null}</main>
    </div>
  );
}

export default Portaria;
