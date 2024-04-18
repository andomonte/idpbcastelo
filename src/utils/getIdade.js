export default function PegaIdade(dateString, dataEvento) {
  const dia = dateString.substr(0, 2); // a partir do caracter 0 pega 2 caracteres
  const mes = dateString.substr(3, 2); // a partir do caracter 3 pega 2 caracteres
  const ano = dateString.substr(6, 4); // a partir do caracter 6 pega 4 caracteres
  const dataNiver = `${ano}/${mes}/${dia}`;
  const today = dataEvento ? new Date(dataEvento) : new Date();
  const birthDate = new Date(dataNiver);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}
