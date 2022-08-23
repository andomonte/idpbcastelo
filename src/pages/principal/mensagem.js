import React from 'react';
import Mensagem from 'src/components/igrejas/principal/mensagem';

function Mensagens() {
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/principal/mensagem');
  }

  return (
    <div>
      <Mensagem />
    </div>
  );
}

export default Mensagens;
