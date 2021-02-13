"use strict";
const Joi = require("joi");
const logger = require('winston');
const addressList = require("../../../models/addressList");
const local  = require("../../../locales");
const ObjectID = require('mongodb').ObjectID;

const payloadValidator = Joi.object({
    userId: Joi.string().description('enter You want to search'),
}).options({ allowUnknown: true });

const APIHandler = (req, res) => {

    try{

    let condition = {};
    
    const userId = req.query.userId.trim();

    condition = { "userId" : ObjectID(userId) };

    console.log("condition == > ",condition)

    addressList.Select(condition, (err, result) => {
        if (err) {
            return res({ message:req.i18n.__('genericErrMsg')['500'] }).code(500);
        } else if (result) {
            return res({ message:req.i18n.__('GetBytxt')['200'], data: result}).code(200);
        } else {
            return res({ message:req.i18n.__('GetBytxt')['204'] }).code(204);
        }
    });

    }catch(err){
        console.log("err =======>",err)
    }

}
const response = {
    status: {
        200: {
            message: Joi.any().default(local['GetBytxt']['200']), data: Joi.any()
        },
        204: { message: Joi.any().default(local['GetBytxt']['204']) },
        400: { message: Joi.any().default(local['genericErrMsg']['400']) },
        500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    }
}

module.exports = {APIHandler,payloadValidator,response}