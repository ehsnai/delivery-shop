const config = require('../../config');
const defaultLan = config.localization.DEFAULT_LANGUAGE;
const languages = config.localization.LANGUAGES;

const i18n = {
    register: require('hapi-i18n'),
    options: {
        locales: languages.split(','),
        directory: './locales',
        languageHeaderField: 'lang',
        defaultLocale: defaultLan
    }
}

module.exports = { i18n };