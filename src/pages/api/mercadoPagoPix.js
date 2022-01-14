import prisma from 'src/lib/prisma';

const mercadopago = require('mercadopago');

const createdAt = new Date();
const expirationDate = new Date(createdAt.getTime() + 30 * 60000);
const accessToken = process.env.MP_ACCESS_TOKEN; // MP_ACESS_TOKEN

mercadopago.configure({
  access_token: accessToken, // accessToken,
});

//= =========================================================================
async function sendMercadoPago(paymentData) {
  const mercadoPago = mercadopago.payment
    .save(paymentData)
    .then((response) => response)
    .catch((error) => error);
  return mercadoPago;
}
//= =========================================================================
const handler = async (req, res) => {
  //  let respPagamento;

  const paymentData = {
    transaction_amount: Number(req.body.transactionAmount),
    notification_url: 'https://idpb-app.vercel.app/api/notification2',
    description: req.body.description,
    payment_method_id: req.body.paymentMethodId,
    date_of_expiration: expirationDate,
    payer: {
      email: req.body.email,
      identification: {
        type: req.body.tipoDoc,
        number: req.body.docNumber,
      },
    },
  };

  const respPagamento = await sendMercadoPago(paymentData);
  // const respPagamento1 = JSON.stringify(respPagamento);

  const ErroIDPB = { code: '5050', message: 'Erro no acesso ao BD-IDPB' };
  if (!respPagamento.cause) {
    if (
      respPagamento.response.status === 'pending' &&
      respPagamento.response.id
    ) {
      // const urlCreate = `/api/criarEvento`;
      const { status } = respPagamento.response;
      const idPagamento = String(respPagamento.response.id);

      try {
        await prisma.inscritosGlobals
          .create({
            data: {
              Email: req.body.email,
              Nome: req.body.nome,
              CPF: req.body.cpf,
              fpagamento: req.body.paymentMethodId,
              status,
              Adultos: req.body.qtyA,
              Criancas: req.body.qtyC,
              total: req.body.total,
              idPagamento,
              createdAt,
            },
          })
          .finally(async () => {
            await prisma.$disconnect();
          });

        /*  res.status(respPagamento.status).json({
          status: respPagamento.body.status,
          status_detail: respPagamento.body.status_detail,
          id: respPagamento.body.id,
        }); */
        // res.send(JSON.stringify(respPagamento.status));
        res.send(respPagamento);
      } catch (errors) {
        //        const erroIDPB = JSON.stringify(ErroIDPB);
        console.log(ErroIDPB, 'aqui o erro=', errors);
        res.send(ErroIDPB);
      }
    } else {
      console.log('sem bd-idpb - repost de erro do mp ', respPagamento);
      res.send(respPagamento);
    }
  } else {
    console.log('sem bd-idpb - erro ao enviar ao mp', respPagamento.cause);
    res.send(respPagamento);
  }
  // res.send(response);
};

export default handler;
