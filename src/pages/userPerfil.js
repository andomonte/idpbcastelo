import React from 'react';
import { Perfil } from 'src/components/perfil/index';
import { useSession } from 'next-auth/client';
// import { PrismaClient } from '@prisma/client';
import prisma from 'src/lib/prisma';
// import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';

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
function userPerfil({ user, ministros, igrejas }) {
  const classes = useStyles();
  const [session] = useSession();

  //  const [open, setOpen] = React.useState(false);
  // const [perfilUser, setPerfilUser] = React.useState('');
  let secao = [{ email: '' }];

  const router = useRouter();
  const { perfilUser } = router.query;

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
    return (
      <>
        {perfilUser === 'ministro' ? (
          <Perfil
            item={user}
            title="SISTEMA-IDPB"
            ministros={ministros}
            igrejas={igrejas}
            perfilUser={perfilUser}
          />
        ) : null}
        {perfilUser === 'sup-MM' ? (
          <Perfil
            item={user}
            title="SISTEMA-IDPB"
            ministros={ministros}
            igrejas={igrejas}
            perfilUser={perfilUser}
          />
        ) : null}
        {perfilUser === 'coord-MM' ? (
          <Perfil
            item={user}
            title="SISTEMA-IDPB"
            ministros={ministros}
            igrejas={igrejas}
            perfilUser={perfilUser}
          />
        ) : null}
        {perfilUser === 'pres-MM' ? (
          <Perfil
            item={user}
            title="SISTEMA-IDPB"
            ministros={ministros}
            igrejas={igrejas}
            perfilUser={perfilUser}
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

  const usuario = await prisma.user.findMany();
  const ministros = await prisma.ministrosIDPBs.findMany();
  const igrejas = await prisma.igrejas.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  return {
    props: {
      user: JSON.parse(JSON.stringify(usuario)),
      ministros: JSON.parse(JSON.stringify(ministros)),
      igrejas: JSON.parse(JSON.stringify(igrejas)),
    }, // will be passed to the pperfilUser component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default userPerfil;
