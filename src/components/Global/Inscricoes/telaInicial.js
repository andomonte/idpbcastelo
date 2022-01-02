import React from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import MenuIcon from '@material-ui/icons/Menu';
import { Box } from '@material-ui/core';
// import HomeIcon from '@material-ui/icons/Home';
// import Hidden from '@material-ui/core/Hidden';
// import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
// import CallIcon from '@material-ui/icons/Call';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Login from 'src/components/botaoLogin';
// import Navbar from './navBar_redesSociais';
import { useRouter } from 'next/router';
import Home from './home';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  rootTopbarIcon: {
    width: 500,
    justifyContent: 'space-around',
    background: '#b91a30',
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
    minHeight: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#b91a30',

    /* borderStyle: 'solid',
    borderColor: '#b91a30 #b91a30 #fff #b91a30',
    borderWidth: '0.5px', */
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
    //  padding: theme.spacing(0, 3),
    // necessary for content to be below app bar
    // justifyContent: 'flex',
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
  letras1: {
    display: 'flex',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fffd',
    marginBottom: 0,
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

function TelaInicial({ title }) {
  const classes = useStyles();
  //  const [value, setValue] = React.useState(0);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(true);

  const handleDrawerClose = () => {
    // console.log(mobile);

    if (mobile && open) {
      setOpen(false);
    }
  };
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="content-language" content="pt-Br" />
        <meta name="google" content="notranslate" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Home />
    </div>
  );
}

export { TelaInicial, TabPanel };
