module.exports = (router) => {
  router.post('/users', createUser);
  router.get('/users/:id', getUser);
  router.get('/users/', getAllUsers);
  router.put('/users/:id', updateUser);
  router.delete('/users/:id', deleteUser);

  return router;
};

const UserServices = require('../services/UserServices');

// route: /users
const createUser = async function (req, res) {
  const { password, ...user } = req.body;

  // user.password = UserServices.encryptPassword(password);
  user.password = password;

  const result = await UserServices.create(user);

  if (result) {
    res.json(UserServices.findOneBy({ mail: user.mail }));
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
