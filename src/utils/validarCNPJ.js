import { cnpj } from 'cpf-cnpj-validator';

export default function ValidaCNPJ(CNPJ) {
  const checkCNPJ = cnpj.isValid(CNPJ);
  return checkCNPJ;
}
