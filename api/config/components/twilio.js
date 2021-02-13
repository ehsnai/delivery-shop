'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
    TWILIO_ACCOUNT_SID: joi.string().required(),
    TWILIO_AUTH_TOKEN: joi.string().required(),
    CELL_PHONE_NUMBER: joi.string().required(),
}).unknown()
    .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    twilio: {
        TWILIO_ACCOUNT_SID: envVars.TWILIO_ACCOUNT_SID,
        TWILIO_AUTH_TOKEN: envVars.TWILIO_AUTH_TOKEN,
        CELL_PHONE_NUMBER: envVars.CELL_PHONE_NUMBER
    }
}

module.exports = config
