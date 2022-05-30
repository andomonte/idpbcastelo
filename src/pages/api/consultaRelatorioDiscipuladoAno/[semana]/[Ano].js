import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { semana, Ano },
  } = req;

  // //console.log('dados do api', codigoIgreja, mes, ano);
  // const action = `${rel}.findMany`
  const posts = await prisma.relatorioDiscipulado
    .findMany({
      where: {
        OR: [
          {
            Semana: Number(semana),
          },
          {
            Semana: Number(semana) - 1,
          },
          {
            Semana: Number(semana) - 2,
          },

          {
            Semana: Number(semana) - 3,
          },
          {
            Semana: Number(semana) - 4,
          },
        ],
        AND: [
          {
            Data: {
              endsWith: String(Ano), // consulta termina em
              //          contains: String(Ano), //consulta contem
            },
          },
        ],
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.json(posts);
}
