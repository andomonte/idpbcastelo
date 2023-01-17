// CONVERTE DATA NO FORMATO DD/MM/AAAA para AAAA-MES-DIA
export default function FormartaData(data) {
  const dia = data.substring(0, 2);
  const mes = data.substring(3, 5);
  const ano = data.substring(6, 10);
  const AAAAMMDD = `${ano}-${mes}-${dia} 00:00:00`;
  const novaData = new Date(AAAAMMDD);
  return novaData;
}
