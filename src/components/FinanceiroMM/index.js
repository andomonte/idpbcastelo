import React from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import MensagemCental from 'src/utils/mensagemCentro';
import Hidden from '@material-ui/core/Hidden';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Login from 'src/components/botaoLogin';
// import PerfilIcon from 'src/components/icones/perfil';
import EventIcon from '@material-ui/icons/Event';
import { useSession } from 'next-auth/client';
import PeopleIcon from '@material-ui/icons/People';
// import Evento from './eventos';
import NavbarMinistro from '../navBar/ministerioMissoes/ministros';
import NavbarSuper from '../navBar/ministerioMissoes/supervisor';
import NavbarCoord from '../navBar/ministerioMissoes/coordenador';

// import Culto from './culto';
// import AnalizarRel from './analisar';

// import Analisar from './analisar';
// import Carrossel from '../carrossel';
// import GoogleMaps from './googleMap';
// import Pesquisar from './pesquisar';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  rootTopbarIcon: {
    width: 500,
    justifyContent: 'space-around',
    backgroundColor: theme.palette.background.default,
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
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    width: '100vw',
  },
  root2: {
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
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
    top: 56,
    height: 'calc(100% - 64px)',
    borderRight: 'none',
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

function Financeiro({ title, perfilUser }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const [session] = useSession();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  let LabelAnexos = 'Anexos';
  let LabelEntradas = 'Entradas';
  let LabelSaidas = 'Saídas';

  if (desktop) {
    LabelAnexos = 'Anexo';
    LabelSaidas = 'Saídas';
    LabelEntradas = 'Entradas';
  }

  const handleDrawerOpen = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    //! open ? setOpen(true) : setOpen(false);
  };

  const handleDrawerClose = () => {
    if (mobile && open) {
      setOpen(false);
    }
  };

  return (
    <div onLoad={handleDrawerClose}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="content-language" content="pt-Br" />
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={classes.root}>
        <AppBar className={classes.root2} color="default">
          <ClickAwayListener onClickAway={handleDrawerClose}>
            <Toolbar className={classes.toolbar}>
              <Box display="flex" alignItems="center">
                {open ? (
                  <MenuOpenIcon
                    className={classes.hamburger}
                    onClick={handleDrawerOpen}
                  />
                ) : null}
                {!open ? (
                  <MenuIcon
                    className={classes.hamburger}
                    onClick={handleDrawerOpen}
                  />
                ) : null}

                <Hidden mdDown>
                  <img
                    src="/images/IDPBNAC.png"
                    alt="logo"
                    className={classes.logo}
                  />
                </Hidden>
              </Box>

              <Box display="flex">
                <BottomNavigation
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  showLabels
                  className={classes.rootTopbarIcon}
                >
                  <BottomNavigationAction
                    label={LabelEntradas}
                    icon={<PeopleIcon />}
                  />
                  <BottomNavigationAction
                    label={LabelSaidas}
                    icon={<EventIcon />}
                  />
                  <BottomNavigationAction
                    label={LabelAnexos}
                    icon={<MultilineChartIcon />}
                  />
                </BottomNavigation>
              </Box>
              <Login />
            </Toolbar>
          </ClickAwayListener>
        </AppBar>

        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          className={classes.drawer}
          classes={{ paper: classes.desktopDrawer }}
        >
          {perfilUser === 'ministro' && (
            <NavbarMinistro perfilUser={perfilUser} />
          )}
          {perfilUser === 'sup-MM' && <NavbarSuper perfilUser={perfilUser} />}
          {perfilUser === 'coord-MM' && <NavbarCoord perfilUser={perfilUser} />}
          {perfilUser === 'dir-MM' && <NavbarCoord perfilUser={perfilUser} />}
        </Drawer>

        <main
          className={clsx(classes.contentMain, {
            [classes.contentShiftMain]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {/* {children} */}

          <TabPanel value={value} index={0}>
            {session && <MensagemCental mensagem="Etapa em Desenvolvimento" />}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {session && <MensagemCental mensagem="Etapa em Desenvolvimento" />}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/*  <Eventos item={item} /> */}
            {session && <MensagemCental mensagem="Etapa em Desenvolvimento" />}

            {/* <Analisar item={item} secao={session} /> */}
          </TabPanel>
        </main>
      </div>
    </div>
  );
}

export { Financeiro, TabPanel };
