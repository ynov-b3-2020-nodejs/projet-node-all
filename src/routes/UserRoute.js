module.exports = (router) => {
    router.post('/user', createUser);
    router.get('/user', getAllUsers);
    router.get('/user/:id', getUserById);
    router.put('/user/:id', updateUser);
    router.delete('/user/:id', deleteUser);

    return router;
}

// TODO utiliser les fonction du DAO dans chacune des routes.
// CREATE : Gianni
const createUser = function (req, res) {
    const user = {
        mail: req.body.mail,
        password: req.body.password,
        firstName: req.body.firstname,
        lastname: req.body.lastname,
        isAbsent: req.body.isAbsent,
        imageURL: req.body.imageURL
    };

    Users.create(user, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User created successfully"
        })
    })
};


// DELETE : Antoine
const deleteUser = function(req, res) {
    Users.delete({_id: req.params.id}, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User deleted successfully"
        })
    })
};


// UPDATE : Julien
const updateUser = function(req, res, next) {
    const user = {
        mail: req.body.mail,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        isAbsent: req.body.isAbsent,
        imageURL: req.body.imageURL
    };
    Users.update({_id: req.params.id}, user, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            message : "User updated successfully"
        })
    })
};


// READ : Zakarya
const getAllUsers = function(req, res, next) {
    Users.get({}, function(err, users) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({
            users: users
        })
    })
};


// READ : Zakarya
const getUserById = function(req, res) {
    Users.get({mail: req.params.mail}, function (err, users) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            users: users
        })
    })
};
