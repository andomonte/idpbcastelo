import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { email, nome },
  } = req;
  const Email = email;
  const Nome = nome;

  // const action = `${rel}.findMany`
  const posts = await prisma.ministrosIDPBs
    .findMany({
      where: {
        AND: [{ Email }, { Nome }],
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.statuCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  //  res.end(JSON.stringify({ posts }));
  res.json(posts);
}
