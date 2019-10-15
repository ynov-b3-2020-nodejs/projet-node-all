const Users = require('./User.controller');

module.exports = function(router) {
    router.post('/create', Users.createUser());
    router.get('/get', Users.getUsers);
    router.get('/get/:name', Users.getUser);
    router.put('/update/:id', Users.updateUser());
    router.delete('/remove/:id', Users.removeUser());
    router.post('/auth',  ); //TODO : route pour auth
};

