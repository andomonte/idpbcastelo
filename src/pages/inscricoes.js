import React from 'react';
import { Inscricoes } from 'src/components/igrejas/principal/inscricoes';
import prisma from 'src/lib/prisma';

function FazerInscricoes({ rolMembros }) {
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/inscricoes');
  }

  return (
    <div>
      <Inscricoes rolMembros={rolMembros} title="IDPB-CASTELO" />
    </div>
  );
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados

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
      rolMembros: JSON.parse(JSON.stringify(rolMembros)),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default FazerInscricoes;
