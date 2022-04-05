import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { distrito, celula },
  } = req;

  const Distrito = Number(distrito);
  const Celula = Number(celula);
  const posts = await prisma.pontuacao
    .findMany({
      where: {
        AND: {
          Celula: Number(Celula),
          Distrito: Number(Distrito),
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
