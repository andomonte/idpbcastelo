import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { rolMembros },
  } = req;

  const posts = await prisma.inscritosCursos
    .findMany({
      where: {
        AND: [{ RolMembro: Number(rolMembros) }, { Status: 'aprovado' }],
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.json(posts);
}
