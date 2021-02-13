'use strict'

const fs = require('fs');
const moment = require('moment');
const mkdirp = require('mkdirp');

const imageFilter = function (fileName) {
   // accept image only
    if (!fileName.match(/\.(jpg|jpeg|png|gif)$/)) {
        return false;
    }

    return true;
};

const uploader = function (file, options) {
    return new Promise((resolve, reject) => {
        if (!file)
            return reject('no file');

        if (Array.isArray(file)) {
            _filesHandler(file, options)
                .then((data) => {
                    return resolve(data);
                }).catch((err) => {
                    return reject(err);
                });
        } else {
            _fileHandler(file, options)
                .then((data) => {
                    return resolve(data);
                }).catch((err) => {
                    return reject(err);
                });
        }
    })
}

const _fileHandler = function (file, options) {
    return new Promise((resolve, reject) => {
        if (!file)
            return reject('no file');

        if (options.fileFilter && !options.fileFilter(file.hapi.filename)) {
            return reject('type not allowed');
        }


        const originalName = file.hapi.filename;
        const fileName = moment().unix() + originalName;
        const path = `${options.dest}${fileName}`;

        mkdirp.sync(options.dest, {});//create a directory if it does not exists

        const fileStream = fs.createWriteStream(path);

        file.on('error', function (err) {
            return reject(err);
        });

        file.pipe(fileStream);
        
        file.on('end', function (err) {
            const fileDetails = {
                // fieldname: file.hapi.name,
                originalName,
                fileName,
                url: path.replace(options.dest, options.baseUrl),
                mimetype: file.hapi.headers['content-type'],
                // destination: `${options.dest}`,
                // path,
                // size: fs.statSync(path).size,
            }

            return resolve(fileDetails);
        })
    })
}

const _filesHandler = function (files, options) {
    return new Promise((resolve, reject) => {
        if (!files || !Array.isArray(files))
            return reject('no file');

        const promises = files.map(x => _fileHandler(x, options));
        Promise.all(promises)
            .then(function (fileDetails) {
                return resolve(fileDetails);
            }).catch(function (err) {
                return reject(err);
            });
    })
}

module.exports = { uploader };