const { userService } = require('../../services');
const HttpStatusCode = require('http-status-codes');

const responseGenerator = async (req, res, next) => {
  try {
    const { body } = req;
    await userService.addUser(body);
    res.status(HttpStatusCode.OK).send();
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
  route: '/',
  method: 'post',
  middlewares: [
    responseGenerator,
  ],
 },
];
