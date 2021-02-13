
let headerValidator = require('../../middleware/validator');
let postLoginAPI = require('./Post');
let GetAPI = require('./Get');


module.exports = [
    {
        method: 'POST',
        path: '/login',
        handler: postLoginAPI.APIHandler,
        config: {
            tags: ['api', 'login'],
            description: 'This API is used to login an user in the Admin.',
            auth: false,
            validate: {
                payload: postLoginAPI.payloadValidator,
                // headers: headerValidator.headerAuthValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: postLoginAPI.response
        }
    },
    {
        method: 'GET',
        path: '/tokenVerification',
        handler: GetAPI.APIHandler,
        config: {
            tags: ['api', 'login'],
            description: 'This API is used to Token Verification.',
            auth: false,
            validate: {
                headers: headerValidator.headerAuthValidator,
                query: GetAPI.queryValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: GetAPI.response,

        }
    },
];