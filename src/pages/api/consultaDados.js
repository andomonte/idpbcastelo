import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  // console.log('dados do api', ...req.body);
  const posts = await prisma.igrejas.findMany({
    where: { id: 1 },
  });
  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  //  res.end(JSON.stringify({ posts }));
  res.json(posts);
}
