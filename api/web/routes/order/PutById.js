'use strict'
const Joi = require("joi");
const logger = require('winston');
const orderList = require("../../../models/orderList");
const ObjectID = require('mongodb').ObjectID;
const local = require("../../../locales");
const Timestamp = require('mongodb').Timestamp;

const payloadValidator = Joi.object({
    userId: Joi.string().required().min(24).max(24).description('Id'),
    orderId: Joi.string().required().min(24).max(24).description('Id'),
    type: Joi.string().required().description('type')
}).options({ allowUnknown: true });

const APIHandler = (req, res) => {

    try{

    let dataToSend = {}


    if(req.payload.type == 'confirm'){
        dataToSend = {
            "orderStatus": 'confirm',
            "orderStep" : 2
        }
    }

    if(req.payload.type == 'cancel'){
        dataToSend = {
            "orderStatus": 'cancel',
            "orderStep" : 1
        }

    }

    let condition = {
        "orderUserId": ObjectID(req.payload.userId),
        "_id": ObjectID(req.payload.orderId)
    }

    orderList.Update(condition, dataToSend, (err, result) => {
        if (err) {
            logger.silly(err);
            return res({ message: req.i18n.__('genericErrMsg')['500'] }).code(500);
        } else {
            return res({ message: req.i18n.__('PutUsers')['200'] }).code(200);
        }
    });

    }catch(err){
        console.log("err in confirm order : ", err)
    }

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