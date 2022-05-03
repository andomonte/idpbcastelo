import cep from 'cep-promise';

const PegaCEP = async (req, res) => {
  const cepPesquisado = req.body.cep;

  cep(cepPesquisado)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).send(error);
      console.log(error);
    });
};
//= =========================================================================

export default PegaCEP;
