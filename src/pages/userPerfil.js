import React from 'react';
import { Perfil } from 'src/components/perfil/index';
import { useSession } from 'next-auth/client';
// import { PrismaClient } from '@prisma/client';
import prisma from 'src/lib/prisma';
// import useSWR from 'swr';
// import fetch from 'unfetch';
import { Convenção } from 'src/components/convencao/index';

function userPerfil({ org, ministros, igrejas }) {
  const [session] = useSession();
  let secao = [{ email: '' }];
  // console.log(org, 'organização');
  if (session) {
    secao = org.filter((val) => val.email === session.user.email);
    // console.log(secao[0].NivelUser);
    //

    return (
      <>
        {secao[0].NivelUser === 'ministro' ? (
          <Perfil
            item={org}
            title="SISTEMA-IDPB"
            ministros={ministros}
            igrejas={igrejas}
          />
        ) : null}
        {secao[0].NivelUser === 'convenção' ? (
          <Convenção
            item={org}
            title="SISTEMA-IDPB"
            ministros={ministros}
            igrejas={igrejas}
          />
        ) : null}
      </>
    );
  }
  return <h4> IDPB - Pregando a palavra no poder do Espírito Santo </h4>;
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
