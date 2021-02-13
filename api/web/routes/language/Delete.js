const Joi = require("joi");
const logger = require('winston');
const languagesCollection = require('../../../models/languages');
const ObjectID = require('mongodb').ObjectID;

payloadValidator = Joi.object({
    id: Joi.string().required().description('languageNameId'),
    status: Joi.number().required().description('status'),
}).options({ allowUnknown: true });

APIHandler = (req, res) => {
    var data = {
        status: req.query.status
    }
    if (req.query.status == 3) {

        languagesCollection.Delete({ _id: ObjectID(req.query.id) }, (err, result) => {
            if (err) {
                return res({ message: 'internal server error' }).code(500);
            } else {
                return res({ message: 'sucess' }).code(200);
            }

        })

    }
    else {
        languagesCollection.UpdateById(req.query.id, data, (err, result) => {
            if (err) {
                return res({ message: 'internal server error' }).code(500);
            } else {
                return res({ message: 'sucess' }).code(200);
            }

        })
    }
};

module.exports = { APIHandler, payloadValidator }