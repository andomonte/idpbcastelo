import { signOut } from 'next-auth/client';
import React from 'react';
import TelaSupervisor from 'src/components/relSupervisao/userTelas/supervisor';
import TelaMinistro from './userTelas/ministro';
import Padrao from './userTelas/telaPadrao';

const Culto = ({ item, secao, perfilUser }) => {
  const dadosUser = item.filter((val) => val.email === secao.user.email);
  // console.log(dadosUser.length);
  if (dadosUser.length === 0)
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  const route = perfilUser;

  switch (route) {
    case 'ministro':
      return <TelaMinistro item={item} secao={secao} perfilUser={perfilUser} />;
    case 'sup-MM':
      return (
        <TelaSupervisor item={item} secao={secao} perfilUser={perfilUser} />
      );
    default:
      return <Padrao />;
  }
};

export default Culto;
