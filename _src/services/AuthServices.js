const authenticationRoute = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // TODO fonction pour retrouver un user avec son email

    if (!user || username !== user.username || password !== user.password) {
        res.statusCode = 401;
        res.json({
            message: 'Bad password or mail'
        })
        return
    }

    //TODO créer un token
    res.json({
        token: 'le token' // token récupéré par la fonction précédente
    })

};

module.exports = {authenticationRoute};

