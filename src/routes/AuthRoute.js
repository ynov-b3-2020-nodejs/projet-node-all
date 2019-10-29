const UserService = require('../services/UserServices');
const passport = require('passport');
const LocalStrategy = require('passport-local');

module.exports = (router) => {
    // #TODO connecter avec fonction du groupe B (API Custom)
    router.post('/auth', passport.authenticate('local', {failureRedirect: '/auth'}), (req, res) => {
        res.redirect('/');
    });

    return router;
};


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    const user = UserService.findOneBy({email});
    const encPassword = UserService.hashPassword(password);

    if (!user || encPassword !== user.password) {
        return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
}));