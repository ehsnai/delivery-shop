const Joi = require("joi");
const logger = require('winston');
const AdminCollection = require('../../../models/admin');
const local = require("../../../locales");


const payloadValidator = Joi.object({
    currentPassword: Joi.string().required().description('*******'),
    newPassword: Joi.string().required().description('123456'),
    confirmPassword: Joi.string().required().description('123456')

}).options({ allowUnknown: true });

const APIHandler = (req, res) => {
    //console.log("================>api is call", req.payload)
    let datatoUpdate = {
        "password": req.payload.confirmPassword,
        "changeDate": new Date().getTime(),
    };
    AdminCollection.Select({}, (err, result) => {
        if (err) {
            return res({ message: req.i18n.__('genericErrMsg')['500'] }).code(500);
        } else {
            if (result[0].password == req.payload.currentPassword) {
                AdminCollection.UpdateById(result[0]._id, datatoUpdate, (err, result) => {
                    if (err) {
                        return res({ message: 'internal server error' }).code(500);
                    }
                    return res({ message: req.i18n.__('passwordChange')['200'], code: "200" }).code(200);

                });
                console.log("admin password change succesfully")

            } else {
                console.log("opps..! somthing went wrrong current password not match with new entered")
                return res({ message: req.i18n.__('passwordChange')['204'], code: "204" }).code(204);

            }

        }

    })

};


const response = {
    status: {
        200: {
            message: Joi.any().default(local['passwordChange']['200']), code: Joi.any()
        },
        204: { message: Joi.any().default(local['passwordChange']['204']), code: Joi.any() },
        400: { message: Joi.any().default(local['genericErrMsg']['400']) },
        500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    }
}
module.exports = { APIHandler, payloadValidator, response }