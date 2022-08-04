const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");

const createTransport = () => {
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    })
  );

  return transport;
};
const sendEmail = async (user, Message) => {
  const transporter = createTransport();
  let info = await transporter.sendMail({
    from: "jaindrissosajsd@gmail.com",
    to: `${user.email}`,
    subject: `Hello ${user.name} `,
    html: `This is your code :    ${Message}`,
  });
  console.log("Message sent: %s", info.messageId);

  return;
};

module.exports = { sendEmail };
