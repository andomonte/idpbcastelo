import React from 'react';
import Mensagem from 'src/components/igrejas/principal/mensagem';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';

function Mensagens({ mensagem }) {
  const router = useRouter();
  const { titulo } = router.query;
  console.log('titulo', titulo);

  // resultado = result.id;
  let result = 'nenhum';
  if (typeof window !== 'undefined') {
    if (titulo) {
      console.log('aqui titulo', titulo);
      window.history.replaceState(null, '', '/principal/mensagem');
    }
    result = JSON.parse(sessionStorage.getItem('perfilUser'));
  }

  return (
    <div>
      <Mensagem titulo={titulo} mensagem={mensagem} perfilUser={result} />
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
