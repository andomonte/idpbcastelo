import React from 'react';
import { Pagina } from 'src/components/igrejas/normal';
import prisma from 'src/lib/prisma';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

function Home({ userIgrejas, celulas }) {
  const [session] = useSession();
  const router = useRouter();

  const dadosUser = userIgrejas;
  if (session) {
    router.push({
      pathname: '/principal',
    });
  }
  return (
    <div>
      {celulas && userIgrejas ? (
        <Pagina
          celulas={celulas}
          userIgrejas={dadosUser}
          title="IDPB-CELULAS"
        />
      ) : (
        'oi'
      )}
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

  return {
    props: {
      userIgrejas: JSON.parse(JSON.stringify(userIgrejas)),
      celulas: JSON.parse(JSON.stringify(celulas)),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default Home;
