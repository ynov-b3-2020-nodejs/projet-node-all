const getRandomUser = ({ length }) => Math.floor(Math.random() * length);
const getRandomElementInArray = (array) => array[getRandomIndexInArray(array)];

module.exports = {
    getRandomElementInArray,
};
