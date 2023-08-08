const _ = require('lodash');
const HttpStatusCode = require('http-status-codes');
const { userService } = require('../../services');
const mailer = require('../../lib/mailer');

const emailTemplate = `
Please click on this link to reset your password: <%= resetPasswordLink %>
`;

const responseGenerator = async (req, res, next) => {
  try {
    const { email } = req.body;
    const [user] = await userService.getUserByEmail(email);
    if (!user) {
      res.status(HttpStatusCode.NOT_FOUND).send({
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found.',
        },
      });
    }
    const resetPasswordLink = `http://localhost:10000/resetpassword/${user.userId}`;
    const generateEmailBody = _.template(emailTemplate);
    const templateParams = { resetPasswordLink };
    await mailer({
      from: 'noreply@ayushkarki.com.np',
      to: email,
      subject: 'Reset Password',
      text: generateEmailBody(templateParams),
    });
    res.status(HttpStatusCode.OK).send();
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/resetpassword',
    method: 'post',
    middlewares: [
      responseGenerator,
    ],
  },
];
