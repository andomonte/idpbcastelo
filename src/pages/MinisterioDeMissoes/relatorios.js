import React from 'react';

import { useSession } from 'next-auth/client';
import prisma from 'src/lib/prisma';
import { PageRelatorios } from 'src/components/relatorios/index';
import { PageRelSuper } from 'src/components/relSupervisao/index';
import { PageRelCoord } from 'src/components/relCoordenacao/index';
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

function relatorio({ org }) {
  const classes = useStyles();
  const [session] = useSession();
  let secao = [{ email: '' }];
  const router = useRouter();
  const { perfilUser } = router.query;

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

    return (
      <>
        {perfilUser === 'ministro' ? (
          <PageRelatorios
            item={org}
            perfilUser={perfilUser}
            title="SISTEMA-IDPB"
          />
        ) : null}
        {perfilUser === 'sup-MM' ? (
          <PageRelSuper
            item={org}
            title="SISTEMA-IDPB"
            perfilUser={perfilUser}
          />
        ) : null}
        {perfilUser === 'coord-MM' ? (
          <PageRelCoord
            item={org}
            perfilUser={perfilUser}
            title="SISTEMA-IDPB"
          />
        ) : null}
        {perfilUser === 'dir-MM' ? (
          <PageRelCoord
            item={org}
            perfilUser={perfilUser}
            title="SISTEMA-IDPB"
          />
        ) : null}
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

  const posts = await prisma.user.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  return {
    props: {
      org: JSON.parse(JSON.stringify(posts)),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default relatorio;
