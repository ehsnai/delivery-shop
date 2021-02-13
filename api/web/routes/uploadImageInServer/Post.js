const Joi = require("joi");
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: "improver-digital-cloud",
    api_key: "675923569477678",
    api_secret: "aoUuEyjeEdLCBPABRcgAZn_rsKs"
    // cdn_subdomain: true
})
const payloadValidator = Joi.object({
    activeimage: Joi.any().required().description('img'),
}).options({ allowUnknown: true });

const APIHandler = (req, res) => {
    var image = req.payload.activeimage;
    var path = "admin";
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(image, { folder: path + "/" }, (error, result) => {
            if (error) return reject({ code: 500, message: 'Not uplaoded' });
            if (result) return resolve({ code: 200, message: 'success', data: result });
        });
    }).then(dt => {
        console.log(dt)
        return res({ message: 'upload failed', res: dt.data.secure_url }).code(200);
    }).catch(er => {
        return res({ message: 'upload failed', }).code(500);

    })


};

module.exports = { APIHandler, payloadValidator }