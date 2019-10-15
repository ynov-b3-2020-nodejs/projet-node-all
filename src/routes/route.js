const Users = require('./Users.controller');

module.exports = function(router) {
  router.post('/create', Users.createHero);
  router.get('/get', Users.getUsers);
  router.get('/get/:name', Users.getHero);
  router.put('/update/:id', Users.updateHero);
  router.delete('/remove/:id', Users.removeHero);
  router.post('/auth');
  //TODO : route pour auth
};
