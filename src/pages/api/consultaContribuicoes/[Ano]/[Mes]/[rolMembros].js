import prisma from 'src/lib/prisma';

export default async function handle(req, res) {
  // id = req;
  const {
    query: { Mes, Ano, rolMembros },
  } = req;
  const inicioAno = `${Ano}-${Number(Mes) + 1}-01`;
  const finalAno = `${Ano}-${Number(Mes) + 1}-31`;

  try {
    const posts = await prisma.tB_LANCAMENTO
      .findMany({
        where: {
          AND: [
            {
              id_membro: Number(rolMembros),
              LANC_DATA: { lte: new Date(finalAno), gte: new Date(inicioAno) },
            },
          ],
        },
        orderBy: [
          {
            LANC_DATA: 'asc',
          },
        ],
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    const newPosts = JSON.parse(
      JSON.stringify(
        posts,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
      ),
    );
    res.statuCode = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.json(newPosts);
  } catch (err) {
    // console.log(err);
    console.log('errros', err);
    res.json(err);
  } // Get route's catch handler, if it exists
}
