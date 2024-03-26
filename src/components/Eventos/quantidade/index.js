import React from 'react';

import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { saveAs } from 'file-saver';
import { RiNumbersFill } from 'react-icons/ri';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import { FaChurch } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import Quantidades from './qytInscritos';
import NomesInscritos from './inscritos';
import '@fontsource/rubik';
import '@fontsource/fugaz-one';
import BotaoOpcoes from './botaoOpcoes';
import { style } from '@mui/system';
// import Carrossel from '../carrossel';
// import GoogleMaps from './googleMap';
// import Pesquisar from './pesquisar';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  rootTopbarIcon: {
    justifyContent: 'space-around',
    backgroundColor: 'theme.palette.background.idpb',
    [theme.breakpoints.between('xl', 'lg')]: {
      width: 500,
    },
    [theme.breakpoints.between('md', 'sm')]: {
      width: 200,
    },

    [theme.breakpoints.down('xs')]: {
      width: 80,
    },
  },
  root: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100vh',

    width: '100vw',
    justifyContent: 'center',
  },
  root2: {
    backgroundColor: '#D2691E',
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
    height: '12vh',
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  imgAppBar: {
    // backgroundImage: `url('/images/eventoIdpb/cabecalhoDeck2.png')`,
    backgroundPosition: 'center', // centraliza imagem
    backgroundSize: 'cover', // imagem cobre toda área do div
    height: '15vh',
    minHeight: 100,
    // maxWidth: 400,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',

    [theme.breakpoints.between('md')]: {
      backgroundImage: `url('/images/eventoIdpb/cabecalhoDeck2.png')`,
    },
    [theme.breakpoints.down('sm')]: {
      backgroundImage: `url('/images/eventoIdpb/cabecalhoDesck1.png')`,
    },
    [theme.breakpoints.down('xs')]: {
      backgroundImage: `url('/images/eventoIdpb/cabecalho2.png')`,
    },
  },

  toolbar: {
    minHeight: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#803300',
  },
  hamburger: {
    cursor: 'pointer',
    height: 28,
  },
  logo: {
    height: 25,
    marginLeft: theme.spacing(2),
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
  contentShiftMain: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: +drawerWidth,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 3),
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
    top: 24,
    left: '3vw',
    height: 'calc(100% - 24px)',
    borderRight: 'none',

    [theme.breakpoints.up('md')]: {
      top: 24,
      left: '4vw',
    },
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}
function ConvencaoNacional({ title, inscritos }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [action, setAction] = React.useState('');
  const router = useRouter();
  const baixarRelCongregacoes = () => {
    saveAs(
      '/files/RelEstatisticoCongregacoes.pdf',
      'relatoriodaCongregação.pdf',
    );
  };
  const voltar = () => {
    router.push({
      pathname: '/eventoIdpb',
    });
  };
  const handleBaixarCarta = () => {
    saveAs('/files/cartaDelegado1.pdf', 'carta_de_autorização_do_delegado.pdf');
  };
  const handleGooglemap = () => {
    const url = 'https://goo.gl/maps/gWJLCjnPsJgLMTZM6';
    window.open(url, '_blank');
  };
  React.useEffect(async () => {
    if (action !== '') {
      if (action === 1) baixarRelCongregacoes();

      setAction('');
    }
    if (action !== '') {
      if (action === 2) handleBaixarCarta();

      setAction('');
    }
    if (action !== '') {
      if (action === 3) handleGooglemap();

      setAction('');
    }
    if (action !== '') {
      if (action === 4)
        router.push({
          pathname: '/eventoIdpb/inscritos',
        });
    }
    if (action !== '') {
      if (action === 5) voltar();

      setAction('');
    }
  }, [action]);

  return (
    <div
      style={{
        height: '25vh',
        minHeight: 150,

        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="content-language" content="pt-Br" />
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={classes.root}>
        <AppBar className={classes.root2}>
          <Box
            width="100%"
            // maxWidth={450}
            bgcolor="#803300"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt="0vh"
            ml={0}
          >
            <Box ml={0} width="100%" display="flex">
              <Box ml={3} mt={1.5} width="5%">
                <BotaoOpcoes setAction={setAction} />
              </Box>
              <Box justifyContent="center" width="90%" display="flex">
                <BottomNavigation
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  showLabels
                  style={{ width: '100%', background: '#803300' }}
                >
                  <BottomNavigationAction
                    style={{ color: value === 0 ? '#f0f0f0' : '#8d6e63' }}
                    label="Total"
                    icon={
                      <RiNumbersFill
                        size={30}
                        color={value === 0 ? '#f0f0f0' : '#8d6e63'}
                      />
                    }
                  />
                  <BottomNavigationAction
                    style={{ color: value === 1 ? '#f0f0f0' : '#8d6e63' }}
                    label="Inscritos"
                    icon={
                      <IoIosPeople
                        size={30}
                        color={value === 1 ? '#f0f0f0' : '#8d6e63'}
                      />
                    }
                  />
                  <BottomNavigationAction
                    style={{ color: value === 2 ? '#f0f0f0' : '#8d6e63' }}
                    label="Igrejas"
                    icon={
                      <FaChurch
                        size={30}
                        color={value === 2 ? '#f0f0f0' : '#8d6e63'}
                      />
                    }
                  />
                </BottomNavigation>
              </Box>
            </Box>
          </Box>
        </AppBar>

        <main>
          {/* {children} */}

          <TabPanel value={value} index={0} className={classes.tabPanel}>
            <Quantidades inscritos1={inscritos} />
          </TabPanel>
          <TabPanel value={value} index={1} className={classes.tabPanel}>
            {/*   <Quantidades /> */}
            <NomesInscritos inscritos1={inscritos} />
          </TabPanel>
          <TabPanel value={value} index={2} className={classes.tabPanel}>
            {/*   <Quantidades /> */}
            ola 3
          </TabPanel>
        </main>
      </div>
    </div>
  );
}

export default ConvencaoNacional;
