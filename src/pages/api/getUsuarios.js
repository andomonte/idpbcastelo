import { PrismaClient } from '@prisma/client';

function getUsuarios({ org }) {
  // ... you will write your Prisma Client queries here
  // const allUsers = await fetch(`prisma.${table}.findMany()`);
  return org;
}

export const getStaticProps = async () => {
  // pega o valor do banco de dados
  const prisma = new PrismaClient();
  const posts = await prisma.Usuarios.findMany();
  return {
    props: {
      org: JSON.parse(JSON.stringify(posts)),
    }, // will be passed to the page component as props
    revalidate: 15, // faz atualizar a pagina de 15 em 15 segundo sem fazer build
  };
};
export default getUsuarios;
