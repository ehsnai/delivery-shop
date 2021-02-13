'use strict';

var fs = require('fs');
const Joi = require("joi");
const local  = require("../../../locales");


const payloadValidator = Joi.object({

    data: Joi.string().required().description('data')

}).options({ allowUnknown: true });

const APIHandler = (req, res) => {
    
    fs.writeFile("/var/www/html/datum_2.0-admin/SafetyTips.html", req.payload.data, function (err) {
        if (err) {
            return console.log(err);
        }
        return res({ message: req.i18n.__('PutsafetyTips')['200']}).code(200);
    });

};


const response = {
    status: {
        200: {
            message: Joi.any().default(local['PutsafetyTips']['200']), 
        },
        204: { message: Joi.any().default(local['genericErrMsg']['204']) },
        400: { message: Joi.any().default(local['genericErrMsg']['400']) },
        500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    }
}
module.exports = { APIHandler, payloadValidator,response }