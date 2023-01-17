import prisma from 'src/lib/prisma';

const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const dados = req.body;

  if (dados) {
    try {
      const result = await prisma.visitantes

        .create({
          data: {
            ...req.body,
          },
        })
        .finally(async () => {
          await prisma.$disconnect();
        });

      res.status(200).send(result);
    } catch (errors) {
      console.log(errors);
      res.status(400).send('vou criar o banco');
    }
  }
};
//= =========================================================================

export default handler;
