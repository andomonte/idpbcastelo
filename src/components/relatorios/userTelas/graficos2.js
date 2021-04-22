import React from 'react';
import { Line, Bar, Pie } from '@reactchartjs/react-chart.js';
import { signOut } from 'next-auth/client';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);
function Graficos({ item, secao, Data, tipo }) {
  const dadosUser = item.filter((val) => val.email === secao.user.email);
  if (dadosUser.length === 0) {
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  }
  const mes = String(Number(Data.slice(3, 5)));
  const ano = Data.slice(6, 10);
  //  const [session] = useSession();
  const url = `${window.location.origin}/api/consultaDados/${item[0].codigoIgreja}/${mes}/${ano}`;

  const visitantes = [];
  const conversoes = [];
  const ofertas = [];

  const { data } = useSWR(url, fetcher);
  if (data) {
    for (let i = 0; i < data.length; i += 1) {
      //    adultos[data[i].semana - 1] = data[i].adultos;
      //    crianças[data[i].semana - 1] = data[i].criancas;
      visitantes[data[i].semana - 1] = data[i].visitantes;
      conversoes[data[i].semana - 1] = data[i].conversoes;
      ofertas[data[i].semana - 1] = data[i].ofertas.replace(',', '.');
      // console.log(ofertas);
    }
  }
  const dataGrafic = {
    labels: ['Semana-1', 'Semana-2', 'Semana-3', 'Semana-4'],
    datasets: [
      {
        label: 'Visit.',
        data: visitantes,
        fill: false,
        backgroundColor: '#ffa726',
        borderColor: '#ff9800',
        yAxisID: 'y-axis-1',
      },
      {
        label: 'Conver.',
        data: conversoes,
        fill: false,
        backgroundColor: '#43a047',
        borderColor: '#388e3c',
        yAxisID: 'y-axis-1',
      },
      {
        label: 'Ofertas',
        data: ofertas,
        fill: false,
        backgroundColor: '#283593',
        borderColor: '#1a237e',
        yAxisID: 'y-axis-2',
      },
    ],
  };

  const dataGrafic2 = {
    labels: ['S1', 'S2', 'S3', 'S4', 'S5'],
    datasets: [
      {
        label: 'Ofertas do Mês',
        data: [ofertas[0], ofertas[1], ofertas[2], ofertas[3], ofertas[4]],
        backgroundColor: ['#388e3c', '#283593', '#ff9800', '#546e7a'],
        borderColor: ['#43a047', '#1a237e', '#ffa726', '#6d4c41', '#78909c'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: { beginAtZero: true },
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          showAllTooltips: false,
        },
        {
          ticks: { beginAtZero: true },
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
  return (
    <>
      {tipo === 'linhas' ? <Line data={dataGrafic} options={options} /> : null}
      {tipo === 'barras' ? <Bar data={dataGrafic} options={options} /> : null}
      {tipo === 'acumulados' ? <Pie data={dataGrafic2} /> : null}
    </>
  );
}

export default Graficos;
