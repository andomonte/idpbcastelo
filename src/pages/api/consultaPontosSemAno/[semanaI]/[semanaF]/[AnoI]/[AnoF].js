import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { semanaI, semanaF, AnoI, AnoF },
  } = req;

  // //console.log('dados do api', codigoIgreja, mes, ano);
  // const action = `${rel}.findMany`

  try {
    const posts = await prisma.pontuacao
      .findMany({
        where: {
          Semana: { gt: Number(semanaI - 1) },
          AND: {
            Semana: { lt: Number(semanaF + 1) },
            OR: [
              {
                Ano: Number(AnoI),
              },
              {
                Ano: Number(AnoF),
              },
            ],
          },
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    res.statuCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(posts);
  } catch (errors) {
    console.log(errors);
    res.json('erro');
  }
}
