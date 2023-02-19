import React from 'react';
import Mensagem from 'src/components/igrejas/principal/mensagem';
import prisma from 'src/lib/prisma';

function Mensagens({ mensagem }) {
  // resultado = result.id;
  let result = 'nenhum';
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/principal/mensagem');
    result = JSON.parse(sessionStorage.getItem('perfilUser'));
  }

  return (
    <div>
      <Mensagem mensagem={mensagem} perfilUser={result} />
    </div>
  );
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const mensagem = await prisma.mensagem
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
      mensagem: JSON.parse(JSON.stringify(mensagem)),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default Mensagens;
