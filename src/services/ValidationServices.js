const {body, param, query, validationResult} = require('express-validator');

module.exports = {

    bodyValidator: (paramNames = []) => paramNames.map(paramName => {
        return body(paramName).exists();
    }),

    queryValidator: (params = []) => params.map(paramName => {
        return query(paramName).exists();
    }),

    paramValidator: (params = []) => params.map(paramName => {
        return param(paramName).exists();
    }),

    verification: (req) => {
        const errors = validationResult(req).array();

        if (errors.length < 1) {
            return false;
        }

        return Object.fromEntries(errors.map(({ msg, param }) => [param, msg]));
    }
};
