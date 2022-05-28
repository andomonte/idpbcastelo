import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { Mes, Ano },
  } = req;
  const newMes = Number(Mes);
  const newAno = Number(Ano);

  // const action = `${rel}.findMany`
  const posts = await prisma.eventosCelulas
    .findMany({
      where: {
        AND: [{ Mes: newMes }, { Ano: newAno }],
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.json(posts);
}
