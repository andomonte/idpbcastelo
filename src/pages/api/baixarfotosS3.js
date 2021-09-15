import downloadImgS3 from 'src/utils/downloadImgS3';

const handler = async (req, res) => {
  const fileName = { ...req.body };
  console.log('fjile:', fileName);

  const url = await downloadImgS3(fileName);
  console.log('urel:', url);
  res.send(url);
};

export default handler;
