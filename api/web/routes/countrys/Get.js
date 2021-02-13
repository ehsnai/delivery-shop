'use strict'
const Joi = require("joi");
const logger = require('winston');
const userList = require("../../../models/userList");
const local  = require("../../../locales");


const APIHandler = (req, res) => {
    let condition = [
        { "$match": { address: { "$exists": true } } },
        {
            "$group": {
                "_id": "$address.country",
                "total": { "$sum": 1 }
            }
        }
    ];


    userList.Aggregate(condition, (err, result) => {
        if (err) {
            return res({ message:req.i18n.__('genericErrMsg')['500']  }).code(500);
        } else if (result) {
            return res({  message: req.i18n.__('GetCountry')['200'] , data: result }).code(200);
        } else {
            return res({ message:req.i18n.__('GetCountry')['204'] , data: [] }).code(204);
        }
    });
};

const response = {
    status: {
        200: {
            message: Joi.any().default(local['GetCountry']['200']), data: Joi.any()
        },
        204: { message: Joi.any().default(local['GetCountry']['204']) },
        400: { message: Joi.any().default(local['genericErrMsg']['400']) },
        500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    }
}

module.exports = { APIHandler,response }