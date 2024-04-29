import Inscrições from 'src/components/Eventos/Comprar/telaLoginTicket2';
// import { Box } from '@material-ui/core';
import React from 'react';
import { useRouter } from 'next/router';

function VerInscricao() {
  const router = useRouter();
  const { eventoSelecionado } = router.query;

  const [eventoSelecionadoF, setEventoSelecionadoF] = React.useState('');
  React.useEffect(() => {
    if (eventoSelecionado) {
      setEventoSelecionadoF(JSON.parse(eventoSelecionado));
      sessionStorage.setItem('eventoSelecionadoIdpb', eventoSelecionado);
    } else {
      setEventoSelecionadoF(
        JSON.parse(sessionStorage.getItem('eventoSelecionadoIdpb')),
      );
    }
  }, []);
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/eventoIdpb/verTicket2');
  }
  return (
    <Inscrições eventoSelecionado={eventoSelecionadoF} title="SISTEMA-IDPB" />
  );
}

export default VerInscricao;
