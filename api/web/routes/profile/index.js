
let headerValidator = require('../../middleware/validator');
let GetByContactNumberAPI = require('./GetByContactNumber');
let GetByEmail = require('./GetByEmail');
let PutAPI = require("./Put");
let GetById = require("./GetById");



module.exports = [
    {
        method: 'GET',
        path: '/profile',
        handler: GetById.APIHandler,
        config: {
            tags: ['api', 'profile'],
            description: 'This API is used to login an user in the app.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                params: GetById.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: GetById.response,

        }
    },
    {
        method: 'GET',
        path: '/profile/email/{email}/{contactNumber}',
        handler: GetByEmail.APIHandler,
        config: {
            tags: ['api', 'profile'],
            description: 'This API is used to login an user in the app.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                params: GetByEmail.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: GetByEmail.response,

        }
    }, {
        method: 'GET',
        path: '/profile/email/{email}',
        handler: GetByEmail.APIHandler,
        config: {
            tags: ['api', 'profile'],
            description: 'This API is used to login an user in the app.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                params: GetByEmail.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: GetByEmail.response,

        }
    },
    {
        method: 'GET',
        path: '/profile/contactNumber/{contactNumber}',
        handler: GetByContactNumberAPI.APIHandler,
        config: {
            tags: ['api', 'profile'],
            description: 'This API is used to login an user in the app.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                params: GetByContactNumberAPI.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: GetByContactNumberAPI.response,

        }
    },
    {
        method: 'PUT',
        path: '/profile',
        handler: PutAPI.APIHandler,
        config: {
            tags: ['api', 'profile'],
            description: 'This API is used to login an user in the app.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                payload: PutAPI.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: PutAPI.response,

        }
    }
];