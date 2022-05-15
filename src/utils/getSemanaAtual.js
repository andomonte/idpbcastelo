export default function semanaExata(dataRecebida) {
  //= ==========pegar semana apartir da data==============
  const dataEnviada = new Date(dataRecebida);
  const Ano = dataEnviada.getFullYear();
  const Mes = dataEnviada.getMonth();
  const Dia = dataEnviada.getDate();
  const firstSun = new Date(2021, 0, 1);
  const lastSun = new Date(Ano, Mes, Dia);
  while (firstSun.getDay() !== 2) {
    firstSun.setDate(firstSun.getDate() + 1);
  }
  while (lastSun.getDay() !== 2) {
    lastSun.setDate(lastSun.getDate() + 1);
  }

  let result = 0;
  for (let i = result + 1; lastSun - firstSun > 0; i += 1) {
    lastSun.setDate(lastSun.getDate() - 7);
    if (i > 52) i = 1;
    result = i;
  }

  return result;
}
