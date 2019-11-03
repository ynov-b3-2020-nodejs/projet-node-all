const UserService = require('../services/UserServices');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {createToken} = require('../services/AuthServices');
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require('jsonwebtoken');

module.exports = (router) => {
    router.post('/auth', authentication);

    return router;
};

const authentication = async (req, res) => {
    const { mail, password } = req.body;

    const user = await UserService.findOneBy({mail}, ['password']);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!user || !passwordMatch) {
        res.status(401).json({
            errors: {
                code: "BAD_CREDENTIALS",
                message: "Invalid password or mail"
            }
        });
        return;
    }

    const token = createToken(user);

    res.json({ token });
};

passport.use( new BearerStrategy( (token, callback) => {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err || !decoded) {
            callback(null, false);
            return;
        }

        const user = await UserService.findOneBy({ _id: decoded.userId });

        if (!user) {
            callback(null, false);
            return;
        }

        return callback(null, user);
    });
}));
