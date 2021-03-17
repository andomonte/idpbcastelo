import React from 'react';
import { Layout } from 'src/components/Layout';
import { PrismaClient } from '@prisma/client';
import selectRoutes from 'src/database/selectRoutes';

// import useSWR from 'swr';
// import fetch from 'unfetch';

function Missoes({ org }) {
  return <Layout item={org} title="SISTEMA-IDPB" />;
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados
  const tela = await selectRoutes();
  const prisma = new PrismaClient();
  const posts = await prisma.igrejas.findMany();

  return {
    props: {
      org: JSON.parse(JSON.stringify(posts)),
      tela: JSON.parse(JSON.stringify(tela)),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default Missoes;
