'use strict';

const Joi = require("joi");
const logger = require('winston');
const userList = require("../../../models/userList");
const ObjectID = require('mongodb').ObjectID;
const local = require("../../../locales");

const APIHandler = (req, res) => {

    try {
        let condition = [
            { "$match": { "_id": ObjectID(req.params._id) } },
            {
                "$project": {
                    "firstName": 1, "countryCode": 1, "contactNumber": 1, "dob": 1, "registeredTimestamp": 1, "height": 1,
                    "heightInFeet": 1, "profileVideo": 1, "profilePic": 1, "otherImages": 1, "ProfilePhoto": 1,
                    "searchPreferences": 1, "lastLogin": 1, "address": 1, "email": 1,
                    "gender": 1, myPreferences: 1, subscription: 1, userType: 1,about:1

                }
            }
        ];

        userList.Aggregate(condition, (err, result) => {
            if (err) {
                return res({ message: req.i18n.__('genericErrMsg')['500'] }).code(500);
            }
            result.forEach(element => {
                if (element.email !== null && element.email !== undefined && element.email !== '') {
                    var maskid = "";
                    var myemailId = element.email;
                    var prefix = myemailId.substring(0, myemailId.lastIndexOf("@"));
                    var postfix = myemailId.substring(myemailId.lastIndexOf("@"));
                    for (var i = 0; i < prefix.length; i++) {
                        if (i == 0 || i == prefix.length - 1) {   ////////
                            maskid = maskid + prefix[i].toString();
                        }
                        else {
                            maskid = maskid + "*";
                        }
                    }
                    maskid = maskid + postfix;
                    element.email = maskid;
                }
                if (element.contactNumber !== null && element.contactNumber !== undefined && element.contactNumber !== '') {
                    var maskid = "";
                    var myemailId = element.contactNumber;
                    var prefix = myemailId.substring(0, myemailId.lastIndexOf(""));
                    var postfix = myemailId.substring(myemailId.lastIndexOf(""));
                    for (var i = 0; i < prefix.length; i++) {
                        if (i == 0 || i == prefix.length - 1) {   ////////
                            maskid = maskid + prefix[i].toString();
                        }
                        else {
                            maskid = maskid + "*";
                        }
                    }
                    maskid = maskid + postfix;
                    element.contactNumber = maskid;
                }

            });
            return res({ message: req.i18n.__('GtProfileById')['200'], data: result }).code(200);
        });
    } catch (error) {

        return res({ message: req.i18n.__('GtProfileById')['204'] }).code(204);
    }


};

const payloadValidator = Joi.object({
    _id: Joi.string().required().description('_id'),
}).options({ allowUnknown: true });

const response = {
    status: {
        200: {
            message: Joi.any().default(local['GtProfileById']['200']), data: Joi.any()
        },
        204: { message: Joi.any().default(local['GtProfileById']['204']) },
        400: { message: Joi.any().default(local['genericErrMsg']['400']) },
        500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    }
}

module.exports = { APIHandler, payloadValidator, response }