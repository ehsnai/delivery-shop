'use strict'

let headerValidator = require('../../middleware/validator');
let GetAPI          = require('./Get');
let GetByIdsAPI          = require('./GetByIds');

module.exports = [

    {
        method: 'GET',
        path: '/productsFilter',
        handler: GetAPI.APIHandler,
        config: {
            tags: ['api', 'products'],
            description: 'This API is used to Get Products All Data from front.',
            auth: false,
            validate: {
                //headers: headerValidator.headerAuthValidator,
                params: GetAPI.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: GetAPI.response
        }
    },
    {
        method: 'GET',
        path: '/productsCart',
        handler: GetByIdsAPI.APIHandler,
        config: {
            tags: ['api', 'products'],
            description: 'This API is used to Get Products All Data from front.',
            auth: false,
            validate: {
                //headers: headerValidator.headerAuthValidator,
                params: GetByIdsAPI.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: GetByIdsAPI.response
        }
    },


];