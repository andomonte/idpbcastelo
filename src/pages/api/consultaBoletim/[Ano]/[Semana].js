import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { Ano, Semana },
  } = req;
  const ano = String(Ano);
  const semana = Number(Semana);

  // const action = `${rel}.findMany`
  const posts = await prisma.boletim
    .findMany({
      where: {
        AND: [{ ano }, { semana }],
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.json(posts);
}
