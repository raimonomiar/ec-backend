const HttpStatusCode = require('http-status-codes');
const { userService } = require('../../services');
const {
  accessValidator: {
    checkAuthToken,
  },
  getUser: {
    schemaGetUsers,
    schemaGetUser,
  },
} = require('../../lib/route-validators');

const getUsers = async (req, res, next) => {
  try {
    const {
      search, sortBy, sortOrder, limit, offset,
    } = req.query;
    const users = await userService.getAllUsers({
      searchParam: search, sortBy, sortOrder, limit, offset,
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
      checkAuthToken,
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
