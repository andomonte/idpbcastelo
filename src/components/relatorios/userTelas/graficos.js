import React from 'react';
import { Line } from '@reactchartjs/react-chart.js';

const membros = [10, 11, 14, 12];
const crianças = [3, 6, 10, 5];
const data = {
  labels: ['Semana-1', 'Semana-2', 'Semana-3', 'Semana-4'],
  datasets: [
    {
      label: 'Membros Adultos',
      data: membros,
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
      yAxisID: 'y-axis-1',
    },
    {
      label: 'Visitantes',
      data: crianças,
      fill: false,
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgba(54, 162, 235, 0.2)',
      yAxisID: 'y-axis-1',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          drawOnArea: false,
        },
      },
    ],
  },
};

const Graficos = () => (
  <>
    <Line data={data} options={options} />
  </>
);

export default Graficos;
