import React from 'react';
import SelectPerfil from 'src/components/igrejas/selectPerfil';
import prisma from 'src/lib/prisma';
import Espera from 'src/utils/espera';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);
function selectPerfil({ userIgrejas, celulas }) {
  const [rolMembros, setRolMembros] = React.useState([]);
  const [lideranca, setLideranca] = React.useState([]);
  const url1 = `/api/consultaMembros`;
  const url2 = `/api/consultaLideranca`;
  const { data: members, errorMembers } = useSWR(url1, fetcher);
  const { data: liders, errorLiders } = useSWR(url2, fetcher);

  React.useEffect(() => {
    if (members) {
      setRolMembros(members);
    }

    if (errorMembers) return <div>An error occured.</div>;
    if (!members) return <div>Loading ...</div>;

    return 0;
  }, [members]);

  React.useEffect(() => {
    if (liders) {
      setLideranca(liders);
    }

    if (errorLiders) return <div>An error occured.</div>;
    if (!liders) return <div>Loading ...</div>;

    return 0;
  }, [liders]);

  return (
    <div>
      {rolMembros.length && lideranca.length ? (
        <SelectPerfil
          title="IDPB-CELULAS"
          userIgrejas={userIgrejas}
          celulas={celulas}
          lideranca={lideranca}
          rolMembros={rolMembros}
        />
      ) : (
        <Espera descricao="Buscando Perfil" />
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
  return {
    props: {
      celulas: JSON.parse(JSON.stringify(celulas)),

      userIgrejas: JSON.parse(JSON.stringify(userIgrejas)),
    }, // will be passed to the pperfilUser component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default selectPerfil;
