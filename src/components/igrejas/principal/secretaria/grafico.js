import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box } from '@material-ui/core';

export default function Grafico({ dados, qtdMembros, parametros }) {
  const presCelulaDesejado =
    dados.semanas * ((parametros[0].PresCelulas * 10) / 100).toFixed(2);

  const presCelebracaoDesejado =
    dados.semanas * ((parametros[0].PresCelebracao * 10) / 100).toFixed(2);

  const discipulado =
    dados.semanas * ((parametros[0].Discipulado * 10) / 100).toFixed(2);

  const leitura =
    dados.semanas * ((parametros[0].Leitura * 10) / 100).toFixed(2);

  const visCelulaDesejado =
    dados.semanas * ((parametros[0].VisCelula * qtdMembros) / 100).toFixed(0);

  const visCelebracaoDesejado =
    dados.semanas *
    ((parametros[0].VisCelebracao * qtdMembros) / 100).toFixed(0);
  const visitasLider =
    dados.semanas * ((parametros[0].Visitas * qtdMembros) / 100).toFixed(0);
  const eventos =
    dados.semanas * ((parametros[0].Eventos * qtdMembros) / 100).toFixed(0);
  const relatorios =
    dados.Relatorio +
    dados.Pontualidade +
    dados.RelCelebracao +
    dados.RelCelulaFeito +
    dados.RelDiscipulado;

  const RelatorioDesejado =
    dados.semanas * ((parametros[0].Relatorios * 5) / 100).toFixed(0);
  const PlanejamentoDesejado =
    dados.semanas * ((parametros[0].Planejamento * 10) / 100).toFixed(0);

  console.log('ola', visCelulaDesejado, dados, parametros[0], relatorios);
  const data = {
    labels: [
      'Relatórios',
      'Planejamento',
      'Pres-Célula',
      'Pres-Culto',
      'Discipulado',
      'Leitura',
      'Vis-Célula',
      'Vis-Culto',
      'Visitas',
      'Eventos',
    ],

    datasets: [
      {
        type: 'bar',
        label: 'Pontos Feitos',
        data: [
          relatorios,
          dados.planejamento,
          dados.percPresentes,
          dados.percCelebracaoIgreja,
          dados.percDiscipulado,
          dados.percLeituraBiblica,
          dados.VisitantesCelula,
          dados.VisitantesCelebracao,
          dados.Visitas,
          dados.Eventos,
        ],
        borderColor: 'rgb(59, 44, 181)',
        backgroundColor: 'rgba(99, 147, 255, 0.6)',
      },
      {
        type: 'line',
        label: 'Pontos Desejado',
        data: [
          RelatorioDesejado,
          PlanejamentoDesejado,
          presCelulaDesejado,
          presCelebracaoDesejado,
          discipulado,
          leitura,
          visCelulaDesejado,
          visCelebracaoDesejado,
          visitasLider,
          eventos,
        ],
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
      },
    ],
  };
  const config = {
    type: 'scatter',
    data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  return (
    <Box width="100%">
      <Box textAlign="center">
        <h2>
          DESEMPENHO DE {dados.semanas}{' '}
          {dados.semanas > 1 ? 'SEMANAS' : 'SEMANA'}
        </h2>
      </Box>
      <Bar data={data} width={400} height={200} />
      <Box mt={5} />
    </Box>
  );
}
