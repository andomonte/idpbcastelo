import React from 'react';
import { PageAtualizar } from 'src/components/atualizar/index';
import { useSession } from 'next-auth/client';
// import { PrismaClient } from '@prisma/client';
import prisma from 'src/lib/prisma';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
function atualizar({ org, ministros, igrejas }) {
  const classes = useStyles();
  const [session] = useSession();
  let secao = [{ email: '' }];
  // console.log(org, 'organização');
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
          ministros={ministros}
          igrejas={igrejas}
        />
      </>
    );
  }
  return (
    <h4 style={{ alignItems: 'center', justifyContent: 'center' }}>
      {' '}
      IDPB - Pregando a palavra no poder do Espírito Santo{' '}
    </h4>
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
    //   revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default atualizar;
