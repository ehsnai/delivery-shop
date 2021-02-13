const Joi = require("joi");
const logger = require('winston');
const couponList = require("../../../models/couponList");
const ObjectID = require('mongodb').ObjectID;


const payloadValidator = Joi.object({
    couponId: Joi.array().description('couponId'),
}).options({ allowUnknown: true });

const APIHandler = (req, res) => {
     console.log("+++++++++++++++++++++++++++",req.payload.couponId)
    let datatoUpdate = {
        deleteStatus: 1,
        deleteTimeStamp: new Date().getTime(),
    };
    couponList.UpdateById(req.payload.couponId, datatoUpdate, (err, result) => {
        if (err) {
            console.log(err)
            return res({ message: req.i18n.__('genericErrMsg')['422'] }).code(422);
        } else {
            return res({ message: req.i18n.__('DeleteCoupon')['200'] }).code(200);
        }
    });
};



module.exports = { APIHandler, payloadValidator }