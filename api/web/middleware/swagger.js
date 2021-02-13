
const inert = require('inert');
const vision = require('vision');
const  HapiSwagger  =  require('hapi-swagger');

const swagger = {
    register: HapiSwagger,
    'options': {
        grouping: 'tags',
        payloadType: 'form',//form || json 
        info: {
            "title": "Admin API Documentation",
        }
    }
}

module.exports = { inert, vision, swagger };