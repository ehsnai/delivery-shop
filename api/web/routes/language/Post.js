const Joi = require("joi");
const logger = require('winston');
const languagesCollection = require('../../../models/languages');


payloadValidator = Joi.object({
    languageName: Joi.string().required().description('languageName'),
    langeugeCode: Joi.string().required().description('languagecode'),
    isMandatory: Joi.boolean().description('RTL'),
}).options({ allowUnknown: true });

APIHandler = (req, res) => {


    var data = {
        "name": req.payload.languageName,
        "code": req.payload.langeugeCode,
        "isRtl": req.payload.isMandatory,
        "status": 1,
        "langId": Math.floor(1000 + Math.random() * 9000)
    };
    languagesCollection.Insert(data, (err, result) => {
        if (err) {
            return res({ message: 'internal server error' }).code(500);
        } else {
            return res({ message: 'sucess' }).code(200);
        }

    })

};

module.exports = { APIHandler, payloadValidator }