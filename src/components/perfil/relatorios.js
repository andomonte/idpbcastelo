import { signOut } from 'next-auth/client';
import React from 'react';
import TelaMinistro from './userTelas/ministro';
import Padrao from './userTelas/telaPadrao';

const Relatorios = ({ item, secao }) => {
  const dadosUser = item.filter((val) => val.email === secao.user.email);
  console.log(dadosUser.length);
  if (dadosUser.length === 0)
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  const route = dadosUser[0].userNivel;

  switch (route) {
    case 'ministro':
      return <TelaMinistro item={item} secao={secao} />;
    default:
      return <Padrao />;
  }
};

export default Relatorios;
