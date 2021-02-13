
'use strict';

const joi = require('joi');
const logger = require('winston');
const moment = require('moment');

const utils = require('./fileUploader');
//const config = require('../../../configuration');

const errorMsg = require("../../../locales");

const payload = {
    maxBytes: 1000 * 1000 * 5, // 5 Mb
    output: 'stream',
    parse: true,
    allow: 'multipart/form-data'
};//payload of upload image api

const payloadValidator = {
    photo: joi.any().meta({ swaggerType: 'file' }).description('Images to upload').error((new Error('Image is missing')))
}

/**
 * @function POST /utility/uploadImage
 * @description -New Image Upload
 * @param {*} req 
 * @param {*} reply 
 */

let handler = (req, reply) => {

    const dbErrResponse = { message: req.i18n.__('genericErrMsg')['500'] };
    // console.log("--------------+++++------",req);

    const checkProvider = function () {
        return new Promise((resolve, reject) => {
            const data = req.payload;
            const file = data['photo'];
             console.log("--------------------",file);

             let filePath = "/web/public/uploads";

            console.log("--------------------",req.payload.type);


            if (typeof req.payload.type != 'undefined')
                filePath += (req.payload.type).toLowerCase();

                const fileOptions = { dest: `${filePath}/`, baseUrl: "web/public/uploads" };

            //console.log("-------------->", fileOptions)

            utils.uploader(file, fileOptions)
                .then((result) => {
                    return resolve(result);
                }).catch((err) => {
                    return reject({ message: req.i18n.__('ImageUploade')['204'] })
                });
        });
    }

    checkProvider()
        .then(data => {
            console.log("file path ---> ", process.env.ADMIN_API_URL + 'web/public/uploads/' + data.fileName);
            return reply({ message: req.i18n.__('ImageUploade')['200'], imagepath: process.env.ADMIN_API_URL + 'public/uploads/' + data.fileName });
        }).catch(e => {
            logger.error("error while uploading image =>", e)
            return reply({ message: e.message }).code(e.code);
        });
};

const responseCode = {
    status: {
        200: { message: joi.any().default(errorMsg['ImageUploade']['200']), imagepath: joi.any() },
        412: { message: joi.any().default(errorMsg['ImageUploade']['204']) },
        500: { message: joi.any().default(errorMsg['genericErrMsg']['500']) }
    }
}//swagger response code



module.exports = {
    payload,
    payloadValidator,
    handler,
    responseCode
};