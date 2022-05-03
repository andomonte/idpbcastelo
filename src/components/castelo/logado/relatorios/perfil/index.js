import React from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import SvgIcon from '@mui/material/SvgIcon';
import { FaHome } from 'react-icons/fa';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Login from 'src/components/botaoLogin';
// import PerfilIcon from 'src/components/icones/perfil';
import PersonIcon from '@material-ui/icons/Person';
import { useSession } from 'next-auth/client';
// import Eventos from './eventos';
import { IoIosPeople } from 'react-icons/io';
import corIgreja from 'src/utils/coresIgreja';
import NabarSecretaria from '../../navBar/secretaria';
import NabarMembro from '../../navBar/membro';
import NabarLider from '../../navBar/lider';
import NavbarSuper from '../../navBar/supervisor';
import NavbarCoord from '../../navBar/coordenador';
import Endereco from './endereco';
import CelulaMembro from './membro/celula';
import CelulaLider from './lider/celula';
import MeuPerfil from './meuPerfil';
import Padrao from './lider/abas/telaPadrao';
import CadastroUser from './lider/abas/cadastroUser';
// const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  rootTopbarIcon: {
    justifyContent: 'space-around',
    backgroundColor: corIgreja.principal,
    width: '70vw',
    minWidth: 80,
    height: 56,
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
    color: '#fff',
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

function Perfil({ celulas, title, rolMembros, lideranca, perfilUser }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const [session] = useSession();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    <div onLoad={handleDrawerClose} translate="no">
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
                    style={
                      value === 0
                        ? { color: corIgreja.iconeOn, fontSize: '18px' }
                        : { color: '#eeeeee', fontSize: '18px' }
                    }
                    label="Meu"
                    icon={
                      value === 0 ? (
                        <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                          <PersonIcon />
                        </SvgIcon>
                      ) : (
                        <SvgIcon sx={{ color: '#eeeeee' }}>
                          <PersonIcon />
                        </SvgIcon>
                      )
                    }
                  />
                  <BottomNavigationAction
                    style={
                      value === 1
                        ? { color: corIgreja.iconeOn, fontSize: '18px' }
                        : { color: '#eeeeee', fontSize: '18px' }
                    }
                    label="Local"
                    icon={
                      value === 1 ? (
                        <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                          <FaHome />
                        </SvgIcon>
                      ) : (
                        <SvgIcon sx={{ color: '#eeeeee' }}>
                          <FaHome />
                        </SvgIcon>
                      )
                    }
                  />
                  <BottomNavigationAction
                    style={
                      value === 2
                        ? { color: corIgreja.iconeOn, fontSize: '12px' }
                        : { color: '#eeeeee', fontSize: '12px' }
                    }
                    label="Celula"
                    icon={
                      value === 2 ? (
                        <SvgIcon sx={{ color: corIgreja.iconeOn }}>
                          <IoIosPeople />
                        </SvgIcon>
                      ) : (
                        <SvgIcon sx={{ color: '#eeeeee' }}>
                          <IoIosPeople />
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
          {perfilUser.Funcao === 'Secretaria' && (
            <NabarSecretaria perfilUser={perfilUser} />
          )}
          {perfilUser.Funcao === 'Membro' && (
            <NabarMembro perfilUser={perfilUser} />
          )}

          {perfilUser.Funcao === 'Lider' && (
            <NabarLider perfilUser={perfilUser} />
          )}
          {perfilUser.Funcao === 'Supervisor' && (
            <NavbarSuper
              items={lideranca}
              celulas={celulas}
              rolMembros={rolMembros}
              perfilUser={perfilUser}
            />
          )}
          {perfilUser.Funcao === 'Coordenador' && (
            <NavbarCoord
              items={lideranca}
              celulas={celulas}
              rolMembros={rolMembros}
              perfilUser={perfilUser}
            />
          )}
          {perfilUser.Funcao === 'PastorDistrito' && (
            <NavbarCoord
              items={lideranca}
              celulas={celulas}
              rolMembros={rolMembros}
              perfilUser={perfilUser}
            />
          )}
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
                {perfilUser.Funcao === 'Membro' ? (
                  <MeuPerfil secao={session} perfilUser={perfilUser} />
                ) : null}

                {perfilUser.Funcao === 'Lider' ? (
                  <MeuPerfil secao={session} perfilUser={perfilUser} />
                ) : null}
                {perfilUser.Funcao === 'Secretaria' ? (
                  <MeuPerfil secao={session} perfilUser={perfilUser} />
                ) : null}
                {perfilUser.Funcao === 'Supervisor' ? (
                  <MeuPerfil secao={session} perfilUser={perfilUser} />
                ) : null}
                {perfilUser.Funcao === 'Coordenador' ? (
                  <MeuPerfil secao={session} perfilUser={perfilUser} />
                ) : null}
                {perfilUser.Funcao === 'PastorDistrito' ? (
                  <MeuPerfil secao={session} perfilUser={perfilUser} />
                ) : null}
                {perfilUser.Funcao === 'Presidente' ? (
                  <MeuPerfil secao={session} perfilUser={perfilUser} />
                ) : null}
              </Box>
            )}
          </TabPanel>

          <TabPanel value={value} index={1}>
            {session && (
              <Box>
                {perfilUser.Funcao === 'Membro' ? (
                  <Endereco
                    Celulas={celulas}
                    secao={session}
                    perfilUser={perfilUser}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Lider' ? (
                  <Endereco
                    Celulas={celulas}
                    secao={session}
                    perfilUser={perfilUser}
                    rolMembros={rolMembros}
                  />
                ) : null}
                {perfilUser.Funcao === 'Secretaria' ? <CadastroUser /> : null}
                {perfilUser.Funcao === 'Supervisor' ? <Padrao /> : null}
                {perfilUser.Funcao === 'Coordenador' ? <Padrao /> : null}
                {perfilUser.Funcao === 'PastorDistrito' ? <Padrao /> : null}
                {perfilUser.Funcao === 'Presidente' ? <Padrao /> : null}
              </Box>
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/*  <Eventos item={item} /> */}
            {perfilUser.Funcao === 'Membro' ? (
              <CelulaMembro
                perfilUser={perfilUser}
                secao={session}
                rolMembros={rolMembros}
              />
            ) : null}
            {perfilUser.Funcao === 'Lider' ? (
              <CelulaLider
                perfilUser={perfilUser}
                secao={session}
                rolMembros={rolMembros}
              />
            ) : null}
            {perfilUser.Funcao === 'Secretaria' ? <CadastroUser /> : null}
            {perfilUser.Funcao === 'Supervisor' ? <Padrao /> : null}
            {perfilUser.Funcao === 'Coordenador' ? <Padrao /> : null}
            {perfilUser.Funcao === 'PastorDistrito' ? <Padrao /> : null}
            {perfilUser.Funcao === 'Presidente' ? <Padrao /> : null}
          </TabPanel>
        </main>
      </div>
    </div>
  );
}

export { Perfil, TabPanel };
