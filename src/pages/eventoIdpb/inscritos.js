import React from 'react';
import QtInscritos from 'src/components/Eventos/quantidade/index';
import LoginConv from 'src/components/Eventos/quantidade/login';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';

function QytInscritos({ inscritos }) {
  const router = useRouter();
  const { codigoAcesso } = router.query;
  // meu token de de teste andomonte assim como o do mercado pago é o meu tambem,
  // o usuario de teste deve está logado para que seja feito os teste criei
  // um usuario na minha conta andomonte, para outra conta tem que mudar os 3.

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/eventoIdpb/inscritos');
  }

  return (
    <div>
      {codigoAcesso === 'ma125' ? (
        <div>
          <QtInscritos inscritos={inscritos} />
        </div>
      ) : (
        <LoginConv />
      )}
    </div>
  );
  //  return <QtInscritos />;
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const posts = await prisma.inscritosConvencao
    .findMany({
      where: {
        status: 'approved',
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
      inscritos: JSON.stringify(
        posts,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
      ),
    }, // will be passed to the page component as props
    //  revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default QytInscritos;
