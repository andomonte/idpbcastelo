import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { supervisao },
  } = req;
  // console.log('dados do api', codigoIgreja, mes, ano);
  // const action = `${rel}.findMany`
  const regiaoIDPB = supervisao;
  const posts = await prisma.eventos
    .findMany({
      where: {
        AND: [{ regiaoIDPB }],
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  //  res.end(JSON.stringify({ posts }));
  res.json(posts);
}
