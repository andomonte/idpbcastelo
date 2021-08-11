import React from 'react';
import { PageRelatorios } from 'src/components/relatorios/index';
// import { PrismaClient } from '@prisma/client';
import prisma from 'src/lib/prisma';
// import useSWR from 'swr';
// import fetch from 'unfetch';

function relatorio({ org }) {
  return <PageRelatorios item={org} title="SISTEMA-IDPB" />;
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const posts = await prisma.user.findMany();
  return {
    props: {
      org: JSON.parse(JSON.stringify(posts)),
    }, // will be passed to the page component as props
    //  revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default relatorio;
