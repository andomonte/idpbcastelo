import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;

  const posts = await prisma.cursos
    .findMany({
      orderBy: {
        codigoCurso: 'desc',
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  res.send(
    JSON.stringify(posts, (_, v) => (typeof v === 'bigint' ? v.toString() : v)),
  );
}
