const express = require('expess');

const UserRoutes = require('./UserRoute');
const AuthRoutes = require('./AuthRoute');

let router = express.Router();
router = UserRoutes(router);
router = AuthRoutes(router);

module.exports = router;

