import { signOut } from 'next-auth/client';
import React from 'react';
import GraficoMinistro from './userTelas/Analizar/GraficoMinistro';
import Padrao from './userTelas/telaPadrao';

const AnalisarRel = ({ item, secao, statusDrawer }) => {
  const dadosUser = item.filter((val) => val.email === secao.user.email);
  // console.log(dadosUser.length);
  if (dadosUser.length === 0)
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  const route = dadosUser[0].NivelUser;

  switch (route) {
    case 'ministro':
      return (
        <GraficoMinistro
          item={item}
          secao={secao}
          statusDrawer={statusDrawer}
        />
      );

    default:
      return <Padrao />;
  }
};

export default AnalisarRel;
