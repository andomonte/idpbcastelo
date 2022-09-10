import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  const { id } = req.body;

  await prisma.visitantes
    .delete({
      where: {
        id: Number(id),
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.status(200).send('OK');
}
