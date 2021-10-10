import { signOut } from 'next-auth/client';
import React from 'react';
// import TelaMinistro from './userTelas/ministro';
import Padrao from './userTelas/telaPadrao';
import TelaEventos from './userTelas/eventos/telaEventos';

const Evento = ({ item, secao, perfilUser, statusDrawer }) => {
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
        <TelaEventos item={item} secao={secao} statusDrawer={statusDrawer} />
      );
    case 'adm_MM':
      return <Padrao item={item} secao={secao} />;
    case 'sup-MM':
      return <Padrao item={item} secao={secao} />;
    default:
      return <Padrao />;
  }
};

export default Evento;
