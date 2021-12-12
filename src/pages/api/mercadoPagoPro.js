const mercadopago = require('mercadopago');

let accessToken;
if (process.env.NODE_ENV !== 'production')
  accessToken = process.env.MP_LOCAL_ACCESS_TOKEN;
else accessToken = process.env.MP_ACCESS_TOKEN; // MP_ACESS_TOKEN

mercadopago.configure({
  access_token:
    'APP_USR-6786465624848146-120914-7dfc30c9fd65a1a1437acfce70c019c7-1035907810', // accessToken,
});

//= =========================================================================

//= =========================================================================
const handler = async (req, res) => {
  const preference = {
    items: [
      {
        title: 'Meu produto',
        unit_price: 100,
        quantity: 1,
      },
    ],
  };

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      // Este valor substituirá a string "<%= global.id %>" no seu HTML

      global.id = response.body.id;
      console.log(response.body);
      res.send(global.id);
    })
    .catch((error) => {
      res.send(error);
      console.log(error);
    });
  // res.send(response);
};

export default handler;
