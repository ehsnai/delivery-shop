'use strict';
var jwtDecode = require('jwt-decode');

const APIHandler = (req, res) => {
    var decoded = jwtDecode(req.headers.authorization);
    var timestamp = Math.round(new Date() / 1000);

    if (decoded.exp > timestamp) {
        return res({ message: "token alive",code:200 })
    } else {
        return res({ message: "oken exoire please login again",code:401 })
    }

};
const response = {
    // status: {
    //     200: {
    //         message: Joi.any().default(local['GetLike']['200']),data: Joi.any()
    //     },
    //     422: { message: Joi.any().default(local['GetLike']['204']) },
    //     400: { message: Joi.any().default(local['genericErrMsg']['400']) },
    //     500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    // }
}
module.exports = { APIHandler, response }