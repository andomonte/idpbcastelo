import React from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import corIgreja from 'src/utils/coresIgreja';
// import HomeIcon from '@material-ui/icons/Home';
import Hidden from '@material-ui/core/Hidden';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@material-ui/icons/Call';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import SvgIcon from '@mui/material/SvgIcon';
import Login from '../../botaoLogin';
import Navbar from '../navBar_redesSociais';
import TelaPadrao from './telaPadrao';
// import Carrossel from '../carrossel';
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
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
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

function QuemSomos({ userIgrejas, title, celulas }) {
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
    // //console.log(mobile);

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
                      <HomeIcon sx={{ color: corIgreja.iconeOn }} />
                    ) : (
                      <HomeIcon sx={{ color: corIgreja.iconeOff }} />
                    )
                  }
                />

                <BottomNavigationAction
                  icon={
                    value === 1 ? (
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <CallIcon />
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ color: corIgreja.iconeOff }}>
                        <CallIcon />
                      </SvgIcon>
                    )
                  }
                />
                <BottomNavigationAction
                  icon={
                    value === 2 ? (
                      <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                        <LocationOnIcon />
                      </SvgIcon>
                    ) : (
                      <SvgIcon sx={{ color: corIgreja.iconeOff }}>
                        <LocationOnIcon />
                      </SvgIcon>
                    )
                  }
                />
              </BottomNavigation>
            </Box>
            <Login />
          </Toolbar>
        </AppBar>

        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          className={classes.drawer}
          classes={{ paper: classes.desktopDrawer }}
        >
          <Navbar userIgrejas={userIgrejas} />
        </Drawer>

        <main
          className={clsx(classes.contentMain, {
            [classes.contentShiftMain]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {/* {children} */}

          <TabPanel value={value} index={0} className={classes.tabPanel}>
            <TelaPadrao userIgrejas={userIgrejas} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TelaPadrao userIgrejas={userIgrejas} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TelaPadrao celulas={celulas} />
          </TabPanel>
        </main>
      </div>
    </div>
  );
}

export default QuemSomos;
