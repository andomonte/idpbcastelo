import React from 'react';
import Matricula from 'src/components/castelo/normal/cursos/matricula';
import prisma from 'src/lib/prisma';

function Home({ cursos, inscritosCursos }) {
  return (
    <Matricula
      title="IDPB-CELULAS"
      cursos={cursos}
      inscritos={inscritosCursos}
    />
  );
}
export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const cursos = await prisma.cursos.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  const inscritosCursos = await prisma.cursosinscritos
    .findMany()
    .finally(async () => {
      await prisma.$disconnect();
    });

  return {
    props: {
      cursos: JSON.parse(JSON.stringify(cursos)),
      inscritosCursos: JSON.parse(JSON.stringify(inscritosCursos)),
    }, // will be passed to the page component as props
    //  revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default Home;
