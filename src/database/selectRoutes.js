// import connectToDatabase from 'src/utils/mongodb';

export async function selectRoutes() {
  // const { db } = await connectToDatabase();

  // const dataDb = await db.collection('videos').find().toArray();
  const data = [
    { id: 1, label: ' IDPB-Nacional', path: '/' },
    {
      id: 2,
      label: 'Missões',
      path: '/MinisterioDeMissoes/missoes',
    },
    {
      id: 3,
      label: 'DET',
      path: '/DET',
    },
    { id: 2, label: 'Quem Somos', path: '/trendding' },
  ];
  return data;
}

export default selectRoutes;
