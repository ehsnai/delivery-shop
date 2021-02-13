'use strict';

const jwt = require("jsonwebtoken");
const Joi = require('joi');

const payloadValidator = Joi.object({
    reportId: Joi.number().required().description('report Id').error(new Error('report Id is missing'))
}).required();

const handler = (req, res) => {
    let METABASE_SITE_URL = "https://metabase.uberforall.com";
    let METABASE_SECRET_KEY = "37aa5d6b601097701f0d4bbed6f456287221cfe7344da769567347d44b735d33";
    
    let report = {
        resource: { dashboard: req.params.reportId },
        params: {}
    };

    let data = {
        report: METABASE_SITE_URL + "/embed/dashboard/" + jwt.sign(report, METABASE_SECRET_KEY) + "#bordered=true&titled=false",
    }
    return res({
        data: data
    }).code(200);
}


module.exports = {
    payloadValidator,
    handler
};