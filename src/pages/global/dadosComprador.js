import React from 'react';
import Comprar from 'src/components/Global/Comprar/telaCompra';
import prisma from 'src/lib/prisma';
import { useRouter } from 'next/router';

function Compra({ inscritos }) {
  // meu token de de teste andomonte assim como o do mercado pago é o meu tambem,
  // o usuario de teste deve está logado para que seja feito os teste criei
  // um usuario na minha conta andomonte, para outra conta tem que mudar os 3.
  const router = useRouter();
  const { ...dados } = router.query;
  let mudaDados = 'sai';
  if (dados.total) mudaDados = 'entra';
  const [dadosF, setDadosF] = React.useState();

  React.useEffect(() => {
    setDadosF(dadosF);
    if (mudaDados === 'entra') {
      sessionStorage.setItem('dados', JSON.stringify(dados));
    } else {
      const result = JSON.parse(sessionStorage.getItem('dados'));

      setDadosF(result);
    }
  }, []);

  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/global/dadosComprador');
  }

  return (
    <>
      {dados.total ? (
        <Comprar
          title="SISTEMA-IDPB Global"
          inscritos={inscritos}
          dados={dados}
        />
      ) : (
        <Comprar
          title="SISTEMA-IDPB Global"
          inscritos={inscritos}
          dados={dadosF}
        />
      )}
    </>
  );
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const inscritos = await prisma.inscritosGlobals
    .findMany()
    .finally(async () => {
      await prisma.$disconnect();
    });
  return {
    props: {
      inscritos: JSON.parse(JSON.stringify(inscritos)),
    }, // will be passed to the pperfilUser component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default Compra;
