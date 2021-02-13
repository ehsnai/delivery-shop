
let headerValidator = require('../../middleware/validator');
let postRegisterAPI = require('./Post');


module.exports = [
    {
        method: 'POST',
        path: '/register',
        handler: postRegisterAPI.APIHandler,
        config: {
            tags: ['api', 'register'],
            description: 'This API is used to register an user in the front.',
            auth: false,
            validate: {
                payload: postRegisterAPI.payloadValidator,
                // headers: headerValidator.headerAuthValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: postRegisterAPI.response
        }
    },
];