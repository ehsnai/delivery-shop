
const Joi = require('joi');

const headerAuthValidator = Joi.object({
    'authorization': Joi.string().required().description("authorization code,Eg. Key").error(new Error('authorization is missing')),
    'lang': Joi.string().default("en").description("Language(English-en),Eg. en").example("en").error(new Error('lang is missing')),
}).options({ allowUnknown: true })

const faildAction = function faildAction(req, reply, source, error) {
    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
}


module.exports = { headerAuthValidator, faildAction };