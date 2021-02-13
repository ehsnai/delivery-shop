
let headerValidator = require('../../middleware/validator');
let GetAPI = require('./Get');
let PostAPI = require("./Post");
let DeleteAPI = require("./Delete");
let PutAPI = require("./Put")

module.exports = [
    {
        method: 'GET',
        path: '/language/{status}',
        handler: GetAPI.APIHandler,
        config: {
            tags: ['api', 'language'],
            description: 'This API is used to login an user in the app.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                params: GetAPI.queryValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/language',
        handler: PostAPI.APIHandler,
        config: {
            tags: ['api', 'language'],
            description: 'This API is used to login an user in the app.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                payload: PostAPI.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/language',
        handler: DeleteAPI.APIHandler,
        config: {
            tags: ['api', 'language'],
            description: 'This API is used to login an user in the app.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                query: DeleteAPI.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/language',
        handler: PutAPI.APIHandler,
        config: {
            tags: ['api', 'language'],
            description: 'This API is used to update language.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                payload: PutAPI.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            }
        }
    },
];