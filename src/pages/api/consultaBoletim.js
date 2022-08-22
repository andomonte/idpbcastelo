import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;

  const posts = await prisma.boletim
    .findMany({
      orderBy: {
        semana: 'desc',
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.send(posts[0].semana);
}
