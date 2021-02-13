const Joi = require("joi");
const logger = require('winston');
const productList = require("../../../models/productList");
const ObjectID = require('mongodb').ObjectID;


const payloadValidator = Joi.object({
    productId: Joi.array().description('productId'),
}).options({ allowUnknown: true });

const APIHandler = (req, res) => {
     console.log("+++++++++++++++++++++++++++",req.payload.productId)
    let datatoUpdate = {
        deleteStatus: 1,
        deleteTimeStamp: new Date().getTime(),
    };
    productList.UpdateById(req.payload.productId, datatoUpdate, (err, result) => {
        if (err) {
            console.log(err)
            return res({ message: req.i18n.__('genericErrMsg')['422'] }).code(422);
        } else {
            return res({ message: req.i18n.__('DeleteCoupon')['200'] }).code(200);
        }
    });
};



module.exports = { APIHandler, payloadValidator }