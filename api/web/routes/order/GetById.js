"use strict";
const Joi            = require("joi");
const logger         = require('winston');
const orderList       = require("../../../models/orderList");
const local          = require("../../../locales");
const ObjectID       = require('mongodb').ObjectID;

const payloadValidator = Joi.object({
    userId: Joi.string().description('enter You want to search'),
}).options({ allowUnknown: true });

const APIHandler = (req, res) => {

    try{

    const userId = req.query.userId.trim();

    console.log("userId===>",userId)

    orderList.Aggregate([

        { 
            "$match": { "orderUserId": ObjectID(userId) }
        },

/*
        {  
            "$unwind":"$orderCart"
         },

         {  
            "$lookup":{  
               "from":"productList",
               "localField":"orderCart.itemId",
               "foreignField":"_id",
               "as":"products"
            }
         },

         {  
            "$group":{  
               "_id":"$_id",
               "name":{  
                "$first":"$title"
               },
               "orderCart":{  
                "$push":{  
                    "productId":"$orderCart.itemId",
                    "productDetails":"$products"
                  }
               }
            }
         },
         */

         { "$lookup": { "from": "addressList", "localField": "orderDeliveryAddress", "foreignField": "_id", "as": "address" } },
         { "$lookup": { "from": "userList", "localField": "orderUserId", "foreignField": "_id", "as": "user" } },

        {
            "$project": {
                orderNumber:1,
                address : 1,
                orderNumber           : 1,
                orderUserId          : 1,
                orderCart            : 1,
                orderText           : 1,
                orderDispatchTime    : 1,
                orderPaymentMethod   : 1,
                orderDeliveryAddress  :1,
                orderOrderType      : 1,
                orderStatus         : 1,        
                orderStep            : 1,
                user:1,
            }

        },

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
        console.log("err is  ===>", err)

    }

}

const response = {
    status: {
        200: {
            message: Joi.any().default(local['GetBytxt']['200']), data: Joi.any()
        },
        204: { message: Joi.any().default(local['GetBytxt']['204']) },
        400: { message: Joi.any().default(local['genericErrMsg']['400']) },
        500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    }
}

module.exports = {APIHandler,payloadValidator,response}