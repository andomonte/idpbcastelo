import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { semana, Ano },
  } = req;

  // //console.log('dados do api', codigoIgreja, mes, ano);
  // const action = `${rel}.findMany`
  const semana0 = semana;

  let semana1 = Number(semana0) + 1;
  let ano = Ano;
  const AnoIncio = Ano;
  let mesInicio = '01';
  if (semana1 > 50) mesInicio = '12';
  if (semana1 > 52) {
    semana1 = 1;
    ano = Number(Ano) + 1;
  }

  let semana2 = semana1 + 1;
  if (semana2 > 52) {
    semana2 = 1;
    ano = Number(Ano) + 1;
  }

  let semana3 = semana2 + 1;
  if (semana3 > 52) {
    semana3 = 1;
    ano = Number(Ano) + 1;
  }

  let semana4 = semana3 + 1;
  if (semana4 > 52) {
    semana4 = 1;
    ano = Number(Ano) + 1;
  }

  let semana5 = semana4 + 1;
  if (semana5 > 52) {
    semana5 = 1;
    ano = Number(Ano) + 1;
  }

  const inicioAno1 = `${AnoIncio}-${mesInicio}-01`;
  const finalAno1 = `${AnoIncio}-${mesInicio}-31`;
  const inicioAno = `${ano}-01-01`;
  const finalAno = `${ano}-12-31`;

  const posts = await prisma.relatorioCelulas
    .findMany({
      where: {
        OR: [
          {
            Semana: Number(semana0),
          },
          {
            Semana: Number(semana1),
          },
          {
            Semana: Number(semana2),
          },

          {
            Semana: Number(semana3),
          },
          {
            Semana: Number(semana4),
          },
          {
            Semana: Number(semana5),
          },
        ],
        AND: {
          OR: [
            {
              Data: { lte: new Date(finalAno1), gte: new Date(inicioAno1) },
            },

            {
              Data: { lte: new Date(finalAno), gte: new Date(inicioAno) },
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
}
