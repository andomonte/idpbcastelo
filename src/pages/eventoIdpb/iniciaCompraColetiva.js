import React from 'react';
import IniCompras from 'src/components/Eventos/iniciaCompra/existeCompra';
import IniComprasCrianca from 'src/components/Eventos/Comprar/telaCompraCriancas';
import { useRouter } from 'next/router';

function IniCompra() {
  // meu token de de teste andomonte assim como o do mercado pago é o meu tambem,
  // o usuario de teste deve está logado para que seja feito os teste criei
  // um usuario na minha conta andomonte, para outra conta tem que mudar os 3.

  const router = useRouter();
  const { ...iniCompra } = router.query;

  let mudaDados = 'sai';
  const [iniCompraF, setIniCompraF] = React.useState('');
  if (iniCompra.cpf) {
    mudaDados = 'entra';
  }

  React.useEffect(() => {
    // setcomprovanteF(iniCompraF);
    if (mudaDados === 'entra') {
      setIniCompraF(iniCompra);
      sessionStorage.setItem('iniCompra', JSON.stringify(iniCompra));
    } else {
      const result = JSON.parse(sessionStorage.getItem('iniCompra'));

      // resultado = result.id;
      setIniCompraF(result);
    }
  }, []);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/eventoIdpb/iniciaCompra');
  }

  return (
    <div>
      {iniCompra.cpf && iniCompra.tipo ? (
        <div>
          {iniCompra.tipo === 'criança' ? (
            <div>
              {iniCompra.cpf && (
                <IniComprasCrianca title="SISTEMA-IDPB" iniCompra={iniCompra} />
              )}
            </div>
          ) : (
            <div>
              {iniCompra.cpf && (
                <div>
                  <IniCompras title="SISTEMA-IDPB" iniCompra={iniCompra} />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          {iniCompraF.tipo === 'criança' ? (
            <div>
              {iniCompraF.cpf && (
                <IniComprasCrianca
                  title="SISTEMA-IDPB"
                  iniCompra={iniCompraF}
                />
              )}
            </div>
          ) : (
            <div>
              {iniCompraF.cpf && (
                <IniCompras title="SISTEMA-IDPB" iniCompra={iniCompraF} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default IniCompra;
