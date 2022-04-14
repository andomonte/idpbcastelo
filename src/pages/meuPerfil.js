import React from 'react';
import { Perfil } from 'src/components/filadelfia/logado/relatorios/perfil';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';

function meuPerfil({ celulas, rolMembros, lideranca }) {
  const router = useRouter();
  const perfilUser = router.query;
  let mudaDados = 'sai';
  if (perfilUser.id) mudaDados = 'entra';
  const [perfilUserF, setPerfilUserF] = React.useState('');
  console.log('valor mudaDados', mudaDados);
  React.useEffect(() => {
    setPerfilUserF(perfilUserF);
    if (mudaDados === 'entra') {
      sessionStorage.setItem('perfilUser', JSON.stringify(perfilUser));
    } else {
      const result = JSON.parse(sessionStorage.getItem('perfilUser'));
      console.log('entrou no perfil2', result);
      // resultado = result.id;
      setPerfilUserF(result);
    }
  }, [mudaDados]);
  React.useEffect(() => {
    setPerfilUserF(perfilUserF);
    if (mudaDados === 'entra') {
      sessionStorage.setItem('perfilUser', JSON.stringify(perfilUser));
    } else {
      const result = JSON.parse(sessionStorage.getItem('perfilUser'));
      console.log('entrou no perfil2', result);
      // resultado = result.id;
      setPerfilUserF(result);
    }
  }, []);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/meuPerfil');
  }
  console.log('AQUI', perfilUserF, perfilUser);
  if (perfilUserF === null) {
    router.push(
      {
        pathname: '/selectPerfil',
      },
      '/selectPerfil',
    );
  }
  return (
    <div>
      {perfilUser.id ? (
        <Perfil
          celulas={celulas}
          title="IDPB-CELULAS"
          rolMembros={rolMembros}
          lideranca={lideranca}
          perfilUser={perfilUser}
        />
      ) : (
        <div>
          {perfilUserF && (
            <Perfil
              title="IDPB-CELULAS"
              celulas={celulas}
              rolMembros={rolMembros}
              lideranca={lideranca}
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

  const celulas = await prisma.celulas.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  const lideranca = await prisma.lideranca.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  const rolMembros = await prisma.membros
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
    }, // will be passed to the pperfilUser component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default meuPerfil;
