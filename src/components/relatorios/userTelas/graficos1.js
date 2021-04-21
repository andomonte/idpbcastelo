import React from 'react';
import { Line, Bar } from '@reactchartjs/react-chart.js';
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
  const adultos = [];
  const crianças = [];

  const { data } = useSWR(url, fetcher);
  if (data) {
    for (let i = 0; i < data.length; i += 1) {
      adultos[data[i].semana - 1] = data[i].adultos;
      crianças[data[i].semana - 1] = data[i].criancas;

      // console.log(adultos[data[i].semana]);
    }
  }

  const dataGrafic = {
    labels: ['Semana-1', 'Semana-2', 'Semana-3', 'Semana-4'],
    datasets: [
      {
        label: 'Adultos',
        data: adultos,
        fill: false,
        backgroundColor: 'rgb(535, 09, 025)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      },
      {
        label: 'Crianças',
        data: crianças,
        fill: false,
        backgroundColor: '#c6ff00',
        borderColor: '#aeea00',
        yAxisID: 'y-axis-1',
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
        },
      ],
    },
  };
  return (
    <>
      {tipo === 'linhas' ? <Line data={dataGrafic} options={options} /> : null}
      {tipo === 'barras' ? <Bar data={dataGrafic} options={options} /> : null}
    </>
  );
}

export default Graficos;
