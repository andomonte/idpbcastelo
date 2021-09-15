import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { codigoIgreja, dataEvento },
  } = req;
  // console.log('dados do api', codigoIgreja, mes, ano);
  // const action = `${rel}.findMany`
  const dia = dataEvento.slice(0, 2);
  const mes = dataEvento.slice(2, 4);
  const ano = dataEvento.slice(4, 8);
  const dvFinal = `${dia}${mes}${ano}`;
  const posts = await prisma.eventos
    .findMany({
      where: {
        AND: [{ codigoIgreja }, { dataEvento: dvFinal }],
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  //  console.log(posts);
  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  //  res.end(JSON.stringify({ posts }));
  res.json(posts);
}
