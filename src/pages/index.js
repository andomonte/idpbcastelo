import React from 'react';
import { IdpbNacional } from 'src/components/idpbNacional';
import selectRoutes from 'src/database/selectRoutes';

function Home() {
  return <IdpbNacional title="SISTEMA-IDPB" />;
}

export async function getStaticProps() {
  // pega o valor do banco de dados

  const data = await selectRoutes();

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
}

export default Home;
