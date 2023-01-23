import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { rolMembros },
  } = req;

  const posts = await prisma.cursosConcluidos
    .findMany({
      where: {
        AND: [{ RolMembro: Number(rolMembros) }],
      },
      orderBy: [
        {
          Data: 'desc',
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
