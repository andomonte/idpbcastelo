import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { rolMembros },
  } = req;

  // const action = `${rel}.findMany`
  const posts = await prisma.membros
    .findMany({
      where: {
        RolMembro: Number(rolMembros),
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.json(posts);
}
