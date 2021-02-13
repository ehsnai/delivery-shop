'use strick'
const Joi = require("joi");
const logger = require('winston');
const productList = require("../../../models/productList");
const ObjectID = require('mongodb').ObjectID;
const local = require("../../../locales");

const payloadValidator = Joi.object({

    title          : Joi.string().description("First Name,Eg. Lisa/John").error(new Error('firstName is missing.')),
    subtitle       : Joi.string().description("lastName,Eg. Lisa/John").error(new Error('lastName is missing.')),
    props          : Joi.array().description('props of each product'),
    text           : Joi.string().description("description"),
    type           : Joi.array().description("type of product"),
    category       : Joi.array().description('category of each product'),
    status         : Joi.string().description('category of each product'),

})
.options({ allowUnknown: true });

/*
* status code : 1 exist
* status code : 2 not exist
*/

const APIHandler = (req, res) => {

    // set user fields
    const regDate = new Date();
    let _id = new ObjectID();

    const props = req.payload.props

    // set data to send
    dataToSend = {
        _id: _id,
        "title"          : req.payload.title,
        "subtitle"       : req.payload.subtitle,
        "text"           : req.payload.text,
        "productImage"   : req.payload.images,
        "props"          : req.payload.props,
        "type"           : req.payload.type,
        "prices"         : req.payload.prices,
        "stocks"         : req.payload.stocks,
        "category"       : req.payload.category,
        // "drugs"          : {
        //     "THC": req.payload.cbc,
        //     "CBC": req.payload.cbn,
        //     "CBN": req.payload.thc,
        // },
        "sellType"       : req.payload.sellType,
        "status"       : req.payload.status,
        orders : [],
        delivery  : [],    
        users  : [],
        "createTimestamp": new Date().getTime(),

    }

    //console.log("data============", dataToSend);

    //mongo db insert userData
    productList.Insert(dataToSend, (err, result) => {
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