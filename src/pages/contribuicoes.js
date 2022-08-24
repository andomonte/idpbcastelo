import React from 'react';
import Contribuicao from 'src/components/igrejas/principal/contribuicoes';
import { useRouter } from 'next/router';

function Contribuir() {
  const router = useRouter();
  const perfilUser = router.query;

  let mudaDados = 'sai';
  if (perfilUser.id) mudaDados = 'entra';
  const [perfilUserF, setPerfilUserF] = React.useState();

  React.useEffect(() => {
    if (mudaDados === 'entra') {
      setPerfilUserF(perfilUser);
      sessionStorage.setItem('perfilUser', JSON.stringify(perfilUser));
    } else {
      const result = JSON.parse(sessionStorage.getItem('perfilUser'));

      // resultado = result.id;
      setPerfilUserF(result);
    }
  }, []);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/contribuicoes');
  }
  console.log(perfilUserF);
  return (
    <div>
      {perfilUserF && (
        <Contribuicao title="IDPB-FILADELFIA" perfilUser={perfilUserF} />
      )}
    </div>
  );
}

export default Contribuir;
