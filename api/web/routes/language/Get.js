const Joi = require("joi");
const logger = require('winston');
const languagesCollection = require("../../../models/languages");

const queryValidator = Joi.object({
    status: Joi.number().description("status"),
}).required();
APIHandler = (req, res) => {

    languagesCollection.Select({ status: req.params.status }, (err, result) => {
        if (err) {
            return res({ message: 'internal server error' }).code(500);
        } else if (result) {
            return res({ code: 200, message: 'success', result: result }).code(200);
        } else {
            return res({ message: 'incorrect password' }).code(204);
        }
    });
};

module.exports = { APIHandler, queryValidator }