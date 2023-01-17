import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;

  const posts = await prisma.cursosConcluidos
    .findMany({
      orderBy: [
        {
          Data: 'asc',
        },
      ],
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.send(
    JSON.stringify(posts, (_, v) => (typeof v === 'bigint' ? v.toString() : v)),
  );
}
