const _ = require('lodash');
const HttpStatusCode = require('http-status-codes');
const {
  app: {
    uri,
  },
  smtp: {
    auth: {
      user: smtpUser,
    },
  },
  constants: {
    TOKEN_TYPE: {
      RESET,
    },
  },
} = require('config');
const {
  userService,
  tokenService,
} = require('../../services');
const mailer = require('../../lib/mailer');
const {
  userErrors: {
    NOT_FOUND,
  },
} = require('../../../constants/errorMaps');
const {
  authTempalte: {
    RESET_PASSWORD: {
      subject,
      text,
    },
  },
} = require('../../../constants/emailTemplates');
const {
  auth: {
    schemaCheckEmail,
  },
} = require('../../lib/route-validators');

const responseGenerator = async (req, res, next) => {
  try {
    const { email } = req.body;
    const [user] = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).send({
        error: NOT_FOUND,
      });
    }
    const token = await tokenService.getResetPasswordToken({
      userId: user.userId,
      tokenType: RESET,
    });
    const resetPasswordLink = `${uri}/resetpassword/${user.userId}?token=${token}`;
    const generateEmailBody = _.template(text);
    const templateParams = { resetPasswordLink };
    await mailer({
      from: smtpUser,
      to: email,
      subject,
      text: generateEmailBody(templateParams),
    });
    return res.status(HttpStatusCode.OK).send();
  } catch (error) {
    return next(error);
  }
};

module.exports = [
  {
    route: '/resetpassword',
    method: 'post',
    middlewares: [
      schemaCheckEmail,
      responseGenerator,
    ],
  },
];
