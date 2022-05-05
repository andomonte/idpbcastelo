import {
  makeStyles,
  Box,
  Divider,
  // Typography,
  //  Button,
} from '@material-ui/core';
import { HiOutlineIdentification } from 'react-icons/hi';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import React from 'react';
import IconeInstalar from 'src/components/icones/instalar';
import { Oval } from 'react-loading-icons';
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
function SecIcon() {
  return (
    <SvgIcon style={{ color: '#f48fb1' }}>
      <KeyboardSharpIcon />
    </SvgIcon>
  );
}
function CursoIcon({ isSelected }) {
  return (
    <SvgIcon
      style={{
        marginLeft: -148,
        width: 120,
        height: 25,
        color: isSelected ? '#ffeb3b' : '#000',
      }}
    >
      <SchoolIcon />
    </SvgIcon>
  );
}

function QuemSomosIcon({ isSelected }) {
  return (
    <SvgIcon
      style={{
        width: 120,
        height: 25,
        color: isSelected ? '#ffeb3b' : '#000',
      }}
    >
      <HiOutlineIdentification />
    </SvgIcon>
  );
}

function LogoPerfil() {
  return <IconCastelo />;
}
function iconeInstall() {
  return <IconeInstalar size={25} color="yellow" />;
}
function navBar({ userIgrejas, setOpen }) {
  const classes = useStyles();
  const router = useRouter();
  const install = usePWAInstall();
  const isSelected = (item) => router.pathname === item;
  const [esperaHome, setEsperaHome] = React.useState(false);
  const [esperaCurso, setEsperaCurso] = React.useState(false);
  const [esperaQuem, setEsperaQuem] = React.useState(false);
  const [esperaSec, setEsperaSec] = React.useState(false);
  const [esperaFac, setEsperaFac] = React.useState(false);
  const [esperaYouTube, setEsperaYouTube] = React.useState(false);
  const [esperaInst, setEsperaInst] = React.useState(false);
  const [esperaInstall, setEsperaInstall] = React.useState(false);

  const checkInstall = () => {
    if (install) install();
  };
  const [session] = useSession();
  if (session) router.push('/selectPerfil');

  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 15,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
  });
  return (
    <Box className={classes.root}>
      {!esperaHome ? (
        <BootstrapButton
          variant="contained"
          disableRipple
          onClick={() => {
            const checkLocal = isSelected('/');
            console.log('checklocal', checkLocal);
            setEsperaHome(!checkLocal);
            router.push('/');
          }}
          style={{ marginBottom: 2, background: isSelected('/') && '#b92F2F' }}
          startIcon={
            <HomeIcon
              style={{
                marginLeft: -150,
                width: 120,
                height: 25,
                color: isSelected('/') ? '#ffeb3b' : '#fafafa',
              }}
            />
          }
        >
          <Box
            style={{
              color: isSelected('/') ? '#ffeb3b' : '#fff',
            }}
            ml={-9}
            mt={1.8}
            mb={1}
          >
            Home
          </Box>
        </BootstrapButton>
      ) : (
        <BootstrapButton
          variant="contained"
          disableRipple
          style={{ marginBottom: 2, background: isSelected('/') && '#b92F2F' }}
          onClick={() => {
            const checkLocal = isSelected('/');

            if (checkLocal) {
              setEsperaHome(!checkLocal);
              setOpen(false);
            }
            router.push('/');
          }}
          startIcon={
            <Oval
              style={{
                marginLeft: -150,
                width: 120,
                height: 25,
                color: isSelected('/') ? '#ffeb3b' : '#fafafa',
              }}
            />
          }
        >
          <Box
            style={{
              color: isSelected('/') ? '#ffeb3b' : '#fff',
            }}
            ml={-9}
            mt={1.8}
            mb={0.5}
          >
            Home
          </Box>
        </BootstrapButton>
      )}
      {!esperaCurso ? (
        <BootstrapButton
          variant="contained"
          disableRipple
          onClick={() => {
            const checkLocal = isSelected('/cursos');

            setEsperaCurso(!checkLocal);
            router.push('/cursos');
          }}
          style={{
            marginBottom: 5,
            background: isSelected('/cursos') ? '#b92F2F' : corIgreja.principal,
          }}
          startIcon={<CursoIcon isSelected={isSelected('/cursos')} />}
        >
          <Box
            style={{
              color: isSelected('/cursos') ? '#ffeb3b' : '#fff',
            }}
            ml={-9}
            mt={1.2}
            mb={1.2}
          >
            Cursos
          </Box>
        </BootstrapButton>
      ) : (
        <BootstrapButton
          variant="contained"
          disableRipple
          onClick={() => {
            const checkLocal = isSelected('/cursos');

            setEsperaCurso(!checkLocal);
            router.push('/cursos');
          }}
          style={{
            marginBottom: 5,
            background: isSelected('/cursos') && '#b92F2F',
          }}
          startIcon={<CursoIcon isSelected={isSelected('/cursos')} />}
        >
          <Box
            style={{
              color: isSelected('/cursos') ? '#ffeb3b' : '#fff',
            }}
            ml={-9}
            mt={0.8}
            mb={0.5}
          >
            <Oval
              style={{
                marginLeft: -150,
                width: 120,
                height: 25,
                color: isSelected('/cursos') ? '#ffeb3b' : '#fafafa',
              }}
            />
          </Box>
        </BootstrapButton>
      )}

      {!esperaQuem ? (
        <BootstrapButton
          variant="contained"
          disableRipple
          onClick={() => {
            const checkLocal = isSelected('/quemSomos');

            setEsperaQuem(!checkLocal);
            router.push('/quemSomos');
          }}
          style={{
            marginBottom: 5,
            background: isSelected('/quemSomos')
              ? '#b92F2F'
              : corIgreja.principal,
          }}
          startIcon={<QuemSomosIcon isSelected={isSelected('/quemSomos')} />}
        >
          <Box
            style={{
              color: isSelected('/quemSomos') ? '#ffeb3b' : '#fff',
            }}
            ml={-9}
            mr={-6}
            mt={1.2}
            mb={1.2}
          >
            Quem Somos
          </Box>
        </BootstrapButton>
      ) : (
        <BootstrapButton
          variant="contained"
          disableRipple
          onClick={() => {
            const checkLocal = isSelected('/quemSomos');

            setEsperaQuem(!checkLocal);
            router.push('/quemSomos');
          }}
          style={{
            marginBottom: 5,
            background: isSelected('/quemSomos')
              ? '#b92F2F'
              : corIgreja.principal,
          }}
          startIcon={<QuemSomosIcon isSelected={isSelected('/quemSomos')} />}
        >
          <Box
            style={{
              color: isSelected('/quemSomos') ? '#ffeb3b' : '#fff',
            }}
            ml={-9}
            mt={1.2}
            mb={1.2}
          >
            <Oval
              style={{
                marginLeft: -150,
                width: 120,
                height: 25,
                color: isSelected('/quemSomos') ? '#ffeb3b' : '#fafafa',
              }}
            />
          </Box>
        </BootstrapButton>
      )}

      <Box
        mb={0.3}
        display="flex"
        sx={{
          cursor: 'pointer',
          background: isSelected('/secretaria') && '#b92F2F',
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
