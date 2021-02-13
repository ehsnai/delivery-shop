
let headerValidator = require('../../middleware/validator');
let GetAPI = require('./Get');

module.exports = [
    {
        method: 'GET',
        path: '/citys',
        handler: GetAPI.APIHandler,
        config: {
            tags: ['api', 'notifications'],
            description: 'This API is used to get users city.',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: GetAPI.response

        }
    }
];