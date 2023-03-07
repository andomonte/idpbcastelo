import React from 'react';
import { SistemaCelulas } from 'src/components/igrejas/principal/home';
import { Pagina } from 'src/components/igrejas/normal';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import validator from 'validator';
import Espere from 'src/utils/espera';

function Home({ userIgrejas, celulas, LiderancaCelulas, rolMembros }) {
  const dadosUser = userIgrejas.filter((val) => val.codigo === 'AM-030');
  const router = useRouter();
  const [session] = useSession();
  const perfilUser = router.query;
  let mudaDados = 'sai';

  if (perfilUser.id) mudaDados = 'entra';
  const [perfilUserF, setPerfilUserF] = React.useState('');

  React.useEffect(() => {
    if (mudaDados === 'entra') {
      setPerfilUserF(perfilUser);
      sessionStorage.setItem('perfilUser', JSON.stringify(perfilUser));
    } else {
      const result = JSON.parse(sessionStorage.getItem('perfilUser'));
      console.log('oi session', session, result);
      if (session !== null) {
        if (result) setPerfilUserF(result);
        if (session) {
          console.log('ai entrou session');
          if (validator.isEmail(session.user.email))
            router.push({
              pathname: '/selectPerfil',
            });
          else {
            router.push({
              pathname: '/selectPerfilCPF',
              query: { cpf: session.user.email },
            });
          }
        }
      } else setPerfilUserF('');
      // resultado = result.id;
    }
  }, [mudaDados]);

  React.useEffect(() => {
    console.log('oi session', session);
    if (perfilUserF.id) {
      if (session !== null && session !== undefined) {
        if (validator.isEmail(session.user.email))
          router.push({
            pathname: '/selectPerfil',
          });
        else {
          router.push({
            pathname: '/selectPerfilCPF',
            query: { cpf: session.user.email },
          });
        }
      }
    }
  }, [session]);

  return (
    <div>
      {perfilUserF && perfilUserF.id ? (
        <div>
          <SistemaCelulas
            celulas={celulas}
            lideranca={LiderancaCelulas}
            userIgrejas={dadosUser}
            title="IDPB-CELULAS"
            perfilUser={perfilUserF}
            rolMembros={rolMembros}
          />
        </div>
      ) : (
        <div>
          {!perfilUserF && !perfilUser ? (
            <Pagina userIgrejas={dadosUser} title="IDPB-CELULAS" />
          ) : (
            <Espere descricao="Buscando Conexão..." />
          )}
        </div>
      )}
    </div>
  );
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const userIgrejas = await prisma.igreja.findMany().finally(async () => {
    await prisma.$disconnect();
  });

  const celulas = await prisma.celulas.findMany().finally(async () => {
    await prisma.$disconnect();
  });

  const LiderancaCelulas = await prisma.lideranca
    .findMany()
    .finally(async () => {
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
      userIgrejas: JSON.parse(JSON.stringify(userIgrejas)),
      celulas: JSON.parse(JSON.stringify(celulas)),
      rolMembros: JSON.parse(
        JSON.stringify(
          rolMembros,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
      LiderancaCelulas: JSON.parse(
        JSON.stringify(
          LiderancaCelulas,
          (key, value) =>
            typeof value === 'bigint' ? value.toString() : value, // return everything else unchanged
        ),
      ),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default Home;
