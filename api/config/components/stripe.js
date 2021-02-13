
'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
    STRIPE_TEST_SECRETE_KEY: joi.string().required(),
    STRIPE_TEST_PUBLISH_KEY: joi.string().required(),
}).unknown()
    .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    stripe: {
        STRIPE_TEST_SECRETE_KEY: envVars.STRIPE_TEST_SECRETE_KEY,
        STRIPE_TEST_PUBLISH_KEY: envVars.STRIPE_TEST_PUBLISH_KEY
    }
}

module.exports = config