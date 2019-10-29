const MongooseService = require('./MongooseService');

class UserService extends MongooseService {

    constructor () {
        super('User');
    }

    /**
     * @param userData{ mail, lastName, firstName, password }
     * @returns {Promise<User|boolean>}
     */
    async create (userData) {
        return super.create(userData)
    }

    getRandomElementInArray(array) {
        return array[this.getRandomIndexInArray(array)]
    };

    getRandomIndexInArray({ length }) {
        return  Math.floor(Math.random() * length);
    };

}
module.exports = UserService;
