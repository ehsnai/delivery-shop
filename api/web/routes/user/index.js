'use strict'

let headerValidator = require('../../middleware/validator');
let GetAPI          = require('./Get');
let PostAPI         = require('./Post');
let DeleteAPI       = require('./Delete');
let GetByText       = require('./GetByText');
let PostDeleteAll   = require('./DeleteAll');
let PUTAPI          = require ('./Put');

module.exports = [
    {
        method: 'GET',
        path: '/user',
        handler: GetByText.APIHandler,
        config: {
            tags: ['api', 'users'],
            description: 'This API is used to search in users.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                params: GetByText.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: GetByText.response

        }
    },
    {
        method: 'GET',
        path: '/users',
        handler: GetAPI.APIHandler,
        config: {
            tags: ['api', 'users'],
            description: 'This API is used to Get User All Data.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                query: GetAPI.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: GetAPI.response
        }
    },
    {
        method: 'PUT',
        path: '/usersDelete',
        handler: DeleteAPI.APIHandler,
        config: {
            tags: ['api', 'users'],
            description: 'This API is used to Delete Id wise Data.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                payload: DeleteAPI.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: PostAPI.APIHandler,
        config: {
            tags: ['api', 'users'],
            description: 'This API is used to Post UserData.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                payload: PostAPI.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: PostAPI.response

        }
    },
    {
        method: 'PUT',
        path: '/userMultipleDelete',
        handler: PostDeleteAll.APIHandler,
        config: {
            tags: ['api', 'users'],
            description: 'This API is used to Delete multiple user from admin.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                payload: PostDeleteAll.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: PostDeleteAll.response,
        }
    },
    {
        method: 'PUT',
        path: '/users',
        handler: PUTAPI.APIHandler,
        config: {
            tags: ['api', 'users'],
            description: 'This API is used to update user profile.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                payload: PUTAPI.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: PUTAPI.response
        }
    },

];