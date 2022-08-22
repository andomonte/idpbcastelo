import React from 'react';
import Avisos from 'src/components/igrejas/principal/avisos';
import { useRouter } from 'next/router';

function Mensagens() {
  const router = useRouter();
  const perfilUser = router.query;

  let mudaDados = 'sai';
  if (perfilUser.id) mudaDados = 'entra';
  const [perfilUserF, setPerfilUserF] = React.useState();

  React.useEffect(() => {
    setPerfilUserF(perfilUserF);
    if (mudaDados === 'entra') {
      sessionStorage.setItem('perfilUser', JSON.stringify(perfilUser));
    } else {
      const result = JSON.parse(sessionStorage.getItem('perfilUser'));

      // resultado = result.id;
      setPerfilUserF(result);
    }
  }, []);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/principal/aviso');
  }

  return (
    <div>
      {perfilUserF && <Avisos title="IDPB-CASTELO" perfilUser={perfilUserF} />}
    </div>
  );
}

export default Mensagens;
