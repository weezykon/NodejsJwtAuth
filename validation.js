const Joi = require('@hapi/joi');

// Validation
const validateSignup = (data) => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        phone: Joi.number().min(6).required(),
    }
    return Joi.validate(data, schema);
}

const validateLogin = (data) => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    }
    return Joi.validate(data, schema);
}

module.exports.validateSignup = validateSignup;
module.exports.validateLogin = validateLogin;