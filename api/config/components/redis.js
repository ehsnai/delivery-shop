
'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
    REDIS_URI: joi.string().uri({ scheme: 'redis' }).required()
}).unknown()
    .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    redis: {
        REDIS_URI: envVars.REDIS_URI 
    }
}

module.exports = config