'use strict';

const Joi = require("joi");
const logger = require('winston');
const userListCollection = require('../../../models/userList');
const local  = require("../../../locales");


const payloadValidator = Joi.object({

    _id: Joi.string().required().description('_id')

}).options({ allowUnknown: true });

const APIHandler = (req, res) => {

    let _id = req.payload._id;

    delete req.payload._id;

    userListCollection.UpdateById(_id,req.payload,(err, result)=>{
        if (err) {
            return res({ message:req.i18n.__('genericErrMsg')['500'] }).code(500);
        }
        return res({ message:req.i18n.__('PutProfile')['200'] }).code(200);
    })
};

const response = {
    status: {
        200: {
            message: Joi.any().default(local['PutProfile']['200']), 
        },
        204: { message: Joi.any().default(local['genericErrMsg']['204']) },
        400: { message: Joi.any().default(local['genericErrMsg']['400']) },
        500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    }
}

module.exports = { APIHandler, payloadValidator,response }