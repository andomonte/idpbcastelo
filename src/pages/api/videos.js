import uploadVideosS3 from 'src/utils/uploadVideosS3';

const handler = async (req, res) => {
  const { fileName } = req.body;

  const url = await uploadVideosS3(fileName);
  res.send(url);
};

export default handler;
