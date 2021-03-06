import prisma from 'src/lib/prisma';

// POST /api/user
// Required fields in body: name, email
export default async function handle(req, res) {
  const { id } = req.body;
  const { Email } = req.body;

  const result = await prisma.lideranca
    .update({
      where: {
        id,
      },
      data: {
        Email,
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.json(result);
}
