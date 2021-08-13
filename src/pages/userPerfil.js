import React from 'react';
import { Perfil } from 'src/components/perfil/index';
import { useSession } from 'next-auth/client';
// import { PrismaClient } from '@prisma/client';
import prisma from 'src/lib/prisma';

import { Convenção } from 'src/components/convencao/index';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() => ({
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
}));
function userPerfil({ org, ministros, igrejas }) {
  const classes = useStyles();
  const [session] = useSession();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');
  let secao = [{ email: '' }];
  // console.log(org, 'organização');

  if (session) {
    secao = org.filter((val) => val.email === session.user.email);

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
    const perfilEscolhido = () => {
      if (age === 'ministro') {
        <Perfil
          item={org}
          title="SISTEMA-IDPB"
          ministros={ministros}
          igrejas={igrejas}
        />;
      }
      if (age === 'sup-MM') {
        <Perfil
          item={org}
          title="SISTEMA-IDPB"
          ministros={ministros}
          igrejas={igrejas}
        />;
      }
      if (age === 'convenção') {
        <Convenção
          item={org}
          title="SISTEMA-IDPB"
          ministros={ministros}
          igrejas={igrejas}
        />;
      }
    };

    const handleSelect = (event) => {
      // const codigoIgreja = event.target.value;

      setAge(event.target.value);
      setOpen(false);

      perfilEscolhido();
    };
    const handleClose = () => {
      setOpen(false);
    };
    if (secao.length > 1 && open === false && age === '') {
      setOpen(true);
    }

    const body = (
      <FormControl
        variant="outlined"
        className={classes.selectEmpty}
        key="select"
        size="small"
      >
        <FormHelperText style={{ color: '#000' }}>
          Escolha seu Perfil
        </FormHelperText>

        <Select
          labelId="label"
          id="label"
          value={age}
          onChange={handleSelect}
          displayEmpty
          className={classes.selectEmpty}
        >
          {secao?.map((items) => (
            <MenuItem key={items.id} value={items.NivelUser}>
              {items.NivelUser ?? items.NivelUser}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );

    return (
      <>
        {secao[0].NivelUser === 'ministro' ? (
          <Perfil
            item={org}
            title="SISTEMA-IDPB"
            ministros={ministros}
            igrejas={igrejas}
          />
        ) : null}
        {secao[0].NivelUser === 'sup-MM' ? (
          <Perfil
            item={org}
            title="SISTEMA-IDPB"
            ministros={ministros}
            igrejas={igrejas}
          />
        ) : null}
        {secao[0].NivelUser === 'convenção' ? (
          <Convenção
            item={org}
            title="SISTEMA-IDPB"
            ministros={ministros}
            igrejas={igrejas}
          />
        ) : null}
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

  const posts = await prisma.user.findMany();
  const ministros = await prisma.ministrosIDPBs.findMany();
  const igrejas = await prisma.igrejas.findMany();
  return {
    props: {
      org: JSON.parse(JSON.stringify(posts)),
      ministros: JSON.parse(JSON.stringify(ministros)),
      igrejas: JSON.parse(JSON.stringify(igrejas)),
    }, // will be passed to the page component as props
    // revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default userPerfil;
