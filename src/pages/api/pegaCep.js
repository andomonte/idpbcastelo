import axios from 'axios';

const PegaCEP = async (req, res) => {
  const cep = req.body;
  await axios
    .get(`http://viacep.com.br/ws/${cep}/json/`)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((errors) => {
      res.status(500).send(errors);
    });
};
//= =========================================================================

export default PegaCEP;
