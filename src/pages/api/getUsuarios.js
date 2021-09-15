import prisma from 'src/lib/prisma';

function getUsuarios({ org }) {
  // ... you will write your Prisma Client queries here
  // const allUsers = await fetch(`prisma.${table}.findMany()`);
  return org;
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados

  const posts = await prisma.Usuarios.findMany().finally(async () => {
    await prisma.$disconnect();
  });
  return {
    props: {
      org: JSON.parse(JSON.stringify(posts)),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default getUsuarios;
