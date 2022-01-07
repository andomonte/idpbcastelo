import GerarPdf from 'src/components/Global/Comprar/pdfs/pdf';
// import React from 'react';

function Comprove({ comprovante }) {
  console.log(comprovante);
  return (
    <>
      {comprovante && (
        <GerarPdf
          nome={comprovante.nome}
          codigo={comprovante.codigoPagamento}
          adultos={comprovante.qtyA}
          criancas={comprovante.qtyC}
          valor={comprovante.vTotal}
          fp={comprovante.fp}
          status={comprovante.status}
          parcelas={comprovante.descParcelas}
          cpf={comprovante.cpf}
        />
      )}
    </>
  );
}

export default Comprove;
