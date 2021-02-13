
'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
    MAILGUN_AUTH_KEY: joi.string().required(),
    MAILGUN_DOMAIN_NAME: joi.string().required()
}).unknown()
    .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    mailgun: {
        MAILGUN_AUTH_KEY: envVars.MAILGUN_AUTH_KEY,
        MAILGUN_DOMAIN_NAME: envVars.MAILGUN_DOMAIN_NAME
    }
}

module.exports = config