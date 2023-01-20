import React from 'react';
import Contribuicao from 'src/components/igrejas/principal/contribuicoes';
import { useRouter } from 'next/router';
import prisma from 'src/lib/prisma';
import { useSession } from 'next-auth/client';

function Contribuir({ categorias }) {
  const router = useRouter();
  const perfilUser = router.query;
  const [session] = useSession();
  let mudaDados = 'sai';
  if (perfilUser.id) mudaDados = 'entra';
  const [perfilUserF, setPerfilUserF] = React.useState();

  React.useEffect(() => {
    if (mudaDados === 'entra') {
      setPerfilUserF(perfilUser);
      sessionStorage.setItem('perfilUser', JSON.stringify(perfilUser));
    } else {
      const result = JSON.parse(sessionStorage.getItem('perfilUser'));
      if (session === null || !result) {
        router.push({
          pathname: '/',
        });
      }
      // resultado = result.id;
      setPerfilUserF(result);
    }
  }, []);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/contribuicoes');
  }

  return (
    <div>
      {perfilUserF && (
        <Contribuicao
          categorias={categorias}
          title="IDPB-FILADELFIA"
          perfilUser={perfilUserF}
        />
      )}
    </div>
  );
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const categorias = await prisma.tB_CATEGORIA.findMany().finally(async () => {
    await prisma.$disconnect();
  });

  return {
    props: {
      categorias: JSON.parse(
        JSON.stringify(
          categorias,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default Contribuir;
