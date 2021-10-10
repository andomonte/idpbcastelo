import {
  makeStyles,
  Hidden,
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

import History from '@material-ui/icons/History';
// import { useState } from 'react';
import { useRouter } from 'next/router';
// import { signIn } from 'next-auth/client';
import IconBrasil from 'src/components/icones/brasil';
import IconMissoes from 'src/components/icones/missoes';
import IconAmazonas from 'src/components/icones/amazonas';
import IconIdpb from 'src/components/icones/idpb';
import SchoolIcon from '@material-ui/icons/School';
import FacebookIcon from 'src/components/icones/facebook';
import YouTubeIcon from 'src/components/icones/youtube';
import InstagramIcon from 'src/components/icones/instagram';
import iconesPerfil from 'src/components/icones/perfil';
import { useSession } from 'next-auth/client';

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
      color: '#f44336',
    },
  },
  root: {
    // backgroundColor: theme.palette.background.dark,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffff8d',
  },
}));

const primaryMenuLogout = [
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
    icon: SchoolIcon,
  },

  { id: 4, label: 'Quem Somos', path: '/trendding', icon: IconIdpb },
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
    icon: SchoolIcon,
  },

  {
    id: 4,
    label: 'Escolher Perfil',
    path: '/selectPerfil',
    icon: iconesPerfil,
  },
];

const secondaryManu = [
  { id: 1, label: 'IDPB-AM', path: '/idpbAM', icon: IconAmazonas },
  { id: 2, label: 'IDPB-PA', icon: History },
  { id: 3, label: 'IDPB-RR', icon: History },
  { id: 4, label: 'IDPB-RN', icon: History },
  { id: 5, label: 'IDPB-SP', icon: History },
  { id: 6, label: 'IDPB-MG', icon: History },
];
const redeSociais = [
  {
    id: 1,
    label: 'FaceBook',
    path: 'https://www.facebook.com/IgrejadeDeusPentecostaldoBrasil/?fref=ts',
    icon: FacebookIcon,
  },
  {
    id: 2,
    label: 'YouTube',
    path: 'https://www.youtube.com/channel/UCHNovnY-gkNsG5LRlkjGSTQ',
    icon: YouTubeIcon,
  },
  {
    id: 3,
    label: 'Instagran',
    icon: InstagramIcon,
    path: 'https://www.instagram.com/idpbnacional/',
  },
];
function navBar() {
  const classes = useStyles();
  const router = useRouter();
  const isSelected = (item) => router.pathname === item.path;
  const [session] = useSession();

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
                      style={{ color: isSelected(itemPrimary) && '#f44336' }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    style={{ color: isSelected(itemPrimary) && '#f44336' }}
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
                      style={{ color: isSelected(itemPrimary) && '#f44336' }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    style={{ color: isSelected(itemPrimary) && '#f44336' }}
                    classes={{
                      primary: classes.listItemText,
                    }}
                    primary={itemPrimary.label}
                  />
                </ListItem>
              );
            })}
      </List>
      <Divider />
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
        })}
      </List>
      <Hidden smDown>
        <Divider />
        <Box>
          <List>
            {redeSociais.map((lista) => {
              const Icon = lista.icon;
              return (
                <ListItem
                  key={lista.id}
                  button
                  classes={{ root: classes.listItem }}
                  selected={isSelected(lista)}
                  onClick={() => {
                    router.push(lista.path);
                  }}
                >
                  <ListItemIcon>
                    <Icon style={{ color: isSelected(lista) && '#f44336' }} />
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.listItemText,
                    }}
                    primary={lista.label}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Hidden>
    </Box>
  );
  return content;
}
export default navBar;
