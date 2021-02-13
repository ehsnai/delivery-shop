'use strict'

let headerValidator = require('../../middleware/validator');
let GetAPI          = require('./Get');
let GetByTextAPI    = require('./GetByText');
let PostAPI         = require('./Post');
let DeleteAPI       = require('./Delete');
let PostDeleteAll   = require('./DeleteAll');
let PUTAPI          = require ('./Put');

module.exports = [
    {
        method: 'GET',
        path: '/address',
        handler: GetAPI.APIHandler,
        config: {
            tags: ['api', 'address'],
            description: 'This API is used to Get tickets All Data from front.',
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
        method: 'GET',
        path: '/addressById',
        handler: GetByTextAPI.APIHandler,
        config: {
            tags: ['api', 'address'],
            description: 'This API is used to Get Products All Data from front.',
            auth: false,
            validate: {
                headers: headerValidator.headerAuthValidator,
                params: GetByTextAPI.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: GetByTextAPI.response
        }
    },
    {
        method: 'DELETE',
        path: '/address/{addressId}',
        handler: DeleteAPI.APIHandler,
        config: {
            tags: ['api', 'address'],
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
        path: '/address',
        handler: PostAPI.APIHandler,
        config: {
            tags: ['api', 'address'],
            description: 'This API is used to Post address Data from admin.',
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
        path: '/addressMultipleDelete',
        handler: PostDeleteAll.APIHandler,
        config: {
            tags: ['api', 'address'],
            description: 'This API is used to Delete multiple address from admin.',
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
        path: '/address',
        handler: PUTAPI.APIHandler,
        config: {
            tags: ['api', 'address'],
            description: 'This API is used to update address data from admin.',
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