import prisma from 'src/lib/prisma';

const mercadopago = require('mercadopago');

const accessToken = process.env.MP_ACCESS_TOKEN; // MP_ACESS_TOKEN

mercadopago.configure({
  access_token: accessToken, // accessToken,
});

//= =========================================================================
async function sendMercadoPago(paymentData) {
  console.log(paymentData);
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
    notification_url:
      'https://webhook.site/c857bd9a-e01e-47ef-ac1b-eeecccf3106c', // 'https://idpb-app.vercel.app/api/notification',
    description: req.body.description,
    payment_method_id: req.body.paymentMethodId,

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
  console.log('v respP=', respPagamento);

  const ErroIDPB = { code: '5050', message: 'Erro no acesso ao BD-IDPB' };
  if (!respPagamento.cause) {
    if (
      respPagamento.response.status === 'pending' &&
      respPagamento.response.id
    ) {
      // const urlCreate = `/api/criarEvento`;
      const { status } = respPagamento.response;
      const idPagamento = String(respPagamento.response.id);
      const createdAt = new Date();
      try {
        await prisma.inscritosGlobals
          .create({
            data: {
              Email: req.body.email,
              Nome: req.body.nome,
              CPF: req.body.cpf,
              Nascimento: req.body.nascimento,
              fpagamento: req.body.paymentMethodId,
              status,
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
