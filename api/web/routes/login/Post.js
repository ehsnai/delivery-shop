"use strict";
const Joi = require("joi");
const async = require("async");
const Cryptr = require('cryptr');
const logger = require('winston');
const Promise = require('promise');
const ObjectID = require('mongodb').ObjectID;
const userList = require('../../../models/userList');
const Auth = require("../../middleware/authentication.js");
const local = require("../../../locales");
const Config = process.env;
const cryptr = new Cryptr("3Embed1008");

const payloadValidator = Joi.object({
    userName: Joi.string().required().description('user name'),
    password: Joi.string().required().description('password'),
    type    : Joi.string().required().description('type'),
}).options({ allowUnknown: true });

const APIHandler = (req, res) => {

    try{

        console.log("request ------>",req.payload);

   const passwordCryptr = cryptr.encrypt(req.payload.password)
   const type = req.payload.type;

   let condition = { email: req.payload.userName, password: passwordCryptr };

    if(type == 'admin'){
        condition['userType'] = type
    }

    console.log("condition ==> ", condition)

    userList.SelectOne(condition, (err, result) => {
        if (err) {
            return res({ message: req.i18n.__('genericErrMsg')['500'] }).code(500);
        } else if (result) {
            result['token'] = Auth.SignJWT({ _id: result._id.toString() }, 'admin', 3600 * 3600 * 3600)
            delete result['password']

            return res({ message: req.i18n.__('PostLogin')['200'], data: result }).code(200);
        } else {
            return res({ message: req.i18n.__('PostLogin')['422'] }).code(422);
        }
    })

}catch(err){
    console.log('errr', err)
}


};

const response = {
    status: {
        200: {
            message: Joi.any().default(local['PostLogin']['200']), data: Joi.any()
        },
        422: { message: Joi.any().default(local['PostLogin']['422']) },
        400: { message: Joi.any().default(local['genericErrMsg']['400']) },
        500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    }
}

module.exports = { APIHandler, payloadValidator, response }