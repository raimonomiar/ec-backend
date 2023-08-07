const { userService } = require('../../services');
const HttpStatusCode = require('http-status-codes');

const updatePassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { userId } = req.params;
    await userService.updatePassword({ userId, password });
    res.status(HttpStatusCode.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/:userId/password',
    method: 'put',
    middlewares: [
      updatePassword,
    ],
  },
];