function RegioesMM(perfilUser) {
  const BR1 = ['MM-Nordeste 1', 'MM-Nordeste 2', 'MM-Nordeste 3'];
  const BR2 = ['MM-CentroOeste', 'MM-Suldeste', 'MM-Sul'];
  const INTER1 = ['MM-Sulamerica'];
  const MM = [
    'MM-Nordeste 1',
    'MM-Nordeste 2',
    'MM-Nordeste 3',
    'MM-CentroOeste',
    'MM-Suldeste',
    'MM-Sul',
    'MM-Sulamericana',
  ];
  if (perfilUser === 'BR-1') return BR1;
  if (perfilUser === 'BR-2') return BR2;
  if (perfilUser === 'INTER-1') return INTER1;
  if (perfilUser === 'MM-GLOBAL') return MM;
  return 0;
}
export default RegioesMM;
