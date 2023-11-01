import React from 'react';
import Midia from 'src/components/igrejas/principal/midia';
import prisma from 'src/lib/prisma';

function MidiaCelulas({ userIgrejas, radioIdpb, data }) {
  if (typeof window !== 'undefined') {
    window.history.replaceState(null, '', '/midia');
  }
  console.log('oi dataYou', data);
  return (
    <div>
      <Midia
        dataYouTube={data}
        title="IDPB"
        userIgrejas={userIgrejas}
        radioIdpb={radioIdpb}
      />
    </div>
  );
}
const YOUTUBE_PLAYLIST_ITEMS_API =
  'https://www.googleapis.com/youtube/v3/playlistItems';
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const userIgrejas = await prisma.igreja.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  const radioIdpb = await prisma.radio
    .findMany({
      orderBy: [
        {
          label: 'asc',
        },
      ],
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  // PLlcqEGDzXrtm6EpKCDwfW1MDZXq6uaDSM -> castelo
  // PLDtfBveOri5nzfzk8Qehn5ey9EvAUEzzQ -> global
  const res = await fetch(
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLTTJE3fw6d-KtnwO_yDESWk_MK4wa6fIs&index=1&key=AIzaSyBxqTbtKdJP3jX-k7yRiSbRi7rG40qfwqA`,
  );

  const data = await res.json();
  return {
    props: {
      userIgrejas: JSON.parse(JSON.stringify(userIgrejas)),
      radioIdpb: JSON.parse(JSON.stringify(radioIdpb)),
      data,
    }, // will be passed to the pperfilUser component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default MidiaCelulas;
