const User = require('../models/UserModel');

// TODO: faut-il utiliser this plutot que le model USER ???? À vérifier dans la doc de user.static
User.statics = {
    getOneUserBy: async (condition) => {
        try {
            return await User.findOne(condition)
        } catch (e) {
            return false
        }
    },

    createUser: async (userParams) => {
        const user = new User(userParams)

        try {
            await user.validate()
            return await user.save()
        } catch (e) {
            return null
        }
    },

    deleteUser: async (userId) => {
        try {
            const userDelete = await User.deleteOne({_id: userId})
            return userDelete.deletedCount > 1;
        } catch (e) {
            return false
        }
    }
}

module.exports = User
