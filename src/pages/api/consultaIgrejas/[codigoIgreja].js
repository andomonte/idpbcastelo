import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { codigoIgreja },
  } = req;
  // console.log('dados do api', codigoIgreja, mes, ano);
  // const action = `${rel}.findMany`
  const posts = await prisma.igrejas
    .findMany({
      where: {
        AND: [{ codigoIgreja }],
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  // console.log(posts);
  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  //  res.end(JSON.stringify({ posts }));
  res.json(posts);
}
