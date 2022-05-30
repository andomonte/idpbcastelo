import prisma from 'src/lib/prisma';

// POST /api/user
// Required fields in body: name, email
export default async function handle(req, res) {
  const {
    query: { nome, nascimento },
  } = req;
  const result = await prisma.lideranca
    .update({
      where: {
        AND: [{ Nome: nome }, { Nascimento: nascimento }],
      },
      data: {
        ...req.body,
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.json(result);
}
