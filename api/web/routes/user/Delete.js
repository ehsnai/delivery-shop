const Joi = require("joi");
const logger = require('winston');
const userList = require("../../../models/userList");
const ObjectID = require('mongodb').ObjectID;


payloadValidator = Joi.object({
    userId: Joi.string().required().description('enter user ids'),
}).options({ allowUnknown: true });

APIHandler = (req, res) => {

    let condition = { '_id': ObjectID(req.payload.userId) };

    let datatoUpdate = {
        deleteStatus: 1,
        deleteTimeStamp: new Date().getTime(),
        accessCode: 12345678910
    };

    console.log("user in delete ", req.payload.userId)
    console.log("user in datatoUpdate ", datatoUpdate)

    userList.Update(condition, datatoUpdate, (err, result) => {
        if (err) {
            return res({ message: 'internal server error' }).code(500);
        } else {
            return res({code:200, message: 'success' }).code(200);
        }
    });

};



module.exports = { APIHandler, payloadValidator }