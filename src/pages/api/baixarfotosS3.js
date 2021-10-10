import downloadImgS3 from 'src/utils/downloadImgS3';

const handler = async (req, res) => {
  const fileName = { ...req.body };

  const url = await downloadImgS3(fileName);

  res.send(url);
};

export default handler;
