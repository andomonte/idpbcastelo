import prisma from 'src/lib/prisma';

const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const dados = req.body;

  const result = await prisma.membros
    .update({
      where: { RolMembro: Number(dados.RolMembro) },
      data: {
        ...dados,
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.status(200).send(result);
};
//= =========================================================================

export default handler;
