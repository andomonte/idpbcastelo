import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Oval } from 'react-loading-icons';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { TiArrowBack } from 'react-icons/ti';
import Box from '@material-ui/core/Box';
// import HomeIcon from '@material-ui/icons/Home';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useRouter } from 'next/router';
import corIgreja from 'src/utils/coresIgreja';
import EventoColetivo from './telaLoginColetivo';
import EventoIndividual from './telaLoginIndividual';

// import Carrossel from '../carrossel';
// import GoogleMaps from './googleMap';
// import Pesquisar from './pesquisar';

const useStyles = makeStyles((theme) => ({
  rootTopbarIcon: {
    justifyContent: 'space-around',
    backgroundColor: corIgreja.principal,
    width: '70vw',
    minWidth: 80,
  },
  root: {
    backgroundColor: 'theme.palette.background.dark',
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
  },
  root2: {
    backgroundColor: corIgreja.principal,
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    height: 56,
  },
  toolbar: {
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hamburger: {
    cursor: 'pointer',
    height: 28,
  },
  logo: {
    height: 35,
    marginTop: 0,
  },
  avatar: {
    cursor: 'pointer',
    width: 35,
    height: 35,
  },
  contentMain: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },

  drawerHeader: {
    display: 'flex',
    alignItems: 'center',

    // necessary for content to be below app bar
    justifyContent: 'flex',
    marginTop: 56,
  },
  tabPanel: {
    flexGrow: 1,
    backgroundColor: '#fff', // theme.palette.background.default,
    // backgroundImage: `url('/images/home/img01.png')`,
    margin: 0,
    padding: 0,
    flex: '1 1 auto',
    height: '100%',
    maxHeight: 600,
    [theme.breakpoints.down('md')]: {
      height: 'calc(100% - 64px)',
      width: '100%',
    },
  },
  desktopDrawer: {
    width: 240,
    top: 56,
    height: 'calc(100% - 64px)',
    borderRight: 'none',
  },
}));

function Eventos({ eventoSelecionado, usuario }) {
  const classes = useStyles();

  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleDrawerClose = () => {
    // //console.log(mobile);

    if (mobile && open) {
      setOpen(false);
    }
  };

  const [loading, setLoading] = React.useState(false);
  const handleVoltar = () => {
    setLoading(true);
    router.push({
      pathname: '/eventoIdpb',
      query: { Evento: eventoSelecionado.nomeEvento, usuario },
    });

    // setOpen(false);
    // window.location.reload();
  };
  return (
    <div
      style={{
        minWidth: 300,
        background: corIgreja.principal2,
      }}
      onLoad={handleDrawerClose}
    >
      <Box display="flex" alignItems="center">
        <AppBar className={classes.root2}>
          <Toolbar className={classes.toolbar}>
            <Box display="flex" alignItems="center" onClick={handleVoltar}>
              {loading ? (
                <Box>
                  <Oval stroke="white" width={25} height={25} />
                </Box>
              ) : (
                <TiArrowBack size={25} color="white" />
              )}
            </Box>

            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={50}
            >
              <Box textAlign="center" fontFamily="Fugaz One">
                {eventoSelecionado && eventoSelecionado.nomeEvento
                  ? eventoSelecionado.nomeEvento.toUpperCase()
                  : 'EVENTOS DA IGREJA'}
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        <Box height="100%" className={classes.drawerHeader}>
          {/* {children} */}
          {eventoSelecionado.TipoEvento.toUpperCase() === 'COLETIVO' ? (
            <EventoColetivo eventoSelecionado={eventoSelecionado} />
          ) : (
            <EventoIndividual eventoSelecionado={eventoSelecionado} />
          )}{' '}
        </Box>
      </Box>
    </div>
  );
}

export default Eventos;
