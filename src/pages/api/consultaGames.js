import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  // console.log('dados do api', ...req.body);
  const posts = await prisma.games.findMany({}).finally(async () => {
    await prisma.$disconnect();
  });
  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  //  res.end(JSON.stringify({ posts }));
  res.json(posts);
}
