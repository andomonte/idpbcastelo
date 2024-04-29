import prisma from 'src/lib/prisma';

const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const dados = req.body;

  const result = await prisma.inscritosEventosIgreja
    .update({
      where: { idPagamento: dados.idPagamento },
      data: {
        pulseira: 'entregue',
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.status(200).send(result);
};
//= =========================================================================

export default handler;
