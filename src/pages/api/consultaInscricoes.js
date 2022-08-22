import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;

  const posts = await prisma.inscricoes
    .findMany({
      orderBy: {
        Inicio: 'desc',
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  res.send(posts);
}
