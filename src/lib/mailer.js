const config = require('config');
const { createTransport } = require('nodemailer');

const sendMail = async(mailOptions) => {
  const transport = createTransport(config.get('smtp'));
  return transport.sendMail(mailOptions);
};

module.exports = sendMail;
