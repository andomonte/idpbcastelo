import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { Ano, rolMembros },
  } = req;
  const inicioAno = `${Ano}-01-01`;
  const finalAno = `${Ano}-12-31`;

  const posts = await prisma.cursosConcluidos
    .findMany({
      where: {
        AND: [
          {
            RolMembro: Number(rolMembros),
            Data: { lte: new Date(finalAno), gte: new Date(inicioAno) },
          },
        ],
      },
      orderBy: [
        {
          Data: 'asc',
        },
      ],
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  const newPosts = JSON.parse(
    JSON.stringify(
      posts,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
    ),
  );
  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.json(newPosts);
}
