'use strict'
const Joi = require("joi");
const logger = require('winston');
const userList = require("../../../models/userList");
const ObjectID = require('mongodb').ObjectID;
const local = require("../../../locales");
const Timestamp = require('mongodb').Timestamp;


const payloadValidator = Joi.object({
    _id: Joi.string().required().min(24).max(24).description('Id'),
    firstName: Joi.string().required().description("First Name,Eg. Lisa/John").error(new Error('firstName is missing.')),
    lastName: Joi.string().required().description("lastName,Eg. Lisa/John").error(new Error('lastName is missing.')),
    email: Joi.string().required().description("Email,Eg.xyz@gmail.com").error(new Error('emailAddress is missing')),
    city: Joi.string().required().description("city ,Eg. Bangaluru").error(new Error('cityName  is missing')),
    countryCode: Joi.string().required().description("Country Code, Eg. +91/+1").error(new Error('countryCode is missing')),
    country: Joi.string().required().description("city ,Eg. INDIA").error(new Error('countryName  is missing')),
    contactNumber: Joi.string().required().description("Mobile Number, Eg. 1234567890").error(new Error('phone is missing')),
    dob: Joi.string().required().description("Date of Birth(miliseconds),Eg. 786342377000").error(new Error('dateOfBirth is missing')),
    gender: Joi.string().required().description("Gender,Eg. Male/Female").error(new Error('gender is missing')),
    height: Joi.number().required().description("Height(Centimetre),Eg. 100/200").error(new Error('height is missing')),
    longitude: Joi.number().required().description("Longitude,Eg. 77.5894554").example(13.123456).error(new Error('longitude is missing')),
    latitude: Joi.number().required().description("Latitude,Eg. 13.0286543").example(77.123456).error(new Error('latitude is missing')),
    profilePic: Joi.string().required().description("imageUrl").error(new Error('imageUrl is missing')),
    profileVideo: Joi.string().required().description("videoUrl").error(new Error('videoUrl is missing')),
    searchPreferences: Joi.array().description("searchPreferences").error(new Error('searchPreferences is missing')),
    myPreferences: Joi.array().description("myPreferences").error(new Error('myPreferences is missing')),
    //profileVideoThumbnail: Joi.string().required().description("videoThumbnail").error(new Error('videoThumbnail is missing')),

}).options({ allowUnknown: true });

const APIHandler = (req, res) => {
    var searchPreference = req.payload.searchPreferences;
    var searchPreferenceArray = [];
    searchPreference.forEach(e => {
        var searchPreferenceObj = {
            pref_id: ObjectID(e.pref_id),
        }
        if (e.pref_id.toString() == "57231014e8408f292d8b4567") {
            searchPreferenceObj.selectedValue = e.selectedValue
        }
        else {
            var arr = e.selectedValue.map(parseFloat);
            searchPreferenceObj.selectedValue = arr;
            searchPreferenceObj.optionsUnits = e.selectedUnit;
        }
        searchPreferenceArray.push(searchPreferenceObj)
    })

    var myPrefrancesArray = [];
    var myPreference = req.payload.myPreferences
    myPreference.forEach(e => {
        var myPreferenceObj = {
            pref_id: ObjectID(e.pref_id),
        }
        myPreferenceObj["isDone"] = true;
        myPreferenceObj["selectedValues"] = e.selectedValues;
        myPrefrancesArray.push(myPreferenceObj)

    })

    var _id = new ObjectID();
    var dataToSend = {

        "firstName": req.payload.firstName,
        "lastName": req.payload.lastName,
        "email": req.payload.email,
        "contactNumber": req.payload.countryCode + req.payload.contactNumber,
        "countryCode": req.payload.countryCode,
        "dob": req.payload.dob,
        "gender": req.payload.gender,
        "height": req.payload.height,
        "registeredTimestamp": new Date().getTime(),
        "profilePic": req.payload.profilePic,
        "profileVideo": req.payload.profileVideo,
        creationTs: new Timestamp(1, Date.now()),
        creationDate: new Date(),
        searchPreferences: searchPreferenceArray,
        "location": {
            "longitude": req.payload.longitude,
            "latitude": req.payload.latitude
        },
        myPreferences: myPrefrancesArray,
        heightInFeet: `5'3"`,
        onlineStatus: 0,
        likedBy: [],
        myLikes: [],
        myunlikes: [],
        mySupperLike: [],
        supperLikeBy: [],
        disLikedUSers: [],
        matchedWith: [],
        lastUnlikedUser: [],
        recentVisitors: [],
        "address": {
            "city": req.payload.city,
            "country": req.payload.country,
        }

    }

    userList.UpdateById(req.payload._id, dataToSend, (err, result) => {
        if (err) {
            logger.silly(err);
            return res({ message: req.i18n.__('genericErrMsg')['500'] }).code(500);
        } else {
            return res({ message: req.i18n.__('PutUsers')['200'] }).code(200);
        }
    });
};

const response = {
    status: {
        200: {
            message: Joi.any().default(local['PutUsers']['200']),
        },
        204: { message: Joi.any().default(local['genericErrMsg']['204']) },
        400: { message: Joi.any().default(local['genericErrMsg']['400']) },
        500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    }
}

module.exports = { APIHandler, response, payloadValidator }