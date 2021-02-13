
let headerValidator = require('../../middleware/validator');
let PostAPI = require("./Put");

module.exports = [
   
    {
        method: 'PUT',
        path: '/password',
        handler: PostAPI.APIHandler,
        config: {
            tags: ['api', 'Password'],
            description: 'This API is used to change admin passaword ',
            auth: "adminJwt",
            validate: {
                headers: headerValidator.headerAuthValidator,
                payload: PostAPI.payloadValidator,
                failAction: (req, reply, source, error) => {
                    failAction: headerValidator.faildAction(req, reply, source, error)
                }
            },
            response: PostAPI.response,

        }
    },
   
];