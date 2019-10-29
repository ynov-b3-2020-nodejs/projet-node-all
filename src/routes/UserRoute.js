module.exports = (router) => {
    router.post('/users', createUser);
    router.get('/users/:id', getUser);
    router.get('/users/', getAllUsers);
    router.put('/users/:id', updateUser);
    router.delete('/users/:id', deleteUser);

    return router;
}

const UserServices = require('../services/UserServices');


// route: /users
const createUser = async function (req, res) {
    
    const {password, ...user} = req.body;

    // user.password = UserServices.encryptPassword(password);
    user.password = password;

    

    const result = await UserServices.create(user);

    if (result) {
        res.json(UserServices.findOneBy({mail: user.mail}));
    } else {
        res.json({
            "error": "400",
            "message": "400 - Impossible to create the user",
            "return result": result
        })
    }
};


// route: /users/{id}
const deleteUser = async function(req, res) {

    const _id = req.params.id;    

    const result = await UserServices.delete({_id: _id});

    if (result) {
        res.json(UserServices.findOneBy({_id: _id}));
    } else {
        res.json({
            "error": "400",
            "message": "400 - Impossible to create the user",
            "return result": result
        })
    }
};


// route: /users/{id}
const updateUser = async function(req, res, next) {

    const _id = req.params.id;    
    const {password, ...user} = req.body;

    // user.password = UserServices.encryptPassword(password);
    user.password = password;

    const result = await UserServices.updateOne({_id: _id}, user);

    if (result) {
        res.json(await UserServices.findOneBy({_id: _id}))
    } else {
        res.json({
            "error": "304",
            "message": "304 - The update could not be done",
            "return result": result
        })
    }
};


// route: /users/
const getAllUsers = async function(req, res, next) {
    const usersList = await UserServices.findManyBy({});

    if (usersList) {
        res.json(usersList);
    } else {
        res.json({
            "error": "204",
            "message": "204 - There is nothing here",
            "return result": result
        })
    }
    
};


// route: /users/{id}
const getUser = async function(req, res) {

    const _id = req.params.id;    

    const user = await UserServices.findOneBy({_id: _id});

    if (!user) {
        res.json({
            "error": "404",
            "message": "404 - user not found",
            "return result": user
        })
    }

    res.json({
        user
    })
};
