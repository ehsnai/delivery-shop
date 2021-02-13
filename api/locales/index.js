const config = require('../config')
let defaultLan = config.localization.DEFAULT_LANGUAGE;

module.exports =  require(`./${defaultLan}.json`);