
const Joi = require("joi");
const logger = require('winston');
const Cryptr = require('cryptr');
const async = require("async");
const cryptr = new Cryptr("3Embed1008");
const Auth = require("../../middleware/authentication.js");

const userList = require("../../../models/userList");
const moment = require('moment');
const ObjectID = require('mongodb').ObjectID;
const Timestamp = require('mongodb').Timestamp;
const local = require("../../../locales");

const payloadValidator = Joi.object({

    firstName     : Joi.string().description("First Name,Eg. Lisa/John").error(new Error('firstName is missing.')),
    email         : Joi.string().required().description("Email,Eg.xyz@gmail.com").error(new Error('emailAddress is missing')),
    cardIdImage   : Joi.string().description("cardIdImage"),
    cardId        : Joi.string().description("cardId"),
    password      : Joi.string().description("password"),
    city          : Joi.string().description("city ,Eg. Bangaluru").error(new Error('cityName  is missing')),
    country       : Joi.string().description("city ,Eg. INDIA").error(new Error('countryName  is missing')),
    mobile        : Joi.string().description("Mobile Number, Eg. 1234567890").error(new Error('mobile is missing')),
    dob           : Joi.string().description("Date of Birth(miliseconds),Eg. 786342377000").error(new Error('dateOfBirth is missing')),

})

.options({ allowUnknown: true });


const APIHandler = (req, res) => {

    // set user fields
    const regDate = new Date();
    const data = req.payload.dob
    const dateOfBirth = new Date(data).getTime()
    let _id = new ObjectID();
    const password = cryptr.encrypt(req.payload.password);

    // set data to send
    dataToSend = {
        _id: _id,
        "firstName": req.payload.firstName,
        "email": req.payload.email,
        "password": password,
        "dob": dateOfBirth,
        "mobile": req.payload.mobile,
        "registeredTimestamp": new Date().getTime(),
        "cardIdImage": req.payload.profilePic,
        "isValid": 1,
        purchase: [],
        basket: [],
        userType: "user",
        address: {
            "city": req.payload.city,
            "country": req.payload.country,
        },
        profileStatus: 0,
        subscription:{
            "status": 0,
        }

    }

    //console.log("data============", dataToSend);

    //mongo db insert userData
    userList.Insert(dataToSend, (err, result) => {
        if (err) {
            return res({ message: req.i18n.__('genericErrMsg')['500'] }).code(500);
        } else if (result) {
            console.log('========',result)

            const  data = {
                token: Auth.SignJWT({ _id: result.ops[0]._id.toString() }, 'user', 3600),
                userId: result.ops[0]._id,
                isValid: result.ops[0].isValid,
                firstName: result.ops[0].firstName,

            };
            return res({ message: req.i18n.__('PostRegister')['200'], data: data }).code(200);
        } else {
            return res({ message: req.i18n.__('PostUser')['200'] }).code(200);
        }
    });
    
};

const response = {
    status: {
        200: {
            message: Joi.any().default(local['PostLogin']['200']), data: Joi.any()
        },
        422: { message: Joi.any().default(local['genericErrMsg']['422']) },
        400: { message: Joi.any().default(local['genericErrMsg']['400']) },
        500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    }
}


module.exports = { APIHandler, payloadValidator, response }