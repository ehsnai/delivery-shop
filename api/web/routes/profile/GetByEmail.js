'use strict';

const Joi = require("joi");
const logger = require('winston');
const userList = require("../../../models/userList");
const ObjectID = require('mongodb').ObjectID;
const local  = require("../../../locales");

const APIHandler = (req, res) => {


    let condition = [
        { "$match": { "email": req.params.email.replace(/\s+/, "")  } },
        {
            "$project": {
                "firstName": 1, "countryCode": 1, "contactNumber": 1, "dob": 1, "registeredTimestamp": 1, "height": 1,
                "heightInFeet": 1, "profileVideo": 1, "profilePic": 1, "otherImages": 1, "ProfilePhoto": 1,
                "favoritePreferences": 1, "lastLogin": 1, "address": 1,"email":1,"gender":1

            }
        }
    ];

    userList.Aggregate(condition, (err, result) => {
        if (err) {
            return res({ message:req.i18n.__('genericErrMsg')['500'] }).code(500);
        }

        return res({ message:req.i18n.__('GtProfileByEmailId')['200'], data: result }).code(200);
    });
};

const payloadValidator = Joi.object({
    email: Joi.string().required().description('email'),
    //contactNumber: Joi.string().required().description('contactNumber'),
}).options({ allowUnknown: true });

const response = {
    status: {
        200: {
            message: Joi.any().default(local['GtProfileByEmailId']['200']), data: Joi.any()
        },
        204: { message: Joi.any().default(local['GtProfileByEmailId']['204']) },
        400: { message: Joi.any().default(local['genericErrMsg']['400']) },
        500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    }
}

module.exports = { APIHandler, payloadValidator,response }