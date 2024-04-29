import React from 'react';
import Pagina from 'src/components/Scanner';
import prisma from 'src/lib/prisma';

function Home({ eventos }) {
  return <Pagina eventos={eventos} title="APP-IDPB" />;
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const eventos = await prisma.eventosGeral.findMany().finally(async () => {
    await prisma.$disconnect();
  });

  return {
    props: {
      eventos: JSON.parse(
        JSON.stringify(
          eventos,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default Home;
