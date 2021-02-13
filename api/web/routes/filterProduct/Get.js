'use strict'

const Joi            = require("joi");
const logger         = require('winston');
const productList       = require("../../../models/productList");
const local          = require("../../../locales");

const payloadValidator = Joi.object({
    filters: Joi.object().description("filters"),    
}).required();

const APIHandler = (req, res) => {
    try{

    const filters = JSON.parse(req.query.filters);

    console.log("filters -->", filters)

    const pageNo       = parseInt(filters.page) || 0;
    const limit        = parseInt(filters.pageSize )|| 10;
    const sOrderBy     = filters.sort || '_id';
    let sDesc        = filters.sDesc || true;
    const sWheres      = filters.wheres || null;
    const filterBy     = filters.filterBy;
    //const filterValue  = req.query.filterValue || false;
    const offset       = (pageNo * limit);
    
    if (sOrderBy !== null || sOrderBy !== "null") {
        (sDesc === "false") ? sDesc = -1 : sDesc = 1;
    }
    
    let sort = {};
    sort[sOrderBy] = sDesc;
        
    let match = {}

    if (sWheres) {
        let regex = new RegExp(sWheres + ".*");
        match['title'] = {$regex: regex}
    }


   Object.keys(filterBy).forEach(function (item) {

    if(filterBy[item].length > 0){
        match[item] =  {"$in" :  filterBy[item]}
    }

    match['deleteStatus'] = {$ne : 1}


	console.log(item); // key
	console.log(filterBy[item]); // value
});

console.log(" -- > match:",match)
console.log(" -- > sort:",sort)

    productList.Aggregate([

        { 
            "$match": match,
        },

        {
            "$project": {

                title    : 1,
                subtitle : 1,
                text     : 1,
                category : 1,
                images   : 1,
                type     : 1,
                status   : 1,
                sellType : 1,
                sellType : 1,
                prices   : 1,
                stocks   : 1,
                productImage:1,
            }

        },

        { "$sort": sort },

        { "$skip": offset  }, 
        
        { "$limit": limit }

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
    console.log("++++++++++++++++++++", err)
}

}




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



module.exports = { APIHandler, response,payloadValidator }