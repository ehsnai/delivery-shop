"use strict"
/**@author:Yunus & dipen: 
 * Declaration of modules for dbMiddlware class
 */
var configDB = require('./dbConfig.js'); // importing dbconfig file
var dbUtility;
var Messages = require('./statusMessages.json');// importing messages file
var einstonLogs = require('./einstonLogs.js');// importing einstonLogs file
/**
 * @description:dbMiddleware Class
 * HERE already write function such as select , insert, update, delete.
 * you can require this file and use such of any function.
 * in all function have commen agument like key,value,db,extra and callback
 * here key == tablename, value == condition, db == database, extra == extara query feild as your requirement
 * callback == get response
 */
class dbMiddleware {


      SendMsg(data) {

            var accountSid = 'AC2d4200d61270a58bdd9d12db08c7e69a';
            var authToken = '033ecd8df1b113d6fc4f987bb06672b9';
            //require the Twilio module and create a REST client 
            var client = require('twilio')(accountSid, authToken);

            client.messages.create({
                  to: data.to,
                  from: "(855) 577-4986",
                  body: data.message,
            }, function (err, message) {
                  console.log("error  = > ", err);
                  console.log("message ==>  ", message.sid);
            });
      }

      ElasticGeoSearch(key, value, db, lat, long, unit, callback) {

            try {
                  dbUtility = configDB(db);
                  dbUtility.ElasticGeoSearch(key, value, lat, long, unit, function (err, rep) {
                        if (err) {
                              einstonLogs.loggerError(Messages.WRONGTYPE_CONDITION + err);
                        }
                        return callback(err, rep);
                  })
            } catch (error) {
                  einstonLogs.loggerError(Messages.UNKNOWN_ERROR + error);
            }
      }
      /*******************************************************************************************************
    * @description describes Select class.
    * @param:Here key=tablename,value=condition in mongo,key=key name,value=data in redis
    * @param:extras are used in findOne method of mongo, it acts as a extra condition
    */
      SelectWithOr(key, value, db, extras, callback) {

            try {
                  dbUtility = configDB(db);
                  dbUtility.SelectWithOr(key, value, extras, function (err, rep) {
                        if (err) {
                              einstonLogs.loggerError(Messages.WRONGTYPE_CONDITION + err);
                        }
                        return callback(err, rep);
                  })
            } catch (error) {
                  einstonLogs.loggerError(Messages.UNKNOWN_ERROR + error);
            }
      }
      Select(key, value, db, extras, callback) {

            try {
                  dbUtility = configDB(db);
                  dbUtility.Select(key, value, extras, function (err, rep) {
                        if (err) {
                              einstonLogs.loggerError(Messages.WRONGTYPE_CONDITION + err);
                        }
                        return callback(err, rep);
                  })
            } catch (error) {
                  einstonLogs.loggerError(Messages.UNKNOWN_ERROR + error);
            }
      }
      AggreGate(key, value, db, callback) {

            try {
                  dbUtility = configDB(db);
                  dbUtility.AggreGate(key, value, function (err, rep) {
                        if (err) {
                              einstonLogs.loggerError(Messages.WRONGTYPE_CONDITION + err);
                        }
                        return callback(err, rep);
                  })
            } catch (error) {
                  einstonLogs.loggerError(Messages.UNKNOWN_ERROR + error);
            }
      }
      /*******************************************************************************************************
      * @description describes Insert class.
      * @param:Here key=tablename,value=data in mongo,key=key,value=data in redis
      * @param:extras are used in insert method of redis, it acts as a extra condition
      * @example:object {extra:10} is used as timer in setex condition of redis,extra string 'sadd' or 'srem'       acts as a set in redis
      */
      Insert(key, value, extras, db, callback) {

            try {
                  dbUtility = configDB(db);
                  dbUtility.Insert(key, value, extras, function (err, res) {
                        if (err) {
                              einstonLogs.loggerError(Messages.WRONGTYPE_CONDITION + err);
                        }
                        callback(err, res);
                  })// Here key is tablename and value is data in mongo  
            } catch (error) {
                  einstonLogs.loggerError(Messages.UNKNOWN_ERROR + error);
            }
      }
      /*******************************************************************************************************
    * @description describes Update class.
    * @param:Here key=tablename,value=data,extras=condition in mongo,key=key,value=data in redis
    * @param:extras are used in update method of redis, it acts as a extra condition
    * @example:object {extra:10} is used as timer in setex condition of redis,extra string 'sadd' or 'srem'       acts as a set in redis
    */
      Update(key, value, extras, db, callback) {
            try {
                  dbUtility = configDB(db);
                  dbUtility.Update(key, value, extras, function (err, rep) {
                        if (err) {
                              einstonLogs.loggerError(Messages.WRONGTYPE_CONDITION + err);
                        }
                        return callback(err, rep);
                  })// Here key is tablename,value is data for mongo 
            } catch (error) {
                  einstonLogs.loggerError(Messages.UNKNOWN_ERROR + error);
            }
      }
      UpdateWithPush(key, value, extras, db, callback) {
            try {
                  dbUtility = configDB(db);
                  dbUtility.UpdateWithPush(key, value, extras, function (err, rep) {
                        if (err) {
                              einstonLogs.loggerError(Messages.WRONGTYPE_CONDITION + err);
                        }
                        return callback(err, rep);
                  })// Here key is tablename,value is data for mongo 
            } catch (error) {
                  einstonLogs.loggerError(Messages.UNKNOWN_ERROR + error);
            }
      }
      UpdateWithPull(key, value, extras, db, callback) {
            try {
                  dbUtility = configDB(db);
                  dbUtility.UpdateWithPull(key, value, extras, function (err, rep) {
                        if (err) {
                              einstonLogs.loggerError(Messages.WRONGTYPE_CONDITION + err);
                        }
                        return callback(err, rep);
                  })// Here key is tablename,value is data for mongo 
            } catch (error) {
                  einstonLogs.loggerError(Messages.UNKNOWN_ERROR + error);
            }
      }
      UpdateByQuery(key, value, extras, db, callback) {
            try {
                  dbUtility = configDB(db);
                  dbUtility.UpdateByQuery(key, value, extras, function (err, rep) {
                        if (err) {
                              einstonLogs.loggerError(Messages.WRONGTYPE_CONDITION + err);
                        }
                        return callback(err, rep);
                  })// Here key is tablename,value is data for mongo 
            } catch (error) {
                  einstonLogs.loggerError(Messages.UNKNOWN_ERROR + error);
            }
      }

      FindAndModify(key, value, extras, db, projection, option, callback) {
            try {
                  dbUtility = configDB(db);
                  /** collection, data, condition, projection, option, callback */
                  dbUtility.FindAndModify(key, value, extras, projection, option, function (err, rep) {
                        if (err) {
                              einstonLogs.loggerError(Messages.WRONGTYPE_CONDITION + err);
                        }
                        return callback(err, rep);
                  })// Here key is tablename,value is data for mongo 
            } catch (error) {
                  einstonLogs.loggerError(Messages.UNKNOWN_ERROR + error);
            }
      }
      /*******************************************************************************************************
   * @description describes Delete class.
   * @param:Here key=tablename,value=condition in mongo,key=key in redis
   */
      Delete(key, value, db, callback) {
            try {
                  dbUtility = configDB(db);
                  dbUtility.Delete(key, value, function (err, rep) {
                        if (err) {
                              einstonLogs.loggerError(Messages.WRONGTYPE_CONDITION + err);
                        }
                        return callback(err, rep);
                  })
            } catch (error) {
                  einstonLogs.loggerError(Messages.UNKNOWN_ERROR + error);
            }
      }


}
module.exports = new dbMiddleware