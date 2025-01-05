export default function PegarData(Semana, Ano) {
  const sunday = new Date(Ano, 0, Semana * 7);

  while (sunday.getDay() !== 3) {
    sunday.setDate(sunday.getDate() - 1);
  }
  return sunday;
}
