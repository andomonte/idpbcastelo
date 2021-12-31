import { payment } from 'mercadopago';
import prisma from 'src/lib/prisma';

const mercadopago = require('mercadopago');

let accessToken;
if (process.env.NODE_ENV !== 'production')
  accessToken = process.env.MP_LOCAL_ACCESS_TOKEN;
else accessToken = process.env.MP_ACCESS_TOKEN; // MP_ACESS_TOKEN

mercadopago.configure({
  access_token: accessToken, // accessToken,
});

//= =========================================================================
async function sendMercadoPago(paymentData) {
  console.log(paymentData);
  const mercadoPago = mercadopago.payment
    .save(paymentData)
    .then(
      (response) => response,
      //      res.send(JSON.stringify(response.status));
      // JSON.stringify(response.body),
      /*  res.status(response.status).json({
        status: response.body.status,
        status_detail: response.body.status_detail,
        id: response.body.id,
      });
      */ // res.send(JSON.stringify(response.body)),
      //      console.log('valor=', JSON.stringify(response.body));
      /* */
    )
    .catch(
      (error) => error,
      //        console.log(error);
      //      console.log('errr=', respPagamento);
      //  res.send(error);
    );
  return mercadoPago;
}
//= =========================================================================
const handler = async (req, res) => {
  //  let respPagamento;

  const paymentData = {
    transaction_amount: Number(req.body.transactionAmount),
    notification_url: 'https://idpb-app.vercel.app/api/mpNotifications',
    token: req.body.token,
    description: req.body.description,
    installments: Number(req.body.installments),
    payment_method_id: req.body.paymentMethodId,
    issuer_id: req.body.issuer,
    payer: {
      email: req.body.email,
      identification: {
        type: req.body.docType,
        number: req.body.docNumber,
      },
    },
  };
  /*  const dataTime = (separator = '') => {
    const newDate = new Date();
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
  }; */
  const respPagamento = await sendMercadoPago(paymentData);
  // const respPagamento1 = JSON.stringify(respPagamento);
  console.log('v respP=', respPagamento);

  const ErroIDPB = { code: '5050', message: 'Erro no acesso ao BD-IDPB' };
  if (!respPagamento.cause) {
    if (
      respPagamento.response.status === 'approved' ||
      respPagamento.response.status === 'in_process'
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
              fpagamento: req.body.fPagamento,
              status,
              idPagamento,
              Adultos: req.body.Adultos,
              Criancas: req.body.Criancas,
              total: req.body.total,
              createdAt,
            },
          })
          .finally(async () => {
            await prisma.$disconnect();
          });

        return res.send(respPagamento);
      } catch (errors) {
        //        const erroIDPB = JSON.stringify(ErroIDPB);
        console.log(ErroIDPB, 'aqui o erro=', errors);
        res.send(ErroIDPB);
      }
    } else {
      console.log('sem bd-idpb - repost de erro do mp ', respPagamento.cause);
      res.send(respPagamento);
    }
  } else {
    console.log('sem bd-idpb - erro ao enviar ao mp', respPagamento.cause);
    res.send(respPagamento);
  }
  // res.send(response);
  return 0;
};

export default handler;
