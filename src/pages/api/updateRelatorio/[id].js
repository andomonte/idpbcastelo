import prisma from 'src/lib/prisma';

// POST /api/user
// Required fields in body: name, email
export default async function handle(req, res) {
  const postId = req.query.id;
  const result = await prisma.relatorios.update({
    where: { id: Number(postId) },
    data: {
      ...req.body,
    },
  });
  console.log(result);
  res.json(result);
}
