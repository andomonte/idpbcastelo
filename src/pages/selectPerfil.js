import React from 'react';
import { useSession } from 'next-auth/client';
// import { PrismaClient } from '@prisma/client';
import prisma from 'src/lib/prisma';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    width: '50%',
    height: '30%',
    textAlign: 'center',
  },
  formControl: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function selectPerfil({ user }) {
  const classes = useStyles();
  const [session] = useSession();
  const [open, setOpen] = React.useState(false);
  const [perfilUser, setPerfilUser] = React.useState('');
  const router = useRouter();
  let secao = [{ email: '' }];
  const handleClose = () => {};
  const handleChange = (event) => {
    setPerfilUser(event.target.value);
    setOpen(false);
  };

  if (session) {
    secao = user.filter((val) => val.email === session.user.email);

    if (secao.length === 0) {
      return (
        <Box mt={5}>
          <br />
          <br />
          <Box mt={5} className={classes.root}>
            Ocorreu um Erro ao fazer o Login
          </Box>
          <Box className={classes.root}>email: {session.user.email}</Box>
          <Box className={classes.root}>não foi cadastrado</Box>
        </Box>
      );
    }
    const body = (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Esolha seu Perfil
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={perfilUser}
          onChange={handleChange}
          label="Escolha seu Perfil"
        >
          {secao?.map((items) => (
            <MenuItem key={items.NivelUser} value={items.NivelUser}>
              {items.NivelUser ?? items.NivelUser}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
    if (secao.length > 1 && !open && perfilUser === '') setOpen(true);
    if (secao.length === 1 && perfilUser === '')
      setPerfilUser(secao[0].NivelUser);
    // console.log('vai', secao[0].NivelUser);

    if (perfilUser !== '') {
      router.push({
        pathname: '/userPerfil',
        query: { perfilUser },
      });
    }
    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          className={classes.modal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </>
    );
  }
  return (
    <Box align="center" justifyContent="center">
      <h4>IDPB - Pregando a palavra no poder do Espírito Santo </h4>
    </Box>
  );
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const usuario = await prisma.user.findMany();
  return {
    props: {
      user: JSON.parse(JSON.stringify(usuario)),
    }, // will be passed to the pperfilUser component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default selectPerfil;
