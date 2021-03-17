const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
export default async function handle(req, res) {
  const posts = await prisma.igrejas.findMany();
  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  //  res.end(JSON.stringify({ posts }));
  res.json(posts);
}
