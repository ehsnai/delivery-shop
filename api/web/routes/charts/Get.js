'use strict';
const Joi = require("joi");
const userDevices = require("../../../models/userDevices");
const ObjectID = require('mongodb').ObjectID;
const local = require("../../../locales");
const userList = require("../../../models/userList")
const APIHandler = (req, res) => {



    let conditionForPia = [
        {
            $group: {
                _id: "$DevicetypeMsg",
                totalUsers: { $sum: 1 },
            }
        }
    ]



    // -------------------------------------------------------------------------------------------------------------------


    let conditionForBar = [
        {
            $group:
            {
                _id:
                {
                    day: { $dayOfMonth: "$creationDate" },
                    month: { $month: "$creationDate" },
                    year: { $year: "$creationDate" }
                },
                count: { $sum: 1 },
                date: { $first: "$creationDate" }
            }
        },
        {
            $project:
            {
                date:
                {
                    $dateToString: { format: "%d-%m-%Y", date: "$date" }
                },
                creationDate: "$date",
                count: 1,
                _id: 0,
            }
        },
        { $sort: { creationDate: -1 } },
    ]

    userList.Aggregate(conditionForBar, (err, result) => {
        //console.log("result", result)
        if (err) {
            return console.log(err);
        }
        else {
            let date = [];
            let count = [];
            result.forEach(element => {
                date.push(element.date)
                count.push(element.count)

            });
            userDevices.Aggregate(conditionForPia, (err, result) => {
                //  console.log("result", result)
                if (err) {
                    return console.log(err);
                }
                else {
                    var device = [0, 0, 0];
                    let type = [];
                    result.forEach(element => {
                        switch (element._id) {
                            case "Android":
                                device[0] = element.totalUsers;
                                break;
                            case "iOS":
                                device[1] = element.totalUsers;
                                break;
                            default:
                                device[2] = element.totalUsers;
                                break;
                        }
                    });
                    return res({ message: req.i18n.__('GetsafetyTips')['200'], datazzz: date, count: count, device: device }).code(200);
                }

            });
        }

    });
};

const response = {
    // status: {
    //     200: {
    //         message: Joi.any().default(local['GetsafetyTips']['200']), data: Joi.any()
    //     },
    //     204: { message: Joi.any().default(local['GetsafetyTips']['204']) },
    //     400: { message: Joi.any().default(local['genericErrMsg']['400']) },
    //     500: { message: Joi.any().default(local['genericErrMsg']['500']) }
    // }
}

module.exports = { APIHandler, response }