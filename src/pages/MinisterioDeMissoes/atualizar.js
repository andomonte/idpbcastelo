import React from 'react';
import { PageAtualizar } from 'src/components/atualizar/index';
import { useSession } from 'next-auth/client';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
function atualizar({ org, igrejas }) {
  const classes = useStyles();
  const [session] = useSession();
  let secao = [{ email: '' }];
  // console.log(org, 'organização');
  const router = useRouter();
  const { perfilUser } = router.query;
  if (session) {
    secao = org.filter((val) => val.email === session.user.email);
    //  console.log(session.user.email);
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
        <PageAtualizar
          item={org}
          title="SISTEMA-IDPB"
          //          ministros={ministros}
          igrejas={igrejas}
          perfilUser={perfilUser}
        />
      </>
    );
  }
  return (
    <Box
      display="flex"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <img src="/images/idpb.ico" alt="" width="125" />
    </Box>
  );
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const posts = await prisma.user.findMany();
  // const ministros = await prisma.ministrosIDPBs.findMany();
  const igrejas = await prisma.igrejas.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  return {
    props: {
      org: JSON.parse(JSON.stringify(posts)),
      // ministros: JSON.parse(JSON.stringify(ministros)),
      igrejas: JSON.parse(JSON.stringify(igrejas)),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default atualizar;
