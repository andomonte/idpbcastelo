import React from 'react';
import { IdpbNacional } from 'src/components/Logado/Comum/idpbNacional';
import { useRouter } from 'next/router';

function HomeLogado() {
  const router = useRouter();
  const { perfilUser } = router.query;

  return <IdpbNacional title="SISTEMA-IDPB" perfilUser={perfilUser} />;
}

export default HomeLogado;
