import prisma from 'src/lib/prisma';

const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const dados = req.body;

  if (dados) {
    try {
      const { id } = dados;
      await prisma.relatorioVisitaSupervisao.update({
        where: {
          id,
        },
        data: {
          Nome: dados.Nome,
          Funcao: dados.Funcao,
          CelulaVisitada: dados.CelulaVisitada,
          Supervisao: dados.Supervisao,
          Coordenacao: dados.Coordenacao,
          Distrito: dados.Distrito,
          Data: dados.Data,
          Recepcao: dados.Recepcao,
          Etapas: dados.Etapas,
          Estrutura: dados.Estrutura,
          Observacoes: dados.Observacoes,
          Mes: dados.Mes,
          Ano: dados.Ano,
          Ranking: dados.Ranking,
        },
      });

      res.status(200).send('OK');
    } catch (errors) {
      console.log('erros', errors);
      res.status(400).send(errors);
    }
  }
};
//= =========================================================================

export default handler;
