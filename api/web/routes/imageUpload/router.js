'use strict';

//const entity = '/utility';
//const errorMsg = require('../../../locales'); 
const post = require('./post');

const headerValidator = require('../../middleware/validator');

module.exports = [
    /**
     * @name POST /utility/uploadImage
     */
    {
        method: 'POST',
        path: '/uploadImage',
        handler: post.handler,
        config: {            
            tags: ['api', 'image'],
           // description: errorMsg['apiDescription']['postUploadImage'],
           // notes: errorMsg['apiDescription']['postUploadImage'],
            auth: false,
            payload: post.payload,
            response: post.responseCode,
            validate: {
                payload: post.payloadValidator,
                headers: headerValidator.headerLanValidator,
                failAction: (req, reply, source, error) => {
                    console.log('fail action', error);
                    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
                }
            },

            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                },
            },
        }
    }
];