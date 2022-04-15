import cep from 'cep-promise';

const PegaCEP = async (req, res) => {
  const cepPesquisado = req.body.cep;
  console.log(cepPesquisado);
  cep(cepPesquisado)
    .then((result) => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).send(error);
      console.log(error);
    });
};
//= =========================================================================

export default PegaCEP;
