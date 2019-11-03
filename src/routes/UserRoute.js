const { authenticateRoute } = require('../services/AuthServices');
const UserServices = require('../services/UserServices');

module.exports = (router) => {
  router.post('/users', createUser);
  router.get('/users/:id', authenticateRoute(), getUser);
  router.get('/users/', authenticateRoute(), getAllUsers);
  router.put('/users/:id', authenticateRoute(), updateUser);
  router.delete('/users/:id', authenticateRoute(), deleteUser);

  return router;
};

// route: /users
const createUser = async function (req, res) {
  const { ...userParams } = req.body;
  const user = await UserServices.create(userParams);

  if (!user) {
    res.status(400).json({
      data: {},
      errors: {
        code: 'CANNOT_CREATE_USER',
      },
    });
    return;
  }

  res.json(user);
};

// route: /users/{id}
const deleteUser = async function (req, res) {
  const _id = req.params.id;

  const result = await UserServices.delete({ _id });

  if (result) {
    res.json(UserServices.findOneBy({ _id }));
  } else {
    res.statusCode(400).json({
      data: {},
      error: {
        statuscode: 400,
        message: '400 - Impossible to create the user',
        'return result': result,
      },
    });
  }
};

// route: /users/{id}
const updateUser = async function (req, res, next) {
  const _id = req.params.id;
  const { password, ...user } = req.body;

  // user.password = UserServices.encryptPassword(password);
  user.password = password;

  const result = await UserServices.updateOne({ _id }, user);

  if (result) {
    res.json(await UserServices.findOneBy({ _id }));
  } else {
    res.statusCode(304).json({
      data: {},
      error: {
        error: 304,
        message: '304 - The update could not be done',
        'return result': result,
      },
    });
  }
};

// route: /users/
const getAllUsers = async function (req, res, next) {
  const usersList = await UserServices.findManyBy({});

  if (usersList) {
    res.json(usersList);
  } else {
    res.statusCode(204).json({
      data: {},
      error: {
        statuscode: 204,
        message: '204 - There is nothing here',
        'return result': result,
      },
    });
  }
};

// route: /users/{id}
const getUser = async function (req, res) {
  const _id = req.params.id;

  const user = await UserServices.findOneBy({ _id });

  if (!user) {
    res.statusCode(404).json({
      data: {},
      error: {
        statuscode: '404',
        message: '404 - user not found',
        'return result': user,
      },
    });
  }

  res.json({
    user,
  });
};
