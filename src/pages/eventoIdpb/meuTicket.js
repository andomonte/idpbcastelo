import React from 'react';
import MeuTicket from 'src/components/Eventos/iniciaCompra/ticket';
import { useRouter } from 'next/router';
import Espera from 'src/utils/espera';

function MeuTickt() {
  const router = useRouter();
  const { ...dadosInscrito } = router.query;

  let mudaDados = 'sai';
  if (dadosInscrito && dadosInscrito.cpf) mudaDados = 'entra';

  const [dadosInscritosF, setDadosInscritoF] = React.useState();
  React.useEffect(() => {
    if (mudaDados === 'entra') {
      setDadosInscritoF(dadosInscrito);

      sessionStorage.setItem(
        'dadosInscritoIDPB',
        JSON.stringify(dadosInscrito),
      );
    } else {
      const result = JSON.parse(sessionStorage.getItem('dadosInscritoIDPB'));

      // resultado = result.id;

      setDadosInscritoF(result);
    }
  }, [mudaDados]);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/eventoIdpb/meuTicket');
  }

  return (
    <div>
      {dadosInscritosF && dadosInscritosF.cpf ? (
        <MeuTicket title="SISTEMA-IDPB" dadosInscrito={dadosInscritosF} />
      ) : (
        <Espera descricao="Atualizando os dados" />
      )}
    </div>
  );
}

export default MeuTickt;
