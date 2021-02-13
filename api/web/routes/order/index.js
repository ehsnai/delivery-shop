'use strict'

let headerValidator = require('../../middleware/validator');
let GetAPI          = require('./Get');
let GetByIdAPI      = require('./GetById')
let PostAPI         = require('./Post');
let DeleteAPI       = require('./Delete');
let PostDeleteAll   = require('./DeleteAll');
let PUTAPI          = require ('./Put');
let PutByIdAPI      = require ('./PutById');

module.exports = [
    {
        method: 'GET',
        path: '/orders',
        handler: GetAPI.APIHandler,
        config: {
            tags: ['api', 'orders'],
            description: 'This API is used to Get Orders All Data from front.',
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
        path: '/userOrders',
        handler: GetByIdAPI.APIHandler,
        config: {
            tags: ['api', 'orders'],
            description: 'This API is used to Get Orders by user.',
            auth: false,
            validate: {
                headers: headerValidator.headerAuthValidator,
                query: GetByIdAPI.queryValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: GetByIdAPI.response
        }
    },
    {
        method: 'DELETE',
        path: '/orders/{orderId}',
        handler: DeleteAPI.APIHandler,
        config: {
            tags: ['api', 'orders'],
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
        path: '/orders',
        handler: PostAPI.APIHandler,
        config: {
            tags: ['api', 'orders'],
            description: 'This API is used to Post orders Data from admin.',
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
        path: '/orderMultipleDelete',
        handler: PostDeleteAll.APIHandler,
        config: {
            tags: ['api', 'products'],
            description: 'This API is used to Delete multiple order from admin.',
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
        path: '/orders',
        handler: PUTAPI.APIHandler,
        config: {
            tags: ['api', 'orders'],
            description: 'This API is used to update orders data from admin.',
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
    {
        method: 'PUT',
        path: '/orderConfirm',
        handler: PutByIdAPI.APIHandler,
        config: {
            tags: ['api', 'orders'],
            description: 'This API is used to update orders data from admin.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                payload: PutByIdAPI.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: PutByIdAPI.response
        }
    },


];