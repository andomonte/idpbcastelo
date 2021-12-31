import { useRouter } from 'next/router';

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
  const router = useRouter();
  const { ...dados } = router.query;
  res.status(200).send('OK');
  const notificationData = {
    id: Number(dados.id),
    action: dados.action,
  };

  if (notificationData.id) {
    try {
      const mercadoPago = await mercadopago.payment.findById(
        notificationData.id,
      );
      console.log(mercadoPago);
      //      res.send(mercadoPago);
      res.status(200).send('OK');
    } catch (errors) {
      //        const erroIDPB = JSON.stringify(ErroIDPB);
      console.log('aqui o erro=', errors);
      res.send(errors);
    }
  }
};

export default handler;
