import moment from 'moment-timezone';

function converterParaBrasilia(dataOriginal) {
  return moment(dataOriginal).tz('America/Sao_Paulo').toDate();
}
function FormataStringData(data) {
  // Converte o objeto Date atual (UTC) para o fuso horário de Brasília
  const dataBrasilia = converterParaBrasilia(data);
  return dataBrasilia;
  // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}
export default FormataStringData;
