import React from 'react';
import { Aniversariantes } from 'src/components/AniversariantesMM';
import prisma from 'src/lib/prisma';
import selectRoutes from 'src/database/selectRoutes';
import { useRouter } from 'next/router';

function AniversariantesMM({ org, ministros }) {
  const router = useRouter();
  const { perfilUser } = router.query;
  return (
    <Aniversariantes
      item={org}
      ministros={ministros}
      title="SISTEMA-IDPB"
      perfilUser={perfilUser}
    />
  );
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados
  const tela = await selectRoutes();
  const ministros = await prisma.ministrosIDPBs.findMany().finally(async () => {
    await prisma.$disconnect();
  });

  const posts = await prisma.user.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  return {
    props: {
      org: JSON.parse(JSON.stringify(posts)),
      ministros: JSON.parse(JSON.stringify(ministros)),
      tela: JSON.parse(JSON.stringify(tela)),
    }, // will be passed to the page component as props
    //  revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default AniversariantesMM;
