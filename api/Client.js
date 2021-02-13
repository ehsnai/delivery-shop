"use strict"
var redis = require("redis");
var async = require("async");
const mqtt = require('mqtt');// create constant for MQTT
var moment = require('moment');
const db = require('./models/mongodb');
var fcmOnTopic = require("./library/fcm");
var objectId = require("mongodb").ObjectID;
const userList = require("./models/userList");
var sendPushUtility = require("./sendPush.js");
var logFile = require("./Controller/einstonLogs.js");// create object of statusMessages module
var middleWare = require("./Controller/dbMiddleware.js");// create object of crud module
var messages = require("./Controller/statusMessages.json");// create object of statusMessages module

const configMqtt = require('./config');

db.connect(() => { });
var redisClient = redis.createClient();
redisClient.auth("3embed")
redisClient.on('connect', function () { console.log('Redis connected from Client'); }); // redis connection
var messageTypes = ["text", "image", "video", "location", "concat", "audio", "sticker", "doodle", "gify"];


var userStatus = {},
    calls = {
        "callId will come in signal": {
            userId: "mongoId",
            targetId: "mongoId",
            ceartion: new Date().getTime(),
            typeOfCall: 0,
            callId: "callId will come in signal",
            endTime: "when we get type=2/3/7 on Call channal we assign server current time"
        }
    };

var config = {};
config.mqtt = {};

config.mqtt.options = {

    keepalive: 1000,
    clean: false,
    clientId: "Hola_Dev_Client_" + Math.random(),
    clean: false,
    will: { topic: "test1", payload: "i m goto offline", qos: 1, retain: 1 }
};

const client = mqtt.connect(configMqtt.mqtt.MQTT_URL, config.mqtt.options);


/**
 * here client is connect to server as assign
 */
client.on('connect', () => {
    /**
     * client subscribes challes like Online,Offline,Timeout,message
     */
    console.log('MQTT Connected');

    client.subscribe("#", { qos: 1 });
    // client.subscribe("user/#", { qos: 1 });
    // client.subscribe("Message/#", { qos: 1 });
    // client.subscribe("Acknowledgement/#", { qos: 1 });
    // client.subscribe("ContactSync/#", { qos: 1 });
    // client.subscribe("UserUpdate/#", { qos: 1 });
    // client.subscribe("Calls/#", { qos: 1 });
    // client.subscribe("GetChats/#", { qos: 1 });
    // client.subscribe("GetMessages/#", { qos: 1 });

    console.log("Client Connected...");
});

/**
 * here client listin chennels which is subscribe
 * In any channel user must be send fId : fiberBaseUserId 
 */
client.on('message', (topic, message) => {
    try {
        var targetId = "";

        switch (topic) {
            case String(topic.match(/^Acknowledgement.*/)):
                {
                    Acknowledgement(message.toString());
                    break;
                }
            case String(topic.match(/^Calls.*/)): {
                message = JSON.parse(message.toString());
                console.log("message call : ", message)

                try {
                    if (message.type == 0) {
                        //initalize the call
                        calls[message.callId] = {
                            userId: message.callerId,
                            targetId: topic.replace("Calls/", ""),
                            creation: 1,
                            typeOfCall: message.callType,
                            callId: message.callId
                        };

                        if (message.callerId) {
                            let key = "callerId:" + topic.replace("Calls/", "");
                            console.log("Key ", key);
                            redisClient.hgetall(key, (err, data) => {
                                if (data == null) {
                                    redisClient.hmset(key, message);
                                    redisClient.expire(key, 60, function (err, isExpired) {
                                        console.log("is Expired for  : " + key, JSON.stringify(isExpired));
                                    });
                                    targetId = topic.replace("Calls/", "");
                                    // sendPushUtility.iosPushIfRequiredOnVideoCall({ targetId: targetId, message: message });
                                    userList.SelectOne({ _id: objectId(message.callerId) }, (err, data) => {
                                        let userName = "Some One";
                                        if (data) {
                                            userName = data.firstName;
                                        }
                                        let payload = {
                                            notification: {
                                                body: userName + " is trying to sync date with you…"
                                                // , title: "video call" 
                                            },
                                            data: { type: '12' }
                                        }
                                        fcmOnTopic.sendPushToTopic("topic" + targetId, payload)
                                        console.log(" calls[message.callId]  ", calls[message.callId]);
                                    })

                                }
                            });
                        }


                    }
                    else if (message.type == 1) {
                        // call accept by target user
                        calls[message.callId].creation = new Date().getTime();
                        console.log("Call started at : " + calls[message.callId].creation);
                    } else if (message.type == 2) {
                        if (message.callerId) {
                            let key = "callerId:" + message.callerId;
                            redisClient.del(key, (err, data) => { });
                        }
                        // calls[message.callId]["targetId"]=

                        // call reject before accept or after accepte from user or target user
                        // console.log("end the call ", calls[message.callId]);
                        if (calls[message.callId].creation == 1) {
                            // call reject before accept
                            targetId = topic.replace("Calls/", "")
                            userList.SelectOne({ _id: objectId(message.userId) }, (err, data) => {
                                let userName = "Some One";
                                if (data) {
                                    userName = data.firstName;
                                }
                                let payload = {
                                    notification: {
                                        body: "You missed a sync date with " + userName + "."
                                        // , title: "video call"
                                    },
                                    // data: { field1: 'value1', field2: 'value2' } // values must be string
                                }
                                fcmOnTopic.sendPushToTopic("topic" + targetId, payload);
                            })
                            // calls[message.callId] = {
                            //     userId: message.callerId,
                            //     targetId: topic.replace("Calls/", ""),
                            //     creation: new Date().getTime(),
                            //     typeOfCall: message.callType,
                            //     callId: message.callId
                            // };
                            calls[message.callId].endTime = calls[message.callId].creation;
                            console.log(" calls[message.callId] 1:  ", calls[message.callId]);
                            saveCallCount(message.callId);
                            // delete calls[message.callId];
                        } else {
                            // call reject after accept
                            calls[message.callId].endTime = new Date().getTime();
                            saveCallCount(message.callId);
                        }
                    } else if (message.type == 3 || message.type == 7) {
                        //noanswer by reeciver or timeout for call initalizer

                        userList.SelectOne({ _id: objectId(message.userId) }, (err, data) => {
                            let userName = "Some One";
                            if (data) {
                                userName = data.firstName;
                            }
                            let payload = {
                                notification: {
                                    body: "You missed a sync date with " + userName + "."
                                    // , title: "video call" 
                                },
                                // data: { field1: 'value1', field2: 'value2' } // values must be string
                            }
                            fcmOnTopic.sendPushToTopic("topic" + message.targetId, payload);
                        })
                        calls[message.callId] = {
                            // userId: message.callerId,
                            targetId: topic.replace("Calls/", ""),
                            creation: new Date().getTime(),
                            // typeOfCall: message.callType,
                            // callId: message.callId
                        };
                        calls[message.callId].endTime = calls[message.callId].creation;
                        saveCallCount(message.callId);
                        // delete calls[message.callId];
                    }
                } catch (error) {
                    console.log(error);
                }


                break;
            }
            case String(topic.match(/^Message.*/)):
                {
                    message = JSON.parse(message.toString());
                    console.log('message: ', message);
                    /** insertMessage(arg1,arg2) Save massages in "messages" collection */
                    insertMessage(message);
                    break;
                }

        }
        console.log("received message " + message.toString() + ", topic : " + topic);
    } catch (e) {
        console.log("Exception : ", e);
    }
})

client.on("close", (packet) => {
    console.log('close', packet);
});

client.on("disconnect", (packet) => {
    console.log('Disconected');
});

client.on("error", (packet) => {
    console.log('error');
});

/**
 * 
 * @param {*fiberBaseUserId} fId :  Registered fiberBaseUserId
 * @param {*UserStatus} Status : Online,Offline,Timeout
 */
function setUserStatus(fId, Status) {
    /**
     * Here set in mogoDB
     */
    middleWare.Update("userList", { status: Status }, { "fiberBaseUserId": fId }, "Mongo", (e, s) => {
        if (e) {
            logFile.loggerError(messages.UPDATE_ERROR + "--" + e);
            console.log(messages.UPDATE_ERROR + "--Mongo", e);
        }
    })

}

function insertMessage(message) {

    var userId, targetUserId, payload, type, messageId, creation, secretId, thumbnail, dTime, userImage, toDocId, name, dataSize, extension, fileName, mimeType;

    userId = message.from;
    targetUserId = message.to;
    payload = message.payload;
    type = message.type;
    messageId = message.id;
    secretId = (message.secretId) ? message.secretId : "";
    dTime = (message.dTime || message.dTime == 0) ? message.dTime : -1;
    creation = new Date().getTime();
    thumbnail = message.thumbnail;
    mimeType = message.mimeType;
    extension = message.extension;
    fileName = message.fileName;

    userImage = message.userImage;
    toDocId = message.toDocId;
    name = message.name;
    dataSize = message.dataSize

    async.waterfall([
        function (callback) {

            var condition = [
                { "senderId": objectId(userId), "receiverId": objectId(targetUserId) },
                { "senderId": objectId(targetUserId), "receiverId": objectId(userId) }
            ];

            middleWare.Select("messages", { $or: condition, secretId: secretId }, "Mongo", {}, function (err, result) {
                if (err) {
                    callback(err, null);
                } else {
                    (result[0]) ? callback(null, result[0].chatId) : callback(null, 0);
                }
            });
        },
        function (chatId, callback) {

            var messageIdDB = objectId();

            if (chatId) {

                var data = {
                    $unset: { ["members." + userId + ".inactive"]: "", ["members." + targetUserId + ".inactive"]: "" },
                    $push: { "message": messageIdDB }
                };
                var condition = { _id: chatId };

                middleWare.FindAndModify("chatList",
                    data,
                    condition,
                    "Mongo",
                    { _id: 1 }, {},
                    function (getChatErr, getChatRes) {
                        if (getChatErr) console.log('error 203 : ', getChatErr)
                    })

                // middleWare.UpdateWithPush("chatList", data, condition, "Mongo", function (err, res) {
                //     if (err) console.log("error 204 : ", err);
                // });

            } else {
                chatId = objectId();
                var chatDB = {
                    "_id": chatId,
                    "message": [messageIdDB],
                    "members": {
                        [userId]: {
                            "memberId": objectId(userId),
                            "status": "NormalMember"
                        },
                        [targetUserId]: {
                            "memberId": objectId(targetUserId),
                            "status": "NormalMember"
                        }
                    },
                    "initiatedBy": objectId(userId),
                    "createdAt": new Date().getTime(),
                    "chatType": "NormalChat",
                    "secretId": secretId
                }
                middleWare.Insert("chatList", chatDB, {}, "Mongo", function (err, res) {
                    if (err) console.log("error 202 : ", err);
                });
            }

            var messageDB = {
                "_id": messageIdDB,
                "messageId": messageId,
                "secretId": secretId,
                "dTime": dTime,
                "senderId": objectId(userId),
                "receiverId": objectId(targetUserId),
                "payload": payload,
                "messageType": type,
                "timestamp": new Date().getTime(),
                "expDtime": 0,
                "chatId": chatId,
                "userImage": userImage,
                "toDocId": toDocId,
                "name": name,
                "dataSize": dataSize,
                "thumbnail": thumbnail,
                "mimeType": mimeType,
                "extension": extension,
                "fileName": fileName,
                "members": {
                    [userId]: {
                        "memberId": objectId(userId),
                        // "status": ""
                        // "deleteAt": 0
                    },
                    [targetUserId]: {
                        "memberId": objectId(targetUserId),
                        "status": 1,
                        // "readAt": 0,
                        // "deliveredAt": new Date().getTime()
                        // "deleteAt": 0
                    }
                }

            };

            middleWare.Insert("messages", messageDB, {}, "Mongo", function (err, res) {
                if (err) console.log("error 203 : ", err);
            });

            callback(null, " done2");
        }
    ]);

}

function chatInsertFrom(data, pushData) {

    middleWare.Select("chats", { "userID": pushData.from }, "Mongo", {}, function (err, result) {
        if (err) {
            console.log("=====chatInsert=>>>>", err);
        }
        else if (result.length) {

            var isExit = false;
            for (var i = 0; i < result[0].chats.length; i++) {
                if (result[0].chats[i].senderId == pushData.to) {
                    isExit = true;
                    break;
                }
            }

            if (isExit) {
                console.log("in set")
                var chats = {
                    "chats.$.senderName": pushData.name,
                    "chats.$.senderId": pushData.to,
                    "chats.$.timestamp": pushData.creation,
                    "chats.$.messageType": pushData.type,
                    "chats.$.payload": pushData.payload,
                    "chats.$.actualSenderId": pushData.to,
                    "chats.$.chatId": data.uniqueKey
                }

                middleWare.UpdateWithPush("chats",
                    { $set: chats },
                    { "userID": pushData.from, "chats": { $elemMatch: { "senderId": pushData.to } } },
                    "Mongo", function (err, res) {
                        console.log("===>", err);
                    });

            } else {
                console.log("in push");
                var chats = {
                    "senderName": pushData.name,
                    "senderId": pushData.to,
                    "timestamp": pushData.creation,
                    "messageType": pushData.type,
                    "payload": pushData.payload,
                    "actualSenderId": pushData.to,
                    "chatId": data.uniqueKey
                }

                middleWare.UpdateWithPush("chats", { $push: { "chats": chats } }, { "userID": pushData.from }, "Mongo", function (err, res) {
                    console.log("===>", err);
                });

            }
        }
        else {

            if (parseInt(pushData.type)) {
                pushData.payload = messageTypes[pushData.type];
            }

            var chatData = {
                "userID": pushData.from,
                "chats": [
                    {
                        "senderName": pushData.name,
                        "senderId": pushData.to,
                        "timestamp": pushData.creation,
                        "messageType": pushData.type,
                        "payload": pushData.payload,
                        "actualSenderId": pushData.to,
                        "chatId": data.uniqueKey
                    }]
            };
            middleWare.Insert("chats", chatData, {}, "Mongo", function (err, res) { });
        }

    });
}

function chatInsertTo(data, pushData) {

    middleWare.Select("chats", { "userID": pushData.to }, "Mongo", {}, function (err, result) {
        if (err) {
            console.log("=====chatInsert=>>>>", err);
        }
        else if (result.length) {

            var isExit = false;
            for (var i = 0; i < result[0].chats.length; i++) {
                if (result[0].chats[i].senderId == pushData.from) {
                    isExit = true;
                    break;
                }
            }

            if (isExit) {

                var chats = {
                    "chats.$.senderName": pushData.name,
                    "chats.$.senderId": pushData.from,
                    "chats.$.timestamp": pushData.creation,
                    "chats.$.messageType": pushData.type,
                    "chats.$.payload": pushData.payload,
                    "chats.$.actualSenderId": pushData.from,
                    "chats.$.chatId": data.uniqueKey
                }

                middleWare.UpdateWithPush("chats",
                    { $set: chats },
                    { "userID": pushData.to, "chats": { $elemMatch: { "senderId": pushData.from } } },
                    "Mongo", function (err, res) {
                        // console.log("===>", err);
                    });

            } else {
                console.log("in push");
                var chats = {
                    "senderName": pushData.name,
                    "senderId": pushData.from,
                    "timestamp": pushData.creation,
                    "messageType": pushData.type,
                    "payload": pushData.payload,
                    "actualSenderId": pushData.from,
                    "chatId": data.uniqueKey
                }

                middleWare.UpdateWithPush("chats", { $push: { "chats": chats } }, { "userID": pushData.to }, "Mongo", function (err, res) {
                    // console.log("===>", err);
                });

            }

            if (!userStatus[pushData.to]) {
                data = {
                    payload: {
                        notification: {
                            title: "Dipen",
                            body: "This is testMessge"
                        }
                    }
                };
                if (result[0].pushToken) {
                    // call fcm function
                    data.pushToken = result[0].pushToken
                } else {
                    // call topic function for push
                    data.topic = "topic";
                }
                sendPush(data);

            }

        }
        else {

            middleWare.Select("users", [{ "term": { "fuserid": pushData.to } }], "ESearch", {}, function (err, res) {
                console.log("=============>>>>err  ESearch : ", err);

                if (parseInt(pushData.type)) {
                    pushData.payload = messageTypes[pushData.type];
                }

                var chatData = {
                    "userID": pushData.to,
                    "chats": [
                        {
                            "senderName": pushData.name,
                            "senderId": pushData.from,
                            "timestamp": pushData.creation,
                            "messageType": pushData.type,
                            "payload": pushData.payload,
                            "actualSenderId": pushData.from,
                            "chatId": data.uniqueKey
                        }]
                };
                if (res.hits.hits[0]) {
                    chatData.pushToken = res.hits.hits[0]._source.pToken;
                }
                middleWare.Insert("chats", chatData, {}, "Mongo", function (err, res) { });

            });

        }
    });
}

function activate(data) {
    var uniqueKey = "";
    var chats = {
        "chats.$.unReadMessages": 0,
    }

    middleWare.UpdateWithPush("chats",
        { $set: chats },
        { "userID": data.userId, "chats": { $elemMatch: { "senderId": data.activeUserId } } },
        "Mongo", function (err, res) {
            console.log("=activate 1==>", err);
        });
    if (data.userId.length > data.activeUserId.length) {
        uniqueKey = data.userId + "_" + data.activeUserId;
    } else {
        uniqueKey = data.activeUserId + "_" + data.userId;
    }
    console.log("uniqueKey:" + uniqueKey);
    console.log(" data.activeUserId :" + data.activeUserId);
    console.log(" data.userId:" + data.userId);

    var msgs = {
        "messages.$.isRead": 1,
    }

    middleWare.UpdateWithPush("messages",
        { $set: msgs },
        { "uniqueKey": uniqueKey, "messages": { $elemMatch: { "isRead": 0, to: data.activeUserId } } },
        "Mongo", function (err, res) {
            console.log("==activate 2=>", err);
        });
}


function sendPush(data) {
    if (data.pushToken) {
        var FCM = require('fcm-node');
        // var fcm = new FCM(serverKey);
        console.log("In fcm ");
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: data.pushToken,
            collapse_key: 'your_collapse_key',
            badge: 1,
            priority: "high",
            notification: {
                sound: 'sms-received-push.wav',
                badge: 1,
            },
            data: data.payload
        };
        try {
            fcm.send(message, function (err, response) {
                if (err) {
                    console.log("Something has gone wrong!", err);
                } else {
                    console.log("Successfully sent with response Data: ", response);
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    } else {
        console.log("In topic Push ");
        var topic = data.topic;
        // See the "Defining the message payload" section below for details
        // on how to define a message payload.
        var payload = data.payload;
        // Send a message to devices subscribed to the provided topic.
        // admin.messaging().sendToTopic(topic, payload)
        //     .then(function (response) {
        //         // See the MessagingTopicResponse reference documentation for the
        //         // contents of response.
        //         console.log("Successfully sent message:", response);
        //     })
        //     .catch(function (error) {
        //         console.log("Error sending message:", error);
        //     });
    }
}

function saveMessageLog(data) {
    var currentDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    var condition = [
        { "term": { userId: data.from.toLowerCase() } },
        { "term": { dateAt: currentDate } }
    ];

    middleWare.SelectWithOr("messageLogs", condition, "ESearch", {}, function (err, result) {

        switch (!(result.hasOwnProperty('hits')) || !(result.hits.hasOwnProperty('hits'))) {
            // switch (typeof result.hits.hits[0] != undefined) {

            case (false): {
                // no Data Found
                console.log("Nodata Found");
                var dataToSave = {
                    userId: data.from,
                    dateAt: currentDate,
                    messageLogs: {},
                    callLogs: {},
                    receivedAudioCall: [],
                    initiatAudioCall: [],
                    initiatVideoCall: []
                };

                for (var index = 0; index < messageTypes.length; index++) {
                    dataToSave.messageLogs[messageTypes[index]] = 0;
                    if (index == data.type) {
                        dataToSave.messageLogs[messageTypes[index]] = 1;
                    }
                }

                middleWare.Insert("messageLogs", dataToSave, {}, "ESearch", function (err, res) { });
                middleWare.Insert("messageLogs", dataToSave, {}, "Mongo", function (err, res) { });
                break;
            }
            case (true): {
                var _id = result.hits.hits[0]._id;
                var incrise = result.hits.hits[0]._source.messageLogs[messageTypes[data.type]] + 1;
                //Data Found from DB
                console.log(" data Found successfully.");
                var dataToSave = {
                    messageLogs: {},
                };

                for (var index = 0; index < messageTypes.length; index++) {
                    if (index == data.type) {
                        dataToSave.messageLogs[messageTypes[index]] = incrise;
                    }
                }
                condition = [
                    { "term": { userId: data.from.toLowerCase() } },
                    { "term": { dateAt: currentDate } }
                ];

                middleWare.Update("messageLogs", dataToSave, _id, "ESearch", function (err, res) { });
                condition = {
                    userId: data.from,
                    dateAt: currentDate
                }
                middleWare.Update("messageLogs", dataToSave, condition, "Mongo", function (err, res) { });
                break;
            }
            default: {
                console.log("Error : 100 ", err);
            }

        }

    })


}

function saveCallCount(callId) {

    var startDate = moment(calls[callId].creation)
    var endDate = moment(calls[callId].endDate)
    var secondsDiff = endDate.diff(startDate, 'seconds')
    calls[callId].secondsDiff = secondsDiff;
    calls[callId].mins = (calls[callId].secondsDiff / 60).toFixed(2);//secondsDiff;    
    calls[callId].currentDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    try {
        async.waterfall([

            function (callback) {
                var condition =
                    { userId: objectId(calls[callId].userId), dateAt: calls[callId].currentDate };
                // console.log("Condition : ", condition);
                middleWare.Select("messageLogs", condition, "Mongo", {}, function (err, result) {

                    if (err) {
                        console.log("Error : ", err);
                    } else if (result[0]) {

                        // console.log("result ", result);
                        var _id = result[0]._id;

                        var UserCallLogsForDB = [
                            "initiatAudioCall",
                            "initiatVideoCall"];


                        if (result[0].callLogs[UserCallLogsForDB[calls[callId].typeOfCall]]) {
                            result[0].callLogs[UserCallLogsForDB[calls[callId].typeOfCall]] = parseFloat(parseFloat(result[0].callLogs[UserCallLogsForDB[calls[callId].typeOfCall]]) + parseFloat(calls[callId].mins));
                        } else {
                            result[0].callLogs[UserCallLogsForDB[calls[callId].typeOfCall]] = parseFloat(calls[callId].mins);
                        }


                        if (result[0][UserCallLogsForDB[calls[callId].typeOfCall]]) {
                            result[0][UserCallLogsForDB[calls[callId].typeOfCall]].push({ userId: objectId(calls[callId].targetId), mins: parseFloat(calls[callId].mins) });
                        } else {
                            result[0][UserCallLogsForDB[calls[callId].typeOfCall]] = [{ userId: objectId(calls[callId].targetId), mins: parseFloat(calls[callId].mins) }];
                        }

                        var dataToUpdate = {
                            callLogs: result[0].callLogs,
                            [UserCallLogsForDB[calls[callId].typeOfCall]]: result[0][UserCallLogsForDB[calls[callId].typeOfCall]]
                        };

                        //Data Found from DB
                        console.log(" data Found successfully....................................1.");


                        middleWare.Update("messageLogs", {
                            callLogs: result[0].callLogs,
                            [UserCallLogsForDB[calls[callId].typeOfCall]]: result[0][UserCallLogsForDB[calls[callId].typeOfCall]]
                        }, { userId: objectId(calls[callId].userId) }, "Mongo", function (err, res) { });

                        callback();
                    } else {
                        var UserCallLogsForDB = [
                            "initiatAudioCall",
                            "initiatVideoCall"];

                        var TargetCallLogsForDB = [
                            "receivedAudioCall",
                            "receivedVideoCall"];

                        try {
                            var dataToSave = {
                                userId: objectId(calls[callId].userId),
                                dateAt: calls[callId].currentDate,
                                messageLogs: {},
                                callLogs: {
                                    [UserCallLogsForDB[calls[callId].typeOfCall]]: parseFloat(calls[callId].mins),
                                },
                                [UserCallLogsForDB[calls[callId].typeOfCall]]: [
                                    {
                                        userId: objectId(calls[callId].targetId),
                                        mins: parseFloat(calls[callId].mins)
                                    }
                                ]

                            };
                            console.log("Nodata Found calls[callId].userId..............1. :  ", dataToSave);

                            middleWare.Insert("messageLogs", dataToSave, {}, "Mongo", function (err, res) { });
                        } catch (error) {
                            console.log("error", error)
                        }

                        callback();
                    }
                })
            },
            function (callback) {

                var condition = { userId: objectId(calls[callId].targetId), dateAt: calls[callId].currentDate };

                middleWare.Select("messageLogs", condition, "Mongo", {}, function (err, result) {

                    if (err) {
                        console.log("Error : ", err);
                    } else if (result[0]) {

                        var _id = result[0]._id;
                        var UserCallLogsForDB = [
                            "receivedAudioCall",
                            "receivedVideoCall"];


                        if (result[0].callLogs[UserCallLogsForDB[calls[callId].typeOfCall]]) {
                            result[0].callLogs[UserCallLogsForDB[calls[callId].typeOfCall]] = parseFloat(parseFloat(result[0].callLogs[UserCallLogsForDB[calls[callId].typeOfCall]]) + parseFloat(calls[callId].mins));
                        } else {
                            result[0].callLogs[UserCallLogsForDB[calls[callId].typeOfCall]] = parseFloat(calls[callId].mins);
                        }


                        if (result[0][UserCallLogsForDB[calls[callId].typeOfCall]]) {
                            result[0][UserCallLogsForDB[calls[callId].typeOfCall]].push({ userId: objectId(calls[callId].userId), mins: parseFloat(calls[callId].mins) });
                        } else {
                            result[0][UserCallLogsForDB[calls[callId].typeOfCall]] = [{ userId: objectId(calls[callId].userId), mins: parseFloat(calls[callId].mins) }];
                        }

                        var dataToUpdate = {
                            callLogs: result[0].callLogs,
                            [UserCallLogsForDB[calls[callId].typeOfCall]]: result[0][UserCallLogsForDB[calls[callId].typeOfCall]]
                        };

                        middleWare.Update("messageLogs", {
                            callLogs: result[0].callLogs,
                            [UserCallLogsForDB[calls[callId].typeOfCall]]: result[0][UserCallLogsForDB[calls[callId].typeOfCall]]
                        }, { userId: objectId(calls[callId].targetId) }, "Mongo", function (err, res) { });

                        callback()
                    } else {
                        var UserCallLogsForDB = [
                            "initiatAudioCall",
                            "initiatVideoCall"];

                        var TargetCallLogsForDB = [
                            "receivedAudioCall",
                            "receivedVideoCall"];

                        var dataToSave = {
                            userId: objectId(calls[callId].targetId),
                            dateAt: calls[callId].currentDate,
                            messageLogs: {},
                            callLogs: {
                                [TargetCallLogsForDB[calls[callId].typeOfCall]]: parseFloat(calls[callId].mins),
                            },
                            [TargetCallLogsForDB[calls[callId].typeOfCall]]: [
                                {
                                    userId: objectId(calls[callId].userId),
                                    mins: parseFloat(calls[callId].mins)
                                }
                            ]

                        };

                        middleWare.Insert("messageLogs", dataToSave, {}, "Mongo", function (err, res) { });
                        callback();
                    }
                })
            },
            function (callback) {
                //data to save in call log , store indivisual call in doc with duration
                console.log("callLogs ", calls[callId]);
                calls[callId].userId = objectId(calls[callId].userId);
                calls[callId].targetId = objectId(calls[callId].targetId);

                middleWare.Insert("callLogs", calls[callId], {}, "Mongo", function (err, res) { });
                delete calls[callId];
                callback();
            }

        ]);



    } catch (error) {
        console.log("Exception : ", error)
    }
}


function Acknowledgement(data) {

    data = JSON.parse(data);
    console.log(">> Message Acknowledgement", data);
    /**
     { 
         to: '5988253b50e23910a3bd5a83',
         msgIds: [ '1502375529082' ],
         dTime: -1,
         secretId: 'wGtTnIJaYO80ZbuVFynJPnPLabs3Embed',
         from: '59847dbd3fe3042557c0745b',
         status: '2',
         doc_id: '3efb89ae-29cf-4242-b62d-4a7f1d5b0f97' 
      }
     */

    var userId = data.from;
    var messageId = data.msgIds;
    var status = parseInt(data.status);
    var dtime = (data.dTime) ? parseInt(data.dTime) : null;
    var targetId = data.to;
    var updaetStatus = "members." + userId + ".status";
    var secretId = data.secretId;

    /**
     * status: 2- delivered, 3- read
     */
    switch (parseInt(status)) {
        case "2":
        case 2: {
            /**
             * Message Delivered to the recipients
             */
            var deliveredAt = "members." + userId + ".deliveredAt";

            var dataToUpdate = {
                [updaetStatus]: 2
            }
            dataToUpdate[deliveredAt] = new Date().getTime();

            for (var index = 0; index < messageId.length; index++) {
                middleWare.Update("messages", dataToUpdate, { messageId: messageId[index] }, "Mongo", function (err, result) {
                    if (err) {
                        console.log("Error : messages 101 ", err);
                    }
                });

            }
            break;
        }
        case "3":
        case 3: {
            /**
             * Message Read by the recipients
             */
            if (data.secretId && data.secretId != "") {
                /**
                 * secret chat
                 * get all the documents to update and update thier expiry time
                 */
                var condition = {
                    $and: [
                        { $and: [{ "receiverId": objectId(userId) }, { "senderId": objectId(targetId) }, { secretId: secretId }] },
                        // { ["members." + userId + ".status"]: { $exists: true } },
                        { ["members." + userId + ".status"]: { $ne: 3 } },
                        { "timestamp": { "$lte": new Date().getTime() } },
                        { "payload": { $ne: "" } }
                    ]
                }

                middleWare.Select("messages", condition, "Mongo", {}, function (getMsgErr, getMsgResult) {
                    if (getMsgErr) {

                    } else if (getMsgResult.length > 0) {

                        async.each(getMsgResult, function (msgObj, msgCB) {
                            /**
                             * update the each doc
                             * get the 'dTime' and then calculate the 'expDtime'
                             */
                            var dataToUpdate = { ["members." + userId + ".status"]: 3, ["members." + userId + ".readAt"]: new Date().getTime() }
                            if (msgObj.dTime > 0) {
                                dataToUpdate['expDtime'] = new Date().getTime() + (msgObj.dTime * 1000)
                            }

                            middleWare.Update("messages", dataToUpdate, { _id: msgObj._id }, "Mongo", function (updtErr, updtResult) {
                                if (updtErr) {
                                    console.log("Error : messages 101 ", err);
                                }
                            });

                            msgCB(null);
                        })
                    }
                })

            }
            else {
                /**
                 * normal chat
                 * update all the document in single query
                 */

                var condition = {
                    $and: [
                        { $and: [{ "receiverId": objectId(userId) }, { "senderId": objectId(targetId) }, { secretId: "" }] },
                        //{ ["members." + userId + ".status"]: { $exists: true } },
                        { ["members." + userId + ".status"]: { $ne: 3 } },
                        { "timestamp": { "$lte": new Date().getTime() } }
                    ]
                }

                var dataToUpdate = { ["members." + userId + ".status"]: 3, ["members." + userId + ".readAt"]: new Date().getTime() }

                middleWare.Update("messages", dataToUpdate, condition, "Mongo", function (err, result) {
                    if (err) {
                        console.log("Error : messages 102 ", err);
                    }
                });
            }
            break;
        }

    }

}
