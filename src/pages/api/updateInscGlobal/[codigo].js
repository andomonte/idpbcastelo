import prisma from 'src/lib/prisma';

// POST /api/user
// Required fields in body: name, email
export default async function handle(req, res) {
  const postId = req.query.codigo;

  const result = await prisma.inscritosGlobals
    .update({
      where: { idPagamento: postId },
      data: {
        ...req.body,
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.json(result);
}
