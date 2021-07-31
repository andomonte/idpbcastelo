import React from 'react';
import moment from 'moment';

function CalcularData({ Data }) {
  const mes = String(Number(Data.slice(3, 5)));
  const ano = Data.slice(6, 10);

  const newData = `01/${mes}/${ano}`;
  const n = newData.getDay();
  console.log('olha só', newData, n);
  return n;
}
export default CalcularData;
