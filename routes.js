'use strict'
var api = require('./controller/default')
var user = require('./controller/users')
const auth = require('./auth')

module.exports = function (app) {
  app.route('/').get(api.get_app_info)
  app.route('/api/users/register').post(user.sign_up)
  app.route('/api/users/login').post(user.sign_in)

/*  app.route('/user/register').post(user.register)
  app.route('/user/login').post(user.login)
  app.route('/user/forgot-password').post(user.forgotPassword)
  app.route('/user/reset-password').post(user.resetPassword)*/

}
