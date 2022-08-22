import React from 'react';
import Mensagem from 'src/components/igrejas/principal/mensagem';
import { useRouter } from 'next/router';

function Mensagens() {
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
    window.history.replaceState(null, '', '/principal/mensagem');
  }

  return (
    <div>
      {perfilUserF && (
        <Mensagem title="IDPB-CASTELO" perfilUser={perfilUserF} />
      )}
    </div>
  );
}

export default Mensagens;
