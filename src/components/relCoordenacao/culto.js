import { signOut } from 'next-auth/client';
import React from 'react';
import TelaCoordenacao from './userTelas/telaCoord';
import Padrao from './userTelas/telaPadrao';

const Culto = ({ item, secao, statusDrawer, perfilUser }) => {
  const dadosUser = item.filter(
    (val) => val.email === secao.user.email && val.NivelUser === perfilUser,
  );

  if (dadosUser.length === 0)
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  const route = dadosUser[0].NivelUser;

  switch (route) {
    case 'coord-MM':
      return (
        <TelaCoordenacao
          item={item}
          secao={secao}
          statusDrawer={statusDrawer}
          perfilUser={perfilUser}
        />
      );
    case 'dir-MM':
      return (
        <TelaCoordenacao
          item={item}
          secao={secao}
          statusDrawer={statusDrawer}
          perfilUser={perfilUser}
        />
      );

    default:
      return <Padrao />;
  }
};

export default Culto;
