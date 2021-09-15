import prisma from 'src/lib/prisma';

// POST /api/user
// Required fields in body: name, email
export default async function handle(req, res) {
  const result = await prisma.relatorios
    .create({
      data: {
        ...req.body,
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.json(result);
}
