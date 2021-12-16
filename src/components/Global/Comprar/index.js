import React from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Box } from '@material-ui/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import TelaCompra from './telaCompra';

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
  letras1: {
    display: 'flex',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fffd',
    marginBottom: 0,
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

function Compra({ title, inscritos }) {
  const classes = useStyles();
  //  const [value, setValue] = React.useState(0);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const handleDrawerClose = () => {
    // console.log(mobile);

    if (mobile && open) {
      setOpen(false);
    }
  };

  const voltar = () => {
    router.push({
      pathname: '/global',
      //   query: { dadosMesa2, numeroGame },
    });
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
              <Box display="flex" align="center" m={0}>
                <Box
                  height={30}
                  p={1}
                  ml={0}
                  mr={0}
                  display="flex"
                  alignItems="center"
                  sx={{ backgroundColor: '#a91a30' }}
                >
                  <ArrowBackIcon
                    sx={{
                      fontSize: 20,
                      color: '#fff',
                    }}
                    onClick={voltar}
                  />
                </Box>
              </Box>
              <Box
                height={30}
                p={1}
                ml={0}
                mr={0}
                display="flex"
                alignItems="center"
              >
                <Box className={classes.letras1}>INSCRIÇÃO</Box>
              </Box>

              <Box display="flex" align="center" m={0}>
                <Box
                  height={30}
                  p={1}
                  ml={0}
                  mr={0}
                  display="flex"
                  alignItems="center"
                >
                  <ArrowBackIcon
                    sx={{
                      fontSize: 20,
                      color: '#b91a30',
                    }}
                  />
                </Box>
              </Box>
            </Toolbar>
          </ClickAwayListener>
        </AppBar>

        <main
          className={clsx(classes.contentMain, {
            [classes.contentShiftMain]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {/* {children} */}

          <TelaCompra inscritos={inscritos} />
        </main>
      </div>
    </div>
  );
}

export default Compra;
