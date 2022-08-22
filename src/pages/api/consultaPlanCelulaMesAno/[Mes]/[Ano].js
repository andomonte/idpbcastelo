import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { Mes, Ano },
  } = req;

  // const action = `${rel}.findMany`
  const posts = await prisma.plancelula
    .findMany({
      where: {
        Data: {
          endsWith: `${Mes}/${Ano}`,
        },
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.json(posts);
}
