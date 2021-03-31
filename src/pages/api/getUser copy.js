//import { PrismaClient } from '@prisma/client';
import prisma from 'src/lib/prisma';


async function main(credencials) {
  // ... you will write your Prisma Client queries here
  // const allUsers = await fetch(`prisma.${table}.findMany()`);

  const usuario = await prisma.Usuarios({ loginUsuario: credencials });
  return usuario;
}
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default main;
