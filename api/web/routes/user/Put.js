'use strict'
const Joi = require("joi");
const logger = require('winston');
const userList = require("../../../models/userList");
const ObjectID = require('mongodb').ObjectID;
const local = require("../../../locales");
const Timestamp = require('mongodb').Timestamp;

const payloadValidator = Joi.object({
    userId: Joi.string().required().min(24).max(24).description('Id'),
}).options({ allowUnknown: true });

const APIHandler = (req, res) => {

    var dataToSend = {

        "cardIdImage": req.payload.idCardImage,
        "idNumber": req.payload.idNumber,
        "isValid" : 1
    }

    userList.UpdateById(req.payload.userId, dataToSend, (err, result) => {
        if (err) {
            logger.silly(err);
            return res({ message: req.i18n.__('genericErrMsg')['500'] }).code(500);
        } else {
            return res({ message: req.i18n.__('PutUsers')['200'] }).code(200);
        }
    });

};

const response = {
    status: {
        200: {
            message: Joi.any().default(local['PutUsers']['200']),
        },
        204: { message: Joi.any().default(local['genericErrMsg']['204']) },
        400: { message: Joi.any().default(local['genericErrMsg']['400']) },
        500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    }
}

module.exports = { APIHandler, response, payloadValidator }