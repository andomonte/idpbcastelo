import React from 'react';
import { Perfil } from 'src/components/perfil/index';
// import { PrismaClient } from '@prisma/client';
import prisma from 'src/lib/prisma';
// import useSWR from 'swr';
// import fetch from 'unfetch';

function userPerfil({ org, ministros, igrejas }) {
  return (
    <Perfil
      item={org}
      title="SISTEMA-IDPB"
      ministros={ministros}
      igrejas={igrejas}
    />
  );
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const posts = await prisma.user.findMany();
  const ministros = await prisma.ministrosIDPBs.findMany();
  const igrejas = await prisma.igrejas.findMany();
  return {
    props: {
      org: JSON.parse(JSON.stringify(posts)),
      ministros: JSON.parse(JSON.stringify(ministros)),
      igrejas: JSON.parse(JSON.stringify(igrejas)),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default userPerfil;
