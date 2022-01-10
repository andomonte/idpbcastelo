import prisma from 'src/lib/prisma';

const mercadopago = require('mercadopago');

let accessToken;
if (process.env.NODE_ENV !== 'production')
  accessToken = process.env.MP_LOCAL_ACCESS_TOKEN;
else accessToken = process.env.MP_ACCESS_TOKEN; // MP_ACESS_TOKEN

mercadopago.configure({
  access_token: accessToken, // accessToken,
});

const Notificacao = async (req, res) => {
  //  let respPagamento;
  const data = req.body;
  let id;
  let topic;
  console.log('data1', data);

  if (req.body.data) id = req.body.data.id;
  else id = req.query.id;
  if (req.body.type) topic = req.body.type;
  else topic = req.query.topic;
  let mercadoPago;

  if (id === '123456') id = '1245195651';
  if (topic === 'payment') {
    try {
      mercadoPago = await mercadopago.payment.findById(id);

      //      res.send(mercadoPago);
    } catch (errors) {
      //        const erroIDPB = JSON.stringify(ErroIDPB);

      res.status(500).send('ERRO AO CESSAR MERCADO PAGO');
    }
  }
  console.log('id--', id);
  if (mercadoPago && mercadoPago.response.status) {
    try {
      await prisma.inscritosGlobals
        .update({
          where: { idPagamento: id },
          data: {
            status: mercadoPago.response.status,
          },
        })
        .finally(async () => {
          await prisma.$disconnect();
        });

      // res.send(JSON.stringify(respPagamento.status));

      res.status(200).send('OK');
    } catch (errors) {
      //        const erroIDPB = JSON.stringify(ErroIDPB);

      res.status(400).send('vou criar o banco');
    }
  }
};

export default Notificacao;
