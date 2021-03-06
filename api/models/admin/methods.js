'use strict'

const db = require('../mongodb')
const logger = require('winston');
const ObjectID = require('mongodb').ObjectID;

const tablename = 'admin';

function Select(data, callback) {
    db.get().collection(tablename)
        .find(data)
        .toArray((err, result) => {
            return callback(err, result);
        });

}

function SelectOne(data, callback) {
    db.get().collection(tablename)
        .findOne(data, ((err, result) => {
            return callback(err, result);
        }));
}


function SelectById(condition, requiredFeild, callback) {
    condition["_id"] = ObjectID(condition._id);
    db.get().collection(tablename)
        .findOne(condition, requiredFeild, ((err, result) => {
            return callback(err, result);
        }));
}


function Insert(data, callback) {
    db.get().collection(tablename)
        .insert(data, (err, result) => {
            return callback(err, result);
        });
}


function Update(condition, data, callback) {
    db.get().collection(tablename)
        .update(condition, { $set: data }, (err, result) => {
            return callback(err, result);
        });
}


function UpdateById(_id, data, callback) {
    db.get().collection(tablename)
        .update({ _id: ObjectID(_id) }, { $set: data }, (err, result) => {
            return callback(err, result);
        });
}

function UpdateByIdWithAddToSet(condition, data, callback) {
    condition["_id"] = ObjectID(condition._id);
    db.get().collection(tablename)
        .update(condition, { $addToSet: data }, (err, result) => {
            return callback(err, result);
        });
}

function UpdateByIdWithPush(condition, data, callback) {
    condition["_id"] = ObjectID(condition._id);
    db.get().collection(tablename)
        .update(condition, { $push: data }, (err, result) => {
            return callback(err, result);
        });
}
function UpdateByIdWithPull(condition, data, callback) {
    condition["_id"] = ObjectID(condition._id);
    db.get().collection(tablename)
        .update(condition, { $pull: data }, (err, result) => {
            return callback(err, result);
        });
}

function Delete(condition, callback) {
    db.get().collection(tablename)
        .remove(condition, (err, result) => {
            return callback(err, result);
        });
}


module.exports = { Select, SelectOne, Insert, Update, SelectById, UpdateById,
     Delete,UpdateByIdWithAddToSet,UpdateByIdWithPush,UpdateByIdWithPull };