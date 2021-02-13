'use strict'

const common = require('./components/common');
const logger = require('./components/logger');
const server = require('./components/server');
const mongodb = require('./components/mongodb');
const twilio = require('./components/twilio');
const mailgun = require('./components/mailgun');
const fcm = require('./components/fcm');
const localization = require('./components/localization');

module.exports = Object.assign({}, common, logger, server, mongodb, twilio, mailgun,
    fcm, localization)
