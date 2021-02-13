'use strick'
const Joi = require("joi");
const logger = require('winston');
const userList = require("../../../models/ticketList");
const ObjectID = require('mongodb').ObjectID;
const local = require("../../../locales");

const payloadValidator = Joi.object({

    text       : Joi.string().description("text,Eg. Lisa/John").error(new Error('firstName is missing.')),
    type       : Joi.string().description("type,Eg. Lisa/John").error(new Error('lastName is missing.')),
    userId     : Joi.string().description("userId,Eg. Lisa/John").error(new Error('lastName is missing.')),

})
.options({ allowUnknown: true });

/*
* status code : 1 exist
* status code : 2 not exist
*/

const APIHandler = (req, res) => {

    try{

    // set user fields
    const regDate = new Date();
    let _id = new ObjectID();

    // set data to send
    dataToSend = {
        _id: _id,
        "text"           : req.payload.text,
        "type"           : req.payload.type,
        "userId"         : req.payload.userId,
        "status"         : 0,
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

}catch(err){
    console.log("errr ------------->",err)
}

    
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