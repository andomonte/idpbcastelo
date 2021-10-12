import React from 'react';
import { Financeiro } from 'src/components/FinanceiroMM';
import prisma from 'src/lib/prisma';
import selectRoutes from 'src/database/selectRoutes';
import { useRouter } from 'next/router';

function FinanceiroMM({ org }) {
  const router = useRouter();
  const { perfilUser } = router.query;
  return <Financeiro item={org} title="SISTEMA-IDPB" perfilUser={perfilUser} />;
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados
  const tela = await selectRoutes();

  const posts = await prisma.igrejas.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  return {
    props: {
      org: JSON.parse(JSON.stringify(posts)),
      tela: JSON.parse(JSON.stringify(tela)),
    }, // will be passed to the page component as props
    //  revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default FinanceiroMM;
