import React from 'react';
import { useSession } from 'next-auth/client';
import prisma from 'src/lib/prisma';
// import Modal from '@material-ui/core/Modal';

import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import { MidiaPlay } from 'src/components/midiaPlay/index';

function Midia({ user }) {
  const [session] = useSession();

  //  const [open, setOpen] = React.useState(false);
  // const [perfilUser, setPerfilUser] = React.useState('');

  const router = useRouter();
  const { perfilUser } = router.query;

  if (session) {
    return <MidiaPlay perfilUser={perfilUser} item={user} />;
  }
  return (
    <Box
      display="flex"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <img src="/images/idpb.ico" alt="" width="125" />
    </Box>
  );
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const posts = await prisma.user.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  return {
    props: {
      user: JSON.parse(JSON.stringify(posts)),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};

export default Midia;
