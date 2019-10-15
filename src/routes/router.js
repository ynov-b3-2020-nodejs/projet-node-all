const express = require('expess');

const UserRoutes = require('./UserRoute');

let router = express.Router();
router = UserRoutes(router);

module.exports = router;

