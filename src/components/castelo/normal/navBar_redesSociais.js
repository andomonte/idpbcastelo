import {
  makeStyles,
  Box,

  //  ListSubheader,
  //  Avatar,
  Divider,
  // Typography,
  //  Button,
} from '@material-ui/core';
import React from 'react';
import IconeInstalar from 'src/components/icones/instalar';

// import { useState } from 'react';
import corIgreja from 'src/utils/coresIgreja';
import { useRouter } from 'next/router';
// import { signIn } from 'next-auth/client';
import IconCastelo from 'src/components/icones/castelo';
import SchoolIcon from '@material-ui/icons/School';
import FacebookIcon from 'src/components/icones/facebook';
import YouTubeIcon from 'src/components/icones/youtube';
import InstagramIcon from 'src/components/icones/instagram';
import HomeIcon from '@material-ui/icons/Home';
import KeyboardSharpIcon from '@mui/icons-material/KeyboardSharp';
import SvgIcon from '@mui/material/SvgIcon';
import { usePWAInstall } from 'react-use-pwa-install';
import { useSession } from 'next-auth/client';
import meuPerfil from '../logado/relatorios/perfil/meuPerfil copy';

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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
    backgroundColor: corIgreja.principal,
  },
}));
function SecretIcon() {
  return (
    <SvgIcon style={{ color: '#f48fb1' }}>
      <KeyboardSharpIcon />
    </SvgIcon>
  );
}

function navBar({ userIgrejas }) {
  const classes = useStyles();
  const router = useRouter();
  const install = usePWAInstall();
  const isSelected = (item) => router.pathname === item;

  const checkInstall = () => {
    if (install) install();
  };
  const [session] = useSession();
  if (session) router.push('/selectPerfil');

  return (
    <Box className={classes.root}>
      <Box
        mb={0.3}
        display="flex"
        sx={{
          cursor: 'pointer',
          background: isSelected('/') && '#1565c0',
        }}
        classes={{ root: classes.listItem }}
        onClick={() => {
          router.push('/');
        }}
      >
        <HomeIcon style={{ color: isSelected('/') ? '#ffeb3b' : '#fafafa' }} />{' '}
        <Box
          style={{
            color: isSelected('/') ? '#ffeb3b' : '#fff',
          }}
          ml={2}
          mt={0.5}
        >
          Home
        </Box>
      </Box>
      <Box
        mb={0.3}
        display="flex"
        sx={{
          cursor: 'pointer',
          background: isSelected('/cursos') && '#1565c0',
        }}
        classes={{ root: classes.listItem }}
        onClick={() => {
          router.push('/cursos');
        }}
      >
        <SchoolIcon
          style={{ color: isSelected('/cursos') ? '#ffeb3b' : '#000' }}
        />{' '}
        <Box
          style={{
            color: isSelected('/cursos') ? '#ffeb3b' : '#fff',
          }}
          ml={2}
          mt={0.5}
        >
          Cursos
        </Box>
      </Box>
      <Box
        mb={0.3}
        display="flex"
        sx={{
          cursor: 'pointer',
          background: isSelected('/secretaria') && '#1565c0',
        }}
        classes={{ root: classes.listItem }}
        onClick={() => {
          router.push('/secretaria');
        }}
      >
        <SecretIcon
          style={{ color: isSelected('/secretaria') ? '#ffeb3b' : '#faff' }}
        />{' '}
        <Box
          style={{
            color: isSelected('/secretaria') ? '#ffeb3b' : '#fff',
          }}
          ml={2}
          mt={0.5}
        >
          Secretaria
        </Box>
      </Box>
      <Box
        mb={0.3}
        display="flex"
        sx={{
          cursor: 'pointer',
          background: isSelected('/quemSomos') && '#1565c0',
        }}
        classes={{ root: classes.listItem }}
        onClick={() => {
          router.push('/quemSomos');
        }}
      >
        <IconCastelo
          style={{ color: isSelected('/quemSomos') ? '#ffeb3b' : '#faff' }}
        />{' '}
        <Box
          style={{
            color: isSelected('/quemSomos') ? '#ffeb3b' : '#fff',
          }}
          ml={2}
          mt={0.5}
        >
          Quem Somos
        </Box>
      </Box>
      <Divider style={{ marginTop: 10, background: '#fafafa' }} />
      <Box
        mt={2}
        mb={0.3}
        display="flex"
        sx={{
          cursor: 'pointer',
        }}
        classes={{ root: classes.listItem }}
        onClick={() => {
          router.push(userIgrejas[0].faceBook);
        }}
      >
        <FacebookIcon />{' '}
        <Box ml={2} mt={0.5}>
          FaceBook
        </Box>
      </Box>
      <Box
        mt={1}
        mb={0.3}
        display="flex"
        sx={{
          cursor: 'pointer',
        }}
        classes={{ root: classes.listItem }}
        onClick={() => {
          router.push(userIgrejas[0].youTube);
        }}
      >
        <YouTubeIcon />{' '}
        <Box ml={2} mt={0.5}>
          YouTube
        </Box>
      </Box>
      <Box
        mt={1}
        mb={0.3}
        display="flex"
        sx={{
          cursor: 'pointer',
        }}
        classes={{ root: classes.listItem }}
        onClick={() => {
          router.push(userIgrejas[0].instagram);
        }}
      >
        <InstagramIcon />{' '}
        <Box ml={2} mt={0.5}>
          Instagram
        </Box>
      </Box>
      <Box
        mt={1}
        mb={0.3}
        display="flex"
        sx={{
          cursor: 'pointer',
        }}
        classes={{ root: classes.listItem }}
        onClick={() => {
          checkInstall();
        }}
      >
        <IconeInstalar />{' '}
        <Box ml={2} mt={0.5}>
          Instalar App
        </Box>
      </Box>
    </Box>
  );
}
export default navBar;
