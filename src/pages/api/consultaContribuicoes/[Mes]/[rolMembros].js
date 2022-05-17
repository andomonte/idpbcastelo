import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { Mes, rolMembros },
  } = req;
  try {
    const posts = await prisma.contribuicoes
      .findMany({
        where: {
          AND: [{ RolMembro: Number(rolMembros) }, { Mes }],
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
    res.statuCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.json(err);
  } // Get route's catch handler, if it exists
}
