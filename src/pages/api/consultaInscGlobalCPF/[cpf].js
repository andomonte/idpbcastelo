import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { cpf },
  } = req;
  // const action = `${rel}.findMany`
  const posts = await prisma.inscritosGlobals
    .findMany({
      where: {
        AND: [{ CPF: cpf }],
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  //  res.end(JSON.stringify({ posts }));
  console.log('val', posts, cpf);
  res.json(posts);
}
