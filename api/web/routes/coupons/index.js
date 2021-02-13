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
        path: '/coupons',
        handler: GetAPI.APIHandler,
        config: {
            tags: ['api', 'coupons'],
            description: 'This API is used to Get coupons All Data from front.',
            auth: false,
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
        method: 'DELETE',
        path: '/coupons',
        handler: DeleteAPI.APIHandler,
        config: {
            tags: ['api', 'coupons'],
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
        path: '/coupons',
        handler: PostAPI.APIHandler,
        config: {
            tags: ['api', 'coupons'],
            description: 'This API is used to Post coupons Data from admin.',
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
        path: '/couponsMultipleDelete',
        handler: PostDeleteAll.APIHandler,
        config: {
            tags: ['api', 'coupons'],
            description: 'This API is used to Delete multiple coupons from admin.',
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
        path: '/coupons',
        handler: PUTAPI.APIHandler,
        config: {
            tags: ['api', 'coupons'],
            description: 'This API is used to update coupons data from admin.',
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