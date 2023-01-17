import React from 'react';
import Avisos from 'src/components/igrejas/principal/avisos';

import prisma from 'src/lib/prisma';

function Aviso({ dadosAvisos }) {
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/principal/aviso');
  }

  return (
    <div>
      <Avisos dadosAvisos={dadosAvisos} />
    </div>
  );
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const dadosAvisos = await prisma.avisos
    .findMany({
      orderBy: [
        {
          Data: 'asc',
        },
      ],
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return {
    props: {
      dadosAvisos: JSON.parse(JSON.stringify(dadosAvisos)),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default Aviso;
