import React from 'react';
import Relatorio from 'src/components/igrejas/principal/relatorios';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';

function relatorios({ celulas, rolMembros, lideranca, visitantes }) {
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
    window.history.replaceState(null, '', '/relatorio');
  }

  const Visitantes = visitantes.filter((val) => val.Celula && val.Distrito);

  return (
    <div>
      {perfilUser.id ? (
        <Relatorio
          celulas={celulas}
          title="IDPB-CELULAS"
          rolMembros={rolMembros}
          lideranca={lideranca}
          perfilUser={perfilUser}
          visitantes={Visitantes}
        />
      ) : (
        <div>
          {perfilUserF && (
            <Relatorio
              title="IDPB-CELULAS"
              celulas={celulas}
              rolMembros={rolMembros}
              lideranca={lideranca}
              perfilUser={perfilUserF}
              visitantes={Visitantes}
            />
          )}
        </div>
      )}
    </div>
  );
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const celulas = await prisma.celulas.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  const lideranca = await prisma.lideranca.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  const rolMembros = await prisma.membros
    .findMany({
      where: {
        Situacao: 'ATIVO',
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
  const visitantes = await prisma.visitantes
    .findMany({
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
      celulas: JSON.parse(JSON.stringify(celulas)),
      rolMembros: JSON.parse(JSON.stringify(rolMembros)),
      lideranca: JSON.parse(JSON.stringify(lideranca)),
      visitantes: JSON.parse(JSON.stringify(visitantes)),
    }, // will be passed to the pperfilUser component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default relatorios;
