const HttpStatusCode = require('http-status-codes');
const { userService } = require('../../services');
const {
  getUser: {
    schemaGetUsers,
    schemaGetUser,
  },
} = require('../../lib/route-validators');

const getUsers = async (req, res, next) => {
  try {
    const {
      firstName, lastName, sortBy, sortOrder, limit, offset,
    } = req.query;
    const users = await userService.getAllUsers({
      firstName, lastName, sortBy, sortOrder, limit, offset,
    });
    res.status(HttpStatusCode.OK).send(users);
  } catch (error) {
    next(error);
  }
};

const getUserUsingId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUsersById({ userId });
    res.status(HttpStatusCode.OK).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = [
  {
    route: '/',
    method: 'get',
    middlewares: [
      schemaGetUsers,
      getUsers,
    ],
  },
  {
    route: '/:userId',
    method: 'get',
    middlewares: [
      schemaGetUser,
      getUserUsingId,
    ],
  },
];
