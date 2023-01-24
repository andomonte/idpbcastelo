import React from 'react';
import Secretaria from 'src/components/igrejas/normal/secretaria';
import prisma from 'src/lib/prisma';

function Sec({ userIgrejas, celulas, LiderancaCelulas }) {
  const dadosUser = userIgrejas.filter((val) => val.codigo === 'AM-030');

  return (
    <Secretaria
      celulas={celulas}
      lideranca={LiderancaCelulas}
      userIgrejas={dadosUser}
      title="IDPB-CELULAS"
    />
  );
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const userIgrejas = await prisma.igreja.findMany().finally(async () => {
    await prisma.$disconnect();
  });

  const celulas = await prisma.celulas.findMany().finally(async () => {
    await prisma.$disconnect();
  });

  const lideranca = await prisma.lideranca.findMany().finally(async () => {
    await prisma.$disconnect();
  });

  return {
    props: {
      userIgrejas: JSON.parse(JSON.stringify(userIgrejas)),
      celulas: JSON.parse(JSON.stringify(celulas)),
      lideranca: JSON.parse(
        JSON.stringify(
          lideranca,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default Sec;
