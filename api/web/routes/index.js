const login               = require('./login');
const register            = require('./register');
const user                = require('./user');
const language            = require('./language');
const citys               = require('./citys');
const countrys            = require('./countrys');
const profile             = require('./profile');
const dashboard           = require('./dashboard');
const imageUpload         = require('./imageUpload')
const products            = require('./products')
const filterProduct       = require('./filterProduct')
const coupons             = require('./coupons')
const orders              = require('./order')
const tickets             = require('./tickets')
const address             = require('./address')


module.exports = [].concat(
      login,
      register, 
      user,
      language,
      countrys, 
      citys, 
      profile, 
      dashboard,
      imageUpload,
      products,
      filterProduct,
      coupons,
      orders,
      tickets,
      address
);