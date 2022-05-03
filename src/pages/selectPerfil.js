import React from 'react';
import SelectPerfil from 'src/components/castelo/selectPerfil';
import prisma from 'src/lib/prisma';

function selectPerfil({ userIgrejas, celulas, lideranca, rolMembros }) {
  return (
    <div>
      <SelectPerfil
        title="IDPB-CELULAS"
        userIgrejas={userIgrejas}
        celulas={celulas}
        lideranca={lideranca}
        rolMembros={rolMembros}
      />
    </div>
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
  const rolMembros = await prisma.membros
    .findMany({
      where: {
        Situacao: 'ATIVO',
      },
      orderBy: [
        {
          Nome: 'asc',
        },
      ],
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  return {
    props: {
      celulas: JSON.parse(JSON.stringify(celulas)),
      rolMembros: JSON.parse(JSON.stringify(rolMembros)),
      lideranca: JSON.parse(JSON.stringify(lideranca)),
      userIgrejas: JSON.parse(JSON.stringify(userIgrejas)),
    }, // will be passed to the pperfilUser component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default selectPerfil;
