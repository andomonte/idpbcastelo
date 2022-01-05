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
  const data1 = req.query;
  let id;
  let topic;
  console.log('data1', data, data1);

  if (req.body.data) id = req.body.data.id;
  else id = req.query.id;
  if (req.body.type) topic = req.body.type;
  else topic = req.query.topic;
  let mercadoPago;
  console.log('data1', data);
  console.log('id', id);
  console.log('topic', topic);

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
  if (id === '123456') id = '1245195651';
  if (topic === 'payment') {
    console.log('entrou', id);
    try {
      mercadoPago = await mercadopago.payment.findById(id);
      console.log(mercadoPago);

      //      res.send(mercadoPago);
    } catch (errors) {
      //        const erroIDPB = JSON.stringify(ErroIDPB);
      console.log('aqui o erro=', errors);
      res.status(500).send('ERRO AO CESSAR MERCADO PAGO');
    }
  }
  if (mercadoPago && mercadoPago.response.status) {
    const posts = await prisma.inscritosGlobals
      .findMany({
        where: {
          AND: [{ idPagamento: id }],
        },
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
    if (posts.length) {
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

        // res.send(JSON.stringify(respPagamento.status));
        console.log('bd-idpb foi atualizado');
        res.status(200).send('OK');
      } catch (errors) {
        //        const erroIDPB = JSON.stringify(ErroIDPB);
        console.log('erro ao acessar bd-idpb=', errors);
        res.status(400).send('vou criar o banco');
      }
    }
    console.log('agora é gravar no banco');
  }
};

export default Notificacao;
