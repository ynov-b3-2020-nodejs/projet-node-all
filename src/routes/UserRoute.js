module.exports = (router) => {
    router.post('/user', createUser);
    router.get('/user', getUser);
    router.put('/user/:id', updateUser);
    router.delete('/user/:id', deleteUser);

    return router;
}

const UserServices = require('../services/UserServices');

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

    /*Users.create(user, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            // Do something
            message : "User created successfully"
        })
    })*/
};


// DELETE : Antoine
const deleteUser = function(req, res) {
    /*Users.delete({_id: req.params.id}, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            // Do something
            message : "User deleted successfully"
        })
    })*/
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
    /*Users.update({_id: req.params.id}, user, function(err, user) {
        if(err) {
            res.json({
                error : err
            })
        }
        res.json({
            // Do something

            message : "User updated successfully"
        })
    })*/
};


// READ : Zakarya
const getAllUsers = function(req, res, next) {
    /*Users.get({}, function(err, users) {
        if(err) {
            res.json({
                error: err
            })
        }
        res.json({

            users: users
        })
    })*/
};


// READ : Zakarya
const getUser = async function(req, res) {

    const userId = "5db7fd335dabf37080059d0f";

    // Utilisation de la fonction de Mongoose findOne()
    const user = await UserServices.findOneBy({_id: userId});

    if (!user) {
        res.json({
            error: err
        })
    }

    res.json({
        user
    })
};
