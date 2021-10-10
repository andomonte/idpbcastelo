import { signOut } from 'next-auth/client';
import React from 'react';
import TelaMinistro from './userTelas/culto/ministro';
import Padrao from './userTelas/telaPadrao';

const Culto = ({ item, secao, perfilUser, statusDrawer }) => {
  const dadosUser = item.filter((val) => val.email === secao.user.email);
  // console.log(dadosUser.length);
  if (dadosUser.length === 0)
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  const route = perfilUser;

  switch (route) {
    case 'ministro':
      return (
        <TelaMinistro
          statusDrawer={statusDrawer}
          item={item}
          secao={secao}
          perfilUser={perfilUser}
        />
      );
    default:
      return <Padrao />;
  }
};

export default Culto;
