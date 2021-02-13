'use strict';

const entity = '/admin';
const dashboard = require('./dashboard'); 
const headerValidator = require('../../middleware/validator');

module.exports = [
    {
        method: 'GET',
        path: entity + '/dashbord/report/{reportId}',
        config: {
            auth: false,
            handler: dashboard.handler,
            tags: ['api', 'admin'],
            description: 'This Api used to display provider dashbord in admin.',
            notes: 'This Api used to display provider dashbord in admin.',
            validate: {
                params: dashboard.payloadValidator,
                headers: headerValidator.headerAuthValidator, 
                failAction: (req, reply, source, error) => {
                    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
                }
            }
        }
    }

];