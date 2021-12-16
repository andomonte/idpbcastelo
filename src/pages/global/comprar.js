import React from 'react';
import Comprar from 'src/components/Global/Comprar/index';
import prisma from 'src/lib/prisma';

function Compra({ inscritos }) {
  return <Comprar title="SISTEMA-IDPB Global" inscritos={inscritos} />;
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const inscritos = await prisma.inscritosGlobals
    .findMany()
    .finally(async () => {
      await prisma.$disconnect();
    });
  return {
    props: {
      inscritos: JSON.parse(JSON.stringify(inscritos)),
    }, // will be passed to the pperfilUser component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default Compra;
