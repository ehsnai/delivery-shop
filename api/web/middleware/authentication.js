'use strict';
var JWT = require('jsonwebtoken');
const HAPI_AUTH_JWT = require('hapi-auth-jwt2');
var Config = process.env;
const ObjectID = require('mongodb').ObjectID;
const logger = require('winston');
var db = require('../../models/userList');

// var client = redis.createClient(Config.redisConf); //redis client's instance for caching
// client.auth(Config.REDIS_USERNAME);//authenticate the redis client

var AUTH = module.exports = {};

/**
 * Method to generate a JWT token
 * @param {*} data - the claims to be included in the jwt
 * @param {*} type - the subject, which will differentiate the tokens (master, slave or admin)
 */

AUTH.SignJWT = (data, type, expTime) => {

    data.accessCode = Math.floor(Math.random() * 8999 + 1000);//4 digit random access code

    updateAccessCode(type, data, () => {
    });
    return JWT.sign(
        data,
        Config.SECRET_KEY,
        {
            expiresIn: expTime,
            subject: type
        });
};
/**
 * Method to update the accessCode asynchronously
 * @param {*} type - to identify the collection name to update
 * @param {*} data - the accessCode to update
 * @param {*} cb - callback
 */
function updateAccessCode(type, data, cb) {

    var collectionName = '';

    switch (type) {
        case 'user':
            collectionName = 'userList';
            break;
        case 'admin':
            collectionName = 'userList';
            break;
        default:
            return cb();
    };

    var queryObj = {
        query: { _id: data._id },
        data: { $set: { accessCode: data.accessCode } }
    };

    db.UpdateById(data._id, { accessCode: data.accessCode }, function (err, result) {
        if (err)
            return logger.info('Error updating accessCode');

        return cb(null, 1);
    })

}
;

/**
 * Method to validate the accessCode
 * First check for the accessCode in the redis cache if found, & is true return true
 * If accessCode is not found in the cache, search in the mongoDb, if found & is true return true
 * Cache the id & accessCode
 * @param {*} id 
 * @param {*} type 
 * @param {*} accessCode 
 * @param {*} cb 
 */
function validateAccessCode(id, type, accessCode, cb) {


    if (typeof accessCode === 'undefined')
        return cb(false);


    var collectionName = '';

    switch (type) {
        case 'user':
            collectionName = 'userList';
            break;
        case 'admin':
            collectionName = 'admin';
            db = require('../../models/admin');
            break;
        default:
            return cb(false);
    }
    ;

    var condition = { _id: ObjectID(id), accessCode: accessCode }

    db.Select(condition, function (err, result) {
        if (err)
            return cb(false);

        if (result === null)
            return cb(false);

        return cb(true);
    });
}

/**
 * Method to validate the refresh ' JWT
 * @param {*} decoded - decoded token
 * @param {*} cb - callback
 */
AUTH.ValidateRefJWT = (decoded, req, cb) => {
    validateAccessCode(decoded._id, decoded.sub, decoded.accessCode, (allow) => {

        let isValid = (decoded.key == 'ref' && allow) ? true : false;

        return cb(null, isValid);

    });
};
/**
 * Method to validate the slaves' JWT
 * @param {*} decoded - decoded token
 * @param {*} cb - callback
 */
AUTH.ValidateJWT = (decoded, req, cb) => {
    validateAccessCode(decoded._id, decoded.sub, decoded.accessCode, (allow) => {

        let isValid = (allow) ? true : false;

        return cb(null, isValid);

    });
};

/**
 * Method to validate the slaves' JWT
 * @param {*} decoded - decoded token
 * @param {*} cb - callback
 */
AUTH.ValidateSlaveJWT = (decoded, req, cb) => {
    console.log("in ValidateSlaveJWT ",decoded)
    
    validateAccessCode(decoded._id, decoded.sub, decoded.accessCode, (allow) => {
        let isValid = (decoded.sub === 'user' && decoded.key == 'acc' && allow) ? true : false;
        return cb(null, isValid);
    });
};

AUTH.HAPI_AUTH_JWT = HAPI_AUTH_JWT;

AUTH.userJWTConfig = {
    key: Config.SECRET_KEY,
    validateFunc: AUTH.ValidateSlaveJWT,
    verifyOptions: { algorithms: ['HS256'] },
    // errorFunc: function (context) {
    //     return tokenError(context);
    // }
};
AUTH.adminJwt = {
    key:Config.SECRET_KEY,
    validateFunc: AUTH.ValidateJWT,
    verifyOptions: { algorithms: ['HS256'] },
    // errorFunc: function (context) {
    //     return tokenError(context);
    // }
};

AUTH.refJWTConfig =  {
    key: Config.SECRET_KEY,
    validateFunc: AUTH.ValidateSlaveJWT,
    verifyOptions: { algorithms: ['HS256'] },
    // errorFunc: function (context) {
    //     return refTokenError(context);
    // }

};

function tokenError(context) {
    
        if (context.errorType == 'TokenExpiredError' && context.attributes.key == 'acc') {
            console.log(context.attributes);
            let authToken = AUTH.SignJWT({ _id: context.attributes._id, key: 'ref' }, context.attributes.sub, '60000');//sign a new JWT
            context.errorType = 477;
            context.message = context.message;
            context.refToken = authToken;
        } else {
            context.errorType = 499;
            context.message = context.message;
        }
        return context;
    }
    function refTokenError(context) {
    
        context.errorType = 499;
        context.message = context.message;
    
        return context;
    }
module.exports = AUTH;