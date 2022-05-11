import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  const { id } = req.body;

  const posts = await prisma.visitantes
    .delete({
      where: {
        id: Number(id),
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  res.json(posts);
}
