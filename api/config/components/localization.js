'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
    DEFAULT_LANGUAGE: joi.string()
        .default('en'),
    LANGUAGES: joi.string()
        .default('en')
}).unknown().required()

const envVars = joi.attempt(process.env, envVarsSchema)

const config = {
    localization: {
        DEFAULT_LANGUAGE: envVars.DEFAULT_LANGUAGE,
        LANGUAGES: envVars.LANGUAGES
    }
}

module.exports = config