import React from 'react';
import Eventos from 'src/components/igrejas/principal/eventos';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';

function FazerInscricoes({ rolMembros, nomesIgrejas }) {
  const router = useRouter();
  const { Evento } = router.query;

  const [perfilUser, setPerfilUser] = React.useState('');

  React.useEffect(() => {
    const result = JSON.parse(sessionStorage.getItem('perfilUser'));
    setPerfilUser(result);
  }, []);
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/eventos');
  }
  return (
    <div>
      <Eventos
        nomesIgrejas={nomesIgrejas}
        rolMembros={rolMembros}
        perfilUser={perfilUser}
        title="IDPB"
        numeroPagina={Evento}
      />
    </div>
  );
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados
  const nomesIgrejas = await prisma.nucleos.findMany().finally(async () => {
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

  return {
    props: {
      nomesIgrejas: JSON.parse(
        JSON.stringify(
          nomesIgrejas,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
      rolMembros: JSON.parse(
        JSON.stringify(
          rolMembros,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default FazerInscricoes;
