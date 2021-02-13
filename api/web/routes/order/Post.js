'use strick'
const Joi = require("joi");
const logger = require('winston');
const orderList = require("../../../models/orderList");
const ObjectID = require('mongodb').ObjectID;
const local = require("../../../locales");

const payloadValidator = Joi.object({

    orderTitle      : Joi.string().description("First Name,Eg. Lisa/John").error(new Error('firstName is missing.')),
    orderText       : Joi.string().description("lastName,Eg. Lisa/John").error(new Error('lastName is missing.')),

})
.options({ allowUnknown: true });

const APIHandler = (req, res) => {

    try{

    console.log("req.payload ===>",req.payload)

    let _id = new ObjectID();

    let userCart  = req.payload.cart.map(item =>{

        return(
            {
                "itemName" : item.itemName,
                "itemId" : ObjectID(item.itemId),
                "count"  : item.count,
                "priceId": item.priceId,
                "price"  : item.price 
        
            }
        )
    })

    console.log("userCart",userCart)

    // set data to send
    dataToSend = {
        _id: _id,
        "orderNumber"           : Math.floor(Math.random() * 100000),
        "orderUserId"           : ObjectID(req.payload.userId),
        "orderCart"             : userCart,
        "orderText"             : req.payload.note,
        "orderDispatchTime"     : req.payload.dTime,
        "orderPaymentMethod"    : req.payload.pMethod,
        "orderDeliveryAddress"  : ObjectID(req.payload.dAddress),
        "orderOrderType"        : req.payload.orderType,
        "orderStatus"           : 'order',        
        "orderStep"             : 1,
        "createTimestamp"       : new Date().getTime(),
    }

    //console.log("data============", dataToSend);

    //mongo db insert userData
    orderList.Insert(dataToSend, (err, result) => {
        if (err) {
            logger.silly(err);
            return res({ message: req.i18n.__('genericErrMsg')['422'] }).code(422);
        } else {
            return res({ message: req.i18n.__('PostUser')['200'] }).code(200);
        }
    });

    }catch(err){
        logger.error('err :', err)
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