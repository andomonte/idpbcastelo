import {
  makeStyles,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  //  ListSubheader,
  //  Avatar,
  Divider,
  // Typography,
  //  Button,
} from '@material-ui/core';

// import { useState } from 'react';
import corIgreja from 'src/utils/coresIgreja';
import { useRouter } from 'next/router';
// import { signIn } from 'next-auth/client';
import IconFiladelfia from 'src/components/icones/castelo';
// import IconEMT from 'src/components/icones/emt';
import SchoolIcon from '@material-ui/icons/School';
import change from 'src/components/icones/change';
import { useSession } from 'next-auth/client';
import { FcCalendar } from 'react-icons/fc';
import { FaHome } from 'react-icons/fa';
// import IconesPerfil from 'src/components/icones/perfil';
import React from 'react';
import IconeInstalar from 'src/components/icones/instalar';
// import BackupIcon from '@material-ui/icons/Backup';
// import AccountBoxIcon from '@material-ui/icons/AccountBox';
// import PollIcon from '@material-ui/icons/Poll';
// import CakeIcon from '@material-ui/icons/Cake';
// import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

// import iconesAnalise from 'src/components/icones/analise';
import IconeAtualizarDados from 'src/components/icones/atualizarDados';
import IconeRelatorio from 'src/components/icones/relatorio';
import midiaPlay from 'src/components/icones/midia';
import SvgIcon from '@mui/material/SvgIcon';
import CakeSharpIcon from '@mui/icons-material/CakeSharp';

// import HomeIcon from '@material-ui/icons/Home';
import { IoMdPerson } from 'react-icons/io';
import { MdOutlineScreenSearchDesktop } from 'react-icons/md';
import { usePWAInstall } from 'react-use-pwa-install';

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 240,
  },
  desktopDrawer: {
    width: 240,
    top: 56,
    height: 'calc(100% - 64px)',
    borderRight: 'none',
  },
  avatar: {
    cursor: 'pointer',
    width: 24,
    height: 24,
  },
  listItem: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: theme.spacing(3),
  },
  listItemText: {
    fontSize: 14,
    '&:hover': {
      color: '#ffeb3b',
    },
  },
  root: {
    // backgroundColor: theme.palette.background.dark,
    height: '200%',
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
    backgroundColor: corIgreja.principal,
  },
}));
function HomeIcon2() {
  return (
    <SvgIcon style={{ color: '#ffff ' }}>
      <FaHome />
    </SvgIcon>
  );
}
function CursoIcon() {
  return (
    <SvgIcon style={{ color: '#ffb74d' }}>
      <MdOutlineScreenSearchDesktop />
    </SvgIcon>
  );
}
function NiverIcon() {
  return (
    <SvgIcon style={{ color: '#76ff03' }}>
      <CakeSharpIcon />
    </SvgIcon>
  );
}
function LogoPerfil() {
  return (
    <SvgIcon style={{ color: '#76ff03' }}>
      <IoMdPerson />
    </SvgIcon>
  );
}
function Panejamento() {
  return (
    <SvgIcon style={{ color: '#76ff03' }}>
      <FcCalendar />
    </SvgIcon>
  );
}
function Upload() {
  return (
    <SvgIcon style={{ color: '#ffeb3b' }}>
      <IconeAtualizarDados />
    </SvgIcon>
  );
}

function RelatorioIcones() {
  return <IconeRelatorio cor="#ffe0b2" />;
}
function iconeInstall() {
  return <IconeInstalar size={25} color="white" />;
}
function iconeCursos() {
  return (
    <SvgIcon style={{ color: 'black' }}>
      <SchoolIcon />
    </SvgIcon>
  );
}
const primaryMenu = [
  {
    id: 1,
    label: 'Home',
    path: '/principal',
    icon: HomeIcon2,
  },
  {
    id: 2,
    label: 'Cursos',
    path: '/cursos',
    icon: iconeCursos,
  },
  {
    id: 3,
    label: 'Secretaria',
    path: '/secretaria',
    icon: CursoIcon,
  },

  { id: 4, label: 'Quem Somos', path: '/quemSomos', icon: IconFiladelfia },
  {
    id: 5,
    label: 'Meu Perfil',
    path: '/meuPerfil',
    icon: LogoPerfil,
  },
];

const secondaryManu = [
  {
    id: 1,
    label: 'Relatórios',
    path: '/relatorio',
    icon: RelatorioIcones,
  },
  {
    id: 2,
    label: 'Atualizar',
    path: '/atualizar',
    icon: Upload, // iconeAtualizarDados,
  },
  {
    id: 3,
    label: 'Planejamento',
    path: '/planejamento',
    icon: Panejamento,
  },
  {
    id: 4,
    label: 'Aniversariantes',
    path: '/aniversariantes',
    icon: NiverIcon,
  },
  {
    id: 5,
    label: 'Midia IDPB',
    path: '/midia',
    icon: midiaPlay,
  },
  {
    id: 6,
    label: 'Mudar Usuário',
    path: '/selectPerfil',
    icon: change,
  },
  {
    id: 7,
    label: 'Instalar App',
    icon: iconeInstall,
    path: '/installApp',
  },
];
function navBar({ perfilUser }) {
  const classes = useStyles();
  const router = useRouter();
  const isSelected = (item) => router.pathname === item.path;
  const [session] = useSession();
  const install = usePWAInstall();
  const checkInstall = () => {
    if (install) install();
  };
  const content = (
    <Box className={classes.root}>
      <List>
        {primaryMenu.map((itemPrimary) => {
          const Icon = itemPrimary.icon;
          return (
            <ListItem
              key={itemPrimary.label}
              button
              classes={{ root: classes.listItem }}
              selected={isSelected(itemPrimary)}
              onClick={() => {
                router.push({
                  pathname: itemPrimary.path,
                  query: { perfilUser },
                });
              }}
            >
              <ListItemIcon>
                <Icon style={{ color: isSelected(itemPrimary) && '#ffeb3b' }} />
              </ListItemIcon>
              <ListItemText
                style={{ color: isSelected(itemPrimary) && '#ffeb3b' }}
                classes={{
                  primary: classes.listItemText,
                }}
                primary={itemPrimary.label}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider style={{ background: '#fafafa' }} />
      <List>
        {session
          ? secondaryManu.map((itemSecondary) => {
              const Icon = itemSecondary.icon;
              return (
                <ListItem
                  key={itemSecondary.id}
                  button
                  classes={{ root: classes.listItem }}
                  selected={isSelected(itemSecondary)}
                  onClick={() => {
                    if (itemSecondary.path !== '/installApp') {
                      router.push({
                        pathname: itemSecondary.path,
                        query: { perfilUser },
                      });
                    } else {
                      checkInstall();
                    }
                  }}
                >
                  <ListItemIcon>
                    <Icon
                      style={{ color: isSelected(itemSecondary) && '#f44336' }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.listItemText,
                    }}
                    primary={itemSecondary.label}
                  />
                </ListItem>
              );
            })
          : null}
      </List>
    </Box>
  );
  return content;
}
export default navBar;
