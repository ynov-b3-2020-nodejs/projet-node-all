const { authenticateRoute } = require('../services/AuthServices');
const UserServices = require('../services/UserServices');
const {
  bodyValidator,
  verification,
} = require('../services/ValidationServices');

// route: /users
const createUser = async function (req, res) {
  const fieldsVerification = verification(req);
  if (fieldsVerification) {
    res.status(422).json({
      errors: fieldsVerification,
    });
    return;
  }

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

  res.status(201).json(user);
};

// route: /users/{id}
const getUser = async function (req, res) {
  const _id = req.params.id;

  const user = await UserServices.findOneBy({ _id });

  if (!user) {
    res.statusCode(404).json({
      data: {},
      error: {
        message: 'User not found',
        code: 'CANNOT_FOUND_USER',
      },
    });
  }

  res.json({ user });
};

// route: /users
const getAllUsers = async function (req, res) {
  const usersList = await UserServices.findManyBy({});

  if (usersList.length > 0) {
    res.json(usersList);
    return;
  }

  res.status(204).json([]);
};

// route: /users/{id}
const updateUser = async (req, res) => {
  const fieldsVerification = verification(req);
  if (fieldsVerification.length > 0) {
    res.status(422).json({
      errors: fieldsVerification,
    });
  }

  const _id = req.params.id;
  const { ...user } = req.body;

  const result = await UserServices.updateOne({ _id }, user);

  if (!result) {
    res.statusCode(304).json({
      data: {},
      error: {
        message: 'The update could not be done',
      },
    });
  }

  res.status(204).send();
};

// route: /users/{id}
const deleteUser = async function (req, res) {
  const _id = req.params.id;

  const result = await UserServices.delete({ _id });

  if (!result) {
    res.status(400).json({
      data: {},
      error: {
        message: 'Impossible to create the user',
      },
    });
  }

  res.status(204).send();
};

module.exports = (router) => {
  router.post(
    '/users',
    bodyValidator(['mail', 'password', 'firstName', 'lastName']),
    createUser,
  );
  router.get('/users/:id', authenticateRoute(), getUser);
  router.get('/users/', authenticateRoute(), getAllUsers);
  router.put(
    '/users/:id',
    [authenticateRoute(), bodyValidator(['mail', 'password'])],
    updateUser,
  );
  router.delete('/users/:id', authenticateRoute(), deleteUser);

  return router;
};
