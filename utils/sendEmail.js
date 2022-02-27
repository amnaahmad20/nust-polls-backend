import nodemailer from 'nodemailer';
const { createTransport } = nodemailer;

const sendEmail = (options) => {
  const transporter = createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  return new Promise((res, rej) => {
    transporter
      .sendMail(mailOptions)
      .then((data) => {
        if (
          data &&
          data.response &&
          data.response.toLowerCase().includes('ok')
        ) {
          res({ message: 'Email sent' });
        } else {
          rej(new Error("Couldn't send email. Try again!"));
        }
      })
      .catch((err) => rej(err));
  });
};

export default sendEmail;
