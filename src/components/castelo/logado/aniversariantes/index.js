import React from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
// import HomeIcon from '@material-ui/icons/Home';
import Hidden from '@material-ui/core/Hidden';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { FaChurch } from 'react-icons/fa';
import { GiMeepleGroup } from 'react-icons/gi';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SvgIcon from '@mui/material/SvgIcon';
import corIgreja from 'src/utils/coresIgreja';
import { MdGroups } from 'react-icons/md';
import Login from '../../botaoLogin';
import NabarMembro from '../navBar/membro';
import NabarLider from '../navBar/lider';
import NavbarSuper from '../navBar/supervisor';
import NavbarCoord from '../navBar/coordenador';

import Aniversarios from './aniversarios';
import Aniversarios2 from './aniversarios2';
import Aniversarios3 from './aniversarios3';
// import GoogleMaps from './googleMap';
// import Pesquisar from './pesquisar';
const drawerWidth = 240;
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

function Aniversariantes({ rolMembros, title, perfilUser }) {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    //! open ? setOpen(true) : setOpen(false);
  };

  const handleDrawerClose = () => {
    // console.log(mobile);

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
        <AppBar className={classes.root2}>
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
                    src="/images/castelo.png"
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
                    icon={
                      value === 0 ? (
                        <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                          <MdGroups />
                        </SvgIcon>
                      ) : (
                        <SvgIcon sx={{ color: '#eeeeee' }}>
                          <MdGroups />
                        </SvgIcon>
                      )
                    }
                  />

                  <BottomNavigationAction
                    icon={
                      value === 1 ? (
                        <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                          <GiMeepleGroup />
                        </SvgIcon>
                      ) : (
                        <SvgIcon sx={{ color: corIgreja.iconeOff }}>
                          <GiMeepleGroup />
                        </SvgIcon>
                      )
                    }
                  />
                  <BottomNavigationAction
                    icon={
                      value === 2 ? (
                        <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                          <FaChurch />
                        </SvgIcon>
                      ) : (
                        <SvgIcon sx={{ color: corIgreja.iconeOff }}>
                          <FaChurch />
                        </SvgIcon>
                      )
                    }
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
          {perfilUser.Funcao === 'Membro' && (
            <NabarMembro perfilUser={perfilUser} />
          )}

          {perfilUser.Funcao === 'Lider' && (
            <NabarLider perfilUser={perfilUser} />
          )}
          {perfilUser.Funcao === 'Supervisor' && (
            <NavbarSuper perfilUser={perfilUser} />
          )}
          {perfilUser.Funcao === 'Coordenador' && (
            <NavbarCoord perfilUser={perfilUser} />
          )}
          {perfilUser.Funcao === 'PastorDistrito' && (
            <NavbarCoord perfilUser={perfilUser} />
          )}
        </Drawer>

        <main
          className={clsx(classes.contentMain, {
            [classes.contentShiftMain]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {/* {children} */}

          <TabPanel value={value} index={0} className={classes.tabPanel}>
            <Aniversarios rolMembros={rolMembros} perfilUser={perfilUser} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Aniversarios2 rolMembros={rolMembros} perfilUser={perfilUser} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Aniversarios3 rolMembros={rolMembros} perfilUser={perfilUser} />
          </TabPanel>
        </main>
      </div>
    </div>
  );
}

export default Aniversariantes;
