import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import Hidden from '@material-ui/core/Hidden';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Loading from 'src/utils/loading';
import MesageErro from 'src/utils/mesageErro';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Login from 'src/components/botaoLogin';
// import PerfilIcon from 'src/components/icones/perfil';
import PersonIcon from '@material-ui/icons/Person';
import { useSession } from 'next-auth/client';
// import Eventos from './eventos';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import NavbarMinistro from '../navBar/ministerioMissoes/ministros';
import NavbarSupMM from '../navBar/ministerioMissoes/supervisor';
import NavbarCoordMM from '../navBar/ministerioMissoes/coordenador';
import Igrejas2 from './userTelas/igrejas';
import MudarDados from './userTelas/dadosPessoais';
import Padrao from './userTelas/telaPadrao';

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

function PageAtualizar({ item, igrejas, perfilUser }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const [session] = useSession();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  let LabelIgreja = 'Igreja';
  let LabelHome = 'Usuário';
  let LabelEquipe = 'Equipe';
  const dadosUser = item.filter((val) => val.email === session.user.email);

  if (desktop) {
    LabelIgreja = 'Igreja';
    LabelHome = 'Usuário';
    LabelEquipe = 'Equipe';
  }
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const url = `${window.location.origin}/api/consultaMinistros/${dadosUser[0].email}/${dadosUser[0].nome}`;
  const { data, error } = useSWR(url, fetcher);

  if (error)
    return (
      <div>
        <MesageErro statusDrawer={false} />
      </div>
    );
  if (!data)
    return (
      <div>
        <Loading statusDrawer={false} />
      </div>
    );

  mutate(url);
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
  // document.documentElement.lang = 'pt-BR';
  return (
    <div onLoad={handleDrawerClose}>
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

              <Box display="flex" m={0}>
                <BottomNavigation
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  fontSize="large"
                  showLabels
                  className={classes.rootTopbarIcon}
                >
                  <BottomNavigationAction
                    label={LabelHome}
                    icon={<PersonIcon />}
                  />

                  <BottomNavigationAction
                    label={LabelIgreja}
                    icon={<AccountBalanceIcon />}
                  />
                  <BottomNavigationAction
                    label={LabelEquipe}
                    icon={<GroupWorkIcon />}
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
          {perfilUser === 'sup-MM' && <NavbarSupMM perfilUser={perfilUser} />}
          {perfilUser === 'coord-MM' && (
            <NavbarCoordMM perfilUser={perfilUser} />
          )}
          {perfilUser === 'dir-MM' && <NavbarCoordMM perfilUser={perfilUser} />}
        </Drawer>

        <main
          className={clsx(classes.contentMain, {
            [classes.contentShiftMain]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {/* {children} */}

          <TabPanel value={value} index={0}>
            {session && (
              <Box>
                {data.length ? (
                  <MudarDados
                    ministros={data}
                    item={item}
                    secao={session}
                    perfilUser={perfilUser}
                    statusDrawer={open}
                  />
                ) : (
                  <Box>
                    <Box
                      height="90vh"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mt={-5}
                    >
                      <Box>
                        <img src="/images/idpb.ico" alt="" width="125" />
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mt={-25}
                    >
                      <strong> Apenas para Ministros da IDPB </strong>
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {session && (
              <Igrejas2 item={item} secao={session} igrejas={igrejas} />
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {perfilUser === 'ministro' ? <Padrao /> : null}
            {perfilUser === 'sup-MM' ? <Padrao /> : null}
            {perfilUser === 'coord-MM' ? <Padrao /> : null}
            {perfilUser === 'dir-MM' ? <Padrao /> : null}
            {perfilUser === 'adm_MM' ? <Padrao /> : null}
          </TabPanel>
        </main>
      </div>
    </div>
  );
}

export { PageAtualizar, TabPanel };
