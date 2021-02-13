
let headerValidator = require('../../middleware/validator');
let PostAPI = require("./Post");

module.exports = [
   
    {
        method: 'POST',
        path: '/UploadImgInServer',
        handler: PostAPI.APIHandler,
        config: {
            tags: ['api', 'image'],
            description: 'This API is used to upload image in server folder .',
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