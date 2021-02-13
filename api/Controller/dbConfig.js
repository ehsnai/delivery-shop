"use strict"
/**@author:Yunus & dipen: 
 * Declaration of modules for dbConfig class
 */

var redis = require("redis");
var fs = require('fs');//import fs for file operations45.76.248.33

var client = redis.createClient(6379,"127.0.0.1");
client.auth("3embed")
client.on('connect', function () { console.log('Redis connected'); }); // redis connection
var Messages = require('./statusMessages.json');//import messages for status response
var einstonLogs = require('./einstonLogs.js');//import einstonLogs for logs generation
var mongodb = require('mongodb');

var db ;
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(process.env.MONGODB_URL,
    function (err, db2) {
        if (err) { console.error(err); }
        console.log("MongoDb connected");
        db = db2;
    });

    /*
in this file you can create your class with some method and also configer you class in bottem of this file.
if you done the db configer like connection-top of this file,pass DB name at-bottom of this file.
then you can use this class or function from middleware or any of the file , at other file you should import/require this file.
*/
/**
 * RedisDB Class
 */
class RedisDB {
    constructor() { }
    /**Insert function is use to insert key, values to database **/
    Insert(key, value, extras, callback) {
        if (value == null) {
            return false;
        }
        if (typeof extras === 'string' && extras == 'sadd') {
            client.sadd(key, value, (err, data) => {
                return callback(err, data);
            })
        } else if (typeof extras === 'string' && extras == 'srem') {
            client.srem(key, value, (err, data) => {
                return callback(err, data);
            })
        } else {
            if (extras.extra >= 0) {
                client.setex(key, extras.extra, value, (err, data) => {
                    return callback(err, data);
                })
            } else {
                if (typeof value === 'object') {
                    client.hmset(key, value, (err, data) => {
                        return callback(err, data);
                    });
                } else {
                    client.set(key, value, (err, dataa) => {
                        return callback(err, dataa);
                    });
                }
            }
        }
    }
    /**Update function is use to insert key, values to database **/
    Update(key, value, extras, callback) {
        if (value == null) {
            return false;
        }
        if (typeof extras === 'string' && extras == 'sadd') {
            client.sadd(key, value, (err, data) => {
                return callback(err, data);
            })
        } else if (typeof extras === 'string' && extras == 'srem') {
            client.srem(key, value, (err, data) => {
                return callback(err, data);
            })
        } else {
            if (extras.extra >= 0) {
                client.setex(key, extras.extra, value, (err, data) => {
                    return callback(err, data);
                })
            } else {
                if (typeof value === 'object') {
                    client.hmset(key, value, (err, data) => {
                        return callback(err, data);
                    });
                } else {
                    client.set(key, value, (err, dataa) => {
                        return callback(err, dataa);
                    });
                }
            }
        }
    }
    /**Select function is use to select values based on key **/
    Select(key, value, extras, callback) {
        if (key == null) {
            return false;
        }
        if (value == 'get') {
            client.get(key, (err, data) => {
                return callback(err, data);
            });
        } else if (value == 'hgetall') {
            client.hgetall(key, (err, data) => {
                return callback(err, data);
            });
        } else if (value == 'exists') {
            client.exists(key, (err, data) => {
                return callback(err, data);
            });
        } else {
            throw new Error(Messages.WRONGTYPE_OPERATION);
        }
    }
    /**Delete function is use to Delete keys **/
    Delete(key, value, callback) {
        client.del(key, (err, data) => {
            return callback(err, data);
        });
    }
    /**TimeToLeave function is use to get the remaining key expiry status **/
    TimeToLeave(key, callback) {
        client.ttl(key, (err, data) => {
            return callback(err, data);
        });
    }
}



/**
 * MongoDB Class
 */
class MongoDB {
    constructor() { }
    /**Insert function is use to insert parameters to database.
     * It's a generic function, tablename is use for Tablename in the db.
     * data is array to insert documents in table.
     * if inserted then go callback function else error.
     * **/
    Insert(tablename, data, extra, callback) {  // expiry(redis key) not using here
        var collection = db.collection(tablename);
        collection.insert([data], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                return callback(err, result);
            }
        });
    };

    /**Select function is use to fetch data from database.
    * It's a generic function, tablename is use for Tablename in the db.
    * data is array to provide where condition in table.
    * if success then go callback function else error.
    * Result is use to store all data resulted from select function.
    * **/
    Select(tablename, data, extras, callback) {
        var collection = db.collection(tablename);
        if (extras.length) {
            collection.findOne(data, extras, (function (err, result) {
                return callback(err, result);
            }));
        } else {
            if (data.length) {
                collection.findOne(data, (function (err, result) {
                    return callback(err, result);
                }));
            }
            collection.find(data).toArray(function (err, result) {
                return callback(err, result);
            });
        }
    }

    AggreGate(tablename, data, callback) {
        var collection = db.collection(tablename);

        collection.aggregate(data, function (err, result) {
            return callback(err, result);
        });
    }

    /**
     * FindAndModify
     */
    FindAndModify(tablename, data, condition, projection, option, callback) {
        var collection = db.collection(tablename);

        console.log('FindAndModify')
        collection.findAndModify(condition, [], data, {
            new: (option.new) ? option.new : false,
            upsert: (option.upsert) ? option.upsert : false,
            fields: projection
        }, function (err, result) {
            console.log('FindAndModify done');
            return callback(err, result);
        });

    }

    /**Update function is use to Update parameters to database.
     * It's a generic function, tablename is use for Tablename in tnullhe db.
     * data is array to Update documents in table.
     * if Updated then go callback function else error.
     * **/
    Update(tablename, data, condition, callback) {
        var collection = db.collection(tablename);
        collection.update(condition, { $set: data }, { multi: true }, (function (err, result) {
            return callback(err, result);
        }));
    }

    UpdateWithPush(tablename, data, condition, callback) {
        var collection = db.collection(tablename);
        collection.update(condition, data, { $multi: true }, (function (err, result) {
            return callback(err, result);
        }));
    }

    /**Delete function is use to delete parameters to database.
     * It's a generic function, tablename is use for Tablename in the db.
     * data is array to give the condition.
     * if deleted then go callback function else error.
     * **/
    Delete(tablename, condition, callback) {
        var collection = db.collection(tablename);
        collection.remove(condition, function (err, numberOfRemovedDocs) {
            return callback(err, numberOfRemovedDocs);
        });
    };
}


var elasticsearch = require('elasticsearch');
var elasticClient = new elasticsearch.Client({
    host: '104.236.32.23:9200',
    log: 'info'
});
// const indexName = "syncdata";
const indexName = "phonec_contact_sync";
const version = 382;
// const version_type="external"
class ElasticSearch {

    ElasticGeoSearch(tablename, data, lat, long, unit, callback) {
        console.log(" in Esearch");
        elasticClient.search({
            index: indexName,
            type: tablename,
            version: version,
            // version_type:version_type,
            body: {
                "query": {
                    "bool": {
                        "must": {
                            "match_all": {}
                        },
                        "filter": {
                            "geo_distance": {
                                "distance": "2000000km",
                                "location": {
                                    "lat": lat,
                                    "lon": long
                                }
                            }
                        }
                    }
                },

                "sort": {
                    "_geo_distance": {
                        "location": "" + lat + "," + long,
                        "order": "asc",
                        "unit": unit
                    }
                },
                "size": 20
            }
        }, function (err, result) {
            callback(err, result);
        });
    }

    /**Search function is use to insert parameters to Index.
           * It's a generic function, tablename-type is use for Tablename-type in the db-Index.
           * data is array to insert documents in table-type.
           * if inserted then go callback function else error.
           * **/
    SelectWithOr(tablename, data, extra, callback) {  // expiry(redis key) not using here
        // console.log("====>in select===>", data);
        elasticClient.search({
            index: indexName,
            type: tablename,
            version: version,
            // version_type:version_type,
            body: {
                "query": {
                    "constant_score": {
                        "filter": {
                            "bool": {
                                "should": data,
                            }
                        }
                    }
                }
            }
        }, function (err, result) {
            callback(err, result);
        });
    };



    Select(tablename, data, extra, callback) {  // expiry(redis key) not using here
        if (data) {
            console.log("====>in select===>", data);
            elasticClient.search({
                index: indexName,
                type: tablename,
                version: version,
                // version_type:version_type,
                body: {
                    "query": {
                        "constant_score": {
                            "filter": {
                                "bool": {
                                    "must": data,
                                }
                            }
                        }
                    }
                }
            }, function (err, result) {
                callback(err, result);
            });
        } else {
            console.log("====>not in select===>");
            elasticClient.search({
                index: indexName,
                type: tablename,
                version: version,
                body: {
                    "_source": extra,
                    query: {
                        match_all: {}
                    }
                }
            }, function (err, result) {
                callback(err, result);
            });
        }



    };

    /**Insert function is use to insert parameters to Index.
         * It's a generic function, tablename-type is use for Tablename-type in the db-Index.
         * data is array to insert documents in table-type.
         * if inserted then go callback function else error.
         * **/
    Insert(tablename, data, extra, callback) {  // expiry(redis key) not using here
        var _id = data._id.toString();
        delete data._id;
        elasticClient.index({
            index: indexName,
            type: tablename,
            // version: version,
            // retry_on_conflict: 5,
            // version_type:version_type,
            id: _id,
            body: data

        }, function (err, result) {
            callback(err, result);
        });

    };

    /**Update function is use to Update parameters to database.
     * It's a generic function, tablename is use for Tablename in tnullhe db.
     * data is array to Update documents in table.
     * if Updated then go callback function else error.
     * **/
    Update(tablename, data, id, callback) {
        console.log("Update===========>>>", data);
        elasticClient.update({
            index: indexName,
            type: tablename,

            // version_type:version_type,
            id: id,
            // version: version,
            retry_on_conflict: 5,
            body: {
                doc: data,
                doc_as_upsert: true,
            }
        }, function (err, results) {
            callback(err, results)
        })
    }
    UpdateWithPush(tablename, data, condition, callback) {
        console.log("elasticSearch UpdateWithPush data : ", data);
        console.log("condition: ", condition);


        elasticClient.updateByQuery({
            index: indexName,
            type: tablename,
            body: {
                "script": data,// "script": "{ inline: ctx._source." + key + "='aaaa',lang: 'painless' }",
                "query": condition
            }
        }, function (err, results) {
            callback(err, results)
        })
    }
    UpdateWithPull(tablename, data, id, callback) {
        console.log("Update===========>>>", data);

        var key = Object.keys(data);
        elasticClient.update({
            index: indexName,
            type: tablename,

            // version_type:version_type,
            id: id,
            // version: version,
            retry_on_conflict: 5,
            body: {
                // doc: data,
                // doc_as_upsert: true,
                // "script": "ctx._source.contacts = 'zxxxxxxxxxxxxxx'"
                "script": "ctx._source." + key + ".add(" + data[key] + ")"
                // "script": "ctx._source." + key + ".add('" + data[key] + "')"

            }
        }, function (err, results) {
            callback(err, results)
        })
    }
    UpdateByQuery(tablename, data, condition, callback) {
        console.log("Update===========>>>", data);

        var key = Object.keys(data);
        elasticClient.updateByQuery({
            index: indexName,
            type: tablename,
            // retry_on_conflict: 5,
            body: {

                condition,

                "script": { "inline": "ctx._source." + key + "=" + data[key] }
                // "script": "ctx._source.contacts+=aaaaaaaaaaa"
                // "script": "ctx._source." + key + ".remove(num)",
                // "params": { "num": "+919620826142" }
                // "script.indexed": true


            }
        }, function (err, results) {

            callback(err, results)
        })
    }
    UpdateWithPull(tablename, data, id, callback) {
        console.log("Update===========>>>", data);

        var key = Object.keys(data);
        elasticClient.update({
            index: indexName,
            type: tablename,

            // version_type:version_type,
            id: id,
            // version: version,
            retry_on_conflict: 5,
            body: {
                // "script": "ctx._source." + key + " += '," + data[key] + "'"
                "script": "ctx._source." + key + ".remove(num)",
                "params": { "num": "+919620826142" }
                // "script.indexed": true


            }
        }, function (err, results) {

            callback(err, results)
        })
    }
    /**Delete function is use to Update parameters to database.
    * It's a generic function, tablename is use for Tablename in tnullhe db.
    * data is array to Update documents in table.
    * if Updated then go callback function else error.
    * **/
    Delete(tablename, condition, callback) {
        elasticClient.deleteByQuery({
            index: indexName,
            type: tablename,
            version: version,
            // version_type:version_type,
            body: {
                query: {
                    match: condition
                }
            }
        }, function (err, results) {
            callback(err, results)
        })
    }

}


module.exports = function (name) {
    switch (name) {
        // case 'Redis': return new RedisDB;
        case 'Mongo': return new MongoDB;
        case 'ESearch': return new ElasticSearch;
        default: return fs.appendFile("errLogs.txt", "System Error", Messages.WRONG_DB + name, function (err, data) {
            if (err) {
                console.log("log not created");
                einstonLogs.loggerError(Messages.UNKNOWN_ERROR);

            } else {
                einstonLogs.loggerInfo(Messages.DB_CONNECTED);
                console.log("log created");
            }
        })
    }
};
