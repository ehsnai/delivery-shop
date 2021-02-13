'use strict'

const Joi            = require("joi");
const logger         = require('winston');
const ticketList       = require("../../../models/ticketList");
const local          = require("../../../locales");

const queryValidator = Joi.object({

    offset: Joi.number().description("offset"),
    limit: Joi.number().description("limit"),
    
}).required();

const APIHandler = (req, res) => {

    const type      = parseInt(req.query.type) || 1;
    const limit      = parseInt(req.query.limit) || 10;
    const pageSize   = parseInt(req.query.pageSize) || '';
    const sorted     = parseInt(req.query.sorted) || '';
    const filtered   = parseInt(req.query.filtered) || '';
    const page       = parseInt(req.query.page) || '';
    const count      = parseInt(req.query.count) || 10;
    const searchText = parseInt(req.query.searchText) || '';
    const dateStart  = parseInt(req.query.dateStart) || '';
    const dateEnd    = parseInt(req.query.dateEnd) || '';
    const offset     = parseInt(req.query.offset) || 0;

    ticketList.Aggregate([

        { 
            "$match": { "profileStatus": { $ne: 1 } }
        },

        {
            "$project": {
                text: 1, 
                type: 1, 
                status: 1, 
                createTimestamp: 1, 

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