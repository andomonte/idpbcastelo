import { signOut } from 'next-auth/client';
import React from 'react';
import TelaSupervisor from './userTelas/supervisor';
import TelaMinistro from './userTelas/ministro';
import Padrao from './userTelas/telaPadrao';

const Culto = ({ item, secao, statusDrawer }) => {
  const dadosUser = item.filter((val) => val.email === secao.user.email);

  if (dadosUser.length === 0)
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  const route = dadosUser[0].NivelUser;

  switch (route) {
    case 'ministro':
      return <TelaMinistro item={item} secao={secao} />;
    case 'sup-MM':
      return (
        <TelaSupervisor item={item} secao={secao} statusDrawer={statusDrawer} />
      );
    default:
      return <Padrao />;
  }
};

export default Culto;
