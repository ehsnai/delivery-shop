
const Joi = require("joi");
const logger = require('winston');
const languagesCollection = require('../../../models/languages');
const ObjectID = require('mongodb').ObjectID;



payloadValidator = Joi.object({
    langId: Joi.string().required().min(24).max(24).description('reasonId'),
    languageName: Joi.string().required().description('newlanguageName'),
    langeugeCode: Joi.string().required().description('newlanguagecode'),
    isRTL: Joi.boolean().description('newRTL'),
}).options({ allowUnknown: true });

APIHandler = (req, res) => {

    let data = {

        "name": req.payload.languageName,
        "code": req.payload.langeugeCode,
        "isRtl": req.payload.isRTL,
        "status": req.payload.status 
    };
    languagesCollection.UpdateById(ObjectID(req.payload.langId), data, (err, result) => {
        if (err) {
            return res({ message: 'internal server error' }).code(500);
        } else {
            return res({ code: 200, message: 'success' }).code(200);
        }
    });
};

module.exports = { APIHandler, payloadValidator }