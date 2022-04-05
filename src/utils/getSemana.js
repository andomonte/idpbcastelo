export default function PegarSemana(Mes, Ano) {
  const currentdate = new Date(Ano, Mes);

  const oneJan = new Date(currentdate.getFullYear(), 0, 1);
  while (oneJan.getDay() !== 0) {
    oneJan.setDate(oneJan.getDate() + 1);
  }

  const numberOfDays = Math.floor(
    (currentdate - oneJan) / (24 * 60 * 60 * 1000),
  );
  const result = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);

  return result;
}
