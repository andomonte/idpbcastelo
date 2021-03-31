import prisma from 'src/lib/prisma';
async function main() {
  // ... you will write your Prisma Client queries here
  // const allUsers = await fetch(`prisma.${table}.findMany()`);
  const allUsers = await prisma.igrejasAMs.findMany();
  return allUsers;
}
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default main;
