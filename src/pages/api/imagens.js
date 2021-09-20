import uploadImagensS3 from 'src/utils/uploadImagensS3';

const handler = async (req, res) => {
  const fileName = { ...req.body };

  const url = await uploadImagensS3(fileName.img);
  console.log(url.Body);
  res.send(url, url.Body);
};

export default handler;
