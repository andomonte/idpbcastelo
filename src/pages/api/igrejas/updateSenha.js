import prisma from 'src/lib/prisma';
import CryptoJS from 'crypto-js';
// POST /api/user
// Required fields in body: name, email
export default async function handle(req, res) {
  const { RolMembro } = req.body;
  const { senha } = req.body;
  const ciphertext = CryptoJS.AES.encrypt(
    senha,
    'secret key lea123',
  ).toString();
  const result = await prisma.membros
    .update({
      where: {
        RolMembro,
      },
      data: {
        senha: String(ciphertext),
      },
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.json(result);
}
