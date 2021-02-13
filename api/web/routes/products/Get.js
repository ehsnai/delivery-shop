'use strict'

const Joi            = require("joi");
const logger         = require('winston');
const productList       = require("../../../models/productList");
const local          = require("../../../locales");

const queryValidator = Joi.object({

    offset: Joi.number().description("offset"),
    limit: Joi.number().description("limit"),
    
}).required();

const APIHandler = (req, res) => {

    productList.Aggregate([

        { 
            "$match": { "deleteStatus": { $ne: 1 } }
        },
        {
            "$project": {

                title    : 1,
                subtitle : 1,
                text     : 1,
                category : 1,
                images   : 1,
                type     : 1,
                status   : 1,
                sellType : 1,
                sellType : 1,
                prices   : 1,
                stocks   : 1,
                // cbc:"$drugs.CBC",
                // thc:"$drugs.THC",
                // cbn:"$drugs.CBN",
                productImage:1,
                orders       : { "$size" : { "$ifNull" : ["$orders", []] } },        
                delivery     : { "$size" : { "$ifNull" : ["$delivery", []] } },        
                users        : { "$size" : { "$ifNull" : ["$users", []] } },        

            }

        },



        { "$skip": 0 },
        { "$limit": 10 },


        { "$sort": { "_id": -1 } },

    ],
        (err, result) => {
            if (err) {
                return res({ message: req.i18n.__('genericErrMsg')['500'] }).code(500);
            } else if (result) {
                for (let index = 0; index < result.length; index++) {
                    result[index]["lastOnlineStatus"] = result[index]["lastOnlineStatus"] || result[index]["registeredTimestamp"]
                    delete result[index]["registeredTimestamp"];
                    let birthdate = new Date(result[index]["dob"]);
                    let cur = new Date();
                    let diff = cur - birthdate; // This is the difference in milliseconds
                    result[index]["age"]  = Math.floor(diff / 31557600000); // Divide by 1000*60*60*24*365.25
                }

                return res({ message: req.i18n.__('GetAllUser')['200'], data: result }).code(200);
            } else {
                return res({ message: req.i18n.__('GetAllUser')['204'] }).code(204);
            }
        });
};
const response = {
    status: {
        200: {
            message: Joi.any().default(local['GetAllUser']['200']), data: Joi.any()
        },
        204: { message: Joi.any().default(local['GetAllUser']['204']) },
        400: { message: Joi.any().default(local['genericErrMsg']['400']) },
        500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    }
}

module.exports = { APIHandler, response }