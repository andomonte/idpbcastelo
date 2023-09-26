import React from 'react';
import Midia from 'src/components/igrejas/principal/midia';
import prisma from 'src/lib/prisma';

function MidiaCelulas({ userIgrejas, radioIdpb }) {
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/midia');
  }

  return (
    <div>
      <Midia
        title="IDPB-CASTELO"
        userIgrejas={userIgrejas}
        radioIdpb={radioIdpb}
      />
    </div>
  );
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const userIgrejas = await prisma.igreja.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  const radioIdpb = await prisma.radio.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  // PLlcqEGDzXrtm6EpKCDwfW1MDZXq6uaDSM -> castelo
  // PLDtfBveOri5nzfzk8Qehn5ey9EvAUEzzQ -> global

  return {
    props: {
      userIgrejas: JSON.parse(JSON.stringify(userIgrejas)),
      radioIdpb: JSON.parse(JSON.stringify(radioIdpb)),
    }, // will be passed to the pperfilUser component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default MidiaCelulas;
