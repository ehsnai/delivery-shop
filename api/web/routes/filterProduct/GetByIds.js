'use strict'

const Joi            = require("joi");
const logger         = require('winston');
const productList       = require("../../../models/productList");
const local          = require("../../../locales");
const ObjectID = require('mongodb').ObjectID;


const payloadValidator = Joi.object({
    ids: Joi.object().description("filters"),    
}).required();

const APIHandler = (req, res) => {

    try{

    const ids = Object.values(JSON.parse(req.query.ids))

    let array = [];
    ids.forEach(element => {
        array.push(new ObjectID(element));
    })

    productList.Aggregate([

        { 
            "$match": {"_id" : {"$in" : array } },
        },

        {
            "$project": {
                title    : 1,
                subtitle : 1,
                text     : 1,
                productImage: 1,
                props : 1,
                type: 1,
                prices : 1,
                category : 1,
                images   : 1,
                type     : 1,
                status   : 1,
                sellType : 1,
                // cbc:"$drugs.CBC",
                // thc:"$drugs.THC",
                // cbn:"$drugs.CBN",
            }

        },

        { "$sort": { "_id": -1 } },

    ],
    (err, result) => {
        if (err) {
            return res({ message: req.i18n.__('genericErrMsg')['500'] }).code(500);
        } else if (result) {
            return res({ message: req.i18n.__('GetAllUser')['200'], data: result }).code(200);
        } else {
            return res({ message: req.i18n.__('GetAllUser')['204'] }).code(204);
        }
    });
}catch(err){
        console.log("errr ====>",err)
}

}

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

module.exports = { APIHandler, response,payloadValidator }