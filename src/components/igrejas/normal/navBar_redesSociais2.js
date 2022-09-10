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
import IconeInstalar from 'src/components/icones/instalar';
// import { useState } from 'react';
import corIgreja from 'src/utils/coresIgreja';
import { useRouter } from 'next/router';
// import { signIn } from 'next-auth/client';
import IconFiladelfia from 'src/components/icones/filadelfia';
import SchoolIcon from '@material-ui/icons/School';
import FacebookIcon from 'src/components/icones/facebook';
import YouTubeIcon from 'src/components/icones/youtube';
import InstagramIcon from 'src/components/icones/instagram';
import IconesPerfil from 'src/components/icones/perfil';
import { useSession } from 'next-auth/client';
import HomeIcon from '@material-ui/icons/Home';
import KeyboardSharpIcon from '@mui/icons-material/KeyboardSharp';
import SvgIcon from '@mui/material/SvgIcon';
import CakeSharpIcon from '@mui/icons-material/CakeSharp';
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
function CursoIcon() {
  return (
    <SvgIcon style={{ color: '#f48fb1' }}>
      <KeyboardSharpIcon />
    </SvgIcon>
  );
}
function NiverIcon() {
  return (
    <SvgIcon style={{ color: '#b2ff59' }}>
      <CakeSharpIcon />
    </SvgIcon>
  );
}
function LogoPerfil() {
  return (
    <SvgIcon style={{ color: '#76ff03' }}>
      <IconesPerfil />
    </SvgIcon>
  );
}
function iconeInstall() {
  return <IconeInstalar size={25} color="white" />;
}
const primaryMenuLogout = [
  { id: 1, label: 'Home', path: '/', icon: HomeIcon },
  {
    id: 2,
    label: 'Cursos',
    path: '/cursos',
    icon: SchoolIcon,
  },
  {
    id: 3,
    label: 'Secretaria',
    path: '/secretaria',
    icon: CursoIcon,
  },
  {
    id: 4,
    label: 'Aniversariantes',
    path: '/Aniversariantes',
    icon: NiverIcon,
  },

  {
    id: 5,
    label: 'Quem Somos',
    path: '/quemSomos',
    icon: IconFiladelfia,
  },
];
const primaryMenuLogin = [
  { id: 1, label: 'Home', path: '/', icon: HomeIcon },
  {
    id: 2,
    label: 'Cursos',
    path: '/cursos',
    icon: SchoolIcon,
  },
  {
    id: 3,
    label: 'Secretaria',
    path: '/secretaria',
    icon: CursoIcon,
  },
  {
    id: 4,
    label: 'Quem Somos',
    path: '/quemSomos',
    icon: IconFiladelfia,
  },
  {
    id: 5,
    label: 'Meu Perfil',
    path: '/meuPerfil',
    icon: LogoPerfil,
  },
];

function navBar({ userIgrejas }) {
  const classes = useStyles();
  const router = useRouter();
  const install = usePWAInstall();
  const isSelected = (item) => router.pathname === item.path;
  const [session] = useSession();

  const secondaryManu = [
    {
      id: 1,
      label: 'FaceBook',
      path: userIgrejas[0].faceBook,
      icon: FacebookIcon,
    },
    {
      id: 2,
      label: 'YouTube',
      path: userIgrejas[0].youTube,
      icon: YouTubeIcon,
    },
    {
      id: 3,
      label: 'Instagran',
      icon: InstagramIcon,
      path: userIgrejas[0].instagram,
    },

    {
      id: 4,
      label: 'Instalar App',
      icon: iconeInstall,
      path: '/installApp',
    },
  ];
  const checkInstall = () => {
    if (install) install();
  };
  const content = (
    <Box className={classes.root}>
      <List>
        {!session
          ? primaryMenuLogout.map((itemPrimary) => {
              const Icon = itemPrimary.icon;
              return (
                <ListItem
                  key={itemPrimary.label}
                  button
                  classes={{ root: classes.listItem }}
                  selected={isSelected(itemPrimary)}
                  onClick={() => {
                    router.push(itemPrimary.path);
                  }}
                >
                  <ListItemIcon>
                    <Icon
                      style={{ color: isSelected(itemPrimary) && '#ffeb3b' }}
                    />
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
            })
          : primaryMenuLogin.map((itemPrimary) => {
              const Icon = itemPrimary.icon;
              return (
                <ListItem
                  key={itemPrimary.label}
                  button
                  classes={{ root: classes.listItem }}
                  selected={isSelected(itemPrimary)}
                  onClick={() => {
                    router.push(itemPrimary.path);
                  }}
                >
                  <ListItemIcon>
                    <Icon
                      style={{ color: isSelected(itemPrimary) && '#ffeb3b' }}
                    />
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
        {secondaryManu.map((itemSecondary) => {
          const Icon = itemSecondary.icon;
          return (
            <ListItem
              key={itemSecondary.id}
              button
              classes={{ root: classes.listItem }}
              selected={isSelected(itemSecondary)}
              onClick={() => {
                if (itemSecondary.path !== '/installApp') {
                  router.push(itemSecondary.path);
                } else {
                  checkInstall();
                }
              }}
            >
              <ListItemIcon>
                <Icon
                  style={{ color: isSelected(itemSecondary) && '#ffeb3b' }}
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
        })}
      </List>
    </Box>
  );
  return content;
}
export default navBar;
