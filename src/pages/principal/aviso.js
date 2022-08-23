import React from 'react';
import Avisos from 'src/components/igrejas/principal/avisos';

function Aviso() {
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/principal/aviso');
  }

  return <Avisos title="IDPB-CASTELO" />;
}

export default Aviso;
