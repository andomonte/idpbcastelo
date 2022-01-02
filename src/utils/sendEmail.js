import { SMTPClient } from 'emailjs';

export default async function SendEmail(dadosEmail) {
  const client = new SMTPClient({
    user: 'andomonte',
    password: 'leaLMS981341',
    host: 'smtp.gmail.com',
    ssl: true,
  });

  try {
    const message = await client.sendAsync({
      text: dadosEmail.mensagem,
      from: dadosEmail.enviadoPor,
      to: dadosEmail.para,
      cc: '',
      subject: dadosEmail.assunto,
    });
    console.log(message);
  } catch (err) {
    console.error(err);
  }
}
