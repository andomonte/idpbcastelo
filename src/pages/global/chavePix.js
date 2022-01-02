import React from 'react';
import QrPix from 'src/components/Global/Comprar/qrPix';
import { useRouter } from 'next/router';

function ChavePix() {
  // meu token de de teste andomonte assim como o do mercado pago é o meu tambem,
  // o usuario de teste deve está logado para que seja feito os teste criei
  // um usuario na minha conta andomonte, para outra conta tem que mudar os 3.

  const router = useRouter();
  const { ...codigo } = router.query;
  let mudaDados = 'sai';
  if (codigo.id) mudaDados = 'entra';
  const [codigoF, setCodigoF] = React.useState();

  React.useEffect(() => {
    setCodigoF(codigoF);
    if (mudaDados === 'entra') {
      sessionStorage.setItem('codigo', JSON.stringify(codigo));
    } else {
      const result = JSON.parse(sessionStorage.getItem('codigo'));

      // resultado = result.id;
      setCodigoF(result);
    }
  }, []);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/global/chavePix');
  }
  return (
    <>
      {codigo.id ? (
        <QrPix title="SISTEMA-IDPB Global" codigo={codigo} />
      ) : (
        <QrPix title="SISTEMA-IDPB Global" codigo={codigoF} />
      )}
    </>
  );
}

export default ChavePix;
