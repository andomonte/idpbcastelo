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
// import IconEMT from 'src/components/icones/emt';
import SchoolIcon from '@material-ui/icons/School';
import change from 'src/components/icones/change';
import { useSession } from 'next-auth/client';
import IconIdpb from 'src/components/icones/idpb';
import iconesPerfil from 'src/components/icones/perfil';
import React from 'react';
// import BackupIcon from '@material-ui/icons/Backup';
// import AccountBoxIcon from '@material-ui/icons/AccountBox';
// import PollIcon from '@material-ui/icons/Poll';
// import CakeIcon from '@material-ui/icons/Cake';
// import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import iconesBirthdayCake from 'src/components/icones/birthdayCake';
import iconesFinanças from 'src/components/icones/finanças';
// import iconesAnalise from 'src/components/icones/analise';
import iconeAtualizarDados from 'src/components/icones/atualizarDados';
import iconeRelatorio from 'src/components/icones/relatorio';
import midiaPlay from 'src/components/icones/midia';

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

const primaryMenu = [
  {
    id: 1,
    label: 'IDPB-Nacional',
    path: '/idpbNacional/nacionalLogado',
    icon: IconBrasil,
  },
  {
    id: 2,
    label: 'Missões',
    path: '/MinisterioDeMissoes/missoesLogado',
    icon: IconMissoes,
  },
  {
    id: 3,
    label: 'DET',
    path: '/DET',
    icon: SchoolIcon,
  },

  { id: 4, label: 'Quem Somos', path: '/quemSomos', icon: IconIdpb },
];

const secondaryManu = [
  { id: 1, label: 'Meu Perfil', path: '/userPerfil', icon: iconesPerfil },
  {
    id: 2,
    label: 'Rel. de Coordenação',
    path: '/MinisterioDeMissoes/relatorios',
    icon: iconeRelatorio,
  },
  {
    id: 3,
    label: 'Atualizar / Inserir',
    path: '/MinisterioDeMissoes/atualizar',
    icon: iconeAtualizarDados,
  },
  {
    id: 4,
    label: 'Relatório Financeiro',
    path: '/MinisterioDeMissoes/financeiro',
    icon: iconesFinanças,
  },
  {
    id: 5,
    label: 'Aniversariantes',
    path: '/MinisterioDeMissoes/aniversariantes',
    icon: iconesBirthdayCake,
  },
  {
    id: 6,
    label: 'Midia IDPB',
    path: '/MinisterioDeMissoes/midia',
    icon: midiaPlay,
  },
  {
    id: 7,
    label: 'Mudar Usuário',
    path: '/selectPerfil',
    icon: change,
  },
];
function navBar({ perfilUser }) {
  const classes = useStyles();
  const router = useRouter();
  const isSelected = (item) => router.pathname === item.path;
  const [session] = useSession();

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
                <Icon style={{ color: isSelected(itemPrimary) && '#f44336' }} />
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
                    router.push({
                      pathname: itemSecondary.path,
                      query: { perfilUser },
                    });
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
