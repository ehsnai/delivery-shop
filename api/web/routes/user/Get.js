'use strict'

const Joi            = require("joi");
const logger         = require('winston');
const userList       = require("../../../models/userList");
const local          = require("../../../locales");

const payloadValidator = Joi.object({
    offset: Joi.number().description("offset"),
    limit: Joi.number().description("limit"),
}).options({ allowUnknown: true });

const APIHandler = (req, res) => {

    const pageNo = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.pageSize )|| 10;
    const sOrderBy =  req.query.sOrderBy || '_id';
    let sDesc = req.query.sDesc || false;
    //const sWheres = req.query.wheres || null;

    const offset = (pageNo * limit);

    if (sOrderBy !== null || sOrderBy !== "null") {
        (sDesc === "true") ? sDesc = -1 : sDesc = 1;
    }

    let sort = {};
    sort[sOrderBy] = sDesc;

    userList.Aggregate([

        { 
            "$match": { 
                "deleteStatus": { $ne: 1 },

            }
            
        },

        {
            "$project": {

                firstName: 1, 
                lastName: 1, 
                email: 1, 
                mobile: 1, 
                cardIdImage: 1, 
                idNumber: 1, 
                status: 1, 
                type: 1, 
                membership: 1, 
                registeredTimestamp: 1, 
                purchase       : { "$size" : { "$ifNull" : ["$purchase", []] } },
                orders       : { "$size" : { "$ifNull" : ["$orders", []] } },
                tickets       : { "$size" : { "$ifNull" : ["$tickets", []] } },
                coupons       : { "$size" : { "$ifNull" : ["$coupons", []] } },        
            }
        },

        { "$sort": sort },
        { "$skip": offset },
        { "$limit": limit },

    ],
        (err, result) => {
            if (err) {
                return res({ message: req.i18n.__('genericErrMsg')['500'] }).code(500);
            } else if (result) {
                for (let index = 0; index < result.length; index++) {
                    result[index]["lastOnlineStatus"] = result[index]["lastOnlineStatus"] || result[index]["registeredTimestamp"]
                    delete result[index]["registeredTimestamp"];
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

module.exports = {APIHandler, payloadValidator,response }