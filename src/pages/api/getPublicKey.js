const handler = async (req, res) => {
  //  let respPagamento;

  let accessToken;
  if (process.env.NODE_ENV !== 'production')
    accessToken = process.env.MP_LOCAL_PUBLIC_KEY;
  else accessToken = process.env.MP_PUBLIC_KEY; // MP_ACESS_TOKEN
  console.log('id=', accessToken);
  res.send(accessToken);
};

export default handler;
