const users = require('./users.dao');

exports.createUser = function(req, res, next) {
  const user = {
    name: req.body.name,
    description: req.body.description,
  };

  Users.create(user, function(err, user) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'User created successfully',
    });
  });
};
exports.removeUser = function(req, res, next) {
  Users.delete({ _id: req.params.id }, function(err, user) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'User deleted successfully',
    });
  });
};
exports.updateUser = function(req, res, next) {
  const user = {
    name: req.body.name,
    description: req.body.description,
  };
  Users.update({ _id: req.params.id }, user, function(err, user) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'User updated successfully',
    });
  });
};
exports.getUsers = function(req, res, next) {
  Users.get({}, function(err, users) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      users: users,
    });
  });
};
exports.getUser = function(req, res, next) {
  Users.get({ name: req.params.name }, function(err, users) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      users: users,
    });
  });
};
