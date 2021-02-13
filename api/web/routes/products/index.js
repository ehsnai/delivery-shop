'use strict'

let headerValidator = require('../../middleware/validator');
let GetAPI          = require('./Get');
let PostAPI         = require('./Post');
let DeleteAPI       = require('./Delete');
let PostDeleteAll   = require('./DeleteAll');
let PUTAPI          = require ('./Put');

module.exports = [
    {
        method: 'GET',
        path: '/products',
        handler: GetAPI.APIHandler,
        config: {
            tags: ['api', 'products'],
            description: 'This API is used to Get Products All Data from front.',
            auth: false,
            validate: {
                headers: headerValidator.headerAuthValidator,
                query: GetAPI.queryValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: GetAPI.response
        }
    },

    {
        method: 'DELETE',
        path: '/products',
        handler: DeleteAPI.APIHandler,
        config: {
            tags: ['api', 'products'],
            description: 'This API is used to Delete Id wise Data from admin.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                params: DeleteAPI.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/products',
        handler: PostAPI.APIHandler,
        config: {
            tags: ['api', 'products'],
            description: 'This API is used to Post Products Data from admin.',
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
        path: '/productMultipleDelete',
        handler: PostDeleteAll.APIHandler,
        config: {
            tags: ['api', 'products'],
            description: 'This API is used to Delete multiple product from admin.',
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
        path: '/products',
        handler: PUTAPI.APIHandler,
        config: {
            tags: ['api', 'products'],
            description: 'This API is used to update products data from admin.',
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