import prisma from 'src/lib/prisma';

const mercadopago = require('mercadopago');

let accessToken;
if (process.env.NODE_ENV !== 'production')
  accessToken = process.env.MP_LOCAL_ACCESS_TOKEN;
else accessToken = process.env.MP_ACCESS_TOKEN; // MP_ACESS_TOKEN

mercadopago.configure({
  access_token: accessToken, // accessToken,
});

const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');
  const data = req.body;
  if (data) console.log('data1', data);
  else console.log('erro aqui');
  let mercadoPago;
  const { id } = req.body.data1;
  const topic = data.type;
  console.log('data2', data, id);

  /*   Object.keys(data).forEach((key) => {
    console.log('datakey', data[key]);
    if (key === 'data.id') id = data[key];
    if (key === 'type') topic = data[key];
  });
 */ console.log(
    'valores de id e topic:',
    id,
    topic,
  );
  if (topic === 'payment') {
    console.log('entrou', id);
    try {
      mercadoPago = await mercadopago.payment.findById(id);
      console.log(mercadoPago);
      res.status(200).send('OK');
      //      res.send(mercadoPago);
    } catch (errors) {
      //        const erroIDPB = JSON.stringify(ErroIDPB);
      console.log('aqui o erro=', errors);
      res.status(500).send('ERRO AO CESSAR MERCADO PAGO');
    }
  }
  if (mercadoPago && mercadoPago.response.status) {
    try {
      await prisma.inscritosGlobals
        .update({
          where: { idPagamento: id },
          data: {
            status: 'mercadoPago.response.status',
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
      console.log('bd-idpb foi atualizado');
    } catch (errors) {
      //        const erroIDPB = JSON.stringify(ErroIDPB);
      console.log('erro ao acessar bd-idpb=', errors);
      res.status(400).send('NG');
    }
  }
};

export default handler;
