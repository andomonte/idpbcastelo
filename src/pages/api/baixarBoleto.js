import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';

const pipeline = promisify(stream.pipeline);
/* const url =
  'https://w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; */

const BaixarBoleto = async (req, res) => {
  // const url = req.body;
  const url =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  console.log('url', url);
  const response = await fetch(url); // replace this with your API call & options
  if (!response.ok) {
    console.log('resposta:', response);
    throw new Error(`unexpected response ${response.statusText}`);
  }
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=dummy.pdf');
  await pipeline(response.body, res);
};

export default BaixarBoleto;
