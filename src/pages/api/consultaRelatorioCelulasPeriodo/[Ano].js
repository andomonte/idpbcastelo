import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { Ano },
  } = req;

  // const action = `${rel}.findMany`
  // const inicioAno0 = AnoI;
  // const finalAno0 = AnoF;

  const inicioAno0 = `${Ano}-01-01`;
  const finalAno0 = `${Ano}-12-31`;
  const posts = await prisma.relatorioCelulas
    .findMany({
      where: {
        AND: {
          Data: { lte: new Date(finalAno0), gte: new Date(inicioAno0) },
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
