import { signOut } from 'next-auth/client';
import React from 'react';
import TelaNiverMM from './userTelas/mostraNiverMM';

const AniverMM = ({ item, secao, statusDrawer, perfilUser, ministros }) => {
  const dadosUser = item.filter(
    (val) => val.email === secao.user.email && val.NivelUser === perfilUser,
  );

  if (dadosUser.length === 0)
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  return (
    <TelaNiverMM
      item={item}
      ministros={ministros}
      secao={secao}
      statusDrawer={statusDrawer}
      perfilUser={perfilUser}
    />
  );
};

export default AniverMM;
