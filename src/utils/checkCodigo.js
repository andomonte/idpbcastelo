export default function CheckCodigo(codigoSecretaria) {
  let check = false;
  if (
    codigoSecretaria === 'CB2040' ||
    codigoSecretaria === 'UV4325' ||
    codigoSecretaria === 'CS1008' ||
    codigoSecretaria === 'BP5256' ||
    codigoSecretaria === 'CB1712' ||
    codigoSecretaria === 'CB6652' ||
    codigoSecretaria === 'CB5562'
  )
    check = true;
  return check;
}
