'use strick'
const Joi = require("joi");
const logger = require('winston');
const userList = require("../../../models/couponList");
const ObjectID = require('mongodb').ObjectID;
const local = require("../../../locales");

const payloadValidator = Joi.object({

    title          : Joi.string().description("First Name,Eg. Lisa/John").error(new Error('firstName is missing.')),
    discount       : Joi.string().description("lastName,Eg. Lisa/John").error(new Error('lastName is missing.')),
    text           : Joi.string().description("description"),
    status         : Joi.string().description('category of each product'),

})
.options({ allowUnknown: true });

const APIHandler = (req, res) => {

    let _id = new ObjectID();

    // set data to send
    dataToSend = {

        _id: _id,
        "title"          : req.payload.title,
        "discount"       : parseInt(req.payload.discount),
        "text"           : req.payload.text,
        "status"         : req.payload.status,
        "createTimestamp": new Date().getTime(),

    }

    //console.log("data============", dataToSend);

    //mongo db insert userData
    userList.Insert(dataToSend, (err, result) => {
        if (err) {
            logger.silly(err);
            return res({ message: req.i18n.__('genericErrMsg')['422'] }).code(422);
        } else {
            return res({ message: req.i18n.__('PostUser')['200'] }).code(200);
        }
    });
    
};

const response = {
    status: {
        200: {
            message: Joi.any().default(local['PostUser']['200']),
        },
        422: { message: Joi.any().default(local['genericErrMsg']['422']) },
        400: { message: Joi.any().default(local['genericErrMsg']['400']) },
        500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    }
}


module.exports = { APIHandler, payloadValidator, response }