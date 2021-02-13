'use strict';
const Joi = require("joi");
const logger = require('winston');
const userList = require("../../../models/userList");
const ObjectID = require('mongodb').ObjectID;
const local = require("../../../locales");


const payloadValidator = Joi.object({
    usersId: Joi.array().required().description('usersIds'),
}).options({ allowUnknown: true });

const APIHandler = (req, res) => {

     console.log("+++++++++++++++++++++++++++",req.payload.usersId)

    let array = [];
    req.payload.usersId.forEach(element => {
        array.push(new ObjectID(element));
    });
    let condition = { '_id': { '$in': array } };
    let datatoUpdate = {
        deleteStatus: 1,
        deleteTimeStamp: new Date().getTime(),
        accessCode: 12345678910
    };
    userList.Update(condition, datatoUpdate, (err, result) => {
        if (err) {
            return res({ message: req.i18n.__('genericErrMsg')['422'] }).code(422);
        } else {
            userListType.Update(condition, datatoUpdate, (err, result) => { });

            return res({ message: req.i18n.__('DeleteAllUsers')['200'] }).code(200);
        }
    });
};

const response = {
    status: {
        200: {
            message: Joi.any().default(local['DeleteAllUsers']['200'])
        },
        422: { message: Joi.any().default(local['genericErrMsg']['422']) },
        400: { message: Joi.any().default(local['genericErrMsg']['400']) },
        500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    }
}

module.exports = { APIHandler, payloadValidator, response }   