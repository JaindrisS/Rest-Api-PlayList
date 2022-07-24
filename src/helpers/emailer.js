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

const sendEmail = async (user) => {
  const transporter = createTransport();
  let info = await transporter.sendMail({
    from: "jaindrissosajsd@gmail.com",
    to: `${user.email}`,
    subject: `Hello ${user.name} thank you for registering`,
    html: "Thanks",
  });
  console.log("Message sent: %s", info.messageId);

  return;
};

module.exports = { sendEmail };
