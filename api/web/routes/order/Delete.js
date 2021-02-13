const Joi = require("joi");
const logger = require('winston');
const orderList = require("../../../models/orderList");
const ObjectID = require('mongodb').ObjectID;


payloadValidator = Joi.object({
    userId: Joi.array().required().description('enter user ids'),
}).options({ allowUnknown: true });

APIHandler = (req, res) => {

    let data = {
        _id : ObjectID(req.params.userId)
   };

   orderList.Delete(data, (err, result) => {
    if (err) {
        return res({ message: 'internal server error' }).code(500);
    } else {
        return res({code:200, message: 'success' }).code(200);
    }
    });
};



module.exports = { APIHandler, payloadValidator }