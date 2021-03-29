import React from 'react';
import { Perfil } from 'src/components/perfil/index';
import { PrismaClient } from '@prisma/client';

// import useSWR from 'swr';
// import fetch from 'unfetch';

function userPerfil({ org }) {
  return <Perfil item={org} title="SISTEMA-IDPB" />;
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const prisma = new PrismaClient();
  const posts = await prisma.ministrosIDPBs.findMany();
  return {
    props: {
      org: JSON.parse(JSON.stringify(posts)),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default userPerfil;
