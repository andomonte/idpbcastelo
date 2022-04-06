import React from 'react';
import Participacoes from 'src/components/castelo/logado/participacoes';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';

function relatorios({ celulas, rolMembros, lideranca }) {
  const router = useRouter();
  const perfilUser = router.query;

  let mudaDados = 'sai';
  if (perfilUser.id) mudaDados = 'entra';
  const [perfilUserF, setPerfilUserF] = React.useState();

  React.useEffect(() => {
    setPerfilUserF(perfilUserF);
    if (mudaDados === 'entra') {
      sessionStorage.setItem('perfilUser', JSON.stringify(perfilUser));
    } else {
      const result = JSON.parse(sessionStorage.getItem('perfilUser'));

      // resultado = result.id;
      setPerfilUserF(result);
    }
  }, []);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/membro/participacoes');
  }

  return (
    <div>
      {perfilUser.id ? (
        <Participacoes
          celulas={celulas}
          title="IDPB-CELULAS"
          rolMembros={rolMembros}
          lideranca={lideranca}
          perfilUser={perfilUser}
        />
      ) : (
        <div>
          {perfilUserF && (
            <Participacoes
              title="IDPB-CELULAS"
              rolMembros={rolMembros}
              perfilUser={perfilUserF}
            />
          )}
        </div>
      )}
    </div>
  );
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const rolMembros = await prisma.membros.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  return {
    props: {
      rolMembros: JSON.parse(JSON.stringify(rolMembros)),
    }, // will be passed to the pperfilUser component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default relatorios;
