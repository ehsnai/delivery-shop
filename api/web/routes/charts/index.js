
let headerValidator = require('../../middleware/validator');
let GetAPI = require('./Get');
let PutAPI = require("./Put");
module.exports = [
    {
        method: 'GET',
        path: '/charts',
        handler: GetAPI.APIHandler,
        config: {
            tags: ['api', 'Safety Tips'],
            description: 'This API is used to get Safety Tips.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: GetAPI.response

        }
    },
    {
        method: 'PUT',
        path: '/charts',
        handler: PutAPI.APIHandler,
        config: {
            tags: ['api', 'Safety Tips'],
            description: 'This API is used to update Safety Tips.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                payload: PutAPI.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: PutAPI.response

        }
    }
];