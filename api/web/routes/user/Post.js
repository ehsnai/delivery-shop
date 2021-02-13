const Joi = require("joi");
const logger = require('winston');
const Cryptr = require('cryptr');
const async = require("async");
const cryptr = new Cryptr("3Embed1008");
const userList = require("../../../models/userList");
const moment = require('moment');
const ObjectID = require('mongodb').ObjectID;
const Timestamp = require('mongodb').Timestamp;
const local = require("../../../locales");

/* status for users status
 * 0 inactive
 * 1 active
 * 2 banned
 * 3 deleted
 */

const payloadValidator = Joi.object({

    firstName     : Joi.string().description("First Name,Eg. Lisa/John").error(new Error('firstName is missing.')),
    lastName      : Joi.string().description("lastName,Eg. Lisa/John").error(new Error('lastName is missing.')),
    email         : Joi.string().description("Email,Eg.xyz@gmail.com").error(new Error('emailAddress is missing')),
    cardIdImage   : Joi.string().description("cardIdImage"),
    password      : Joi.string().description("password"),

})
.options({ allowUnknown: true });

const APIHandler = (req, res) => {

    const passwordCryptr = cryptr.encrypt(req.payload.password)

    // set user fields
    const regDate = new Date();
    //const data = req.payload.dob
    //const dateOfBirth = new Date(data).getTime()
    let _id = new ObjectID();

    // set data to send
    dataToSend = {
        _id: _id,
        "firstName": req.payload.firstName,
        "lastName" : req.payload.lastName,
        "email"    : req.payload.email,
        "password" : passwordCryptr,
        "registeredTimestamp": new Date().getTime(),
        "cardIdImage": req.payload.idImage,
        "idNumber": req.payload.idNumber,
        "mobile":req.payload.mobile,
        "membership":req.payload.membership,
        "status": req.payload.status,
        "userType": req.payload.type,
        purchase: [],
        orders: [],
        basket: [],
        tickets : [],
        coupons  : [],      

        address: {
            "city": '',
            "country": '',
        },
        subscription: [
            {
                "status": 0,
            }
        ],

    }

    console.log("data============", dataToSend);

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