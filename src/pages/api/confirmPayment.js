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

  const notificationData = {
    id: Number(req.body.id),
    action: req.body.action,
  };
  if (notificationData.id) {
    try {
      const mercadoPago = await mercadopago.payment.findById(
        notificationData.id,
      );

      res.send(mercadoPago);
    } catch (errors) {
      //        const erroIDPB = JSON.stringify(ErroIDPB);

      res.send(errors);
    }
  } else {
    console.log('sem id');
  }
};

export default handler;
