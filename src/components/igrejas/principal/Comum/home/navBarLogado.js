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
import { useRouter } from 'next/router';
// import { signIn } from 'next-auth/client';
import IconBrasil from 'src/components/icones/brasil';
import IconMissoes from 'src/components/icones/missoes';
import IconFiladelfia from 'src/components/icones/filadelfia';
import SchoolIcon from '@material-ui/icons/School';
import FacebookIcon from 'src/components/icones/facebook';
import YouTubeIcon from 'src/components/icones/youtube';
import InstagramIcon from 'src/components/icones/instagram';
import iconesPerfil from 'src/components/icones/perfil';
import { useSession } from 'next-auth/client';
import HomeIcon from '@material-ui/icons/Home';
import KeyboardSharpIcon from '@mui/icons-material/KeyboardSharp';
import SvgIcon from '@mui/material/SvgIcon';
import CakeSharpIcon from '@mui/icons-material/CakeSharp';
import corIgreja from 'src/utils/coresIgreja';

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

function SecIcon() {
  return (
    <SvgIcon style={{ color: '#6600ff' }}>
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
function iconeCursos() {
  return (
    <SvgIcon style={{ color: 'blue' }}>
      <SchoolIcon />
    </SvgIcon>
  );
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
    icon: SecIcon,
  },

  { id: 4, label: 'Quem Somos', path: '/quemSomos', icon: IconFiladelfia },
];
const primaryMenuLogin = [
  { id: 1, label: 'IDPB-Nacional', path: '/', icon: IconBrasil },
  {
    id: 2,
    label: 'Missões',
    path: '/MinisterioDeMissoes/missoes',
    icon: IconMissoes,
  },
  {
    id: 3,
    label: 'DET',
    path: '/DET',
    icon: iconeCursos,
  },

  {
    id: 4,
    label: 'Escolher Perfil',
    path: '/selectPerfil',
    icon: iconesPerfil,
  },
];

function navBar({ userIgrejas }) {
  const classes = useStyles();
  const router = useRouter();
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
  ];

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
                router.push(itemSecondary.path);
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
