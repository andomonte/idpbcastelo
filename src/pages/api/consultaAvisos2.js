import prisma from 'src/lib/prisma';

const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const dados = req.body;

  if (dados) {
    try {
      const posts = await prisma.avisos
        .findMany({
          where: {
            semana: dados.id,
          },
        })
        .finally(async () => {
          await prisma.$disconnect();
        });

      res.json(posts[0]);
    } catch (errors) {
      res.json('erro');
    }
  }
};
//= =========================================================================

export default handler;
